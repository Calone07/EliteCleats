"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export interface ScrollSequenceHandle {
  draw: (index: number) => void;
}

interface ScrollSequenceProps {
  getFrame: (index: number) => ImageBitmap | HTMLImageElement | null;
  className?: string;
}

const MAX_DEVICE_PIXEL_RATIO = 2;

export const ScrollSequence = forwardRef<ScrollSequenceHandle, ScrollSequenceProps>(
  function ScrollSequence({ getFrame, className }, ref) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const currentFrame = useRef(1);

    const draw = useCallback(
      (index: number) => {
        const canvas = canvasRef.current;
        const frame = getFrame(index);
        if (!canvas || !frame) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageAspect = frame.width / frame.height;
        const canvasAspect = canvas.width / canvas.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        if (imageAspect > canvasAspect) {
          drawWidth = canvas.height * imageAspect;
        } else {
          drawHeight = canvas.width / imageAspect;
        }

        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);

        currentFrame.current = index;
      },
      [getFrame],
    );

    useImperativeHandle(ref, () => ({ draw }), [draw]);

    useEffect(() => {
      const wrapper = wrapperRef.current;
      const canvas = canvasRef.current;
      if (!wrapper || !canvas) return;

      const resize = () => {
        const rect = wrapper.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
        canvas.width = Math.max(1, Math.round(rect.width * dpr));
        canvas.height = Math.max(1, Math.round(rect.height * dpr));
        draw(currentFrame.current);
      };

      resize();

      const observer = new ResizeObserver(resize);
      observer.observe(wrapper);

      return () => observer.disconnect();
    }, [draw]);

    return (
      <div ref={wrapperRef} className={className}>
        <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
      </div>
    );
  },
);
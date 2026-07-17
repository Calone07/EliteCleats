"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { duration, easing } from "@/motion/constants";

interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eliteRef = useRef<HTMLSpanElement>(null);
  const cleatsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const elite = eliteRef.current;
    const cleats = cleatsRef.current;
    if (!container || !elite || !cleats) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      tl.fromTo(
        elite,
        { opacity: 0, y: 20, letterSpacing: "0.5em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.15em",
          duration: duration.slow,
          ease: easing.premium,
        }
      )
        .fromTo(
          cleats,
          { opacity: 0, y: 20, letterSpacing: "0.5em" },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.15em",
            duration: duration.slow,
            ease: easing.premium,
          },
          "-=0.4"
        )
        .to(elite, {
          opacity: 0,
          y: -10,
          duration: duration.fast,
          ease: easing.standard,
        }, "+=1.2")
        .to(
          cleats,
          {
            opacity: 0,
            y: -10,
            duration: duration.fast,
            ease: easing.standard,
          },
          "-=0.2"
        )
        .to(
          container,
          {
            opacity: 0,
            duration: duration.fast,
            ease: easing.standard,
          },
          "-=0.1"
        );
    }, container);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary-bg"
    >
      <div className="flex flex-col items-center gap-2">
        <span
          ref={eliteRef}
          className="text-5xl sm:text-7xl font-bold tracking-[0.15em] text-primary-text"
        >
          ELITE
        </span>
        <span
          ref={cleatsRef}
          className="text-5xl sm:text-7xl font-bold tracking-[0.15em] text-accent"
        >
          CLEATS
        </span>
      </div>
    </div>
  );
}

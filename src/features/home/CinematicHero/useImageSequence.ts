"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { framePath } from "./sequenceConfig";

export type SequenceStatus = "loading" | "ready" | "unavailable";

type FrameSource = ImageBitmap | HTMLImageElement;

const DECODE_WIDTH = 960;
const DECODE_HEIGHT = 540;
const MAX_CACHED_FRAMES = 64;
const PREFILL_COUNT = 24;
const PREFILL_CONCURRENCY = 4;

async function decodeFrame(index: number): Promise<FrameSource | null> {
  try {
    const response = await fetch(framePath(index));
    if (!response.ok) return null;
    const blob = await response.blob();
    if (typeof createImageBitmap === "function") {
      return await createImageBitmap(blob, {
        resizeWidth: DECODE_WIDTH,
        resizeHeight: DECODE_HEIGHT,
        resizeQuality: "high",
      });
    }
    const url = URL.createObjectURL(blob);
    const image = new Image();
    try {
      image.src = url;
      await image.decode();
      return image;
    } finally {
      URL.revokeObjectURL(url);
    }
  } catch {
    return null;
  }
}

export function useImageSequence() {
  const [status, setStatus] = useState<SequenceStatus>("loading");

  const cacheRef = useRef<Map<number, FrameSource>>(new Map());
  const inflightRef = useRef<Map<number, Promise<FrameSource | null>>>(new Map());
  const disposedRef = useRef(false);

  const store = useCallback((index: number, source: FrameSource) => {
    const cache = cacheRef.current;
    const existing = cache.get(index);
    if (existing && existing !== source && existing instanceof ImageBitmap) {
      existing.close();
    }
    cache.set(index, source);
    while (cache.size > MAX_CACHED_FRAMES) {
      const oldest = cache.keys().next().value;
      if (oldest === undefined) break;
      const evicted = cache.get(oldest);
      if (evicted instanceof ImageBitmap) evicted.close();
      cache.delete(oldest);
    }
  }, []);

  const ensureFrame = useCallback(
    (index: number): Promise<FrameSource | null> => {
      const cache = cacheRef.current;
      const cached = cache.get(index);
      if (cached) {
        cache.delete(index);
        cache.set(index, cached);
        return Promise.resolve(cached);
      }
      const inflight = inflightRef.current.get(index);
      if (inflight) return inflight;

      const task = decodeFrame(index).then((source) => {
        inflightRef.current.delete(index);
        if (!source || disposedRef.current) {
          if (source instanceof ImageBitmap) source.close();
          return null;
        }
        store(index, source);
        return source;
      });
      inflightRef.current.set(index, task);
      return task;
    },
    [store],
  );

  const getFrame = useCallback(
    (index: number): FrameSource | null => cacheRef.current.get(index) ?? null,
    [],
  );

  const getNearestFrame = useCallback((index: number): number | null => {
    const cache = cacheRef.current;
    if (cache.size === 0) return null;
    let best = 0;
    let bestDistance = Infinity;
    cache.forEach((_, key) => {
      const distance = Math.abs(key - index);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = key;
      }
    });
    return best;
  }, []);

  useEffect(() => {
    let cancelled = false;
    const cache = cacheRef.current;

    (async () => {
      const first = await ensureFrame(1);
      if (cancelled || disposedRef.current || !first) {
        if (!cancelled && !first) setStatus("unavailable");
        return;
      }
      setStatus("ready");

      let cursor = 2;
      const workers = Array.from({ length: PREFILL_CONCURRENCY }, async () => {
        while (!cancelled && cursor <= PREFILL_COUNT) {
          const index = cursor;
          cursor += 1;
          await ensureFrame(index);
        }
      });
      await Promise.all(workers);
    })();

    return () => {
      cancelled = true;
      disposedRef.current = true;
      cache.forEach((source) => {
        if (source instanceof ImageBitmap) source.close();
      });
      cache.clear();
    };
  }, [ensureFrame]);

  return { status, getFrame, ensureFrame, getNearestFrame };
}
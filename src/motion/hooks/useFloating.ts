"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion } from "@/motion/utils";

interface UseFloatingOptions {
  y?: number;
  duration?: number;
  disabled?: boolean;
}

export function useFloating<T extends HTMLElement>(options: UseFloatingOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isReducedMotion() || options.disabled) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: options.y ?? -12,
        duration: options.duration ?? 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, [options.disabled]);

  return ref;
}

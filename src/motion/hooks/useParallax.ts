"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion } from "@/motion/utils";

interface UseParallaxOptions {
  y?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  disabled?: boolean;
}

export function useParallax<T extends HTMLElement>(options: UseParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isReducedMotion() || options.disabled) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: options.y ?? "30%",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: options.start ?? "top bottom",
          end: options.end ?? "bottom top",
          scrub: options.scrub ?? true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [options.disabled]);

  return ref;
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { duration, easing } from "@/motion/constants";
import { isReducedMotion } from "@/motion/utils";

interface UseStaggerOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  staggerAmount?: number;
  trigger?: string | HTMLElement;
  start?: string;
  once?: boolean;
  disabled?: boolean;
}

export function useStagger<T extends HTMLElement>(options: UseStaggerOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isReducedMotion() || options.disabled) {
      gsap.set(el.querySelectorAll(":scope > *"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(":scope > *"),
        options.from ?? { opacity: 0, y: 20 },
        {
          ...(options.to ?? { opacity: 1, y: 0 }),
          duration: duration.fast,
          ease: easing.premium,
          stagger: options.staggerAmount ?? 0.08,
          scrollTrigger: {
            trigger: options.trigger ?? el,
            start: options.start ?? "top 85%",
            once: options.once ?? true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options.disabled]);

  return ref;
}

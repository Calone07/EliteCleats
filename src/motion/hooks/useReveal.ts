"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { duration, easing, viewport } from "@/motion/constants";
import { isReducedMotion } from "@/motion/utils";

interface UseRevealOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  toggleActions?: string;
  once?: boolean;
  disabled?: boolean;
}

export function useReveal<T extends HTMLElement>(options: UseRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isReducedMotion() || options.disabled) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        options.from ?? { opacity: 0, y: 30 },
        {
          ...(options.to ?? { opacity: 1, y: 0 }),
          duration: duration.normal,
          ease: easing.premium,
          scrollTrigger: {
            trigger: options.trigger ?? el,
            start: options.start ?? `top 85%`,
            end: options.end ?? `top 40%`,
            toggleActions: options.toggleActions ?? "play none none reverse",
            once: options.once ?? viewport.once,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options.disabled]);

  return ref;
}

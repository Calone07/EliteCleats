"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { duration, easing } from "@/motion/constants";
import { isReducedMotion } from "@/motion/utils";

interface HeroAnimationElements {
  label: HTMLElement | null;
  headline: HTMLElement | null;
  subtitle: HTMLElement | null;
  cta: HTMLElement | null;
  image: HTMLElement | null;
}

export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isReducedMotion()) return;

    const els: HeroAnimationElements = {
      label: container.querySelector("[data-hero-label]"),
      headline: container.querySelector("[data-hero-headline]"),
      subtitle: container.querySelector("[data-hero-subtitle]"),
      cta: container.querySelector("[data-hero-cta]"),
      image: container.querySelector("[data-hero-image]"),
    };

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: easing.premium } });

      if (els.label) {
        timeline.fromTo(
          els.label,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: duration.fast }
        );
      }

      if (els.headline) {
        timeline.fromTo(
          els.headline,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: duration.normal },
          "-=0.1"
        );
      }

      if (els.subtitle) {
        timeline.fromTo(
          els.subtitle,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: duration.normal },
          "-=0.2"
        );
      }

      if (els.cta) {
        timeline.fromTo(
          els.cta,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: duration.normal },
          "-=0.3"
        );
      }

      if (els.image) {
        timeline.fromTo(
          els.image,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: duration.slow },
          "-=0.5"
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

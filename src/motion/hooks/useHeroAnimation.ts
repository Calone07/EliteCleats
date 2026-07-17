"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { duration, easing } from "@/motion/constants";
import { isReducedMotion } from "@/motion/utils";

interface HeroAnimationElements {
  container: HTMLElement | null;
  label: HTMLElement | null;
  headline: HTMLElement | null;
  subtitle: HTMLElement | null;
  cta: HTMLElement | null;
  imageContainer: HTMLElement | null;
  imageInner: HTMLElement | null;
  scrollIndicator: HTMLElement | null;
}

export function useHeroAnimation(loaderComplete: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderComplete) return;

    const container = containerRef.current;
    if (!container) return;

    const reduced = isReducedMotion();

    const els: HeroAnimationElements = {
      container,
      label: container.querySelector("[data-hero-label]"),
      headline: container.querySelector("[data-hero-headline]"),
      subtitle: container.querySelector("[data-hero-subtitle]"),
      cta: container.querySelector("[data-hero-cta]"),
      imageContainer: container.querySelector("[data-hero-image]"),
      imageInner: container.querySelector("[data-hero-image-inner]"),
      scrollIndicator: container.querySelector("[data-hero-scroll]"),
    };

    if (reduced) {
      gsap.set(
        [els.label, els.headline, els.subtitle, els.cta, els.imageContainer, els.scrollIndicator].filter(Boolean),
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: easing.premium },
      });

      tl.call(() => {
        gsap.set(container, { opacity: 1 });
      });

      if (els.label) {
        tl.fromTo(
          els.label,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: duration.fast }
        );
      }

      if (els.headline) {
        tl.fromTo(
          els.headline,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: duration.normal },
          "-=0.1"
        );
      }

      if (els.subtitle) {
        tl.fromTo(
          els.subtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: duration.normal },
          "-=0.15"
        );
      }

      if (els.cta) {
        tl.fromTo(
          els.cta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: duration.normal },
          "-=0.2"
        );
      }

      if (els.imageContainer) {
        tl.fromTo(
          els.imageContainer,
          { opacity: 0, scale: 0.85, rotate: -8 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: duration.cinematic,
            ease: easing.dramatic,
          },
          "-=0.4"
        );

        if (els.imageInner) {
          tl.to(
            els.imageInner,
            {
              y: -8,
              rotate: -1.5,
              duration: 3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            },
            "+=0.3"
          );
        }
      }

      if (els.scrollIndicator) {
        tl.fromTo(
          els.scrollIndicator,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: duration.normal },
            "-=0.3"
        );
      }
    }, container);

    return () => ctx.revert();
  }, [loaderComplete]);

  return containerRef;
}

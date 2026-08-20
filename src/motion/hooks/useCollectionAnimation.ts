"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { duration, easing } from "@/motion/constants";
import { isReducedMotion } from "@/motion/utils";

gsap.registerPlugin(ScrollTrigger);

interface CollectionElements {
  container: HTMLElement | null;
  image: HTMLElement | null;
  content: HTMLElement | null;
}

export function useCollectionAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = isReducedMotion();

    const els: CollectionElements = {
      container,
      image: container.querySelector("[data-fc-image]"),
      content: container.querySelector("[data-fc-content]"),
    };

    if (reduced) {
      gsap.set(
        [els.image, els.content].filter(Boolean),
        { opacity: 1, x: 0, y: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: easing.premium },
      });

      if (els.image) {
        tl.fromTo(
          els.image,
          { opacity: 0, x: -60, rotate: -4 },
          { opacity: 1, x: 0, rotate: 0, duration: duration.cinematic, ease: easing.dramatic }
        );
      }

      if (els.content) {
        tl.fromTo(
          els.content,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: duration.normal },
          "-=0.6"
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

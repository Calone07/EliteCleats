"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { duration, easing } from "@/motion/constants";
import { isReducedMotion } from "@/motion/utils";

gsap.registerPlugin(ScrollTrigger);

export function useTechAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = isReducedMotion();

    const rows = Array.from(container.querySelectorAll("[data-tech-row]"));
    const images = Array.from(container.querySelectorAll("[data-tech-image]"));
    const contents = Array.from(container.querySelectorAll("[data-tech-content]"));

    if (reduced) {
      gsap.set([...images, ...contents].filter(Boolean), { opacity: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        const image = row.querySelector("[data-tech-image]");
        const content = row.querySelector("[data-tech-content]");
        const isReversed = image?.classList.contains("lg:order-2");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: easing.premium },
        });

        if (image) {
          tl.fromTo(
            image,
            { opacity: 0, x: isReversed ? 60 : -60 },
            { opacity: 1, x: 0, duration: duration.normal }
          );
        }

        if (content) {
          tl.fromTo(
            content,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: duration.normal },
            "-=0.3"
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

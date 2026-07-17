"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { duration, easing } from "@/motion/constants";

interface ScrollIndicatorProps {
  delay?: number;
}

export function ScrollIndicator({ delay = 3.5 }: ScrollIndicatorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        el,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: duration.normal, ease: easing.premium, delay }
      );

      tl.to(el, {
        opacity: 0,
        duration: duration.fast,
        ease: easing.standard,
      }, "+=3");

      gsap.to(el.querySelector(".scroll-chevron"), {
        y: 6,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        gsap.to(el, {
          opacity: 0,
          duration: duration.fast,
          ease: easing.standard,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs font-medium tracking-[0.2em] text-secondary-text">
        SCROLL
      </span>
      <span className="scroll-chevron text-accent text-lg">↓</span>
    </div>
  );
}

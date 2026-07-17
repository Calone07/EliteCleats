"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { duration, easing } from "@/motion/constants";
import { isReducedMotion } from "@/motion/utils";

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseElements {
  section: HTMLElement | null;
  headline: HTMLElement | null;
  bootImage: HTMLElement | null;
  bootFloat: HTMLElement | null;
  calloutPanels: HTMLElement[];
  indicatorDots: HTMLElement[];
  connectorLines: SVGElement[];
  ratings: HTMLElement | null;
  ratingBars: HTMLElement[];
  ratingValues: HTMLElement[];
  cta: HTMLElement | null;
}

export function useShowcaseAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = isReducedMotion();

    const els: ShowcaseElements = {
      section: container,
      headline: container.querySelector("[data-sc-headline]"),
      bootImage: container.querySelector("[data-sc-boot]"),
      bootFloat: container.querySelector("[data-sc-boot-float]"),
      calloutPanels: Array.from(container.querySelectorAll("[data-sc-callout]")),
      indicatorDots: Array.from(container.querySelectorAll("[data-sc-dot]")),
      connectorLines: Array.from(container.querySelectorAll("[data-sc-line]")),
      ratings: container.querySelector("[data-sc-ratings]"),
      ratingBars: Array.from(container.querySelectorAll("[data-sc-rating-bar]")),
      ratingValues: Array.from(container.querySelectorAll("[data-sc-rating-value]")),
      cta: container.querySelector("[data-sc-cta]"),
    };

    if (reduced) {
      gsap.set(
        [
          els.headline,
          els.bootImage,
          ...els.calloutPanels,
          els.ratings,
          els.cta,
        ].filter(Boolean),
        { opacity: 1 }
      );
      els.ratingBars.forEach((bar) => gsap.set(bar, { opacity: 1 }));
      els.ratingValues.forEach((val) => gsap.set(val, { opacity: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: easing.premium },
        });

        tl.fromTo(
          els.headline,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: duration.normal }
        );

        tl.fromTo(
          els.bootImage,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: duration.cinematic, ease: easing.dramatic },
          "-=0.2"
        );

        if (els.bootFloat) {
          tl.to(els.bootFloat, {
            y: -10,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          }, "+=0.2");
        }

        els.calloutPanels.forEach((panel, i) => {
          const dot = els.indicatorDots[i];
          const line = els.connectorLines[i];

          tl.call(() => {
            gsap.set(panel, { display: "flex" });
          });

          tl.fromTo(
            panel,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: duration.normal },
            "+=0.4"
          );

          if (dot) {
            tl.fromTo(
              dot,
              { opacity: 0, scale: 0 },
              { opacity: 1, scale: 1, duration: duration.fast, ease: easing.spring },
              "-=0.25"
            );
          }

          if (line) {
            tl.fromTo(
              line,
              { opacity: 0 },
              { opacity: 1, duration: duration.normal, ease: easing.standard },
              "-=0.2"
            );
          }

          if (i > 0) {
            const prev = els.calloutPanels[i - 1];
            tl.to(prev, { opacity: 0, x: -20, duration: duration.fast }, "+=0.8");
            tl.call(() => {
              gsap.set(prev, { display: "none" });
            });
          }

          if (dot) {
            tl.to(dot, { opacity: 0.3, duration: duration.fast }, "+=0.8");
          }
        });

        if (els.ratings) {
          tl.call(() => {
            gsap.set(els.ratings, { display: "block" });
          });
          tl.fromTo(
            els.ratings,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: duration.normal },
            "+=0.4"
          );

          els.ratingBars.forEach((bar) => {
            tl.fromTo(
              bar,
              { opacity: 0 },
              { opacity: 1, duration: duration.normal, ease: easing.standard },
              "-=0.5"
            );
          });

          tl.fromTo(
            els.ratingValues,
            { opacity: 0 },
            { opacity: 1, duration: duration.fast, stagger: 0.05 },
            "-=0.3"
          );
        }

        if (els.cta) {
          tl.fromTo(
            els.cta,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: duration.normal },
            "+=0.2"
          );
        }

        if (els.bootImage) {
          tl.to(els.bootImage, { opacity: 0, scale: 0.95, duration: duration.normal }, "+=1");
        }
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(els.bootImage, { opacity: 1, scale: 1 });
        gsap.set(els.headline, { opacity: 1, y: 0 });

        els.calloutPanels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: duration.normal,
              ease: easing.premium,
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                once: true,
              },
            }
          );
        });

        if (els.ratings) {
          gsap.set(els.ratings, { opacity: 1, y: 0 });
          els.ratingBars.forEach((bar) => {
            gsap.fromTo(
              bar,
              { opacity: 0 },
              {
                opacity: 1,
                duration: duration.normal,
                ease: easing.standard,
                scrollTrigger: {
                  trigger: els.ratings,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          });
          gsap.set(els.ratingValues, { opacity: 1 });
        }

        gsap.set(els.cta, { opacity: 1, y: 0 });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

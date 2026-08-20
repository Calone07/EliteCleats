"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@/components/ui/Loader";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { duration, easing } from "@/motion/constants";
import { isReducedMotion } from "@/motion/utils";
import { ScrollSequence, type ScrollSequenceHandle } from "./ScrollSequence";
import { useImageSequence } from "./useImageSequence";
import {
  AUTOPLAY_DURATION,
  FRAME_COUNT,
  FRAME_SCROLL_DURATION,
  FALLBACK_IMAGE,
  STAGES,
} from "./sequenceConfig";

gsap.registerPlugin(ScrollTrigger);

const WORD_FADE_IN = 0.03;
const WORD_FADE_OUT = 0.03;
const STAGE_EXIT_SPAN = 0.08;

function renderHeading(heading: string, index: number) {
  const Tag = index === 0 ? "h1" : "h2";
  return (
    <Tag className="font-display text-5xl leading-[0.95] tracking-normal text-primary-text text-shadow-hero sm:text-7xl lg:text-8xl">
      {heading.split("\n").map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              data-cinematic-word
              className={`inline-block ${
                wordIndex < line.split(" ").length - 1 ? "mr-[0.28em]" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

export function CinematicHero() {
  const { status, getFrame, ensureFrame, getNearestFrame } = useImageSequence();
  const [loaderComplete, setLoaderComplete] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasHandle = useRef<ScrollSequenceHandle>(null);

  useEffect(() => {
    if (!loaderComplete || status === "loading") return;

    const section = sectionRef.current;
    if (!section) return;

    const reduced = isReducedMotion();
    const sequenceAvailable = status === "ready";

    const lastFrame = { value: 1 };
    let lastDrawn = 1;
    let userScrolled = false;
    const autoplayState = { progress: 0 };
    let autoplayTween: gsap.core.Tween | null = null;
    let scrollTrigger: ScrollTrigger | null = null;

    const progressToFrame = (progress: number) =>
      Math.min(
        FRAME_COUNT,
        Math.max(1, Math.round(1 + progress * (FRAME_COUNT - 1))),
      );

    const renderFrame = (frame: number, direction: number) => {
      const handle = canvasHandle.current;
      if (!handle) return;

      const exact = getFrame(frame);
      if (exact) {
        handle.draw(frame);
        lastDrawn = frame;
        return;
      }

      const nearest = getNearestFrame(frame);
      if (nearest !== null && nearest !== lastDrawn) {
        handle.draw(nearest);
        lastDrawn = nearest;
      }

      void ensureFrame(frame).then((source) => {
        if (source && lastFrame.value === frame) {
          handle.draw(frame);
          lastDrawn = frame;
        }
      });

      for (let offset = 1; offset <= 6; offset += 1) {
        const next = frame + direction * offset;
        if (next < 1 || next > FRAME_COUNT) break;
        if (!getFrame(next)) void ensureFrame(next);
      }
    };

    const stopAutoplay = () => {
      if (!autoplayTween) return;
      autoplayTween.kill();
      autoplayTween = null;
    };

    const startAutoplay = () => {
      if (!scrollTrigger || autoplayTween || userScrolled) return;
      const trigger = scrollTrigger;
      autoplayTween = gsap.to(autoplayState, {
        progress: 1,
        duration: AUTOPLAY_DURATION,
        ease: "power1.inOut",
        onUpdate: () => {
          const progress = autoplayState.progress;
          trigger.animation?.progress(progress);
          const frame = progressToFrame(progress);
          if (frame === lastFrame.value) return;
          const direction = frame > lastFrame.value ? 1 : -1;
          lastFrame.value = frame;
          renderFrame(frame, direction);
        },
      });
    };

    const onScrollStart = () => {
      userScrolled = true;
      if (!autoplayTween || !scrollTrigger) return;
      stopAutoplay();
      const progress = autoplayState.progress;
      scrollTrigger.animation?.progress(progress);
      scrollTrigger.scroll(
        scrollTrigger.start + progress * (scrollTrigger.end - scrollTrigger.start),
      );
    };

    const ctx = gsap.context(() => {
      const scrollHint = section.querySelector("[data-cinematic-scroll]");
      const progressBar = section.querySelector("[data-cinematic-progress]");

      const stageEls: Record<string, HTMLElement | null> = {};
      STAGES.forEach((stage) => {
        stageEls[stage.id] = section.querySelector(
          `[data-cinematic-stage="${stage.id}"]`,
        );
      });

      if (reduced) {
        gsap.set([stageEls.intro, stageEls.cta].filter(Boolean), {
          opacity: 1,
          y: 0,
        });
        gsap.set(stageEls.cta, { pointerEvents: "auto" });
        if (sequenceAvailable) {
          canvasHandle.current?.draw(1);
        }
        return;
      }

      const entrance = gsap.timeline({
        defaults: { ease: easing.premium },
      });

      const introWords = stageEls.intro?.querySelectorAll("[data-cinematic-word]") ?? [];
      const introDesc = stageEls.intro?.querySelector("[data-cinematic-description]") ?? null;
      const ctaWords = stageEls.cta?.querySelectorAll("[data-cinematic-word]") ?? [];
      const ctaButton = stageEls.cta?.querySelector("[data-cinematic-cta]") ?? null;

      gsap.set(stageEls.intro, { opacity: 1 });

      entrance.fromTo(
        introWords,
        { opacity: 0, y: 36, rotate: 6, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: { each: 0.07 },
          ease: easing.spring,
        },
        0.4,
      );

      if (introDesc) {
        entrance.fromTo(
          introDesc,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: duration.normal },
          1.1,
        );
      }

      if (!sequenceAvailable) {
        gsap.set(stageEls.cta, { opacity: 1 });
        entrance.fromTo(
          ctaWords,
          { opacity: 0, y: 32, rotate: 6, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: { each: 0.05 },
            ease: easing.spring,
          },
          1.2,
        );
        if (ctaButton) {
          entrance.fromTo(
            ctaButton,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: duration.normal,
              onStart: () => gsap.set(ctaButton, { pointerEvents: "auto" }),
            },
            1.4,
          );
        }
        return;
      }

      canvasHandle.current?.draw(1);

      entrance.fromTo(
        scrollHint,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: duration.normal },
        1,
      );

      const scroll = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${FRAME_SCROLL_DURATION}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (FRAME_COUNT - 1),
            duration: { min: 0.15, max: 0.35 },
            delay: 0.05,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const frame = progressToFrame(self.progress);
            if (frame === lastFrame.value) return;
            const direction = frame > lastFrame.value ? 1 : -1;
            lastFrame.value = frame;
            renderFrame(frame, direction);
          },
        },
      });
      scrollTrigger = scroll.scrollTrigger ?? null;

      entrance.eventCallback("onComplete", startAutoplay);

      STAGES.forEach((stage, index) => {
        const el = stageEls[stage.id];
        if (!el) return;

        const words = el.querySelectorAll("[data-cinematic-word]");
        const desc = el.querySelector("[data-cinematic-description]");
        const label = el.querySelector("[data-cinematic-label]");

        if (index === 0) {
          if (introDesc) {
            scroll.to(
              introDesc,
              { opacity: 0, y: -20, duration: WORD_FADE_OUT },
              stage.to - STAGE_EXIT_SPAN + 0.02,
            );
          }
          scroll.to(
            words,
            {
              opacity: 0,
              y: -36,
              rotate: -6,
              filter: "blur(6px)",
              duration: WORD_FADE_OUT,
              stagger: { each: 0.015 },
            },
            stage.to - STAGE_EXIT_SPAN,
          );
          return;
        }

        scroll.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: 0.01 },
          stage.from,
        );

        if (label) {
          scroll.fromTo(
            label,
            { opacity: 0, y: -12 },
            { opacity: 1, y: 0, duration: WORD_FADE_IN, ease: "power1.out" },
            stage.from,
          );
        }

        scroll.fromTo(
          words,
          { opacity: 0, y: 36, rotate: 6, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
            duration: WORD_FADE_IN,
            stagger: { each: 0.02 },
            ease: "power1.out",
          },
          stage.from,
        );

        if (desc) {
          scroll.fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.04, ease: "power1.out" },
            stage.from + 0.07,
          );
        }

        if (stage.cta) {
          if (!ctaButton) return;
          scroll.fromTo(
            ctaButton,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.04,
              ease: "power1.out",
              onStart: () => gsap.set(ctaButton, { pointerEvents: "auto" }),
              onReverseComplete: () => gsap.set(ctaButton, { pointerEvents: "none" }),
            },
            stage.from + 0.09,
          );
          return;
        }

        if (desc) {
          scroll.to(
            desc,
            { opacity: 0, y: -20, duration: WORD_FADE_OUT },
            stage.to - STAGE_EXIT_SPAN + 0.02,
          );
        }
        scroll.to(
          words,
          {
            opacity: 0,
            y: -36,
            rotate: -6,
            filter: "blur(6px)",
            duration: WORD_FADE_OUT,
            stagger: { each: 0.015 },
          },
          stage.to - STAGE_EXIT_SPAN,
        );
        scroll.to(
          el,
          { opacity: 0, duration: WORD_FADE_OUT },
          stage.to - STAGE_EXIT_SPAN + 0.03,
        );
      });

      scroll.to(progressBar, { scaleX: 1, duration: 1 }, 0);
    }, section);

    ScrollTrigger.addEventListener("scrollStart", onScrollStart);

    return () => {
      ScrollTrigger.removeEventListener("scrollStart", onScrollStart);
      autoplayTween?.kill();
      ctx.revert();
    };
  }, [loaderComplete, status, ensureFrame, getFrame, getNearestFrame]);

  return (
    <>
      {!loaderComplete && <Loader onComplete={() => setLoaderComplete(true)} />}

      <section
        ref={sectionRef}
        aria-label="Elite Cleats — Built for the moment"
        className="relative z-0 h-svh overflow-hidden -mt-[104px] sm:-mt-[120px] bg-secondary-bg"
      >
        <div className="absolute inset-0">
          {status === "unavailable" ? (
            <Image
              src={FALLBACK_IMAGE}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-70"
            />
          ) : (
            <ScrollSequence
              ref={canvasHandle}
              getFrame={getFrame}
              className="absolute inset-0 h-full w-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-bg/60 via-transparent to-primary-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.55)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
        </div>

        <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 text-center sm:px-6 lg:px-8">
          {STAGES.map((stage, index) => (
            <div
              key={stage.id}
              data-cinematic-stage={stage.id}
              aria-hidden={index > 0 && !stage.cta ? "true" : undefined}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
            >
              {stage.label && (
                <p
                  data-cinematic-label
                  className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent text-shadow-hero sm:text-sm"
                >
                  {stage.label}
                </p>
              )}

              {renderHeading(stage.heading, index)}

              {stage.description && (
                <p
                  data-cinematic-description
                  className="mt-5 max-w-md text-base leading-relaxed text-primary-text/85 text-shadow-hero sm:text-lg"
                >
                  {stage.description}
                </p>
              )}

              {stage.cta && (
                <Link
                  href="/shop"
                  data-cinematic-cta
                  className="mt-10 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-medium text-primary-bg transition-all duration-200 hover:bg-accent/90 sm:text-lg"
                >
                  Shop Elite Cleats
                </Link>
              )}
            </div>
          ))}
        </div>

        <div data-cinematic-scroll className="opacity-0">
          <ScrollIndicator />
        </div>

        <div
          data-cinematic-progress
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-20 h-0.5 w-full origin-left scale-x-0 bg-accent/80"
        />
      </section>
    </>
  );
}
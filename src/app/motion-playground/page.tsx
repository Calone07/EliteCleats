"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  useReveal,
  useFloating,
  useParallax,
  useScrollProgress,
  useStagger,
  useHeroAnimation,
  fadeIn,
  fadeUp,
  slideLeft,
  scaleIn,
  staggerReveal,
  duration,
  easing,
} from "@/motion";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-8 border-b border-border px-4 py-20">
      <h2 className="text-4xl font-bold tracking-tight text-primary-text">{title}</h2>
      {children}
    </section>
  );
}

function Card({ index }: { index: number }) {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-border bg-card-bg text-2xl font-bold text-accent transition-colors">
      {index}
    </div>
  );
}

function FadeDemo() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="flex h-32 w-64 items-center justify-center rounded-xl border border-accent/30 bg-accent/5 text-accent"
    >
      Fade In on Scroll
    </div>
  );
}

function StaggerDemo() {
  const ref = useStagger<HTMLDivElement>();
  return (
    <div ref={ref} className="flex gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} index={i} />
      ))}
    </div>
  );
}

function FloatingDemo() {
  const ref = useFloating<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="flex h-32 w-64 items-center justify-center rounded-xl border border-accent/30 bg-accent/5 text-accent"
    >
      Floating Object
    </div>
  );
}

function ParallaxDemo() {
  const ref = useParallax<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="flex h-32 w-64 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/5 text-blue-400"
    >
      Parallax (scroll slowly)
    </div>
  );
}

function ScrollProgressDemo() {
  const progress = useScrollProgress();
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-4 w-64 overflow-hidden rounded-full border border-border bg-card-bg">
        <div
          className="h-full rounded-full bg-accent transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="text-secondary-text">
        Page Scroll: {(progress * 100).toFixed(0)}%
      </p>
    </div>
  );
}

function PresetDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);
  const boxRef3 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!boxRef.current || !boxRef2.current || !boxRef3.current) return;
    fadeIn(boxRef.current, { duration: duration.normal });
    slideLeft(boxRef2.current, { duration: duration.slow });
    scaleIn(boxRef3.current, { duration: duration.cinematic, ease: easing.dramatic });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {[boxRef, boxRef2, boxRef3].map((ref, i) => (
        <div
          key={i}
          ref={ref}
          className="flex h-32 w-48 items-center justify-center rounded-xl border border-border bg-card-bg text-secondary-text"
        >
          Preset {i + 1}
        </div>
      ))}
    </div>
  );
}

function HeroTimelineDemo() {
  const ref = useHeroAnimation();
  return (
    <div ref={ref} className="flex flex-col items-center gap-6 text-center">
      <p data-hero-label className="text-sm uppercase tracking-[0.25em] text-accent">
        Elite Performance
      </p>
      <h1
        data-hero-headline
        className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
      >
        Hero <span className="text-accent">Timeline</span>
      </h1>
      <p data-hero-subtitle className="max-w-md text-secondary-text">
        Staggered entrance animation using useHeroAnimation hook.
      </p>
      <div data-hero-cta className="rounded-lg bg-accent px-6 py-3 font-medium text-primary-bg">
        Call to Action
      </div>
      <div
        data-hero-image
        className="mt-4 h-48 w-48 rounded-2xl border border-border bg-gradient-to-br from-accent/10 to-card-bg"
      />
    </div>
  );
}

function ReducedMotionNotice() {
  return (
    <div className="fixed right-4 top-32 z-50 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
      {typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "Reduced motion enabled"
        : "Full motion"}
    </div>
  );
}

export default function MotionPlaygroundPage() {
  return (
    <div className="relative">
      <ReducedMotionNotice />

      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-6xl font-bold tracking-tight sm:text-7xl">
          Motion <span className="text-accent">Playground</span>
        </h1>
        <p className="max-w-lg text-secondary-text">
          Testing environment for the ELITE CLEATS Motion Design System.
          Scroll down to see each animation preset and hook in action.
        </p>
      </section>

      <Section title="Fade Reveal">
        <FadeDemo />
      </Section>

      <Section title="Stagger">
        <StaggerDemo />
      </Section>

      <Section title="Floating">
        <FloatingDemo />
      </Section>

      <Section title="Parallax">
        <ParallaxDemo />
      </Section>

      <Section title="Scroll Progress">
        <ScrollProgressDemo />
      </Section>

      <Section title="GSAP Presets">
        <PresetDemo />
      </Section>

      <Section title="Hero Timeline">
        <HeroTimelineDemo />
      </Section>

      <Section title="Pinned Section">
        <div className="flex h-96 w-full max-w-lg items-center justify-center rounded-xl border border-border bg-card-bg">
          <p className="text-secondary-text">Pinning demo area (scroll down)</p>
        </div>
      </Section>
    </div>
  );
}

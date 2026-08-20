# ELITE CLEATS — Motion System

**Version:** 0.1.0
**Status:** Sprint 3A — Motion Foundation

---

## Architecture

The Motion System is a reusable animation framework built with GSAP and Lenis.

All animation code lives in `src/motion/` — never inside page components.

### Folder Structure

```
src/motion/
├── animations/         # Complex multi-step animations (future)
├── constants/          # Shared tokens: duration, easing, stagger
├── hooks/              # Reusable React hooks for common patterns
├── presets/            # Generic GSAP timeline factories
├── providers/          # MotionProvider (Lenis + GSAP init)
├── timeline/           # Orchestrated timelines (future)
├── utils/              # Scroll, viewport, accessibility helpers
└── index.ts            # Barrel exports
```

### How It Works

1. **MotionProvider** wraps the app — initializes Lenis (smooth scrolling) and GSAP ScrollTrigger
2. **Hooks** are called inside components — they abstract GSAP implementation details
3. **Presets** are factory functions that return GSAP timelines
4. **Constants** ensure consistent duration, easing, and stagger values

---

## MotionProvider

Initialized in `src/app/layout.tsx`.

Responsibilities:
- Create a single Lenis instance
- Register ScrollTrigger with GSAP
- Sync Lenis scroll with ScrollTrigger updates
- Handle cleanup on unmount
- Prevent duplicate initialization

---

## Motion Tokens (Constants)

All durations, easings, and staggers are defined in `src/motion/constants/index.ts`.

### Durations

| Token      | Value (seconds) |
|------------|-----------------|
| fast       | 0.3             |
| normal     | 0.6             |
| slow       | 0.9             |
| cinematic  | 1.5             |

### Easings

| Token     | GSAP Easing           |
|-----------|-----------------------|
| standard  | power2.out            |
| premium   | expo.out              |
| dramatic  | power3.inOut          |
| spring    | back.out(1.7)         |
| smooth    | sine.out              |

### Stagger

| Token   | Value (seconds) |
|---------|-----------------|
| tight   | 0.05            |
| normal  | 0.10            |
| relaxed | 0.15            |

---

## Animation Presets

Located in `src/motion/presets/presets.ts`. These are factory functions that return GSAP tweens/timelines.

| Function        | Description                     |
|-----------------|---------------------------------|
| fadeIn          | Opacity 0 → 1                   |
| fadeUp          | Opacity 0 + y → 1 + y 0        |
| fadeDown        | Opacity 0 - y → 1 + y 0        |
| slideLeft       | Opacity 0 + x → 1 + x 0        |
| slideRight      | Opacity 0 - x → 1 + x 0        |
| scaleIn         | Opacity 0 + scale → 1 + scale 1 |
| float           | Infinite yoyo y offset          |
| parallax        | Y movement tied to scroll       |
| staggerReveal   | Staggered children fade-up      |
| rotateReveal    | Opacity 0 + rotation → 1        |

All presets accept a configuration object overriding duration, ease, delay, and transform values.

---

## Hooks

Located in `src/motion/hooks/`.

### useReveal

Scroll-triggered fade-in when element enters viewport.

```tsx
function MyComponent() {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref}>Reveal on scroll</div>;
}
```

### useFloating

Continuous gentle floating animation.

```tsx
function MyComponent() {
  const ref = useFloating<HTMLDivElement>({ y: -12, duration: 3 });
  return <div ref={ref}>Floats forever</div>;
}
```

### useParallax

Element moves at different speed than scroll.

```tsx
function MyComponent() {
  const ref = useParallax<HTMLDivElement>({ y: "30%" });
  return <div ref={ref}>Parallax effect</div>;
}
```

### useScrollProgress

Returns a 0–1 value of page scroll progress.

```tsx
function MyComponent() {
  const progress = useScrollProgress();
  return <div>{Math.round(progress * 100)}%</div>;
}
```

### useStagger

Staggers direct children into view on scroll.

```tsx
function MyComponent() {
  const ref = useStagger<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
  );
}
```

### useHeroAnimation

Orchestrates a staggered hero entrance using `data-hero-*` attributes.

```tsx
function MyComponent() {
  const ref = useHeroAnimation();
  return (
    <div ref={ref}>
      <p data-hero-label>Label</p>
      <h1 data-hero-headline>Headline</h1>
      <p data-hero-subtitle>Subtitle</p>
      <div data-hero-cta>CTA</div>
      <div data-hero-image>Image</div>
    </div>
  );
}
```

---

## Scroll Utilities

Located in `src/motion/utils/`.

| Function              | Description                        |
|-----------------------|------------------------------------|
| createSectionTrigger  | Scroll-triggered fade-up           |
| createPinnedSection   | Pins element during scroll         |
| createScrollProgress  | Scrubbed animation tied to scroll  |
| createScrubTrigger    | Continuous scrub animation         |
| isInViewport          | Checks if element is in viewport   |
| observeElements       | IntersectionObserver wrapper       |
| isReducedMotion       | Checks prefers-reduced-motion      |

---

## Accessibility

All hooks respect `prefers-reduced-motion`:
- If enabled, animations are skipped and elements are set to their final visible state
- No critical content is hidden when motion is disabled

---

## Performance Guidelines

- Animate only `transform` and `opacity`
- Never animate `width` or `height`
- Use `will-change: transform` sparingly
- Always clean up timelines via `gsap.context()` or `ctx.revert()`
- Destroy ScrollTriggers when components unmount

---

## How to Animate a New Component

1. Decide which hook or preset fits the animation pattern
2. Call the hook in your component
3. Use `data-*` attributes if using hero timeline
4. Never write inline GSAP code in the component

### Example

```tsx
"use client";

import { useReveal } from "@/motion";

export function MySection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref}>
      <h2>This fades up on scroll</h2>
    </section>
  );
}
```

---

## Testing

Visit `/motion-playground` during development to verify all presets and hooks work correctly.

---

## Future Sprint (3B — Animation)

Sprint 3B will apply the Motion System to homepage sections:
- Hero entrance timeline
- Scroll-triggered reveals for BrandStrip, FeaturedBoots, WhyChooseUs, etc.
- Staggered product card entries
- Parallax backgrounds

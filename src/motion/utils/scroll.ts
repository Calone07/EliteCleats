import gsap from "gsap";

interface ScrollTriggerConfig {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function createSectionTrigger(
  target: gsap.TweenTarget,
  config: ScrollTriggerConfig = {}
) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "expo.out",
      scrollTrigger: {
        trigger: config.trigger ?? (target as HTMLElement),
        start: config.start ?? "top 85%",
        end: config.end ?? "top 40%",
        toggleActions: config.toggleActions ?? "play none none reverse",
        ...(config.markers ? { markers: true } : {}),
      },
    }
  );
}

export function createPinnedSection(
  target: gsap.TweenTarget,
  config: ScrollTriggerConfig = {}
) {
  return gsap.to(target, {
    scrollTrigger: {
      trigger: config.trigger ?? (target as HTMLElement),
      start: config.start ?? "top top",
      end: config.end ?? "bottom top",
      pin: true,
      scrub: config.scrub ?? true,
      ...(config.markers ? { markers: true } : {}),
    },
  });
}

export function createScrollProgress(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
  config: ScrollTriggerConfig = {}
) {
  return gsap.fromTo(
    target,
    { ...vars, scale: 0.9, opacity: 0 },
    {
      ...vars,
      scale: 1,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: config.trigger ?? (target as HTMLElement),
        start: config.start ?? "top bottom",
        end: config.end ?? "bottom top",
        scrub: config.scrub ?? true,
        ...(config.markers ? { markers: true } : {}),
      },
    }
  );
}

export function createScrubTrigger(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
  config: ScrollTriggerConfig = {}
) {
  return gsap.to(target, {
    ...vars,
    ease: "none",
    scrollTrigger: {
      trigger: config.trigger ?? (target as HTMLElement),
      start: config.start ?? "top bottom",
      end: config.end ?? "bottom top",
      scrub: config.scrub ?? true,
      ...(config.markers ? { markers: true } : {}),
    },
  });
}

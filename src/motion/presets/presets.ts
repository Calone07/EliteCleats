import gsap from "gsap";
import { duration, easing } from "@/motion/constants";

interface PresetConfig {
  duration?: number;
  ease?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotation?: number;
}

export function fadeIn(target: gsap.TweenTarget, config: PresetConfig = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0 },
    {
      opacity: 1,
      duration: config.duration ?? duration.normal,
      ease: config.ease ?? easing.standard,
      delay: config.delay ?? 0,
    }
  );
}

export function fadeUp(target: gsap.TweenTarget, config: PresetConfig = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: config.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: config.duration ?? duration.normal,
      ease: config.ease ?? easing.premium,
      delay: config.delay ?? 0,
    }
  );
}

export function fadeDown(target: gsap.TweenTarget, config: PresetConfig = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: config.y ?? -40 },
    {
      opacity: 1,
      y: 0,
      duration: config.duration ?? duration.normal,
      ease: config.ease ?? easing.premium,
      delay: config.delay ?? 0,
    }
  );
}

export function slideLeft(target: gsap.TweenTarget, config: PresetConfig = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, x: config.x ?? 60 },
    {
      opacity: 1,
      x: 0,
      duration: config.duration ?? duration.normal,
      ease: config.ease ?? easing.premium,
      delay: config.delay ?? 0,
    }
  );
}

export function slideRight(target: gsap.TweenTarget, config: PresetConfig = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, x: config.x ?? -60 },
    {
      opacity: 1,
      x: 0,
      duration: config.duration ?? duration.normal,
      ease: config.ease ?? easing.premium,
      delay: config.delay ?? 0,
    }
  );
}

export function scaleIn(target: gsap.TweenTarget, config: PresetConfig = {}) {
  return gsap.fromTo(
    target,
    { opacity: 0, scale: config.scale ?? 0.85 },
    {
      opacity: 1,
      scale: 1,
      duration: config.duration ?? duration.normal,
      ease: config.ease ?? easing.dramatic,
      delay: config.delay ?? 0,
    }
  );
}

export function float(target: gsap.TweenTarget, config: PresetConfig = {}) {
  return gsap.to(target, {
    y: config.y ?? -12,
    duration: config.duration ?? 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: config.delay ?? 0,
  });
}

export function parallax(
  target: gsap.TweenTarget,
  config: PresetConfig = {}
) {
  return gsap.to(target, {
    y: config.y ?? "30%",
    ease: "none",
    scrollTrigger: {
      trigger: target as HTMLElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function staggerReveal(
  targets: gsap.TweenTarget,
  config: PresetConfig & { staggerAmount?: number } = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: config.y ?? 30 },
    {
      opacity: 1,
      y: 0,
      duration: config.duration ?? 0.5,
      ease: config.ease ?? easing.premium,
      stagger: config.staggerAmount ?? 0.08,
      delay: config.delay ?? 0,
    }
  );
}

export function rotateReveal(
  target: gsap.TweenTarget,
  config: PresetConfig = {}
) {
  return gsap.fromTo(
    target,
    { opacity: 0, rotation: config.rotation ?? -15, scale: config.scale ?? 0.9 },
    {
      opacity: 1,
      rotation: 0,
      scale: 1,
      duration: config.duration ?? duration.slow,
      ease: config.ease ?? easing.dramatic,
      delay: config.delay ?? 0,
    }
  );
}

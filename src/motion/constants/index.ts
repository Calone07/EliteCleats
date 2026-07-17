export const duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  cinematic: 1.5,
} as const;

export const easing = {
  standard: "power2.out",
  premium: "expo.out",
  dramatic: "power3.inOut",
  spring: "back.out(1.7)",
  smooth: "sine.out",
} as const;

export const stagger = {
  tight: 0.05,
  normal: 0.1,
  relaxed: 0.15,
} as const;

export const viewport = {
  once: true,
  margin: "-100px",
} as const;

export const parallax = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;

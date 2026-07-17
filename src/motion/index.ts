export { MotionProvider } from "./providers";

export {
  useReveal,
  useFloating,
  useParallax,
  useScrollProgress,
  useStagger,
  useHeroAnimation,
  useShowcaseAnimation,
} from "./hooks";

export {
  fadeIn,
  fadeUp,
  fadeDown,
  slideLeft,
  slideRight,
  scaleIn,
  float,
  parallax as parallaxPreset,
  staggerReveal,
  rotateReveal,
} from "./presets";

export {
  duration,
  easing,
  stagger,
  viewport,
} from "./constants";

export {
  isReducedMotion,
  prefersReducedMotion,
  createSectionTrigger,
  createPinnedSection,
  createScrollProgress,
  createScrubTrigger,
  isInViewport,
  observeElements,
} from "./utils";

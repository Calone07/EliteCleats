export const FRAME_COUNT = 240;

export const FRAME_SCROLL_DURATION = 7000;

export const AUTOPLAY_DURATION = 10;

export const FRAME_BASE_URL = "/sequence";

export const FALLBACK_IMAGE = "/images/collections/nike-mercurial.webp";

export function framePath(index: number): string {
  const clamped = Math.min(Math.max(1, Math.round(index)), FRAME_COUNT);
  return `${FRAME_BASE_URL}/frame-${String(clamped).padStart(4, "0")}.webp`;
}

export interface CinematicStage {
  id: string;
  label?: string;
  heading: string;
  description?: string;
  from: number;
  to: number;
  cta?: boolean;
}

export const STAGES: CinematicStage[] = [
  {
    id: "intro",
    heading: "BUILT FOR\nTHE MOMENT.",
    description:
      "Engineered for speed, control and absolute confidence on the pitch.",
    from: 0,
    to: 0.2,
  },
  {
    id: "speed",
    label: "Speed",
    heading: "SPEED WITHOUT\nCOMPROMISE.",
    description: "Explosive acceleration, tuned for the sharpest moments.",
    from: 0.2,
    to: 0.4,
  },
  {
    id: "control",
    label: "Control",
    heading: "CONTROL EVERY\nMOVE.",
    description: "A second-skin fit that answers before you think.",
    from: 0.4,
    to: 0.6,
  },
  {
    id: "precision",
    label: "Precision",
    heading: "ENGINEERED FOR\nPRECISION.",
    description: "Every curve, seam and plate placed with intent.",
    from: 0.6,
    to: 0.8,
  },
  {
    id: "cta",
    heading: "FIND YOUR\nEDGE.",
    description: "The moment is yours. Step into it.",
    from: 0.8,
    to: 1,
    cta: true,
  },
];
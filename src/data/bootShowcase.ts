export interface ShowcaseFeature {
  id: string;
  title: string;
  description: string;
  /** Approximate area of the boot this feature relates to */
  area: "forefoot" | "midfoot" | "heel" | "upper" | "sole";
  /** CSS top offset (0-100) for the indicator dot on the boot image container */
  indicatorY: number;
  /** CSS left offset (0-100) for the indicator dot */
  indicatorX: number;
}

export interface PerformanceMetric {
  label: string;
  value: number;
}

export const showcaseBoot = {
  name: "Nike Mercurial Vapor 17 Elite",
  tagline: "Engineered For Explosive Speed",
  image: "/images/boots/nike/kevinfooty_-hero.webp",
  alt: "Nike Mercurial Vapor 17 Elite — flagship speed boot",
};

export const showcaseFeatures: ShowcaseFeature[] = [
  {
    id: "air-zoom",
    title: "Air Zoom Unit",
    description:
      "A responsive Nike Air Zoom unit in the forefoot delivers spring-like energy return with every step, propelling you forward with explosive acceleration.",
    area: "forefoot",
    indicatorY: 55,
    indicatorX: 52,
  },
  {
    id: "gripknit",
    title: "Gripknit Upper",
    description:
      "An advanced adhesive textile that provides unparalleled grip in wet and dry conditions. The material adapts to your foot shape for a true second-skin feel.",
    area: "upper",
    indicatorY: 35,
    indicatorX: 48,
  },
  {
    id: "flyknit",
    title: "Flyknit Collar",
    description:
      "Engineered knit technology delivers lightweight structure and breathability at the ankle. Strategically placed zones offer support where you need it most.",
    area: "heel",
    indicatorY: 25,
    indicatorX: 55,
  },
  {
    id: "carbon-plate",
    title: "Carbon Fibre Plate",
    description:
      "A full-length carbon fibre plate maximises energy return with every stride. The stiff, lightweight construction propels you forward with explosive acceleration.",
    area: "sole",
    indicatorY: 75,
    indicatorX: 50,
  },
];

export const performanceMetrics: PerformanceMetric[] = [
  { label: "Speed", value: 9.4 },
  { label: "Control", value: 8.7 },
  { label: "Comfort", value: 8.9 },
  { label: "Touch", value: 9.1 },
  { label: "Weight", value: 9.3 },
  { label: "Transition", value: 8.5 },
];

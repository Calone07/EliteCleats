import type { Surface } from "@/types";

export const surfaces: Surface[] = [
  {
    id: "fg",
    title: "Firm Ground",
    label: "FG",
    description: "Optimised for natural grass pitches with short, dry grass. The most popular stud configuration for professional play.",
    icon: "zap",
  },
  {
    id: "ag",
    title: "Artificial Ground",
    label: "AG",
    description: "Engineered for modern artificial turf surfaces. Multi-directional studs provide grip without excessive penetration.",
    icon: "grid",
  },
  {
    id: "sg",
    title: "Soft Ground",
    label: "SG",
    description: "Designed for wet, muddy conditions. Removable metal studs deliver maximum traction in soft natural grass.",
    icon: "layers",
  },
  {
    id: "tf",
    title: "Turf",
    label: "TF",
    description: "Built for hard artificial pitches and training grounds. Dense rubber studs provide comfort and reliable grip.",
    icon: "compass",
  },
  {
    id: "ic",
    title: "Indoor",
    label: "IC",
    description: "Non-marking rubber outsoles for indoor courts and hard flat surfaces. Optimal touch and traction on wood or concrete.",
    icon: "wind",
  },
];

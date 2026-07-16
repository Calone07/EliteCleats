import type { LucideIcon } from "lucide-react";
import {
  Zap,
  Diamond,
  Cog,
  Layers,
  Grid,
  Wind,
  Shirt,
  Hexagon,
  Trophy,
  Star,
  Compass,
  Shield,
  Truck,
  MessageCircle,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  diamond: Diamond,
  cog: Cog,
  layers: Layers,
  grid: Grid,
  wind: Wind,
  shirt: Shirt,
  hexagon: Hexagon,
  trophy: Trophy,
  star: Star,
  compass: Compass,
  shield: Shield,
  truck: Truck,
  "message-circle": MessageCircle,
};

interface IconProps {
  name: string;
  className?: string;
  "aria-hidden"?: boolean;
}

export function Icon({ name, className, "aria-hidden": ariaHidden }: IconProps) {
  const LucideIcon = iconMap[name];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon className={className} aria-hidden={ariaHidden ?? true} />;
}

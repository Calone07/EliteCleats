export function getStarType(value: number, index: number): "full" | "half" | "empty" {
  if (value >= index + 1) return "full";
  if (value >= index + 0.5) return "half";
  return "empty";
}

export function formatRating(value: number, max = 5): string {
  return `${value} out of ${max} stars`;
}

export function getRatingPercentage(value: number, max = 5): number {
  return (value / max) * 100;
}

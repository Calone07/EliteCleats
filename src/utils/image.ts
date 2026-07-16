export function getImageUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/${path}`;
}

export function getImageSizes(breakpoints: Record<string, number>): string {
  return Object.entries(breakpoints)
    .map(([bp, size]) => `${bp === "default" ? "" : `${bp}:` }${size}vw`)
    .join(", ");
}

export function getPlaceholderGradient(index: number): string {
  const gradients = [
    "from-red-900/40 via-red-950/20 to-transparent",
    "from-blue-900/40 via-blue-950/20 to-transparent",
    "from-emerald-900/40 via-emerald-950/20 to-transparent",
    "from-amber-900/40 via-amber-950/20 to-transparent",
    "from-violet-900/40 via-violet-950/20 to-transparent",
    "from-orange-900/40 via-orange-950/20 to-transparent",
    "from-teal-900/40 via-teal-950/20 to-transparent",
    "from-rose-900/40 via-rose-950/20 to-transparent",
  ];
  return gradients[index % gradients.length];
}

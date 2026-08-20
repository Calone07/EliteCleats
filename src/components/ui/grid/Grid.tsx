import { cn } from "@/lib/utils";

type ResponsiveCols = {
  default?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

const colClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const responsiveColClasses: Record<string, string> = {
  "default-1": "grid-cols-1",
  "default-2": "grid-cols-2",
  "default-3": "grid-cols-3",
  "default-4": "grid-cols-4",
  "sm-1": "sm:grid-cols-1",
  "sm-2": "sm:grid-cols-2",
  "sm-3": "sm:grid-cols-3",
  "sm-4": "sm:grid-cols-4",
  "md-1": "md:grid-cols-1",
  "md-2": "md:grid-cols-2",
  "md-3": "md:grid-cols-3",
  "md-4": "md:grid-cols-4",
  "lg-1": "lg:grid-cols-1",
  "lg-2": "lg:grid-cols-2",
  "lg-3": "lg:grid-cols-3",
  "lg-4": "lg:grid-cols-4",
  "xl-1": "xl:grid-cols-1",
  "xl-2": "xl:grid-cols-2",
  "xl-3": "xl:grid-cols-3",
  "xl-4": "xl:grid-cols-4",
};

const gapClasses: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
};

interface GridProps {
  children: React.ReactNode;
  /** Column count or responsive object. */
  cols?: number | ResponsiveCols;
  /** Gap between grid items (Tailwind gap scale). */
  gap?: number;
  className?: string;
}

const breakpointKeys: (keyof ResponsiveCols)[] = ["default", "sm", "md", "lg", "xl"];

function colsToClasses(cols: number | ResponsiveCols | undefined): string {
  if (typeof cols === "number") {
    return colClasses[cols] ?? "";
  }

  const parts: string[] = [];

  if (cols) {
    for (const key of breakpointKeys) {
      const val = cols[key];
      if (val) {
        const full = responsiveColClasses[`${key}-${val}`];
        if (full) parts.push(full);
      }
    }
  }

  return parts.join(" ");
}

/**
 * Responsive CSS Grid layout with configurable columns and gap.
 *
 * @example
 * <Grid cols={{ default: 1, sm: 2, lg: 4 }} gap={6}>
 *   <ProductCard ... />
 * </Grid>
 *
 * <Grid cols={3} gap={4}>
 *   <BrandCard ... />
 * </Grid>
 */
export function Grid({ children, cols, gap = 6, className }: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        colsToClasses(cols) || "grid-cols-1",
        gapClasses[gap] ?? `gap-${gap}`,
        className,
      )}
    >
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "circular" | "rectangular";

interface SkeletonProps {
  /** Shape variant. */
  variant?: SkeletonVariant;
  /** CSS width (e.g. "100%", "200px", 64). */
  width?: string | number;
  /** CSS height (e.g. "1em", "200px", 64). */
  height?: string | number;
  /** Number of skeleton lines to render (text variant only). */
  count?: number;
  className?: string;
}

function toCssValue(val?: string | number): string | undefined {
  if (val === undefined) return undefined;
  return typeof val === "number" ? `${val}px` : val;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded",
  circular: "rounded-full",
  rectangular: "rounded-xl",
};

/**
 * Loading placeholder that signals content is being fetched.
 *
 * @example
 * <Skeleton variant="text" count={3} />
 * <Skeleton variant="circular" width={48} height={48} />
 * <Skeleton variant="rectangular" width="100%" height={200} />
 */
export function Skeleton({
  variant = "text",
  width,
  height,
  count = 1,
  className,
}: SkeletonProps) {
  const style: React.CSSProperties = {};
  const cssWidth = toCssValue(width);
  const cssHeight = toCssValue(height);
  if (cssWidth) style.width = cssWidth;
  if (cssHeight) style.height = cssHeight;

  const items = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={cn(
        "animate-pulse bg-card-bg",
        variantStyles[variant],
        className,
      )}
      style={style}
      aria-hidden="true"
    />
  ));

  if (count > 1 && variant === "text") {
    return (
      <div className="flex flex-col gap-2" aria-hidden="true">
        {items}
      </div>
    );
  }

  return <>{items}</>;
}

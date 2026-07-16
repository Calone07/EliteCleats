import { cn } from "@/lib/utils";

type RatingSize = "sm" | "md" | "lg";

interface RatingProps {
  /** Current rating value. */
  value: number;
  /** Maximum rating value. Defaults to 5. */
  max?: number;
  /** Whether to show the numeric value alongside stars. */
  showValue?: boolean;
  /** Size preset. */
  size?: RatingSize;
  className?: string;
}

const starSizeStyles: Record<RatingSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

const valueSizeStyles: Record<RatingSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

/**
 * Star rating display with optional numeric value.
 *
 * @example
 * <Rating value={4.8} />
 * <Rating value={3} max={5} showValue={false} size="lg" />
 */
export function Rating({
  value,
  max = 5,
  showValue = true,
  size = "md",
  className,
}: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = value >= i + 1;
    const half = !filled && value >= i + 0.5;
    return { filled, half };
  });

  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      role="img"
      aria-label={`${value} out of ${max} stars`}
    >
      <span className={cn("flex items-center gap-0.5", starSizeStyles[size])}>
        {stars.map((star, i) => {
          if (star.filled) {
            return (
              <span key={i} className="text-accent" aria-hidden="true">
                ★
              </span>
            );
          }
          if (star.half) {
            return (
              <span key={i} className="relative text-accent/30" aria-hidden="true">
                ★
                <span className="absolute inset-0 overflow-hidden w-[50%] text-accent">
                  ★
                </span>
              </span>
            );
          }
          return (
            <span key={i} className="text-accent/30" aria-hidden="true">
              ★
            </span>
          );
        })}
      </span>
      {showValue && (
        <span className={cn("text-secondary-text font-medium", valueSizeStyles[size])}>
          {value}
        </span>
      )}
    </span>
  );
}

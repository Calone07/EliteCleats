import { cn } from "@/lib/utils";

type PriceSize = "sm" | "md" | "lg";

interface PriceProps {
  /** Numeric price value. */
  amount: number;
  /** Currency symbol. */
  currency?: string;
  /** Size preset. */
  size?: PriceSize;
  /** Whether to show a strikethrough (e.g. for sale comparison). */
  strikethrough?: boolean;
  className?: string;
}

const sizeStyles: Record<PriceSize, string> = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

/**
 * Formatted price display with currency symbol.
 *
 * Always outputs a visible label and `aria-label` for screen readers.
 *
 * @example
 * <Price amount={275} />
 * <Price amount={199} size="lg" />
 * <Price amount={320} strikethrough className="text-secondary-text" />
 */
export function Price({
  amount,
  currency = "$",
  size = "md",
  strikethrough,
  className,
}: PriceProps) {
  const formatted = `${currency}${amount}`;

  return (
    <span
      className={cn(
        "font-bold text-primary-text",
        sizeStyles[size],
        strikethrough && "line-through text-secondary-text font-medium",
        className,
      )}
      aria-label={`${formatted}`}
    >
      {formatted}
    </span>
  );
}

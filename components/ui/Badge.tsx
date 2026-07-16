import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "error";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  /** Color variant. */
  variant?: BadgeVariant;
  /** Size preset. */
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-card-bg text-secondary-text border border-border",
  accent: "bg-accent text-primary-bg",
  success: "bg-success/15 text-success",
  error: "bg-error/15 text-error",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
};

/**
 * Small label for statuses, categories, or highlights.
 *
 * @example
 * <Badge variant="accent">Best Seller</Badge>
 * <Badge variant="success">In Stock</Badge>
 * <Badge variant="error">Sold Out</Badge>
 */
export function Badge({
  children,
  variant = "accent",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

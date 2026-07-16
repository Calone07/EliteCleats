import { cn } from "@/lib/utils";

type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: React.ReactNode;
  /** Whether to show hover effects (scale, border glow, shadow). */
  hover?: boolean;
  /** Internal padding preset. */
  padding?: CardPadding;
  /** Semantic element. */
  as?: "div" | "article" | "section";
  className?: string;
}

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-4 sm:p-5",
  lg: "p-6 sm:p-8",
};

/**
 * Generic card container with consistent surface styling.
 *
 * @example
 * <Card hover padding="md">
 *   <Heading as="h3">Card Title</Heading>
 *   <Text>Card content.</Text>
 * </Card>
 *
 * <Card as="article">
 *   <ProductImage />
 * </Card>
 */
export function Card({
  children,
  hover = false,
  padding = "md",
  as: Tag = "div",
  className,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-xl border border-border bg-card-bg",
        hover &&
          "transition-all duration-300 hover:scale-[1.02] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
        paddingStyles[padding],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

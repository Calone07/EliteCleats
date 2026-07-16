import { cn } from "@/lib/utils";

type TextVariant = "body" | "caption" | "overline" | "small";
type TextColor = "primary" | "secondary" | "accent";
type TextWeight = "normal" | "medium" | "semibold" | "bold";

interface TextProps {
  /** Controls size and default styling. */
  variant?: TextVariant;
  /** Text color token. */
  color?: TextColor;
  /** Font weight override. */
  weight?: TextWeight;
  /** Semantic element to render. Defaults to p for body, span otherwise. */
  as?: "p" | "span" | "div";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<TextVariant, string> = {
  body: "text-base",
  caption: "text-sm",
  overline: "text-xs font-medium uppercase tracking-wider",
  small: "text-xs",
};

const colorStyles: Record<TextColor, string> = {
  primary: "text-primary-text",
  secondary: "text-secondary-text",
  accent: "text-accent",
};

const weightStyles: Record<TextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const defaultTag: Record<TextVariant, "p" | "span"> = {
  body: "p",
  caption: "p",
  overline: "span",
  small: "span",
};

/**
 * Renders styled text with variant, color, and weight options.
 *
 * @example
 * <Text variant="body">Regular paragraph text.</Text>
 * <Text variant="overline" color="accent">Premium Football Boots</Text>
 * <Text variant="caption" color="secondary">No spam. Unsubscribe anytime.</Text>
 */
export function Text({
  variant = "body",
  color = "primary",
  weight,
  as,
  children,
  className,
}: TextProps) {
  const Tag = as ?? defaultTag[variant];

  return (
    <Tag
      className={cn(
        variantStyles[variant],
        colorStyles[color],
        weight && weightStyles[weight],
        "leading-relaxed",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

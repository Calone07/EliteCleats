import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
  /** Semantic heading level (h1–h6). Controls both tag and default size. */
  as?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<HeadingLevel, string> = {
  h1: "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]",
  h2: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight",
  h3: "text-2xl sm:text-3xl font-semibold",
  h4: "text-xl sm:text-2xl font-semibold",
  h5: "text-lg sm:text-xl font-medium",
  h6: "text-base sm:text-lg font-medium",
};

/**
 * Renders a semantic heading tag (h1–h6) with responsive sizing.
 *
 * @example
 * <Heading as="h1">Play Beyond Limits.</Heading>
 * <Heading as="h2" className="text-accent">Featured Boots</Heading>
 */
export function Heading({ as: Tag = "h2", children, className }: HeadingProps) {
  return (
    <Tag className={cn(sizeStyles[Tag], "text-primary-text", className)}>
      {children}
    </Tag>
  );
}

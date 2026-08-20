import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/typography";
import { Text } from "@/components/ui/typography";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  /** Invert colors for use on dark/colored backgrounds. */
  light?: boolean;
}

/**
 * Section heading with optional subtitle. Typically used at the top of
 * homepage sections above a grid or card layout.
 *
 * @example
 * <SectionTitle
 *   title="Featured Brands"
 *   subtitle="The world's leading football boot manufacturers."
 * />
 *
 * <SectionTitle title="Speed Collection" light />
 */
export function SectionTitle({
  title,
  subtitle,
  className,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12 sm:mb-16", className)}>
      <Heading
        as="h2"
        className={light ? "text-primary-bg" : undefined}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          variant="body"
          color={light ? undefined : "secondary"}
          className={cn("mt-4 max-w-2xl", light && "text-primary-bg/70")}
        >
          {subtitle}
        </Text>
      )}
    </div>
  );
}

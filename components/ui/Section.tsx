import { cn } from "@/lib/utils";

type SectionBackground = "default" | "alt";

interface SectionProps {
  children: React.ReactNode;
  /** Visual background treatment. */
  background?: SectionBackground;
  /** Whether to wrap children in a container div. Defaults to true. */
  container?: boolean;
  /** Section id for anchor linking. */
  id?: string;
  className?: string;
}

const backgroundStyles: Record<SectionBackground, string> = {
  default: "bg-primary-bg",
  alt: "bg-secondary-bg",
};

/**
 * Standard page section with optional background and container.
 * Use `className` for vertical padding (e.g. `py-20 sm:py-28`).
 *
 * @example
 * <Section background="alt" className="py-20 sm:py-28">
 *   <Heading as="h2">Featured Boots</Heading>
 * </Section>
 *
 * <Section container={false} className="py-0">
 *   <div>Full-width content</div>
 * </Section>
 */
export function Section({
  children,
  background = "default",
  container = true,
  id,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn(backgroundStyles[background], className)}>
      {container ? (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

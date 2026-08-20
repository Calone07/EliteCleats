import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  /** Semantic element to render. Defaults to div. */
  as?: "div" | "section" | "article";
  className?: string;
}

/**
 * Max-width wrapper that centers content and applies responsive horizontal padding.
 *
 * @example
 * <Container>
 *   <Text>Centered content</Text>
 * </Container>
 *
 * <Container as="section" className="py-20">
 *   <Heading as="h2">Section Title</Heading>
 * </Container>
 */
export function Container({
  children,
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

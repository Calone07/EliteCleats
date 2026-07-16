import { cn } from "@/lib/utils";

const gapClasses: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
};

interface StackProps {
  children: React.ReactNode;
  /** Gap between stack items (Tailwind gap scale). */
  gap?: number;
  /** Semantic element. */
  as?: "div" | "section" | "article" | "aside";
  className?: string;
}

/**
 * Vertical flex layout with consistent spacing between children.
 *
 * @example
 * <Stack gap={4}>
 *   <Heading as="h2">Title</Heading>
 *   <Text>Description</Text>
 * </Stack>
 */
export function Stack({ children, gap = 4, as: Tag = "div", className }: StackProps) {
  return (
    <Tag className={cn("flex flex-col", gapClasses[gap] ?? `gap-${gap}`, className)}>
      {children}
    </Tag>
  );
}

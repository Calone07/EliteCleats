import { cn } from "@/lib/utils";

type FlexAlign = "start" | "center" | "end" | "stretch";
type FlexJustify = "start" | "center" | "end" | "between" | "around";
type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

interface FlexProps {
  children: React.ReactNode;
  /** Gap between flex items (Tailwind gap scale). */
  gap?: number;
  /** Cross-axis alignment. */
  align?: FlexAlign;
  /** Main-axis justification. */
  justify?: FlexJustify;
  /** Flex direction. Defaults to row. */
  direction?: FlexDirection;
  /** Whether items should wrap. */
  wrap?: boolean;
  className?: string;
}

const alignStyles: Record<FlexAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyStyles: Record<FlexJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

const directionStyles: Record<FlexDirection, string> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
};

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

/**
 * Flex layout for horizontal or vertical arrangements with alignment control.
 *
 * @example
 * <Flex gap={4} align="center" justify="between">
 *   <span>Item</span>
 *   <Button>Action</Button>
 * </Flex>
 */
export function Flex({
  children,
  gap,
  align,
  justify,
  direction = "row",
  wrap,
  className,
}: FlexProps) {
  return (
    <div
      className={cn(
        "flex",
        directionStyles[direction],
        align && alignStyles[align],
        justify && justifyStyles[justify],
        gap != null && (gapClasses[gap] ?? `gap-${gap}`),
        wrap && "flex-wrap",
        className,
      )}
    >
      {children}
    </div>
  );
}

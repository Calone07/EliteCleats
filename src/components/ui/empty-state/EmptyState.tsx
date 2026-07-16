import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /** Optional icon component instance. */
  icon?: React.ReactNode;
  /** Primary message. */
  title: string;
  /** Supporting description. */
  description?: string;
  /** Optional action element (e.g. a Button). */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Display when a list, search, or section has no content.
 *
 * Announces content via `role="status"` for screen readers.
 *
 * @example
 * <EmptyState
 *   icon={<Search className="h-12 w-12" />}
 *   title="No products found"
 *   description="Try adjusting your search or filter criteria."
 *   action={<Button variant="outline">Clear Filters</Button>}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center py-16 text-center", className)}
      role="status"
    >
      {icon && (
        <div className="mb-4 text-secondary-text">{icon}</div>
      )}
      <p className="text-lg font-semibold text-primary-text">{title}</p>
      {description && (
        <p className="mt-2 max-w-md text-sm text-secondary-text">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-6">{action}</div>
      )}
    </div>
  );
}

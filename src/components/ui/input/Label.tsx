import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

/**
 * Accessible label for form controls.
 *
 * @example
 * <Label htmlFor="email">Email</Label>
 */
export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label
      className={cn("mb-2 block text-sm font-medium text-secondary-text", className)}
      {...props}
    >
      {children}
    </label>
  );
}

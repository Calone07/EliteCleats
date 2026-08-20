import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Shows error styling when set. */
  invalid?: boolean;
}

const baseStyles =
  "w-full rounded-lg border bg-card-bg px-4 py-2.5 text-sm text-primary-text placeholder:text-secondary-text/60 transition-colors duration-200 focus:outline-none focus:ring-1";

/**
 * Styled text input. Pairs with `Label` for accessible forms.
 *
 * @example
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" placeholder="you@example.com" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          baseStyles,
          invalid
            ? "border-error/60 focus:border-error focus:ring-error/30"
            : "border-border focus:border-accent/50 focus:ring-accent/30",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

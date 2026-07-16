import { clsx } from "clsx";
import type { ClassValue } from "clsx";

/**
 * Merges class names using clsx.
 * Handles strings, arrays, objects, and falsy values.
 *
 * @example
 * cn("base", condition && "active", ["extra", "classes"])
 * // => "base active extra classes"
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

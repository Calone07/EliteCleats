import { Grid } from "@/components/ui/Grid";

interface ProductGridProps {
  children: React.ReactNode;
}

/**
 * Responsive grid for product cards. Thin wrapper around `Grid`
 * with default column breakpoints (1 → 2 → 3 → 4).
 *
 * @deprecated Prefer direct use of `Grid` with explicit `cols`.
 *
 * @example
 * <ProductGrid>
 *   {boots.map((boot) => <ProductCard key={boot.id} boot={boot} />)}
 * </ProductGrid>
 */
export function ProductGrid({ children }: ProductGridProps) {
  return (
    <Grid cols={{ default: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
      {children}
    </Grid>
  );
}

import { featuredProducts } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section";
import { Grid } from "@/components/ui/grid";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";

const displayProducts = featuredProducts.slice(0, 6);

export function FeaturedBoots() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Featured Boots"
          subtitle="Engineered for every style of play."
        />

        <Grid cols={{ default: 1, sm: 2, lg: 3 }} gap={6}>
          {displayProducts.map((product, index) => (
            <div key={product.id} className="relative">
              {product.surface && (
                <div className="absolute right-3 top-3 z-20">
                  <Badge variant="default" size="sm">
                    {product.surface}
                  </Badge>
                </div>
              )}
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

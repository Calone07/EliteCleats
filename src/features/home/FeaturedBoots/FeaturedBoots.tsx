"use client";

import { featuredProducts } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { useStagger } from "@/motion";

const displayProducts = featuredProducts.slice(0, 6);

export function FeaturedBoots() {
  const staggerRef = useStagger<HTMLDivElement>();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle
          title="Featured Boots"
          subtitle="Engineered for every style of play."
        />

        <div
          ref={staggerRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
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
        </div>
      </Container>
    </section>
  );
}

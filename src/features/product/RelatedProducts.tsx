"use client";

import type { Product } from "@/types";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/product/ProductCard";
import { useStagger } from "@/motion";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const staggerRef = useStagger<HTMLDivElement>();

  return (
    <Section background="alt" className="py-20 sm:py-28">
      <h2 className="mb-12 text-3xl font-bold tracking-tight text-primary-text sm:text-4xl">
        You May Also Like
      </h2>

      <div
        ref={staggerRef}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            href={`/products/${product.slug}`}
          />
        ))}
      </div>
    </Section>
  );
}

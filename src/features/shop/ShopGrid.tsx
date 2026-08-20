"use client";

import type { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { useStagger } from "@/motion";

interface ShopGridProps {
  products: Product[];
}

export function ShopGrid({ products }: ShopGridProps) {
  const staggerRef = useStagger<HTMLDivElement>();

  return (
    <div
      ref={staggerRef}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
  );
}

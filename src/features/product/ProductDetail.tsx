"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { Text } from "@/components/ui/typography";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { RelatedProducts } from "./RelatedProducts";

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  return (
    <div className="pb-20 sm:pb-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 pt-8 sm:mb-10">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link
                href="/"
                className="text-secondary-text transition-colors hover:text-primary-text"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-secondary-text/50">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href="/shop"
                className="text-secondary-text transition-colors hover:text-primary-text"
              >
                Shop
              </Link>
            </li>
            <li aria-hidden="true" className="text-secondary-text/50">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="truncate text-primary-text">
              <Text variant="caption" color="primary" className="truncate">
                {product.name}
              </Text>
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </div>

      {related.length > 0 && <RelatedProducts products={related} />}
    </div>
  );
}

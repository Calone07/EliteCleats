"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { products } from "@/data/products";
import { EmptyState } from "@/components/ui/empty-state";
import { Heading, Text } from "@/components/ui/typography";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/features/wishlist";
import { useStagger } from "@/motion";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const staggerRef = useStagger<HTMLDivElement>();

  const saved = products.filter((p) => ids.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
        <Heading as="h1">Wishlist</Heading>
        <EmptyState
          icon={<Heart className="h-12 w-12" />}
          title="Your wishlist is empty"
          description="Tap the heart on any boot to save it here for later."
          action={
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-medium text-primary-bg transition-colors hover:bg-accent/90"
            >
              Shop All Boots
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
      <Heading as="h1">Wishlist</Heading>
      <Text variant="body" color="secondary" className="mt-2">
        {saved.length} {saved.length === 1 ? "boot saved" : "boots saved"} for later.
      </Text>

      <div
        ref={staggerRef}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {saved.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            href={`/products/${product.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

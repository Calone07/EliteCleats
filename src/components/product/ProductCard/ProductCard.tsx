"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { Text } from "@/components/ui/typography";
import { useWishlist } from "@/features/wishlist";

const gradients = [
  "from-red-900/40 via-red-950/20 to-transparent",
  "from-blue-900/40 via-blue-950/20 to-transparent",
  "from-emerald-900/40 via-emerald-950/20 to-transparent",
  "from-amber-900/40 via-amber-950/20 to-transparent",
  "from-violet-900/40 via-violet-950/20 to-transparent",
  "from-orange-900/40 via-orange-950/20 to-transparent",
  "from-teal-900/40 via-teal-950/20 to-transparent",
  "from-rose-900/40 via-rose-950/20 to-transparent",
];

interface ProductCardProps {
  product: Product;
  index: number;
  /** Optional link to a product detail page. */
  href?: string;
}

export function ProductCard({ product, index, href }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useWishlist();
  const isFavorited = isFavorite(product.id);
  const heroImage = product.images[0];

  return (
    <Card hover padding="none" as="article">
      <div
        className={`relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br ${gradients[index % gradients.length]}`}
      >
        {heroImage && (
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill
            className="object-contain p-2 transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {href && (
          <Link
            href={href}
            aria-label={`View ${product.name}`}
            className="absolute inset-0 z-10"
          />
        )}

        {product.badge && (
          <div className="absolute left-3 top-3 z-20">
            <Badge variant="accent" size="md">
              {product.badge}
            </Badge>
          </div>
        )}

        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isFavorited}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-200 ${
              isFavorited ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <Text variant="overline" color="secondary">
          {product.brand}
        </Text>
        <h3 className="mt-1 text-base font-semibold text-primary-text sm:text-lg">
          {href ? (
            <Link href={href} className="transition-colors duration-200 hover:text-accent">
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </h3>

        <div className="mt-3">
          <Rating value={product.rating} size="sm" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Price amount={product.price} size="md" />
          {href ? (
            <Link
              href={href}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-secondary-text transition-all duration-200 hover:border-accent/30 hover:text-accent"
            >
              View Details
            </Link>
          ) : (
            <button
              aria-label="Quick view"
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-secondary-text transition-all duration-200 hover:border-accent/30 hover:text-accent"
            >
              Quick View
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

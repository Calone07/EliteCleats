"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { Heading, Text } from "@/components/ui/typography";
import { useCart } from "@/features/cart";
import { useWishlist } from "@/features/wishlist";
import { cn } from "@/lib/utils";

export function ProductInfo({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();
  const isFavorited = isFavorite(product.id);
  const inStock = product.stock > 0;

  function handleAddToCart() {
    if (!selectedSize) return;
    addItem({ product, size: selectedSize });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2">
        {product.badge && (
          <Badge variant="accent" size="sm">
            {product.badge}
          </Badge>
        )}
        <Badge variant="default" size="sm">
          {product.surface}
        </Badge>
        <Badge
          variant={inStock ? "success" : "error"}
          size="sm"
        >
          {inStock ? `In Stock · ${product.stock}` : "Out of Stock"}
        </Badge>
      </div>

      <Text variant="overline" color="accent" className="mt-6 block">
        {product.brand}
      </Text>
      <Heading as="h1" className="mt-1">
        {product.name}
      </Heading>

      <div className="mt-3 flex items-center gap-3">
        <Rating value={product.rating} />
        <Text variant="caption" color="secondary">
          {product.reviewCount} reviews
        </Text>
      </div>

      <div className="mt-6 flex items-baseline gap-4">
        <Price amount={product.price} size="lg" />
        <Text variant="caption" color="secondary">
          {product.colorway}
        </Text>
      </div>

      <Text variant="body" color="secondary" className="mt-6">
        {product.description}
      </Text>

      <div className="mt-6">
        <Text variant="overline" color="secondary" className="mb-3 block">
          Technologies
        </Text>
        <div className="flex flex-wrap gap-2">
          {product.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-card-bg px-3 py-1.5 text-xs font-medium text-primary-text"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <Text variant="overline" color="secondary">
            Select Size (US)
          </Text>
          {selectedSize && (
            <Text variant="caption" color="accent">
              US {selectedSize}
            </Text>
          )}
        </div>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
              className={cn(
                "rounded-lg border py-2.5 text-sm font-medium transition-all duration-200",
                selectedSize === size
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary-text hover:border-accent/30 hover:text-primary-text",
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!selectedSize || !inStock}
          onClick={handleAddToCart}
          leftIcon={added ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
        >
          {!inStock
            ? "Out of Stock"
            : !selectedSize
              ? "Select a Size"
              : added
                ? "Added to Cart"
                : "Add to Cart"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => toggleFavorite(product.id)}
          leftIcon={
            <Heart
              className={cn(
                "h-5 w-5 transition-colors duration-200",
                isFavorited && "fill-red-500 text-red-500",
              )}
            />
          }
        >
          {isFavorited ? "Saved to Wishlist" : "Add to Wishlist"}
        </Button>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-border bg-card-bg p-5">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-secondary-text">
            Surface
          </dt>
          <dd className="mt-1 text-sm font-semibold text-primary-text">{product.surface}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-secondary-text">
            Weight
          </dt>
          <dd className="mt-1 text-sm font-semibold text-primary-text">{product.weight}g</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-secondary-text">
            Collection
          </dt>
          <dd className="mt-1 text-sm font-semibold text-primary-text">{product.collection}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-secondary-text">
            Released
          </dt>
          <dd className="mt-1 text-sm font-semibold text-primary-text">{product.releaseYear}</dd>
        </div>
      </dl>

      <Link
        href="/shop"
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-secondary-text transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>
    </div>
  );
}

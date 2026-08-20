"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const images = product.images;
  const current = images[Math.min(selected, images.length - 1)];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/[0.07] via-card-bg to-primary-bg">
        {current && (
          <Image
            key={current.url}
            src={current.url}
            alt={current.alt}
            fill
            priority={selected === 0}
            className="animate-fade-in object-contain p-6 sm:p-10"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}
        {product.badge && (
          <div className="absolute left-4 top-4 z-10">
            <Badge variant="accent" size="md">
              {product.badge}
            </Badge>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-pressed={index === selected}
              className={cn(
                "relative aspect-square w-20 overflow-hidden rounded-xl border bg-card-bg transition-all duration-200",
                index === selected
                  ? "border-accent"
                  : "border-border opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-contain p-1.5"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

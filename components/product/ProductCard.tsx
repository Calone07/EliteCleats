"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import type { Boot } from "@/types";

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
  boot: Boot;
  index: number;
}

export function ProductCard({ boot, index }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="group relative rounded-xl border border-border bg-card-bg transition-all duration-300 hover:scale-[1.02] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
      <div
        className={`relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br ${gradients[index % gradients.length]}`}
      >
        {boot.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary-bg">
            {boot.badge}
          </span>
        )}

        <button
          onClick={() => setIsFavorited(!isFavorited)}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-200 ${
              isFavorited ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-secondary-text">
          {boot.brand}
        </p>
        <h3 className="mt-1 text-base font-semibold text-primary-text sm:text-lg">
          {boot.name}
        </h3>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-sm text-accent">★</span>
          <span className="text-sm text-secondary-text">{boot.rating}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-primary-text">
            ${boot.price}
          </span>
          <button
            aria-label="Quick view"
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-secondary-text transition-all duration-200 hover:border-accent/30 hover:text-accent"
          >
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
}

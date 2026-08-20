"use client";

import { useRouter } from "next/navigation";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { Text } from "@/components/ui/typography";
import {
  shopQueryToParams,
  shopSortOptions,
  hasActiveFilters,
  type ShopQuery,
} from "./query";

interface ShopFiltersProps {
  query: ShopQuery;
  brands: string[];
  surfaces: string[];
  collections: string[];
  priceMin: number;
  priceLimit: number;
  resultCount: number;
  totalCount: number;
}

const pillStyles = {
  base: "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200",
  active: "border-accent bg-accent/10 text-accent",
  inactive: "border-border text-secondary-text hover:border-accent/30 hover:text-primary-text",
};

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${pillStyles.base} ${active ? pillStyles.active : pillStyles.inactive}`}
    >
      {label}
    </button>
  );
}

export function ShopFilters({
  query,
  brands,
  surfaces,
  collections,
  priceMin,
  priceLimit,
  resultCount,
  totalCount,
}: ShopFiltersProps) {
  const router = useRouter();

  function update(patch: Partial<ShopQuery>) {
    const next = { ...query, ...patch };
    const qs = shopQueryToParams(next).toString();
    router.push(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  }

  function toggle(list: string[], value: string): string[] {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  }

  const clearable = hasActiveFilters(query);

  return (
    <div className="mb-8 rounded-2xl border border-border bg-card-bg p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-secondary-text">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </div>
        {clearable && (
          <button
            type="button"
            onClick={() => router.push("/shop", { scroll: false })}
            className="inline-flex items-center gap-1 text-xs font-medium text-secondary-text transition-colors hover:text-accent"
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </button>
        )}
      </div>

      <form
        key={query.q}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          update({ q: String(formData.get("q") ?? "").trim() });
        }}
        className="relative mb-6"
        role="search"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text" />
        <input
          type="search"
          name="q"
          defaultValue={query.q}
          placeholder="Search boots, brands, colorways..."
          aria-label="Search products"
          className="w-full rounded-lg border border-border bg-secondary-bg py-2.5 pl-10 pr-4 text-sm text-primary-text placeholder:text-secondary-text/60 focus:border-accent/40 focus:outline-none"
        />
      </form>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr_0.9fr]">
        <div>
          <Text variant="overline" color="secondary" className="mb-3 block">
            Brand
          </Text>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <Pill
                key={brand}
                label={brand}
                active={query.brands.includes(brand)}
                onClick={() => update({ brands: toggle(query.brands, brand) })}
              />
            ))}
          </div>
        </div>

        <div>
          <Text variant="overline" color="secondary" className="mb-3 block">
            Surface
          </Text>
          <div className="flex flex-wrap gap-2">
            {surfaces.map((surface) => (
              <Pill
                key={surface}
                label={surface}
                active={query.surfaces.includes(surface)}
                onClick={() => update({ surfaces: toggle(query.surfaces, surface) })}
              />
            ))}
          </div>
        </div>

        <div>
          <Text variant="overline" color="secondary" className="mb-3 block">
            Collection
          </Text>
          <div className="flex flex-wrap gap-2">
            {collections.map((collection) => (
              <Pill
                key={collection}
                label={collection}
                active={query.collections.includes(collection)}
                onClick={() => update({ collections: toggle(query.collections, collection) })}
              />
            ))}
          </div>
        </div>

        <div>
          <Text variant="overline" color="secondary" className="mb-3 block">
            Max Price
          </Text>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={priceMin}
              max={priceLimit}
              step={10}
              value={query.maxPrice ?? priceLimit}
              onChange={(e) => update({ maxPrice: Number(e.target.value) })}
              aria-label={`Maximum price up to $${query.maxPrice ?? priceLimit}`}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border [accent-color:var(--color-accent)]"
            />
            <span className="w-16 shrink-0 text-right text-xs font-medium text-primary-text">
              ${query.maxPrice ?? priceLimit}
            </span>
          </div>
        </div>

        <div>
          <Text variant="overline" color="secondary" className="mb-3 block">
            Sort
          </Text>
          <div className="relative">
            <select
              value={query.sort}
              onChange={(e) => update({ sort: e.target.value as ShopQuery["sort"] })}
              aria-label="Sort products"
              className="w-full appearance-none rounded-lg border border-border bg-secondary-bg px-3 py-2 pr-9 text-sm text-primary-text focus:border-accent/40 focus:outline-none"
            >
              {shopSortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-card-bg">
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text" />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <Text variant="caption" color="secondary">
          Showing <span className="font-semibold text-primary-text">{resultCount}</span> of{" "}
          {totalCount} boots
        </Text>
      </div>
    </div>
  );
}

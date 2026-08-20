import type { Product } from "@/types";

export type ShopSort = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export interface ShopQuery {
  brands: string[];
  surfaces: string[];
  collections: string[];
  maxPrice?: number;
  sort: ShopSort;
  q: string;
}

export const shopSortOptions: { value: ShopSort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

export const defaultShopQuery: ShopQuery = {
  brands: [],
  surfaces: [],
  collections: [],
  sort: "featured",
  q: "",
};

export function toList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const list = Array.isArray(value) ? value : [value];
  return list
    .flatMap((item) => item.split(","))
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseShopQuery(
  params: Record<string, string | string[] | undefined>,
  priceLimit: number,
): ShopQuery {
  const sortRaw = typeof params.sort === "string" ? params.sort : "";
  const sort = shopSortOptions.some((o) => o.value === sortRaw)
    ? (sortRaw as ShopSort)
    : "featured";

  const maxPriceRaw = typeof params.maxPrice === "string" ? Number(params.maxPrice) : NaN;

  return {
    brands: toList(params.brand),
    surfaces: toList(params.surface),
    collections: toList(params.collection),
    maxPrice: Number.isFinite(maxPriceRaw)
      ? Math.min(Math.max(maxPriceRaw, 0), priceLimit)
      : undefined,
    sort,
    q: typeof params.q === "string" ? params.q.trim() : "",
  };
}

export function shopQueryToParams(query: ShopQuery): URLSearchParams {
  const sp = new URLSearchParams();
  if (query.brands.length) sp.set("brand", query.brands.join(","));
  if (query.surfaces.length) sp.set("surface", query.surfaces.join(","));
  if (query.collections.length) sp.set("collection", query.collections.join(","));
  if (query.maxPrice !== undefined) sp.set("maxPrice", String(query.maxPrice));
  if (query.sort !== "featured") sp.set("sort", query.sort);
  if (query.q) sp.set("q", query.q);
  return sp;
}

export function sortProducts(list: Product[], sort: ShopSort): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      sorted.sort((a, b) => b.releaseYear - a.releaseYear);
      break;
    default:
      sorted.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.rating - a.rating);
  }
  return sorted;
}

export function applyShopFilters(products: Product[], query: ShopQuery): Product[] {
  const q = query.q.toLowerCase();
  const filtered = products.filter((p) => {
    if (query.brands.length && !query.brands.includes(p.brand)) return false;
    if (query.surfaces.length && !query.surfaces.includes(p.surface)) return false;
    if (query.collections.length && !query.collections.includes(p.collection)) return false;
    if (query.maxPrice !== undefined && p.price > query.maxPrice) return false;
    if (q && !`${p.name} ${p.brand} ${p.colorway}`.toLowerCase().includes(q)) return false;
    return true;
  });
  return sortProducts(filtered, query.sort);
}

export function hasActiveFilters(query: ShopQuery): boolean {
  return (
    query.brands.length > 0 ||
    query.surfaces.length > 0 ||
    query.collections.length > 0 ||
    query.maxPrice !== undefined ||
    query.q.length > 0
  );
}

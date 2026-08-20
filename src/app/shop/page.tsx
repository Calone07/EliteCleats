import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import { surfaces } from "@/data/surfaces";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { EmptyState } from "@/components/ui/empty-state";
import { ShopFilters, ShopGrid } from "@/features/shop";
import {
  parseShopQuery,
  applyShopFilters,
  hasActiveFilters,
} from "@/features/shop";

export const metadata: Metadata = {
  title: "Shop All Boots | ELITE CLEATS",
  description:
    "Browse the full ELITE CLEATS collection — speed, control and touch boots from Nike, Adidas, Puma, Mizuno and New Balance.",
};

const priceLimit = Math.ceil(Math.max(...products.map((p) => p.price)) / 10) * 10;
const priceMin = Math.floor(Math.min(...products.map((p) => p.price)) / 10) * 10;
const brandOptions = brands.map((b) => b.name);
const surfaceOptions = surfaces.map((s) => s.label);
const collectionOptions = [...new Set(products.map((p) => p.collection))].sort();

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = parseShopQuery(params, priceLimit);
  const results = applyShopFilters(products, query);
  const gridKey = results.map((p) => p.id).join(",");

  return (
    <Section className="py-12 sm:py-20" id="shop">
      <div className="mb-10 sm:mb-14">
        <Text variant="overline" color="accent">
          The Collection
        </Text>
        <Heading as="h1" className="mt-2">
          Shop All Boots
        </Heading>
        <Text variant="body" color="secondary" className="mt-4 max-w-2xl">
          Every boot in the lineup — engineered for explosive speed, precise control
          and pure touch. Filter by brand, surface or collection.
        </Text>
      </div>

      <ShopFilters
        query={query}
        brands={brandOptions}
        surfaces={surfaceOptions}
        collections={collectionOptions}
        priceMin={priceMin}
        priceLimit={priceLimit}
        resultCount={results.length}
        totalCount={products.length}
      />

      {hasActiveFilters(query) && (
        <div className="mb-6 flex items-center justify-between">
          <Text variant="caption" color="secondary">
            {results.length} {results.length === 1 ? "boot" : "boots"} match your filters
          </Text>
          <Link
            href="/shop"
            className="text-xs font-medium text-accent transition-colors hover:text-accent/80"
          >
            Clear filters
          </Link>
        </div>
      )}

      {results.length > 0 ? (
        <ShopGrid key={gridKey} products={results} />
      ) : (
        <EmptyState
          icon={<SearchX className="h-12 w-12" />}
          title="No boots match your filters"
          description="Try removing a filter or adjusting your search — every boot in the collection is one click away."
          action={
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-medium text-primary-bg transition-colors hover:bg-accent/90"
            >
              Clear all filters
            </Link>
          }
        />
      )}
    </Section>
  );
}

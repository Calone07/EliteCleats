import Link from "next/link";
import { SearchX } from "lucide-react";
import { Text } from "@/components/ui/typography";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <SearchX className="h-12 w-12 text-secondary-text" />
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-primary-text sm:text-3xl">
        Boot Not Found
      </h1>
      <Text variant="body" color="secondary" className="mt-3 max-w-md">
        We could not find that product. It may have sold out or been removed
        from the collection.
      </Text>
      <Link
        href="/shop"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-medium text-primary-bg transition-colors hover:bg-accent/90"
      >
        Back to Shop
      </Link>
    </div>
  );
}

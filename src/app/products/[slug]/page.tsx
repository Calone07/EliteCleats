import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import { ProductDetail } from "@/features/product";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | ELITE CLEATS" };
  }

  return {
    title: `${product.name} | ELITE CLEATS`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ELITE CLEATS`,
      description: product.description,
      images: product.images[0]
        ? [{ url: product.images[0].url, alt: product.images[0].alt }]
        : undefined,
    },
  };
}

function getRelated(productId: string, count = 3) {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  const sameCollection = products.filter(
    (p) => p.id !== productId && p.collection === product.collection,
  );
  const sameBrand = products.filter(
    (p) => p.id !== productId && p.brand === product.brand,
  );
  const rest = products.filter(
    (p) => p.id !== productId && p.collection !== product.collection && p.brand !== product.brand,
  );

  return [...sameCollection, ...sameBrand, ...rest].slice(0, count);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} related={getRelated(product.id)} />;
}

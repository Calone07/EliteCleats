export type SurfaceLabel = "FG" | "AG" | "SG" | "TF" | "IC";

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  collection: string;
  price: number;
  currency: "USD";
  surface: SurfaceLabel;
  colorway: string;
  weight: number;
  description: string;
  technologies: string[];
  sizes: number[];
  images: ProductImage[];
  featured: boolean;
  releaseYear: number;
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: string;
}

export interface Boot {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  badge?: string;
  surface: SurfaceLabel;
}

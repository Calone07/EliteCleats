export interface Boot {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  badge?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

export interface NavLink {
  label: string;
  href: string;
}

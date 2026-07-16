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

export type SurfaceLabel = "FG" | "AG" | "SG" | "TF" | "IC";

export interface Surface {
  id: string;
  title: string;
  label: SurfaceLabel;
  description: string;
  icon: string;
}

export interface Technology {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface AnnouncementMessage {
  id: string;
  text: string;
}

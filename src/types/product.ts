export type ProductCategory =
  | "processors"
  | "graphics-cards"
  | "motherboards"
  | "memory"
  | "storage"
  | "cooling"
  | "power-supplies"
  | "cases"
  | "monitors"
  | "peripherals"
  | "networking";

export interface Product {
  id: string;
  slug: string;

  name: string;
  brand: string;
  category: ProductCategory;

  description: string;

  price: number;
  originalPrice?: number;

  rating: number;
  reviewCount: number;

  image: string;

  inStock: boolean;
  stockCount?: number;

  badge?: "deal" | "hot" | "new";

  specifications: Record<string, string>;
}
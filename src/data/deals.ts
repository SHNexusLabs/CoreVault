import { products } from "@/data/products";
import type { Product } from "@/types/product";

export interface Deal {
  id: string;
  productId: string;
  discountPercent: number;
  badge: string;
}

export const deals: Deal[] = [
  {
    id: "deal-001",
    productId: products[0].id,
    discountPercent: 10,
    badge: "10% OFF",
  },
  {
    id: "deal-002",
    productId: products[1].id,
    discountPercent: 15,
    badge: "15% OFF",
  },
  {
    id: "deal-003",
    productId: products[2].id,
    discountPercent: 20,
    badge: "20% OFF",
  },
];

export function getDealProduct(deal: Deal): Product | undefined {
  return products.find((product) => product.id === deal.productId);
}

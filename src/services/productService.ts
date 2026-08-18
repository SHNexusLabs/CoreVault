import { products } from "@/data/products";

export const productService = {
  getAll() {
    return products;
  },

  getById(id: string) {
    return products.find((product) => product.id === id);
  },

  getBySlug(slug: string) {
    return products.find((product) => product.slug === slug);
  },

  getRelated(productId: string, category: string) {
    return products
      .filter(
        (product) => product.category === category && product.id !== productId,
      )
      .slice(0, 4);
  },
};

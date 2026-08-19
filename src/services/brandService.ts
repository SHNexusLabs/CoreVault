import { brands } from "@/data/brands";

export const brandService = {
  getAll() {
    return brands;
  },

  getBySlug(slug: string) {
    return brands.find((brand) => brand.slug === slug);
  },
};

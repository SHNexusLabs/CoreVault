import { products } from "@/data/products";
import { searchProducts } from "@/lib/search";

export interface ProductQuery {
  search?: string;
  category?: string;
  brand?: string;
  availability?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: "featured" | "price-low" | "price-high" | "rating";
  page?: number;
  limit?: number;
}

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

  search(query: ProductQuery) {
    const {
      search,
      category,
      brand,
      availability,
      minPrice,
      maxPrice,
      rating,
      sort = "featured",
      page = 1,
      limit = 8,
    } = query;

    let results = products;

    if (search) {
      results = searchProducts(results, search);
    }

    if (category) {
      results = results.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (brand) {
      results = results.filter(
        (product) => product.brand.toLowerCase() === brand.toLowerCase(),
      );
    }

    if (availability) {
      if (availability === "in-stock") {
        results = results.filter((product) => product.inStock);
      }

      if (availability === "out-of-stock") {
        results = results.filter((product) => !product.inStock);
      }
    }

    if (minPrice !== undefined) {
      results = results.filter((product) => product.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      results = results.filter((product) => product.price <= maxPrice);
    }

    if (rating !== undefined) {
      results = results.filter((product) => product.rating >= rating);
    }

    if (sort) {
      results = [...results].sort((a, b) => {
        switch (sort) {
          case "price-low":
            return a.price - b.price;

          case "price-high":
            return b.price - a.price;

          case "rating":
            return b.rating - a.rating;

          case "featured":
          default:
            return 0;
        }
      });
    }

    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;

    return {
      products: results.slice(start, start + limit),

      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },
};

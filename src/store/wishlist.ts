import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Product } from "@/types/product";

interface WishlistState {
  items: Product[];
  hasHydrated: boolean;

  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,

      addItem: (product) => {
        set((state) => {
          if (state.items.some((item) => item.id === product.id)) {
            return state;
          }

          return {
            items: [...state.items, product],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const exists = get().items.some((item) => item.id === product.id);

        if (exists) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isWishlisted: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "corevault-wishlist",

      onRehydrateStorage: () => {
        return () => {
          useWishlistStore.setState({
            hasHydrated: true,
          });
        };
      },
    },
  ),
);

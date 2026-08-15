import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  hasHydrated: boolean;

  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  getItemQuantity: (productId: string) => number;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity,
              },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity,
                }
              : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((item) => item.product.id === productId);

        return item?.quantity ?? 0;
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "corevault-cart",

      onRehydrateStorage: () => {
        return () => {
          useCartStore.setState({
            hasHydrated: true,
          });
        };
      },
    },
  ),
);

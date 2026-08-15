import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Order } from "@/types/order";

interface OrderState {
  orders: Order[];

  addOrder: (order: Order) => void;
  getOrder: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      getOrder: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
    }),
    {
      name: "corevault-orders",
    },
  ),
);

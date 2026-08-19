import type { Order } from "@/types/order";

const orders = new Map<string, Order>();

export const orderService = {
  create(order: Order) {
    orders.set(order.id, order);

    return order;
  },

  getById(id: string) {
    return orders.get(id);
  },
};

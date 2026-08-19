import { deals, getDealProduct } from "@/data/deals";

export const dealService = {
  getAll() {
    return deals
      .map((deal) => ({
        ...deal,
        product: getDealProduct(deal),
      }))
      .filter((deal) => deal.product);
  },

  getById(id: string) {
    const deal = deals.find((item) => item.id === id);

    if (!deal) {
      return undefined;
    }

    const product = getDealProduct(deal);

    if (!product) {
      return undefined;
    }

    return {
      ...deal,
      product,
    };
  },
};

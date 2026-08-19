import { products } from "@/data/products";
import type { Order, ShippingDetails } from "@/types/order";
import type { DeliveryMethod, PaymentMethod } from "@/types/order";
import { orderService } from "@/services/orderService";

interface CreateOrderRequest {
  items: {
    productId: string;
    quantity: number;
  }[];

  shipping: ShippingDetails;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateOrderRequest;

  const { items, shipping, deliveryMethod, paymentMethod } = body;

  if (!items?.length) {
    return Response.json(
      { error: "Order must contain at least one item." },
      { status: 400 },
    );
  }

  const orderItems = items.map((item) => {
    const product = products.find((product) => product.id === item.productId);

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    return {
      product,
      quantity: item.quantity,
    };
  });

  const subtotal = orderItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const shippingCost = deliveryMethod === "express" ? 199 : 0;

  const total = subtotal + shippingCost;

  const order: Order = {
    id: `CV-${Date.now()}`,
    items: orderItems,
    shipping,
    deliveryMethod,
    paymentMethod,
    subtotal,
    shippingCost,
    total,
    createdAt: new Date().toISOString(),
  };

  orderService.create(order);

  return Response.json({ order }, { status: 201 });
}

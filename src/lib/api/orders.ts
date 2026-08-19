import type { Order, ShippingDetails } from "@/types/order";
import type { DeliveryMethod } from "@/types/order";
import type { PaymentMethod } from "@/types/order";

interface CreateOrderInput {
  items: {
    productId: string;
    quantity: number;
  }[];
  shipping: ShippingDetails;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
}

interface CreateOrderResponse {
  order: Order;
}

export async function getOrder(orderId: string): Promise<CreateOrderResponse> {
  const response = await fetch(`/api/orders/${orderId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  return response.json();
}

export async function createOrder(
  input: CreateOrderInput,
): Promise<CreateOrderResponse> {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
}

import type { CartItem } from "@/types/cart";
import type { PaymentMethod } from "@/components/checkout/PaymentOptions";
import type { DeliveryMethod } from "@/components/checkout/DeliveryOptions";

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface Order {
  id: string;
  items: CartItem[];

  shipping: ShippingDetails;

  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;

  subtotal: number;
  shippingCost: number;
  total: number;

  createdAt: string;
}

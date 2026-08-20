import type { CartItem } from "@/types/cart";

export type DeliveryMethod = "standard" | "express";
export type PaymentMethod = "upi" | "card" | "cod";

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

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

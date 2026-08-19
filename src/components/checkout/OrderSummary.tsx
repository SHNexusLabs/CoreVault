"use client";

import type { CartItem } from "@/types/cart";
import type { DeliveryMethod } from "@/types/order";

interface OrderSummaryProps {
  items: CartItem[];
  deliveryMethod: DeliveryMethod;
  subtotal: number;
  shippingCost: number;
  total: number;
}

export function OrderSummary({
  items,
  deliveryMethod,
  subtotal,
  shippingCost,
  total,
}: OrderSummaryProps) {
  return (
    <section className="h-fit rounded-lg border border-(--border) bg-(--background) p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-(--foreground)">
        Order Summary
      </h2>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-(--surface)">
              <span className="text-xs text-(--foreground-muted)">Image</span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium text-(--foreground)">
                {item.product.name}
              </p>

              <p className="mt-1 text-xs text-(--foreground-muted)">
                Qty: {item.quantity}
              </p>
            </div>

            <span className="shrink-0 text-sm font-semibold text-(--foreground)">
              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-(--border) pt-5 text-sm">
        <div className="flex justify-between">
          <span className="text-(--foreground-muted)">Subtotal</span>

          <span className="font-medium text-(--foreground)">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-(--foreground-muted)">Delivery</span>

          <span className="font-medium text-(--foreground)">
            {shippingCost === 0
              ? "FREE"
              : `₹${shippingCost.toLocaleString("en-IN")}`}
          </span>
        </div>

        <div className="flex justify-between border-t border-(--border) pt-4">
          <span className="font-semibold text-(--foreground)">Total</span>

          <span className="text-lg font-semibold text-(--foreground)">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-md bg-(--surface) p-3">
        <p className="text-xs text-(--foreground-muted)">Delivery method</p>

        <p className="mt-1 text-sm font-medium capitalize text-(--foreground)">
          {deliveryMethod === "express"
            ? "Express Delivery"
            : "Standard Delivery"}
        </p>
      </div>
    </section>
  );
}

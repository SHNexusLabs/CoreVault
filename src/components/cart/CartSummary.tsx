"use client";

import Link from "next/link";

import { useCartStore } from "@/store/cart";

export function CartSummary() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 2000 ? 0 : 99;

  const total = subtotal + shipping;

  return (
    <aside className="rounded-lg border border-(--border) bg-(--surface) p-5">
      <h2 className="text-base font-semibold text-(--foreground)">
        Order Summary
      </h2>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-(--foreground-secondary)">Subtotal</span>

          <span className="font-medium text-(--foreground)">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-(--foreground-secondary)">Shipping</span>

          <span className="font-medium text-(--foreground)">
            {shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}
          </span>
        </div>
      </div>

      <div className="my-5 border-t border-(--border)" />

      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-(--foreground)">
          Total
        </span>

        <span className="text-xl font-bold text-(--foreground)">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-5 flex h-12 w-full items-center justify-center rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
      >
        Proceed to Checkout
      </Link>

      <Link
        href="/products"
        className="mt-3 flex h-11 items-center justify-center rounded-md border border-(--border) text-sm font-medium text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)"
      >
        Continue Shopping
      </Link>

      {subtotal < 2000 && (
        <p className="mt-4 text-center text-xs text-(--foreground-muted)">
          Add ₹{(2000 - subtotal).toLocaleString("en-IN")} more to unlock free
          shipping.
        </p>
      )}
    </aside>
  );
}

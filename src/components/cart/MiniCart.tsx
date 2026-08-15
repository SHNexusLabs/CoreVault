"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, X } from "lucide-react";

import { useCartStore } from "@/store/cart";

interface MiniCartProps {
  open: boolean;
  onClose: () => void;
}

export function MiniCart({ open, onClose }: MiniCartProps) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (!open) {
    return null;
  }

  return (
    <div className="absolute right-0 top-full z-50 mt-3 w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-(--border) bg-(--background) shadow-(--shadow-lg)">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-(--border) px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-(--foreground)">
            Shopping Cart
          </h2>

          <p className="mt-0.5 text-xs text-(--foreground-muted)">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close cart"
          className="flex h-8 w-8 items-center justify-center rounded-md text-(--foreground-muted) transition-colors hover:bg-(--surface) hover:text-(--foreground)"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-10 text-center">
          <ShoppingCart className="h-8 w-8 text-(--foreground-muted)" />

          <p className="mt-3 text-sm font-medium text-(--foreground)">
            Your cart is empty
          </p>

          <p className="mt-1 text-xs text-(--foreground-muted)">
            Add something from the store.
          </p>
        </div>
      ) : (
        <>
          <div className="max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 border-b border-(--border) p-4 last:border-b-0"
              >
                <Link
                  href={`/products/${item.product.slug}`}
                  onClick={onClose}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-(--border) bg-(--surface)"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={onClose}
                    className="line-clamp-2 text-xs font-medium text-(--foreground) hover:text-(--primary)"
                  >
                    {item.product.name}
                  </Link>

                  <p className="mt-1 text-xs text-(--foreground-muted)">
                    ₹{item.product.price.toLocaleString("en-IN")} ×{" "}
                    {item.quantity}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-(--foreground)">
                    ₹
                    {(item.product.price * item.quantity).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.product.id)}
                  aria-label={`Remove ${item.product.name}`}
                  className="self-start text-(--foreground-muted) transition-colors hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-(--border) bg-(--surface) p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-(--foreground-secondary)">
                Subtotal
              </span>

              <span className="text-base font-bold text-(--foreground)">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex h-10 items-center justify-center rounded-md border border-(--border) text-sm font-medium text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)"
              >
                View Cart
              </Link>

              <Link
                href="/checkout"
                onClick={onClose}
                className="flex h-10 items-center justify-center rounded-md bg-(--primary) text-sm font-medium text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

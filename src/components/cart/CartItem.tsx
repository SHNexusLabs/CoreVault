"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import type { CartItem as CartItemType } from "@/types/cart";
import { useCartStore } from "@/store/cart";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity } = item;

  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  const maxQuantity = product.stockCount ?? 99;

  return (
    <article className="flex gap-4 border-b border-(--border) py-6">
      {/* Product image */}
      <Link
        href={`/products/${product.slug}`}
        className="flex h-28 w-28 shrink-0 items-center justify-center rounded-lg border border-(--border) bg-(--surface) text-center text-xs text-(--foreground-muted)"
      >
        Product Image
      </Link>

      {/* Product details */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-(--foreground-muted)">
          {product.brand}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="mt-1 block text-sm font-semibold text-(--foreground) hover:text-(--primary)"
        >
          {product.name}
        </Link>

        <p className="mt-2 text-sm font-semibold text-(--foreground)">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <div className="mt-4 flex items-center gap-3">
          {/* Quantity */}
          <div className="flex h-9 items-center rounded-md border border-(--border) bg-(--surface)">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label={`Decrease quantity of ${product.name}`}
              className="flex h-full w-9 items-center justify-center text-(--foreground-muted) hover:text-(--foreground) disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="flex w-8 justify-center text-sm font-medium">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= maxQuantity}
              aria-label={`Increase quantity of ${product.name}`}
              className="flex h-full w-9 items-center justify-center text-(--foreground-muted) hover:text-(--foreground) disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-(--foreground-muted) hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="hidden shrink-0 text-right sm:block">
        <p className="text-sm font-semibold text-(--foreground)">
          ₹{(product.price * quantity).toLocaleString("en-IN")}
        </p>
      </div>
    </article>
  );
}

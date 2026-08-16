"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--surface)">
            <Heart className="h-7 w-7 text-(--foreground-muted)" />
          </div>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
            Wishlist
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-(--foreground)">
            Your wishlist is empty
          </h1>

          <p className="mt-2 text-sm leading-6 text-(--foreground-muted)">
            Save products you like here and come back to them later.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Wishlist
        </p>

        <div className="mt-1 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl">
              Saved Products
            </h1>

            <p className="mt-1 text-sm text-(--foreground-muted)">
              {items.length} {items.length === 1 ? "product" : "products"} saved
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <article
            key={product.id}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-(--border) bg-(--background) transition-shadow duration-200 hover:shadow-(--shadow-md)"
          >
            {/* Image */}
            <Link
              href={`/products/${product.slug}`}
              className="relative flex aspect-square items-center justify-center bg-(--surface) p-6"
            >
              <span className="text-xs text-(--foreground-muted)">
                Product Image
              </span>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <p className="text-xs font-medium text-(--foreground-muted)">
                {product.brand}
              </p>

              <Link
                href={`/products/${product.slug}`}
                className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-(--foreground) hover:text-(--primary)"
              >
                {product.name}
              </Link>

              <div className="mt-3">
                <span className="text-base font-semibold text-(--foreground)">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                {product.originalPrice && (
                  <span className="ml-2 text-xs text-(--foreground-muted) line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <div className="mt-auto flex gap-2 pt-4">
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => addItem(product)}
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-(--primary) px-3 text-sm font-medium text-(--primary-foreground) transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:bg-(--surface) disabled:text-(--foreground-muted)"
                >
                  <ShoppingCart className="h-4 w-4" />

                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>

                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-(--border) text-(--foreground-muted) transition-colors hover:border-(--error) hover:text-(--error)"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

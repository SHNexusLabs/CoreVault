"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (productId: string) => {
    const product = items.find((item) => item.id === productId);

    if (!product) {
      return;
    }

    addItem(product);
    removeItem(product.id);
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/account"
          className="text-sm font-medium text-(--primary) hover:underline"
        >
          ← My Account
        </Link>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold tracking-tight text-(--foreground)">
            My Wishlist
          </h1>

          <p className="mt-1 text-sm text-(--foreground-muted)">
            Products you&apos;ve saved for later.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-xl border border-(--border) bg-(--surface) px-6 py-14 text-center">
            <Heart className="mx-auto h-10 w-10 text-(--foreground-muted)" />

            <h2 className="mt-4 text-lg font-semibold text-(--foreground)">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-sm text-(--foreground-muted)">
              Save products you like and find them here later.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground)"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-(--border) bg-(--surface)"
              >
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="flex aspect-square items-center justify-center bg-(--background)">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-contain p-6"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-(--foreground-muted)">
                    {product.brand}
                  </p>

                  <Link href={`/products/${product.slug}`}>
                    <h2 className="mt-1 line-clamp-2 text-sm font-semibold text-(--foreground) hover:text-(--primary)">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="mt-3 text-lg font-bold text-(--foreground)">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product.id)}
                      className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md bg-(--primary) px-3 text-xs font-semibold text-(--primary-foreground)"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-(--border) text-(--foreground-muted) hover:border-red-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

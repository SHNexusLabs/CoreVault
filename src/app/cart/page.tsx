"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Container } from "@/components/ui";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  if (items.length === 0) {
    return (
      <main>
        <Container>
          <div className="py-10 sm:py-12">
            <div className="border-b border-(--border) pb-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
                Your Cart
              </p>

              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl">
                Shopping Cart
              </h1>
            </div>

            <div className="flex min-h-96 items-center justify-center">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-(--foreground)">
                  Your cart is empty
                </h2>

                <p className="mt-2 text-sm text-(--foreground-muted)">
                  Add some products to get started.
                </p>

                <Link
                  href="/products"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-(--primary) px-5 text-sm font-medium text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container>
        <div className="py-10 sm:py-12">
          {/* Header */}
          <div className="border-b border-(--border) pb-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
              Your Cart
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl">
              Shopping Cart
            </h1>

            <p className="mt-2 text-sm text-(--foreground-muted)">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {/* Content */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Items */}
            <section>
              <div className="rounded-lg border border-(--border)">
                {items.map((item, index) => {
                  const { product, quantity } = item;

                  return (
                    <article
                      key={product.id}
                      className={`flex gap-4 p-4 sm:p-5 ${
                        index !== 0 ? "border-t border-(--border)" : ""
                      }`}
                    >
                      {/* Image */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-(--border) bg-(--surface) sm:h-32 sm:w-32"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="128px"
                          className="object-contain p-2"
                        />
                      </Link>

                      {/* Product */}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-(--foreground-muted)">
                          {product.brand}
                        </p>

                        <Link
                          href={`/products/${product.slug}`}
                          className="mt-1 block text-sm font-semibold text-(--foreground) transition-colors hover:text-(--primary)"
                        >
                          {product.name}
                        </Link>

                        <p className="mt-2 text-base font-semibold text-(--foreground)">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        {/* Controls */}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <div className="flex h-9 items-center rounded-md border border-(--border) bg-(--surface)">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(product.id, quantity - 1)
                              }
                              disabled={quantity <= 1}
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="flex h-full w-9 items-center justify-center text-(--foreground-muted) transition-colors hover:text-(--foreground) disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>

                            <span className="flex w-8 justify-center text-sm font-medium text-(--foreground)">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(product.id, quantity + 1)
                              }
                              disabled={
                                product.stockCount !== undefined &&
                                quantity >= product.stockCount
                              }
                              aria-label={`Increase quantity of ${product.name}`}
                              className="flex h-full w-9 items-center justify-center text-(--foreground-muted) transition-colors hover:text-(--foreground) disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="inline-flex h-9 items-center gap-1.5 text-xs font-medium text-(--foreground-muted) transition-colors hover:text-red-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Item total */}
                      <div className="hidden shrink-0 text-right sm:block">
                        <p className="text-sm font-semibold text-(--foreground)">
                          ₹{(product.price * quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Summary */}
            <aside className="h-fit rounded-lg border border-(--border) bg-(--surface) p-5 lg:sticky lg:top-24">
              <h2 className="text-base font-semibold text-(--foreground)">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 border-b border-(--border) pb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-(--foreground-secondary)">
                    Subtotal
                  </span>

                  <span className="font-medium text-(--foreground)">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-(--foreground-secondary)">
                    Shipping
                  </span>

                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    Free
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-5">
                <span className="font-semibold text-(--foreground)">Total</span>

                <span className="text-xl font-bold text-(--foreground)">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                className="h-12 w-full rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="mt-3 flex h-11 items-center justify-center rounded-md border border-(--border) text-sm font-medium text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        </div>
      </Container>
    </main>
  );
}

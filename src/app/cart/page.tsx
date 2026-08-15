"use client";

import Link from "next/link";

import { Container } from "@/components/ui";
import { CartItem, CartSummary } from "@/components/cart";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

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

            <div className="flex min-h-105 items-center justify-center">
              <div className="max-w-sm text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--surface) text-(--foreground-muted)">
                  🛒
                </div>

                <h2 className="mt-5 text-lg font-semibold text-(--foreground)">
                  Your cart is empty
                </h2>

                <p className="mt-2 text-sm leading-6 text-(--foreground-muted)">
                  Looks like you haven&apos;t added anything to your cart yet.
                  Explore our products and find something you&apos;ll love.
                </p>

                <Link
                  href="/products"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-(--primary) px-6 text-sm font-medium text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
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

            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h1 className="text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl">
                Shopping Cart
              </h1>

              <span className="text-sm text-(--foreground-muted)">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          {/* Cart */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Items */}
            <section>
              <div className="rounded-lg border border-(--border) px-4 sm:px-6">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </section>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <CartSummary />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

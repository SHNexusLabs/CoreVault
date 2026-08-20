"use client";

import Link from "next/link";
import Image from "next/image";

import { ChevronRight, Package } from "lucide-react";

import { useOrderStore } from "@/store/orders";

export default function AccountOrdersPage() {
  const orders = useOrderStore((state) => state.orders);

  const sortedOrders = [...orders].reverse();

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link
              href="/account"
              className="text-sm font-medium text-(--primary) hover:underline"
            >
              ← My Account
            </Link>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-(--foreground)">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-(--foreground-muted)">
              View your order history and order details.
            </p>
          </div>

          <span className="text-sm text-(--foreground-muted)">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </span>
        </div>

        {sortedOrders.length === 0 ? (
          <div className="mt-8 rounded-xl border border-(--border) bg-(--surface) px-6 py-14 text-center">
            <Package className="mx-auto h-10 w-10 text-(--foreground-muted)" />

            <h2 className="mt-4 text-lg font-semibold text-(--foreground)">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-(--foreground-muted)">
              Your completed orders will appear here.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground)"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {sortedOrders.map((order) => {
              const firstItem = order.items[0];

              return (
                <article
                  key={order.id}
                  className="rounded-xl border border-(--border) bg-(--surface) p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-(--foreground)">
                          #{order.id}
                        </h2>

                        <span className="rounded-full bg-(--primary-soft) px-2.5 py-1 text-xs font-medium text-(--primary)">
                          Placed
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-(--foreground-muted)">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-6 sm:justify-end">
                      <div className="text-left sm:text-right">
                        <p className="text-xs text-(--foreground-muted)">
                          Total
                        </p>

                        <p className="mt-0.5 text-sm font-semibold text-(--foreground)">
                          ₹{order.total.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <Link
                        href={`/account/orders/${order.id}`}
                        className="inline-flex h-9 items-center gap-1 rounded-md border border-(--border) px-3 text-sm font-medium text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)"
                      >
                        View
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-(--border) pt-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-(--background)">
                        {firstItem ? (
                          <Image
                            src={firstItem.product.image}
                            alt={firstItem.product.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Package className="h-6 w-6 text-(--foreground-muted)" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        {firstItem ? (
                          <>
                            <p className="line-clamp-2 text-sm font-medium text-(--foreground)">
                              {firstItem.product.name}
                            </p>

                            <p className="mt-1 text-xs text-(--foreground-muted)">
                              Quantity: {firstItem.quantity}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-(--foreground-muted)">
                            No product information available.
                          </p>
                        )}

                        {order.items.length > 1 && (
                          <p className="mt-1 text-xs text-(--foreground-muted)">
                            +{order.items.length - 1} more{" "}
                            {order.items.length === 2 ? "item" : "items"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

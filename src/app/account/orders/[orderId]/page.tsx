"use client";

import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { useParams } from "next/navigation";

import { useOrderStore } from "@/store/orders";

export default function OrderDetailPage() {
  const params = useParams<{ orderId: string }>();

  const order = useOrderStore((state) =>
    state.orders.find((item) => item.id === params.orderId),
  );

  if (!order) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-(--border) bg-(--surface) p-8 text-center">
          <Package className="mx-auto h-10 w-10 text-(--foreground-muted)" />

          <h1 className="mt-5 text-xl font-semibold text-(--foreground)">
            Order Not Found
          </h1>

          <p className="mt-2 text-sm text-(--foreground-muted)">
            This order could not be found in your current session.
          </p>

          <Link
            href="/account/orders"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground)"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-(--primary) hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
              Order Details
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-(--foreground)">
              #{order.id}
            </h1>

            <p className="mt-1 text-sm text-(--foreground-muted)">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
              )}
            </p>
          </div>

          <span className="inline-flex w-fit rounded-full bg-(--primary-soft) px-3 py-1.5 text-xs font-medium text-(--primary)">
            Order Placed
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Products */}
          <section className="rounded-xl border border-(--border) bg-(--surface) p-5 sm:p-6">
            <h2 className="text-base font-semibold text-(--foreground)">
              Items
            </h2>

            <div className="mt-5 divide-y divide-(--border)">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-(--background)">
                    <Package className="h-6 w-6 text-(--foreground-muted)" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-(--foreground)">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-xs text-(--foreground-muted)">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-1 text-xs text-(--foreground-muted)">
                      ₹{item.product.price.toLocaleString("en-IN")} each
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-(--foreground)">
                    ₹
                    {(
                      item.product.price * item.quantity
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="h-fit rounded-xl border border-(--border) bg-(--surface) p-5 sm:p-6">
            <h2 className="text-base font-semibold text-(--foreground)">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-(--foreground-muted)">
                  Subtotal
                </span>

                <span className="font-medium text-(--foreground)">
                  ₹{order.subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-(--foreground-muted)">
                  Shipping
                </span>

                <span className="font-medium text-(--foreground)">
                  {order.shippingCost === 0
                    ? "FREE"
                    : `₹${order.shippingCost.toLocaleString("en-IN")}`}
                </span>
              </div>

              <div className="flex justify-between border-t border-(--border) pt-4">
                <span className="font-semibold text-(--foreground)">
                  Total
                </span>

                <span className="text-lg font-bold text-(--foreground)">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="mt-5 border-t border-(--border) pt-5">
              <p className="text-xs text-(--foreground-muted)">
                Payment Method
              </p>

              <p className="mt-1 text-sm font-medium text-(--foreground)">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod === "upi"
                    ? "UPI"
                    : "Credit / Debit Card"}
              </p>

              <p className="mt-4 text-xs text-(--foreground-muted)">
                Delivery
              </p>

              <p className="mt-1 text-sm font-medium text-(--foreground)">
                {order.deliveryMethod === "express"
                  ? "Express Delivery"
                  : "Standard Delivery"}
              </p>
            </div>
          </section>
        </div>

        {/* Shipping */}
        <section className="mt-6 rounded-xl border border-(--border) bg-(--surface) p-5 sm:p-6">
          <h2 className="text-base font-semibold text-(--foreground)">
            Shipping Address
          </h2>

          <div className="mt-4 text-sm leading-6 text-(--foreground-secondary)">
            <p className="font-medium text-(--foreground)">
              {order.shipping.fullName}
            </p>

            <p>{order.shipping.address}</p>

            <p>
              {order.shipping.city}, {order.shipping.state}{" "}
              {order.shipping.pinCode}
            </p>

            <p>{order.shipping.phone}</p>

            <p>{order.shipping.email}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
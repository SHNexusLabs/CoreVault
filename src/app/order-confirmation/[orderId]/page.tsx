"use client";

import Link from "next/link";
import { CheckCircle2, Package } from "lucide-react";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import type { Order } from "@/types/order";
import { getOrder } from "@/lib/api/orders";

export default function OrderConfirmation() {
  const params = useParams<{ orderId: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        setError(false);

        const response = await getOrder(params.orderId);

        setOrder(response.order);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [params.orderId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-(--border) bg-(--background) p-8 text-center">
          <Package className="mx-auto h-10 w-10 text-(--foreground-muted)" />

          <h1 className="mt-5 text-xl font-semibold text-(--foreground)">
            Loading Order
          </h1>

          <p className="mt-2 text-sm text-(--foreground-muted)">
            Please wait while we retrieve your order.
          </p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-(--border) bg-(--background) p-8 text-center">
          <Package className="mx-auto h-10 w-10 text-(--foreground-muted)" />

          <h1 className="mt-5 text-xl font-semibold text-(--foreground)">
            Order Not Found
          </h1>

          <p className="mt-2 text-sm text-(--foreground-muted)">
            We couldn&apos;t find this order.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground)"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-(--success)" />

        <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Order Confirmed
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-(--foreground) sm:text-3xl">
          Thank you for your order!
        </h1>

        <p className="mt-2 text-sm text-(--foreground-muted)">
          Your order has been successfully placed.
        </p>

        <p className="mt-3 text-sm font-medium text-(--foreground)">
          Order #{order.id}
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-lg border border-(--border) bg-(--background) p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-(--foreground)">
            Order Details
          </h2>

          <div className="mt-5 divide-y divide-(--border)">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-(--surface)">
                  <Package className="h-6 w-6 text-(--foreground-muted)" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-(--foreground)">
                    {item.product.name}
                  </p>

                  <p className="mt-1 text-xs text-(--foreground-muted)">
                    Qty: {item.quantity}
                  </p>
                </div>

                <span className="text-sm font-semibold text-(--foreground)">
                  ₹
                  {(item.product.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="h-fit rounded-lg border border-(--border) bg-(--background) p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-(--foreground)">Summary</h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-(--foreground-muted)">Subtotal</span>

              <span className="font-medium text-(--foreground)">
                ₹{order.subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-(--foreground-muted)">Shipping</span>

              <span className="font-medium text-(--foreground)">
                {order.shippingCost === 0
                  ? "FREE"
                  : `₹${order.shippingCost.toLocaleString("en-IN")}`}
              </span>
            </div>

            <div className="flex justify-between border-t border-(--border) pt-4">
              <span className="font-semibold text-(--foreground)">Total</span>

              <span className="text-lg font-semibold text-(--foreground)">
                ₹{order.total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="mt-6 border-t border-(--border) pt-5">
            <p className="text-xs text-(--foreground-muted)">Payment Method</p>

            <p className="mt-1 text-sm font-medium text-(--foreground)">
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : order.paymentMethod === "upi"
                  ? "UPI"
                  : "Credit / Debit Card"}
            </p>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-lg border border-(--border) bg-(--background) p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-(--foreground)">
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

      <div className="mt-8 flex justify-center">
        <Link
          href="/products"
          className="inline-flex h-11 items-center justify-center rounded-md bg-(--primary) px-6 text-sm font-semibold text-(--primary-foreground)"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

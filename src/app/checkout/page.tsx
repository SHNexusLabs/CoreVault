"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";

import { useCartStore } from "@/store/cart";
import { useOrderStore } from "@/store/orders";
import type { ShippingDetails } from "@/types/order";

import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import {
  DeliveryOptions,
  type DeliveryMethod,
} from "@/components/checkout/DeliveryOptions";
import {
  PaymentOptions,
  type PaymentMethod,
} from "@/components/checkout/PaymentOptions";
import { OrderSummary } from "@/components/checkout/OrderSummary";

type CheckoutStep = "shipping" | "delivery" | "payment";

export default function Checkout() {
  const router = useRouter();

  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  const [shippingDetails, setShippingDetails] =
    useState<ShippingDetails | null>(null);

  const addOrder = useOrderStore((state) => state.addOrder);
  const clearCart = useCartStore((state) => state.clearCart);

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("standard");

  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const shippingCost = deliveryMethod === "express" ? 199 : 0;

  const total = subtotal + shippingCost;

  const handlePlaceOrder = () => {
    if (isPlacingOrder) {
      return;
    }

    if (!shippingDetails) {
      setStep("shipping");
      return;
    }

    setIsPlacingOrder(true);

    const order = {
      id: `CV-${Date.now()}`,
      items,
      shipping: shippingDetails,
      deliveryMethod,
      paymentMethod,
      subtotal,
      shippingCost,
      total,
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();

    router.push(`/order-confirmation/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--surface)">
            <ShoppingCart className="h-7 w-7 text-(--foreground-muted)" />
          </div>

          <h1 className="mt-6 text-2xl font-semibold text-(--foreground)">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm leading-6 text-(--foreground-muted)">
            Add some products to your cart before continuing to checkout.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground)"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Checkout
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl">
          Complete Your Order
        </h1>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-3">
        {/* Shipping */}
        <div className="flex shrink-0 items-center gap-2">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
              step === "shipping"
                ? "bg-(--primary) text-(--primary-foreground)"
                : "bg-(--primary-soft) text-(--primary)"
            }`}
          >
            {step !== "shipping" ? <Check className="h-4 w-4" /> : "1"}
          </div>

          <span
            className={`hidden text-sm font-medium sm:block ${
              step === "shipping"
                ? "text-(--foreground)"
                : "text-(--foreground-muted)"
            }`}
          >
            Shipping
          </span>
        </div>

        <div className="h-px flex-1 bg-(--border)" />

        {/* Delivery */}
        <div className="flex shrink-0 items-center gap-2">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
              step === "delivery"
                ? "bg-(--primary) text-(--primary-foreground)"
                : step === "payment"
                  ? "bg-(--primary-soft) text-(--primary)"
                  : "bg-(--surface) text-(--foreground-muted)"
            }`}
          >
            {step === "payment" ? <Check className="h-4 w-4" /> : "2"}
          </div>

          <span
            className={`hidden text-sm font-medium sm:block ${
              step === "delivery"
                ? "text-(--foreground)"
                : "text-(--foreground-muted)"
            }`}
          >
            Delivery
          </span>
        </div>

        <div className="h-px flex-1 bg-(--border)" />

        {/* Payment */}
        <div className="flex shrink-0 items-center gap-2">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
              step === "payment"
                ? "bg-(--primary) text-(--primary-foreground)"
                : "bg-(--surface) text-(--foreground-muted)"
            }`}
          >
            3
          </div>

          <span
            className={`hidden text-sm font-medium sm:block ${
              step === "payment"
                ? "text-(--foreground)"
                : "text-(--foreground-muted)"
            }`}
          >
            Payment
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="max-w-3xl">
          {step === "shipping" && (
            <CheckoutForm
              onContinue={(data) => {
                setShippingDetails(data);
                setStep("delivery");
              }}
            />
          )}

          {step === "delivery" && (
            <DeliveryOptions
              value={deliveryMethod}
              onChange={setDeliveryMethod}
            />
          )}

          {step === "delivery" && (
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setStep("shipping")}
                className="h-11 rounded-md border border-(--border) px-5 text-sm font-medium text-(--foreground)"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => setStep("payment")}
                className="h-11 flex-1 rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === "payment" && (
            <>
              <PaymentOptions
                value={paymentMethod}
                onChange={setPaymentMethod}
              />

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("delivery")}
                  className="h-11 rounded-md border border-(--border) px-5 text-sm font-medium text-(--foreground)"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className="h-11 flex-1 rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground) transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPlacingOrder ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </>
          )}
        </div>

        <OrderSummary
          items={items}
          deliveryMethod={deliveryMethod}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
        />
      </div>
    </main>
  );
}

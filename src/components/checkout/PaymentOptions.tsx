"use client";

import { Check, CreditCard, Smartphone, WalletCards } from "lucide-react";

export type PaymentMethod = "upi" | "card" | "cod";

interface PaymentOptionsProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const paymentOptions = [
  {
    id: "upi" as const,
    label: "UPI",
    description: "Pay securely using UPI",
    icon: Smartphone,
  },
  {
    id: "card" as const,
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay and more",
    icon: CreditCard,
  },
  {
    id: "cod" as const,
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: WalletCards,
  },
];

export function PaymentOptions({ value, onChange }: PaymentOptionsProps) {
  return (
    <section className="rounded-lg border border-(--border) bg-(--background) p-5 sm:p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Payment
        </p>

        <h2 className="mt-1 text-lg font-semibold text-(--foreground)">
          Choose Payment Method
        </h2>

        <p className="mt-1 text-sm text-(--foreground-muted)">
          Select how you would like to pay for your order.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {paymentOptions.map((option) => {
          const selected = value === option.id;
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors ${
                selected
                  ? "border-(--primary) bg-(--primary-soft)"
                  : "border-(--border) hover:border-(--border-strong) hover:bg-(--surface)"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${
                  selected
                    ? "bg-(--primary) text-(--primary-foreground)"
                    : "bg-(--surface) text-(--foreground-muted)"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-(--foreground)">
                  {option.label}
                </p>

                <p className="mt-0.5 text-xs text-(--foreground-muted)">
                  {option.description}
                </p>
              </div>

              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  selected
                    ? "border-(--primary) bg-(--primary) text-(--primary-foreground)"
                    : "border-(--border)"
                }`}
              >
                {selected && <Check className="h-3 w-3" />}
              </span>
            </button>
          );
        })}
      </div>

      {value === "upi" && (
        <div className="mt-4 rounded-md bg-(--surface) p-4">
          <p className="text-sm font-medium text-(--foreground)">UPI payment</p>

          <p className="mt-1 text-xs text-(--foreground-muted)">
            UPI details will be connected when the payment gateway is added.
          </p>
        </div>
      )}

      {value === "card" && (
        <div className="mt-4 rounded-md bg-(--surface) p-4">
          <p className="text-sm font-medium text-(--foreground)">
            Card payment
          </p>

          <p className="mt-1 text-xs text-(--foreground-muted)">
            Secure card fields will be connected to the payment gateway later.
          </p>
        </div>
      )}

      {value === "cod" && (
        <div className="mt-4 rounded-md bg-(--surface) p-4">
          <p className="text-sm font-medium text-(--foreground)">
            Cash on Delivery
          </p>

          <p className="mt-1 text-xs text-(--foreground-muted)">
            Pay the delivery partner when your order arrives.
          </p>
        </div>
      )}
    </section>
  );
}

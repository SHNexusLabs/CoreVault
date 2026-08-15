"use client";

import { Check, Truck, Zap } from "lucide-react";

export type DeliveryMethod = "standard" | "express";

interface DeliveryOptionsProps {
  value: DeliveryMethod;
  onChange: (value: DeliveryMethod) => void;
}

const deliveryOptions = [
  {
    id: "standard" as const,
    label: "Standard Delivery",
    description: "Delivery within 3–5 business days",
    price: 0,
    icon: Truck,
  },
  {
    id: "express" as const,
    label: "Express Delivery",
    description: "Faster delivery within 1–2 business days",
    price: 199,
    icon: Zap,
  },
];

export function DeliveryOptions({
  value,
  onChange,
}: DeliveryOptionsProps) {
  return (
    <section className="rounded-lg border border-(--border) bg-(--background) p-5 sm:p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Delivery
        </p>

        <h2 className="mt-1 text-lg font-semibold text-(--foreground)">
          Choose Delivery Method
        </h2>

        <p className="mt-1 text-sm text-(--foreground-muted)">
          Select how quickly you want your order delivered.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {deliveryOptions.map((option) => {
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

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-(--foreground)">
                  {option.price === 0
                    ? "FREE"
                    : `₹${option.price.toLocaleString("en-IN")}`}
                </span>

                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    selected
                      ? "border-(--primary) bg-(--primary) text-(--primary-foreground)"
                      : "border-(--border)"
                  }`}
                >
                  {selected && (
                    <Check className="h-3 w-3" />
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
import { Clock3, RotateCcw, ShieldCheck, Truck } from "lucide-react";

import type { Product } from "@/types/product";

interface ProductServiceInfoProps {
  product: Product;
}

export function ProductServiceInfo({ product }: ProductServiceInfoProps) {
  const items = [
    {
      icon: ShieldCheck,
      label: "Warranty",
      value: product.warranty ?? "Manufacturer warranty",
    },
    {
      icon: Truck,
      label: "Shipping",
      value: product.shipping ?? "Shipping available",
    },
    {
      icon: RotateCcw,
      label: "Returns",
      value: product.returnPolicy ?? "See return policy",
    },
    {
      icon: Clock3,
      label: "Support",
      value: "Customer support available",
    },
  ];

  return (
    <section className="mt-8">
      <div className="grid overflow-hidden rounded-lg border border-(--border) sm:grid-cols-2">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`flex gap-3 p-4 ${
                index > 0 ? "border-t border-(--border) sm:border-t-0" : ""
              } ${index % 2 === 1 ? "sm:border-l sm:border-(--border)" : ""} ${
                index >= 2 ? "sm:border-t sm:border-(--border)" : ""
              }`}
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-(--primary)" />

              <div className="min-w-0">
                <p className="text-xs text-(--foreground-muted)">
                  {item.label}
                </p>

                <p className="mt-1 text-sm font-medium text-(--foreground)">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

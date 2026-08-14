import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Reliable delivery across India",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Safe and protected checkout",
  },
  {
    icon: BadgeCheck,
    title: "Genuine Products",
    description: "Sourced from trusted brands",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Simple return support",
  },
];

export function ProductTrust() {
  return (
    <section className="mt-10 border-y border-(--border) py-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-(--border) bg-(--surface) text-(--primary)">
                <Icon className="h-4 w-4" />
              </div>

              <div>
                <h3 className="text-sm font-medium text-(--foreground)">
                  {item.title}
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-(--foreground-muted)">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

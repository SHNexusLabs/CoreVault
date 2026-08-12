import {
  Headphones,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Container } from "@/components/ui";

const benefits = [
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Quick shipping across India",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    description: "100% authentic components",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Simple return process",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "We're here when you need us",
  },
];

export function TrustBenefits() {
  return (
    <section className="border-b border-(--border) bg-(--background-secondary)">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-y divide-(--border) md:grid-cols-4 md:divide-y-0">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex items-center gap-3 px-4 py-5 sm:px-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-(--primary-soft) text-(--primary)">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-(--foreground)">
                    {benefit.title}
                  </h3>

                  <p className="mt-0.5 text-xs text-(--foreground-muted)">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
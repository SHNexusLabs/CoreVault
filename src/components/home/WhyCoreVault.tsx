import { BadgeCheck, Headphones, LockKeyhole, Truck } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Genuine Products",
    description:
      "Buy authentic components and technology products from trusted manufacturers.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Get your products delivered safely with reliable shipping and order tracking.",
  },
  {
    icon: LockKeyhole,
    title: "Secure Checkout",
    description:
      "Your account and payment information are protected throughout your purchase.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description:
      "Need help choosing components? Our support team is here to help.",
  },
];

export function WhyCoreVault() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          title="Why CoreVault?"
          description="Everything you need for a better technology shopping experience."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-lg border border-(--border) bg-(--background) p-5 transition-colors hover:bg-(--surface)"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-(--primary-soft) text-(--primary)">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-(--foreground)">
                  {reason.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-(--foreground-secondary)">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

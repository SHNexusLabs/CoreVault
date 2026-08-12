import Link from "next/link";
import {
  Cpu,
  HardDrive,
  Keyboard,
  MemoryStick,
  Monitor,
  Network,
  Gpu,
  Server,
  type LucideIcon,
} from "lucide-react";

import { Container, SectionHeading } from "@/components/ui";

interface Category {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const categories: Category[] = [
  {
    name: "Processors",
    description: "CPUs for every workload",
    href: "/products?category=processors",
    icon: Cpu,
  },
  {
    name: "Graphics Cards",
    description: "Power your visuals",
    href: "/products?category=graphics-cards",
    icon: Gpu,
  },
  {
    name: "Memory",
    description: "Fast and reliable RAM",
    href: "/products?category=memory",
    icon: MemoryStick,
  },
  {
    name: "Storage",
    description: "SSDs and hard drives",
    href: "/products?category=storage",
    icon: HardDrive,
  },
  {
    name: "Monitors",
    description: "Sharper, smoother displays",
    href: "/products?category=monitors",
    icon: Monitor,
  },
  {
    name: "Peripherals",
    description: "Keyboards, mice and more",
    href: "/products?category=peripherals",
    icon: Keyboard,
  },
  {
    name: "Networking",
    description: "Connect your setup",
    href: "/products?category=networking",
    icon: Network,
  },
  {
    name: "PC Components",
    description: "Build your perfect system",
    href: "/products?category=components",
    icon: Server,
  },
];

export function CategoryGrid() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          title="Shop by Category"
          description="Find the right components for your setup."
          action={
            <Link
              href="/products"
              className="hidden text-sm font-medium text-(--primary) hover:underline sm:block"
            >
              View all
            </Link>
          }
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-lg border border-(--border) bg-(--background) p-4 transition-colors hover:border-(--primary) hover:bg-(--surface) sm:p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-(--primary-soft) text-(--primary) transition-transform duration-200 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-(--foreground)">
                  {category.name}
                </h3>

                <p className="mt-1 text-xs leading-5 text-(--foreground-muted)">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>

        <Link
          href="/products"
          className="mt-4 block text-center text-sm font-medium text-(--primary) sm:hidden"
        >
          View all categories
        </Link>
      </Container>
    </section>
  );
}
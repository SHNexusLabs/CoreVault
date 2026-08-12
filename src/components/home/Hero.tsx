import Link from "next/link";
import { ArrowRight, Cpu, ShieldCheck, Zap } from "lucide-react";

import { Container } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-(--border)">
      {/* Subtle background accent */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-(--primary-soft) opacity-60 blur-3xl dark:opacity-30" />
      </div>

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-(--primary-soft) px-3 py-1.5 text-xs font-medium text-(--primary)">
              <Zap className="h-3.5 w-3.5" />
              Premium technology, without the premium hassle
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-(--foreground) sm:text-5xl lg:text-6xl">
              Build more.
              <span className="block text-(--primary)">Pay less.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-(--foreground-secondary) sm:text-lg">
              Discover quality PC components, electronics, and peripherals for
              gaming, work, and everything in between.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-(--primary) px-5 text-base font-medium text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/pc-builder"
                className="inline-flex h-11 items-center justify-center rounded-md border border-(--border) px-5 text-base font-medium text-(--foreground) transition-colors hover:bg-(--surface)"
              >
                Build Your PC
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-(--border)">
              <div>
                <Cpu className="mb-2 h-5 w-5 text-(--primary)" />
                <p className="text-xs font-medium text-(--foreground)">
                  Genuine products
                </p>
              </div>

              <div>
                <ShieldCheck className="mb-2 h-5 w-5 text-(--primary)" />
                <p className="text-xs font-medium text-(--foreground)">
                  Warranty support
                </p>
              </div>

              <div>
                <Zap className="mb-2 h-5 w-5 text-(--primary)" />
                <p className="text-xs font-medium text-(--foreground)">
                  Fast delivery
                </p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-(--border) bg-(--surface)">
              {/* Temporary visual placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Cpu className="mx-auto h-16 w-16 text-(--primary) opacity-60" />

                  <p className="mt-4 text-sm font-medium text-(--foreground-secondary)">
                    Technology that fits your build
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

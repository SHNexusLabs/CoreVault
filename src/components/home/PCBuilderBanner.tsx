import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Gauge,
  MemoryStick,
  Monitor,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/ui";

const features = [
  {
    icon: Cpu,
    label: "Choose components",
  },
  {
    icon: CheckCircle2,
    label: "Check compatibility",
  },
  {
    icon: Gauge,
    label: "Estimate power",
  },
];

export function PCBuilderBanner() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-xl border border-(--border) bg-(--surface)">
          {/* Subtle background decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-(--primary-soft) opacity-60 blur-3xl dark:opacity-25"
          />

          <div className="relative grid items-center gap-10 p-6 sm:p-8 lg:grid-cols-2 lg:p-12">
            {/* Content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-(--primary-soft) px-3 py-1.5 text-xs font-medium text-(--primary)">
                <Cpu className="h-3.5 w-3.5" />
                Build your dream PC
              </div>

              <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl lg:text-4xl">
                Build it your way.
                <span className="block text-(--primary)">
                  We&apos;ll check the rest.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-(--foreground-secondary) sm:text-base">
                Choose your components and let CoreVault help you build a
                compatible system with power estimates, component checks,
                and a clear total price.
              </p>

              <Link
                href="/pc-builder"
                className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-(--primary) text-sm font-medium text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
              >
                Start Building
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-(--border) pt-6">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div key={feature.label}>
                      <Icon className="h-5 w-5 text-(--primary)" />

                      <p className="mt-2 text-xs font-medium leading-4 text-(--foreground)">
                        {feature.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Builder preview */}
            <div className="relative">
              <div className="rounded-lg border border-(--border) bg-(--background) p-4 shadow-(--shadow-md) sm:p-5">
                {/* Preview header */}
                <div className="flex items-center justify-between border-b border-(--border) pb-4">
                  <div>
                    <p className="text-xs text-(--foreground-muted)">
                      PC Builder
                    </p>

                    <p className="mt-1 text-sm font-semibold text-(--foreground)">
                      Your build
                    </p>
                  </div>

                  <span className="rounded-full bg-(--success-soft) px-2.5 py-1 text-[10px] font-medium text-(--success)">
                    Compatible
                  </span>
                </div>

                {/* Component rows */}
                <div className="divide-y divide-(--border)">
                  <BuilderPreviewRow
                    icon={<Cpu className="h-4 w-4" />}
                    type="CPU"
                    name="Choose a processor"
                  />

                  <BuilderPreviewRow
                    icon={<MemoryStick className="h-4 w-4" />}
                    type="Memory"
                    name="Choose your RAM"
                  />

                  <BuilderPreviewRow
                    icon={<Monitor className="h-4 w-4" />}
                    type="Graphics"
                    name="Choose a graphics card"
                  />

                  <BuilderPreviewRow
                    icon={<ShieldCheck className="h-4 w-4" />}
                    type="Power Supply"
                    name="Choose a PSU"
                  />
                </div>

                {/* Summary */}
                <div className="mt-4 flex items-center justify-between rounded-md bg-(--surface) px-3 py-3">
                  <div>
                    <p className="text-[10px] text-(--foreground-muted)">
                      Estimated total
                    </p>

                    <p className="mt-0.5 text-base font-semibold text-(--foreground)">
                      Choose components
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-(--foreground-muted)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

interface BuilderPreviewRowProps {
  icon: React.ReactNode;
  type: string;
  name: string;
}

function BuilderPreviewRow({
  icon,
  type,
  name,
}: BuilderPreviewRowProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-(--primary-soft) text-(--primary)">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-(--foreground-muted)">
          {type}
        </p>

        <p className="mt-0.5 truncate text-xs font-medium text-(--foreground-secondary)">
          {name}
        </p>
      </div>
    </div>
  );
}
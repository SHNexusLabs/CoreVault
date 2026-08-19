import { PCBuilder } from "@/components/pc-builder/PCBuilder";

export default function PCBuilderPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
            PC Builder
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-(--foreground)">
            Build Your PC
          </h1>

          <p className="mt-3 text-sm leading-6 text-(--foreground-muted)">
            Choose your components and build a system that fits your needs and
            budget.
          </p>
        </div>

        <div className="mt-10">
          <PCBuilder />
        </div>
      </div>
    </main>
  );
}

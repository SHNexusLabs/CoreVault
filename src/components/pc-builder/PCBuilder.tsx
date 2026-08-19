"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Cpu,
  HardDrive,
  MemoryStick,
  MonitorCog,
  Package,
  Search,
  Zap,
  ShoppingCart,
} from "lucide-react";

import { useCartStore } from "@/store/cart";
import { products } from "@/data/products";
import { isCompatible } from "@/lib/pc-builder/compatibility";

import type { Product } from "@/types/product";
import type { PCBuild, PCComponentType } from "@/types/pc-builder";

import { pcComponentLabels } from "@/types/pc-builder";

const componentTypes: PCComponentType[] = [
  "cpu",
  "motherboard",
  "ram",
  "gpu",
  "storage",
  "psu",
  "case",
];

const categoryMap: Record<PCComponentType, string> = {
  cpu: "processors",
  motherboard: "motherboards",
  ram: "memory",
  gpu: "graphics-cards",
  storage: "storage",
  psu: "power-supplies",
  case: "cases",
};

const componentIcons = {
  cpu: Cpu,
  motherboard: MonitorCog,
  ram: MemoryStick,
  gpu: MonitorCog,
  storage: HardDrive,
  psu: Zap,
  case: Package,
};

export function PCBuilder() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [build, setBuild] = useState<PCBuild>({});
  const [search, setSearch] = useState<
    Partial<Record<PCComponentType, string>>
  >({});

  const componentProducts = useMemo(() => {
    return componentTypes.reduce(
      (result, type) => {
        result[type] = products.filter(
          (product) => product.category.toLowerCase() === categoryMap[type],
        );

        return result;
      },
      {} as Record<PCComponentType, Product[]>,
    );
  }, []);

  const missingComponents = componentTypes.filter((type) => !build[type]);

  const handleAddBuildToCart = () => {
    if (!isBuildComplete) {
      return;
    }

    for (const type of componentTypes) {
      const product = build[type];

      if (product) {
        addItem(product, 1);
      }
    }

    router.push("/cart");
  };

  const isBuildComplete = missingComponents.length === 0;

  const selectComponent = (type: PCComponentType, product: Product) => {
    setBuild((current) => {
      const next: PCBuild = {
        ...current,
        [type]: product,
      };

      /*
       * Clear components that become invalid after
       * changing an upstream component.
       */
      for (const componentType of componentTypes) {
        const selected = next[componentType];

        if (!selected) {
          continue;
        }

        if (!isCompatible(componentType, selected, next)) {
          delete next[componentType];
        }
      }

      return next;
    });
  };

  const clearComponent = (type: PCComponentType) => {
    setBuild((current) => {
      const next = { ...current };

      delete next[type];

      /*
       * Re-check downstream components after removing
       * an upstream component.
       */
      for (const componentType of componentTypes) {
        const selected = next[componentType];

        if (!selected) {
          continue;
        }

        if (!isCompatible(componentType, selected, next)) {
          delete next[componentType];
        }
      }

      return next;
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-4">
        {componentTypes.map((type) => {
          const Icon = componentIcons[type];
          const selected = build[type];

          const query = search[type]?.trim().toLowerCase() ?? "";

          const availableProducts = componentProducts[type]
            .filter((product) => isCompatible(type, product, build))
            .filter((product) => {
              if (!query) {
                return true;
              }

              return (
                product.name.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query)
              );
            });

          return (
            <section
              key={type}
              className="rounded-lg border border-(--border) bg-(--background) p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-(--surface) text-(--foreground-muted)">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-(--foreground)">
                    {pcComponentLabels[type]}
                  </h2>

                  <p className="mt-0.5 text-xs text-(--foreground-muted)">
                    {selected ? selected.name : "Choose a component"}
                  </p>
                </div>

                {selected && (
                  <button
                    type="button"
                    onClick={() => clearComponent(type)}
                    className="text-xs font-medium text-(--foreground-muted) hover:text-(--foreground)"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="mt-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--foreground-muted)" />

                  <input
                    type="search"
                    value={search[type] ?? ""}
                    onChange={(event) =>
                      setSearch((current) => ({
                        ...current,
                        [type]: event.target.value,
                      }))
                    }
                    placeholder={`Search ${pcComponentLabels[type]}...`}
                    className="h-10 w-full rounded-md border border-(--border) bg-(--surface) pl-9 pr-3 text-sm text-(--foreground) outline-none placeholder:text-(--foreground-muted) focus:border-(--primary)"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-(--foreground-muted)">
                    {availableProducts.length} compatible{" "}
                    {availableProducts.length === 1 ? "product" : "products"}
                  </p>
                </div>

                <div className="mt-2 max-h-72 space-y-2 overflow-y-auto pr-1">
                  {availableProducts.length > 0 ? (
                    availableProducts.map((product) => {
                      const isSelected = selected?.id === product.id;

                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => selectComponent(type, product)}
                          className={`flex w-full items-center gap-3 rounded-md border p-3 text-left transition-colors ${
                            isSelected
                              ? "border-(--primary) bg-(--primary-soft)"
                              : "border-(--border) hover:border-(--primary)"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 text-sm font-medium text-(--foreground)">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-(--foreground-muted)">
                              {product.brand}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            <span className="text-sm font-semibold text-(--foreground)">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>

                            {isSelected && (
                              <Check className="h-4 w-4 text-(--primary)" />
                            )}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="rounded-md bg-(--surface) p-4 text-center">
                      <p className="text-sm text-(--foreground-muted)">
                        No compatible products found.
                      </p>

                      <p className="mt-1 text-xs text-(--foreground-muted)">
                        Try another search or change a previous component.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <aside className="h-fit rounded-lg border border-(--border) bg-(--background) p-5 lg:sticky lg:top-24">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Build Summary
        </p>

        <h2 className="mt-1 text-lg font-semibold text-(--foreground)">
          Your PC
        </h2>

        <div className="mt-5 space-y-3">
          {componentTypes.map((type) => {
            const product = build[type];

            return (
              <div
                key={type}
                className="flex items-start justify-between gap-4 text-sm"
              >
                <span className="text-(--foreground-muted)">
                  {pcComponentLabels[type]}
                </span>

                <span className="max-w-47.5 text-right font-medium text-(--foreground)">
                  {product ? product.name : "Not selected"}
                </span>
              </div>
            );
          })}
        </div>

        {!isBuildComplete && (
          <div className="mt-4 rounded-md border border-(--border) bg-(--surface) p-3">
            <p className="text-sm font-medium text-(--foreground)">
              Complete your build
            </p>

            <p className="mt-1 text-xs leading-5 text-(--foreground-muted)">
              Select:{" "}
              {missingComponents
                .map((type) => pcComponentLabels[type])
                .join(", ")}
            </p>
          </div>
        )}

        {isBuildComplete && (
          <div className="mt-4 flex items-center gap-2 rounded-md bg-(--primary-soft) p-3">
            <Check className="h-4 w-4 shrink-0 text-(--primary)" />

            <span className="text-sm font-medium text-(--primary)">
              Build is ready
            </span>
          </div>
        )}

        <button
          type="button"
          disabled={!isBuildComplete}
          onClick={handleAddBuildToCart}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-(--primary) px-4 text-sm font-semibold text-(--primary-foreground) transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" />
          Add Complete Build to Cart
        </button>
      </aside>
    </div>
  );
}

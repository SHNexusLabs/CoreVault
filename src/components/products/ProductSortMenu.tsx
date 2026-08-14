"use client";

import { Check, ChevronDown } from "lucide-react";
import type { ProductSort } from "./MobileSortSheet";

interface ProductSortMenuProps {
  value: ProductSort;
  onChange: (value: ProductSort) => void;
}

const sortOptions: {
  label: string;
  value: ProductSort;
}[] = [
  {
    label: "Featured",
    value: "featured",
  },
  {
    label: "Price: Low to High",
    value: "price-low",
  },
  {
    label: "Price: High to Low",
    value: "price-high",
  },
  {
    label: "Customer Rating",
    value: "rating",
  },
];

export function ProductSortMenu({ value, onChange }: ProductSortMenuProps) {
  return (
    <div className="relative">
      <details className="group">
        <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-md border border-(--border) bg-(--surface) px-3 text-sm font-medium text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)">
          Sort: {sortOptions.find((option) => option.value === value)?.label}
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
        </summary>

        <div className="absolute right-0 top-full z-30 mt-2 w-52 rounded-lg border border-(--border) bg-(--background) p-1.5 shadow-lg">
          {sortOptions.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-(--surface)"
              >
                <span
                  className={
                    selected
                      ? "font-medium text-(--primary)"
                      : "text-(--foreground-secondary)"
                  }
                >
                  {option.label}
                </span>

                {selected && <Check className="h-4 w-4 text-(--primary)" />}
              </button>
            );
          })}
        </div>
      </details>
    </div>
  );
}

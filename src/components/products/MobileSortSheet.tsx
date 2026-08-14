"use client";

import { Check, X } from "lucide-react";

export type ProductSort = "featured" | "price-low" | "price-high" | "rating";

interface MobileSortSheetProps {
  open: boolean;
  value: ProductSort;
  onChange: (value: ProductSort) => void;
  onClose: () => void;
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

export function MobileSortSheet({
  open,
  value,
  onChange,
  onClose,
}: MobileSortSheetProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close sort options"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Sheet */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-sort-title"
        className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-(--border) bg-(--background) shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-(--border) px-4 py-4">
          <h2
            id="mobile-sort-title"
            className="text-base font-semibold text-(--foreground)"
          >
            Sort Products
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sort options"
            className="flex h-9 w-9 items-center justify-center rounded-full text-(--foreground-muted) hover:bg-(--surface) hover:text-(--foreground)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Options */}
        <div className="px-4 pb-6 pt-2">
          {sortOptions.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  onClose();
                }}
                className="flex min-h-12 w-full items-center justify-between rounded-md px-2 text-left text-sm transition-colors hover:bg-(--surface)"
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
      </section>
    </div>
  );
}

"use client";

import { Check, ChevronDown, RotateCcw, X } from "lucide-react";
import { useState } from "react";

import { filterGroups } from "./filter-data";
import type { SelectedFilters } from "./filter-types";

interface MobileFilterSheetProps {
  open: boolean;
  selectedFilters: SelectedFilters;
  onToggle: (groupId: string, value: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function MobileFilterSheet({
  open,
  selectedFilters,
  onToggle,
  onClear,
  onClose,
}: MobileFilterSheetProps) {
  const filterCount = Object.values(selectedFilters).reduce(
    (total, values) => total + values.length,
    0,
  );

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Sheet */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-filter-title"
        className="absolute inset-x-0 bottom-0 flex max-h-[90dvh] flex-col rounded-t-2xl border-t border-(--border) bg-(--background) shadow-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-(--border) px-4 py-4">
          <div>
            <h2
              id="mobile-filter-title"
              className="text-base font-semibold text-(--foreground)"
            >
              Filters
            </h2>

            {filterCount > 0 && (
              <p className="mt-0.5 text-xs text-(--foreground-muted)">
                {filterCount} selected
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-9 w-9 items-center justify-center rounded-full text-(--foreground-muted) hover:bg-(--surface) hover:text-(--foreground)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4">
          {filterGroups.map((group) => (
            <MobileFilterGroup
              key={group.id}
              group={group}
              selectedValues={selectedFilters[group.id] ?? []}
              onToggle={(value) => onToggle(group.id, value)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center gap-3 border-t border-(--border) bg-(--background) p-4">
          <button
            type="button"
            onClick={onClear}
            disabled={filterCount === 0}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-(--border) px-4 text-sm font-medium text-(--foreground) disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-md bg-(--primary) px-4 text-sm font-medium text-(--primary-foreground) hover:bg-(--primary-hover)"
          >
            Show Results
            {filterCount > 0 && ` (${filterCount})`}
          </button>
        </div>
      </section>
    </div>
  );
}

interface MobileFilterGroupProps {
  group: (typeof filterGroups)[number];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

function MobileFilterGroup({
  group,
  selectedValues,
  onToggle,
}: MobileFilterGroupProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-(--border) py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-(--foreground)">
          {group.label}
        </span>

        <ChevronDown
          className={`h-4 w-4 text-(--foreground-muted) transition-transform ${
            open ? "" : "-rotate-90"
          }`}
        />
      </button>

      {open && (
        <div className="mt-4 space-y-1">
          {group.options.map((option) => {
            const selected = selectedValues.includes(option.value);

            return (
              <label
                key={option.value}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 text-sm active:bg-(--surface)"
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded border ${
                    selected
                      ? "border-(--primary) bg-(--primary) text-(--primary-foreground)"
                      : "border-(--border) bg-(--background)"
                  }`}
                >
                  {selected && <Check className="h-3.5 w-3.5" />}
                </span>

                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => onToggle(option.value)}
                  className="sr-only"
                />

                <span className="flex-1 text-(--foreground-secondary)">
                  {option.label}
                </span>

                {option.count !== undefined && (
                  <span className="text-xs text-(--foreground-muted)">
                    {option.count}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

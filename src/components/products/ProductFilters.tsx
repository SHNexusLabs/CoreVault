"use client";

import { ChevronDown, RotateCcw } from "lucide-react";
import { useState } from "react";

import { filterGroups, type FilterGroup } from "./filter-data";

export function ProductFilters() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const toggleFilter = (groupId: string, value: string) => {
    setSelectedFilters((current) => {
      const currentValues = current[groupId] ?? [];

      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...current,
        [groupId]: nextValues,
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const hasFilters = Object.values(selectedFilters).some(
    (values) => values.length > 0,
  );

  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-24 rounded-lg border border-(--border) bg-(--background) p-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-(--border) pb-4">
          <h2 className="text-sm font-semibold text-(--foreground)">Filters</h2>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-(--primary) hover:underline"
            >
              <RotateCcw className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        {/* Filter groups */}
        <div className="divide-y divide-(--border)">
          {filterGroups.map((group) => (
            <FilterGroup
              key={group.id}
              group={group}
              selectedValues={selectedFilters[group.id] ?? []}
              onToggle={(value) => toggleFilter(group.id, value)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

interface FilterGroupProps {
  group: FilterGroup;
  selectedValues: string[];
  onToggle: (value: string) => void;
}

function FilterGroup({ group, selectedValues, onToggle }: FilterGroupProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="py-4">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-(--foreground)">
          {group.label}
        </span>

        <ChevronDown
          className={`h-4 w-4 text-(--foreground-muted) transition-transform ${
            open ? "" : "-rotate-90"
          }`}
        />
      </button>

      {open && (
        <div className="mt-3 space-y-2.5">
          {group.options.map((option) => {
            const checked = selectedValues.includes(option.value);

            return (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(option.value)}
                  className="h-4 w-4 rounded border-(--border) accent-(--primary)"
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

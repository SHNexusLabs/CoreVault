import { X } from "lucide-react";

import { filterGroups } from "./filter-data";
import type { SelectedFilters } from "./filter-types";

interface ActiveFilterChipsProps {
  selectedFilters: SelectedFilters;
  onRemove: (groupId: string, value: string) => void;
  onClear: () => void;
}

export function ActiveFilterChips({
  selectedFilters,
  onRemove,
  onClear,
}: ActiveFilterChipsProps) {
  const activeFilters = Object.entries(selectedFilters).flatMap(
    ([groupId, values]) =>
      values.map((value) => {
        const group = filterGroups.find((item) => item.id === groupId);

        const option = group?.options.find((item) => item.value === value);

        return {
          groupId,
          value,
          label: option?.label ?? value,
        };
      }),
  );

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium text-(--foreground-muted)">
        Active:
      </span>

      {activeFilters.map((filter) => (
        <button
          key={`${filter.groupId}-${filter.value}`}
          type="button"
          onClick={() => onRemove(filter.groupId, filter.value)}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-(--border) bg-(--surface) px-3 text-xs font-medium text-(--foreground-secondary) transition-colors hover:border-(--primary) hover:text-(--primary)"
        >
          {filter.label}

          <X className="h-3 w-3" />
        </button>
      ))}

      <button
        type="button"
        onClick={onClear}
        className="ml-1 text-xs font-medium text-(--primary) hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}

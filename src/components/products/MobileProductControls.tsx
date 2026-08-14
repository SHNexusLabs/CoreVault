"use client";

import { Filter, SlidersHorizontal } from "lucide-react";

interface MobileProductControlsProps {
  filterCount?: number;
  onFilterClick?: () => void;
  onSortClick?: () => void;
}

export function MobileProductControls({
  filterCount = 0,
  onFilterClick,
  onSortClick,
}: MobileProductControlsProps) {
  return (
    <div className="flex items-center gap-2 lg:hidden">
      <button
        type="button"
        onClick={onFilterClick}
        className="relative inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-(--border) bg-(--background) px-3 text-sm font-medium text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)"
      >
        <Filter className="h-4 w-4" />
        Filters
        {filterCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-(--primary) px-1.5 text-[10px] font-semibold text-(--primary-foreground)">
            {filterCount}
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={onSortClick}
        className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-(--border) bg-(--background) px-3 text-sm font-medium text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Sort
      </button>
    </div>
  );
}

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Product pagination"
      className="mt-8 flex items-center justify-center gap-1.5"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-(--border) text-(--foreground-secondary) transition-colors hover:border-(--primary) hover:text-(--primary) disabled:pointer-events-none disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page) => {
        const active = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={active ? "page" : undefined}
            className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors ${
              active
                ? "bg-(--primary) text-(--primary-foreground)"
                : "border border-(--border) text-(--foreground-secondary) hover:border-(--primary) hover:text-(--primary)"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-(--border) text-(--foreground-secondary) transition-colors hover:border-(--primary) hover:text-(--primary) disabled:pointer-events-none disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

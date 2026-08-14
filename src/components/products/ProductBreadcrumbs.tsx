import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { Product } from "@/types/product";

interface ProductBreadcrumbsProps {
  product: Product;
}

export function ProductBreadcrumbs({ product }: ProductBreadcrumbsProps) {
  const categoryLabel = product.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex items-center gap-1.5 overflow-x-auto text-sm"
    >
      <Link
        href="/"
        className="shrink-0 text-(--foreground-muted) transition-colors hover:text-(--primary)"
      >
        Home
      </Link>

      <ChevronRight className="h-4 w-4 shrink-0 text-(--foreground-muted)" />

      <Link
        href={`/products?category=${product.category}`}
        className="shrink-0 text-(--foreground-muted) transition-colors hover:text-(--primary)"
      >
        {categoryLabel}
      </Link>

      <ChevronRight className="h-4 w-4 shrink-0 text-(--foreground-muted)" />

      <span className="truncate text-(--foreground)" aria-current="page">
        {product.name}
      </span>
    </nav>
  );
}

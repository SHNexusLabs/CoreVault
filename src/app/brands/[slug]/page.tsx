import { notFound } from "next/navigation";
import Link from "next/link";

import { brandService } from "@/services/brandService";
import { productService } from "@/services/productService";
import { ProductGrid } from "@/components/products";

interface BrandPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BrandPage({
  params,
}: BrandPageProps) {
  const { slug } = await params;

  const brand = brandService.getBySlug(slug);

  if (!brand) {
    notFound();
  }

  const products = productService
    .getAll()
    .filter(
      (product) =>
        product.brand.toLowerCase() === brand.name.toLowerCase(),
    );

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/brands"
          className="text-sm font-medium text-(--primary) hover:underline"
        >
          ← All Brands
        </Link>

        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
            Brand
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-(--foreground)">
            {brand.name}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-(--foreground-muted)">
            {brand.description}
          </p>
        </div>

        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-(--foreground)">
              {brand.name} Products
            </h2>

            <span className="text-sm text-(--foreground-muted)">
              {products.length} products
            </span>
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="rounded-lg border border-(--border) bg-(--surface) p-10 text-center">
              <p className="text-sm text-(--foreground-muted)">
                No products from this brand are available yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

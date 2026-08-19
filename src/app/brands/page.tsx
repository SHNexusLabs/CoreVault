import Image from "next/image";
import Link from "next/link";

import { brandService } from "@/services/brandService";

export default function BrandsPage() {
  const brands = brandService.getAll();

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
            Brands
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-(--foreground)">
            Shop by Brand
          </h1>

          <p className="mt-3 text-sm leading-6 text-(--foreground-muted)">
            Explore products from the brands you trust for your PC and
            technology setup.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group rounded-xl border border-(--border) bg-(--background) p-6 transition-colors hover:border-(--primary)"
            >
              <div className="flex h-20 items-center justify-center rounded-lg bg-(--surface)">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={120}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-(--foreground)">
                {brand.name}
              </h2>

              <p className="mt-2 text-sm leading-6 text-(--foreground-muted)">
                {brand.description}
              </p>

              <span className="mt-4 inline-block text-sm font-medium text-(--primary)">
                View Products →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
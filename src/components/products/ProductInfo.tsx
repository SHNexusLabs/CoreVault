import type { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div>
      {/* Brand */}
      <p className="text-sm font-medium text-(--primary)">{product.brand}</p>

      {/* Product name */}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-(--foreground) sm:text-4xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-3">
        <div
          className="flex items-center gap-1"
          aria-label={`Rated ${product.rating} out of 5`}
        >
          <span className="text-sm font-semibold text-(--foreground)">
            {product.rating}
          </span>

          <span className="text-sm tracking-wide text-amber-500">★★★★★</span>
        </div>

        <span className="text-sm text-(--foreground-muted)">
          {product.reviewCount} reviews
        </span>
      </div>

      {/* Price */}
      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-bold tracking-tight text-(--foreground)">
          ₹{product.price.toLocaleString("en-IN")}
        </span>

        {product.originalPrice && (
          <>
            <span className="text-base text-(--foreground-muted) line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>

            <span className="rounded-md bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="mt-5 text-sm leading-6 text-(--foreground-secondary)">
        {product.description}
      </p>

      {/* Stock */}
      <div className="mt-6">
        {product.inStock ? (
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-current" />
            In stock
            {product.stockCount !== undefined && (
              <span className="font-normal text-(--foreground-muted)">
                · {product.stockCount} available
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
            <span className="h-2 w-2 rounded-full bg-current" />
            Out of stock
          </div>
        )}
      </div>
    </div>
  );
}

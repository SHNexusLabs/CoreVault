"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { useCartStore } from "@/store/cart";
import type { Product } from "@/types/product";
import { Badge, IconButton } from "@/components/ui";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const discount =
    product.originalPrice &&
    Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-(--border) bg-(--background) transition-shadow duration-200 hover:shadow-(--shadow-md)">
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-(--surface)">
        {product.badge && (
          <div className="absolute left-3 top-3 z-10">
            <Badge
              variant={
                product.badge === "deal"
                  ? "discount"
                  : product.badge === "hot"
                    ? "warning"
                    : "default"
              }
            >
              {product.badge === "deal"
                ? "DEAL"
                : product.badge === "hot"
                  ? "HOT"
                  : "NEW"}
            </Badge>
          </div>
        )}

        <div className="absolute right-3 top-3 z-10">
          <IconButton
            icon={<Heart className="h-4 w-4" />}
            label={`Add ${product.name} to wishlist`}
            variant="outline"
            size="sm"
            className="bg-(--background)/90 backdrop-blur-sm"
          />
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="relative flex h-full items-center justify-center p-6"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-contain p-6"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-(--foreground-muted)">
          {product.brand}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-(--foreground) hover:text-(--primary)"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-current text-amber-500" />

          <span className="text-xs font-medium text-(--foreground)">
            {product.rating}
          </span>

          <span className="text-xs text-(--foreground-muted)">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-semibold text-(--foreground)">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <>
              <span className="text-xs text-(--foreground-muted) line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>

              <span className="text-xs font-medium text-(--discount)">
                {discount}% off
              </span>
            </>
          )}
        </div>

        {/* Add to cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-(--primary) px-3 text-sm font-medium text-(--primary-foreground) transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:bg-(--surface) disabled:text-(--foreground-muted)"
        >
          <ShoppingCart className="h-4 w-4" />

          {!product.inStock
            ? "Out of Stock"
            : added
              ? "Added to Cart ✓"
              : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

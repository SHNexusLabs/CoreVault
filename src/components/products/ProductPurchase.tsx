"use client";

import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { useCartStore } from "@/store/cart";
import type { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlist";

interface ProductPurchaseProps {
  product: Product;
}

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  const toggleWishlist = useWishlistStore((state) => state.toggleItem);

  const wishlisted = useWishlistStore((state) =>
    state.isWishlisted(product.id),
  );

  const wishlistHydrated = useWishlistStore((state) => state.hasHydrated);

  const wishlistActive = wishlistHydrated && wishlisted;

  const [added, setAdded] = useState(false);

  const maxQuantity = product.stockCount ?? 1;

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(maxQuantity, current + 1));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  if (!product.inStock) {
    return (
      <div className="mt-8 rounded-lg border border-(--border) bg-(--surface) p-4">
        <p className="text-sm font-medium text-(--foreground)">
          This product is currently unavailable.
        </p>

        <button
          type="button"
          className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-md border border-(--border) px-4 text-sm font-medium text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)"
        >
          Notify Me When Available
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Quantity + Wishlist */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 items-center rounded-md border border-(--border) bg-(--surface)">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-full w-10 items-center justify-center text-(--foreground-secondary) transition-colors hover:text-(--foreground) disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span
            className="flex w-10 justify-center text-sm font-medium text-(--foreground)"
            aria-label={`Quantity ${quantity}`}
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={quantity >= maxQuantity}
            aria-label="Increase quantity"
            className="flex h-full w-10 items-center justify-center text-(--foreground-secondary) transition-colors hover:text-(--foreground) disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            wishlistActive ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={wishlistActive}
          className={`flex h-11 w-11 items-center justify-center rounded-md border transition-colors ${
            wishlistActive
              ? "border-(--primary) text-(--primary)"
              : "border-(--border) text-(--foreground-muted) hover:border-(--primary) hover:text-(--primary)"
          }`}
        >
          <Heart
            className="h-5 w-5"
            fill={wishlistActive ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Add to Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
      >
        <ShoppingCart className="h-4 w-4" />

        {added ? "Added to Cart ✓" : "Add to Cart"}
      </button>

      {/* Buy Now */}
      <button
        type="button"
        className="inline-flex h-12 w-full items-center justify-center rounded-md border border-(--border) bg-(--surface) px-5 text-sm font-semibold text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)"
      >
        Buy Now
      </button>

      {/* Availability note */}
      {product.stockCount !== undefined && (
        <p className="text-center text-xs text-(--foreground-muted)">
          Only {product.stockCount} left in stock
        </p>
      )}
    </div>
  );
}

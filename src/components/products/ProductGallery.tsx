"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentImage = images[selectedImage] ?? product.image;

  const previousImage = useCallback(() => {
    setSelectedImage((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }, [images.length]);

  const nextImage = useCallback(() => {
    setSelectedImage((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, previousImage, nextImage]);

  useEffect(() => {
    if (!lightboxOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <>
      <div className="space-y-4">
        {/* Main image */}
        <div className="group relative aspect-square overflow-hidden rounded-xl border border-(--border) bg-(--surface)">
          {product.badge && (
            <span className="absolute left-4 top-4 z-10 rounded-md bg-(--primary) px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-(--primary-foreground)">
              {product.badge}
            </span>
          )}

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 z-10 flex items-end justify-end p-4"
            aria-label="Enlarge product image"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-(--border) bg-(--background)/90 text-(--foreground-muted) opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-4 w-4" />
            </span>
          </button>

          <Image
            src={currentImage}
            alt={`${product.name} product image ${selectedImage + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {images.map((image, index) => {
              const selected = index === selectedImage;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-current={selected}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-(--surface) transition-colors ${
                    selected
                      ? "border-(--primary)"
                      : "border-(--border) hover:border-(--primary)"
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image viewer`}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close image viewer"
            onClick={() => setLightboxOpen(false)}
            className="absolute inset-0 cursor-default"
          />

          {/* Close */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Previous */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Large image */}
          <div className="relative z-10 h-[80vh] w-full max-w-5xl">
            <Image
              src={currentImage}
              alt={`${product.name} enlarged image ${selectedImage + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white">
              {selectedImage + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}

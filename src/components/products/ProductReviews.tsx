import { Star } from "lucide-react";

import type { Product } from "@/types/product";

interface ProductReviewsProps {
  product: Product;
}

const demoReviews = [
  {
    id: "review-1",
    name: "Rahul S.",
    rating: 5,
    date: "2 weeks ago",
    title: "Excellent processor",
    content:
      "Great performance and very efficient. Installation was straightforward and the processor runs smoothly under load.",
  },
  {
    id: "review-2",
    name: "Amit P.",
    rating: 5,
    date: "1 month ago",
    title: "Great value",
    content:
      "Very happy with the performance. Perfect for my new AM5 build and gaming performance is excellent.",
  },
  {
    id: "review-3",
    name: "Karan M.",
    rating: 4,
    date: "2 months ago",
    title: "Solid upgrade",
    content:
      "Good overall processor with strong multi-core performance. Thermals have also been easy to manage.",
  },
];

function RatingStars({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={size === "md" ? "h-5 w-5" : "h-3.5 w-3.5"}
          fill={index < Math.round(rating) ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <section className="mt-12 border-t border-(--border) pt-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Customer feedback
        </p>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-(--foreground) sm:text-2xl">
          Customer Reviews
        </h2>
      </div>

      {/* Rating summary */}
      <div className="mt-6 grid gap-6 rounded-lg border border-(--border) bg-(--surface) p-5 sm:grid-cols-[180px_1fr]">
        <div className="flex flex-col items-center justify-center border-b border-(--border) pb-5 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
          <span className="text-4xl font-bold tracking-tight text-(--foreground)">
            {product.rating.toFixed(1)}
          </span>

          <RatingStars rating={product.rating} size="md" />

          <span className="mt-2 text-xs text-(--foreground-muted)">
            Based on {product.reviewCount} reviews
          </span>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const percentage =
              rating === 5 ? 72 : rating === 4 ? 20 : rating === 3 ? 6 : 1;

            return (
              <div key={rating} className="flex items-center gap-3 text-xs">
                <span className="w-8 text-(--foreground-muted)">
                  {rating} ★
                </span>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-(--border)">
                  <div
                    className="h-full rounded-full bg-(--primary)"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <span className="w-8 text-right text-(--foreground-muted)">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-6 divide-y divide-(--border) border-y border-(--border)">
        {demoReviews.map((review) => (
          <article key={review.id} className="py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-(--foreground)">
                    {review.name}
                  </span>

                  <span className="text-xs text-(--foreground-muted)">
                    Verified purchase
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <RatingStars rating={review.rating} />

                  <span className="text-xs text-(--foreground-muted)">
                    {review.date}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="mt-4 text-sm font-semibold text-(--foreground)">
              {review.title}
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-(--foreground-secondary)">
              {review.content}
            </p>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="mt-5 inline-flex h-10 items-center justify-center rounded-md border border-(--border) px-4 text-sm font-medium text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)"
      >
        View all {product.reviewCount} reviews
      </button>
    </section>
  );
}

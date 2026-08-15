import type { CartItem } from "@/types/cart";

interface CheckoutSummaryProps {
  items: CartItem[];
  shippingCost: number;
  total: number;
}

export function CheckoutSummary({
  items,
  shippingCost,
  total,
}: CheckoutSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <aside className="rounded-lg border border-(--border) bg-(--background) p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-(--foreground)">
        Order Summary
      </h2>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between gap-4">
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-medium text-(--foreground)">
                {item.product.name}
              </p>

              <p className="mt-1 text-xs text-(--foreground-muted)">
                Qty: {item.quantity}
              </p>
            </div>

            <span className="shrink-0 text-sm font-medium text-(--foreground)">
              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-(--border) pt-5">
        <div className="flex justify-between text-sm">
          <span className="text-(--foreground-muted)">Subtotal</span>

          <span className="font-medium text-(--foreground)">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-(--foreground-muted)">Shipping</span>

          <span className="font-medium text-(--foreground)">
            {shippingCost === 0
              ? "FREE"
              : `₹${shippingCost.toLocaleString("en-IN")}`}
          </span>
        </div>

        <div className="flex justify-between border-t border-(--border) pt-4">
          <span className="font-semibold text-(--foreground)">Total</span>

          <span className="text-lg font-semibold text-(--foreground)">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </aside>
  );
}

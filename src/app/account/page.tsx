"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  Package,
  Shield,
  User,
} from "lucide-react";

import { useOrderStore } from "@/store/orders";

const navigation = [
  {
    href: "/account",
    label: "Overview",
    icon: User,
  },
  {
    href: "/account/orders",
    label: "Orders",
    icon: Package,
  },
  {
    href: "/account/addresses",
    label: "Addresses",
    icon: MapPin,
  },
  {
    href: "/account/wishlist",
    label: "Wishlist",
    icon: Heart,
  },
  {
    href: "/account/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/account/security",
    label: "Security",
    icon: Shield,
  },
];

export default function AccountPage() {
  const orders = useOrderStore((state) => state.orders);

  const recentOrders = [...orders].reverse().slice(0, 3);

  const wishlistCount = 0;
  const reviewsCount = 0;

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight text-(--foreground)">
          My Account
        </h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-[208px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside>
            {/* User card */}
            <div className="rounded-xl border border-(--border) bg-(--surface) p-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--primary) text-lg font-semibold text-(--primary-foreground)">
                A
              </div>

              <h2 className="mt-3 text-sm font-semibold text-(--foreground)">
                Account User
              </h2>

              <p className="mt-1 truncate text-xs text-(--foreground-muted)">
                user@example.com
              </p>
            </div>

            {/* Navigation */}
            <nav className="mt-3 overflow-hidden rounded-xl border border-(--border) bg-(--background)">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const active = index === 0;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex h-12 items-center gap-3 border-b border-(--border) px-4 text-sm transition-colors last:border-b-0 ${
                      active
                        ? "bg-(--primary-soft) text-(--primary)"
                        : "text-(--foreground-secondary) hover:bg-(--surface)"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />

                    <span className="flex-1">{item.label}</span>

                    <ChevronRight className="h-4 w-4 text-(--foreground-muted)" />
                  </Link>
                );
              })}

              <button
                type="button"
                className="flex h-12 w-full items-center gap-3 px-4 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut className="h-4 w-4" />

                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <section className="min-w-0">
            {/* Statistics */}
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard value={orders.length} label="Total Orders" />

              <StatCard value={wishlistCount} label="Wishlist Items" />

              <StatCard value={reviewsCount} label="Reviews Given" />
            </div>

            {/* Recent orders */}
            <div className="mt-4 rounded-xl border border-(--border) bg-(--surface) p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-(--foreground)">
                  Recent Orders
                </h2>

                {orders.length > 0 && (
                  <Link
                    href="/account/orders"
                    className="text-sm font-medium text-(--primary) hover:underline"
                  >
                    View all →
                  </Link>
                )}
              </div>

              {recentOrders.length === 0 ? (
                <div className="py-12 text-center">
                  <Package className="mx-auto h-8 w-8 text-(--foreground-muted)" />

                  <p className="mt-3 text-sm font-medium text-(--foreground)">
                    No orders yet
                  </p>

                  <p className="mt-1 text-xs text-(--foreground-muted)">
                    Your recent orders will appear here.
                  </p>

                  <Link
                    href="/products"
                    className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-(--primary) px-4 text-sm font-semibold text-(--primary-foreground)"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="mt-4 divide-y divide-(--border)">
                  {recentOrders.map((order) => {
                    const firstItem = order.items[0];

                    return (
                      <div
                        key={order.id}
                        className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-(--foreground)">
                              #{order.id}
                            </span>

                            <span className="text-xs text-(--foreground-muted)">
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-IN",
                              )}
                            </span>
                          </div>

                          {firstItem && (
                            <div className="mt-3 flex items-center gap-3">
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-(--background)">
                                <Image
                                  src={firstItem.product.image}
                                  alt={firstItem.product.name}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-contain"
                                />
                              </div>

                              <div className="min-w-0">
                                <p className="line-clamp-1 text-sm font-medium text-(--foreground)">
                                  {firstItem.product.name}
                                </p>

                                {order.items.length > 1 && (
                                  <p className="mt-1 text-xs text-(--foreground-muted)">
                                    +{order.items.length - 1} more{" "}
                                    {order.items.length === 2
                                      ? "item"
                                      : "items"}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-2">
                          <span className="rounded-full bg-(--primary-soft) px-2.5 py-1 text-xs font-medium text-(--primary)">
                            Placed
                          </span>

                          <span className="text-sm font-semibold text-(--foreground)">
                            ₹{order.total.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-(--border) bg-(--surface) px-4 py-4 text-center">
      <p className="text-2xl font-bold text-(--primary)">{value}</p>

      <p className="mt-1 text-xs text-(--foreground-muted)">{label}</p>
    </div>
  );
}

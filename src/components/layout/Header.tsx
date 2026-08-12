"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";

import { Container, IconButton } from "@/components/ui";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "PC Builder", href: "/pc-builder" },
  { label: "Deals", href: "/deals" },
  { label: "Brands", href: "/brands" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-(--background)/95 backdrop-blur-sm">
      {/* Announcement */}
      <div className="hidden bg-(--primary) text-(--primary-foreground) sm:block">
        <Container className="flex h-8 items-center justify-center text-xs font-medium">
          Free shipping on orders over ₹2,000
        </Container>
      </div>

      {/* Main header */}
      <div className="h-16">
        <Container className="flex h-full items-center gap-4">
          {/* Mobile menu */}
          <div className="lg:hidden">
            <IconButton
              icon={
                mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )
              }
              label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((value) => !value)}
            />
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="TechStore home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-(--primary) text-sm font-bold text-(--primary-foreground)">
              T
            </div>

            <span className="hidden text-lg font-semibold tracking-tight text-(--foreground) sm:block">
              TechStore
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-(--foreground-secondary) transition-colors hover:bg-(--surface) hover:text-(--foreground)"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="relative ml-auto hidden min-w-0 flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--foreground-muted)" />

            <input
              type="search"
              placeholder="Search products..."
              className="h-10 w-full rounded-md border border-(--border) bg-(--surface) pl-9 pr-4 text-sm text-(--foreground) outline-none placeholder:text-(--foreground-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--focus-ring)"
            />
          </div>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1">
            <Link href="/wishlist">
              <IconButton
                icon={<Heart className="h-4.5 w-4.5" />}
                label="Wishlist"
              />
            </Link>

            <Link href="/cart" className="relative">
              <IconButton
                icon={<ShoppingCart className="h-4.5 w-4.5" />}
                label="Shopping cart"
              />

              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-(--discount) px-1 text-[10px] font-semibold text-white">
                0
              </span>
            </Link>

            <Link href="/account" className="hidden sm:block">
              <IconButton
                icon={<User className="h-4.5 w-4.5" />}
                label="Account"
              />
            </Link>
          </div>
        </Container>
      </div>

      {/* Mobile search */}
      <div className="border-t border-(--border) px-4 py-3 md:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--foreground-muted)" />

          <input
            type="search"
            placeholder="Search products..."
            className="h-10 w-full rounded-md border border-(--border) bg-(--surface) pl-9 pr-4 text-sm text-(--foreground) outline-none placeholder:text-(--foreground-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--focus-ring)"
          />
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-(--border) bg-(--background) lg:hidden">
          <Container className="py-3">
            <nav className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-(--foreground-secondary) hover:bg-(--surface) hover:text-(--foreground)"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center gap-2 border-t border-(--border) px-3 py-3 text-sm font-medium text-(--foreground-secondary)"
              >
                <User className="h-4 w-4" />
                Account
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { SiFacebook, SiGithub, SiInstagram } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";

import { Container } from "@/components/ui";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "PC Components", href: "/products?category=components" },
  { label: "Graphics Cards", href: "/products?category=graphics-cards" },
  { label: "Processors", href: "/products?category=processors" },
  { label: "Peripherals", href: "/products?category=peripherals" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping Information", href: "/shipping" },
  { label: "Returns & Refunds", href: "/returns" },
  { label: "Warranty", href: "/warranty" },
  { label: "FAQ", href: "/faq" },
];

const accountLinks = [
  { label: "My Account", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "PC Builder", href: "/pc-builder" },
];

export function Footer() {
  return (
    <footer className="border-t border-(--border) bg-(--surface)">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:py-14">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="TechStore home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-(--primary) text-sm font-bold text-(--primary-foreground)">
                T
              </div>

              <span className="text-lg font-semibold tracking-tight text-(--foreground)">
                TechStore
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-(--foreground-secondary)">
              A modern technology store for PC components, peripherals,
              electronics, and custom PC builds.
            </p>

            <div className="mt-5 space-y-2.5 text-xs text-(--foreground-muted)">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                support@techstore.example
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                +91 00000 00000
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                India
              </div>
            </div>
          </div>

          {/* Shop */}
          <FooterColumn title="Shop" links={shopLinks} />

          {/* Support */}
          <FooterColumn title="Support" links={supportLinks} />

          {/* Account */}
          <FooterColumn title="Account" links={accountLinks} />
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-(--border) py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-(--foreground-muted)">
            © {new Date().getFullYear()} TechStore. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <SocialButton
              label="GitHub"
              icon={<SiGithub className="h-4 w-4" />}
            />

            <SocialButton
              label="Instagram"
              icon={<SiInstagram className="h-4 w-4" />}
            />

            <SocialButton
              label="Twitter"
              icon={<FaTwitter className="h-4 w-4" />}
            />

            <SocialButton
              label="Facebook"
              icon={<SiFacebook className="h-4 w-4" />}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-(--foreground)">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs text-(--foreground-secondary) transition-colors hover:text-(--primary)"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SocialButtonProps {
  label: string;
  icon: React.ReactNode;
}

function SocialButton({ label, icon }: SocialButtonProps) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-(--border) text-(--foreground-muted) transition-colors hover:border-(--primary) hover:text-(--primary)"
    >
      {icon}
    </a>
  );
}
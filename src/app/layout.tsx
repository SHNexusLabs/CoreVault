import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CoreVault",
    template: "%s | CoreVault",
  },
  description:
    "Shop PC components, electronics, peripherals, and technology products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={inter.variable}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { ThemeProvider } from "../components/theme/ThemeProvider";

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
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
      (() => {
        const storedTheme = localStorage.getItem("corevault-theme");

        if (storedTheme === "dark" || storedTheme === "light") {
          document.documentElement.dataset.theme = storedTheme;
          return;
        }

        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        document.documentElement.dataset.theme =
          prefersDark ? "dark" : "light";
      })();
    `,
          }}
        />
      </head>
      <body className={inter.variable}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

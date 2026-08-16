import type { Metadata } from "next";
import Script from "next/script";
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
        <Script id="theme-initializer" strategy="beforeInteractive">
          {`
          (() => {
            const storedTheme = localStorage.getItem("corevault-theme");

            const theme =
              storedTheme === "dark" || storedTheme === "light"
                ? storedTheme
                : window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "dark"
                  : "light";

            document.documentElement.classList.toggle(
              "dark",
              theme === "dark"
            );
          })();
        `}
        </Script>
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

"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

let currentTheme: Theme = "light";

const listeners = new Set<() => void>();

let initialized = false;

function getTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  if (!initialized) {
    const storedTheme = localStorage.getItem("corevault-theme");

    if (storedTheme === "dark" || storedTheme === "light") {
      currentTheme = storedTheme;
    } else {
      currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    document.documentElement.classList.toggle("dark", currentTheme === "dark");

    initialized = true;
  }

  return currentTheme;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getServerSnapshot(): Theme {
  return "light";
}

function setTheme(theme: Theme) {
  currentTheme = theme;

  if (typeof window !== "undefined") {
    localStorage.setItem("corevault-theme", theme);

    document.documentElement.classList.toggle("dark", theme === "dark");
  }

  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerSnapshot);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

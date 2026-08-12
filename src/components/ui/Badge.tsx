import type { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "discount";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--primary-soft)] text-[var(--primary)]",
  success:
    "bg-[var(--success-soft)] text-[var(--success)]",
  warning:
    "bg-[var(--warning-soft)] text-[var(--warning)]",
  error:
    "bg-[var(--error-soft)] text-[var(--error)]",
  discount:
    "bg-[var(--discount-soft)] text-[var(--discount)]",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center",
        "rounded-full",
        "px-2 py-0.5",
        "text-xs font-medium",
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonVariant = "default" | "ghost" | "outline";

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  variant?: IconButtonVariant;
  size?: "sm" | "md" | "lg";
}

const variants: Record<IconButtonVariant, string> = {
  default:
    "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]",
  ghost:
    "bg-transparent text-[var(--foreground-secondary)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]",
  outline:
    "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)]",
};

const sizes = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};

export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={[
        "inline-flex shrink-0 items-center justify-center",
        "rounded-[var(--radius-md)]",
        "transition-colors duration-200",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[var(--primary)]",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon}
    </button>
  );
}
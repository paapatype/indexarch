"use client";

import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
}

const base =
  "inline-flex items-center justify-center font-sans font-medium transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-sand-50 px-7 py-3.5 text-sm tracking-wide hover:bg-ink-light active:scale-[0.98]",
  secondary:
    "border border-ink text-ink px-7 py-3.5 text-sm tracking-wide hover:bg-ink hover:text-sand-50 active:scale-[0.98]",
  ghost:
    "text-ink-muted text-sm tracking-wide hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-ink",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

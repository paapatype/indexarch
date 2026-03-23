"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import Button from "./Button";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  popular: boolean;
  features: readonly string[];
  cta: string;
}

export default function PricingCard({
  name,
  price,
  period,
  popular,
  features,
  cta,
}: PricingCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative flex flex-col border p-8 lg:p-10 transition-shadow duration-300 hover:shadow-card-hover ${
        popular
          ? "border-ink bg-surface-raised shadow-card"
          : "border-rule bg-surface-raised"
      }`}
    >
      {popular && (
        <span className="absolute -top-3.5 left-8 bg-ink text-sand-50 px-4 py-1 font-mono text-xs tracking-widest uppercase">
          Most Popular
        </span>
      )}

      <div className="mb-8">
        <h3 className="font-sans text-base font-semibold text-ink-muted uppercase tracking-wider mb-4">
          {name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl lg:text-4xl font-medium text-ink">
            {price}
          </span>
        </div>
        <p className="font-mono text-xs text-ink-muted mt-1">{period}</p>
      </div>

      <ul className="flex-1 space-y-3 mb-10">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-ink-light"
          >
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-signal"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3 8 7 12 13 4" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={popular ? "primary" : "secondary"}
        href="#contact"
        className="w-full justify-center"
      >
        {cta}
      </Button>
    </motion.div>
  );
}

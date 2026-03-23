"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface StatCardProps {
  value: string;
  label: string;
}

function parseNumeric(value: string): { prefix: string; num: number; suffix: string } | null {
  const match = value.match(/^([+\-]?)(\d+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3] ? ` ${match[3]}`.trimEnd() : "",
  };
}

export default function StatCard({ value, label }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;
    const parsed = parseNumeric(value);
    if (!parsed) {
      setDisplay(value);
      return;
    }

    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentNum = parsed.num * eased;

      const formatted = parsed.num % 1 !== 0
        ? currentNum.toFixed(1)
        : Math.round(currentNum).toString();

      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);

      if (current >= steps) {
        clearInterval(timer);
        setDisplay(value);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="stat-cell">
      <div className="stat-number">{display}</div>
      <p className="stat-label">{label}</p>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative border border-rule bg-surface-raised p-8 transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="mb-6 h-16 w-16 text-ink-muted transition-colors duration-300 group-hover:text-ink">
        {icon}
      </div>
      <h3 className="font-sans text-lg font-semibold text-ink mb-2">{title}</h3>
      <p className="font-sans text-sm leading-relaxed text-ink-muted">{description}</p>
    </motion.div>
  );
}

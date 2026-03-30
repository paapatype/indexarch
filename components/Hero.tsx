"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Button from "./ui/Button";
import { HERO } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid — starts from top, fades out toward bottom, behind everything */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-rule-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-rule-light) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, transparent 80%)",
        }}
      />

      <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8 pt-[var(--header-height)]">
        {/* Centered content */}
        <motion.div
          className="flex flex-col items-center text-center py-20 lg:py-28"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs tracking-widest uppercase text-ink-faint mb-8"
          >
            For manufacturers who sell to technical buyers
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-[3.4rem] sm:text-[4.2rem] lg:text-[5.7rem] leading-[1.08] text-ink"
          >
            <span className="block">Your catalogue is</span>
            <span className="block pl-7 sm:pl-10 lg:pl-14">losing you deals.</span>
          </motion.h1>


          <motion.p
            variants={fadeUp}
            className="mt-12 lg:mt-16 max-w-xl text-lg leading-relaxed text-ink-muted whitespace-pre-line"
          >
            {HERO.subheading}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button variant="primary" href="#contact">
              {HERO.ctaPrimary}
            </Button>
            <Button variant="secondary" href="#process">
              {HERO.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

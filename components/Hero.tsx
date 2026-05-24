"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Button from "./ui/Button";
import TileGrid from "./TileGrid";
import { HERO } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid — flips tile-by-tile on theme change, fades out toward bottom */}
      <TileGrid className="-z-10" />

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
            {/* Mobile: hard-break after "sell" so "buyers" never sits
                alone on its own line. Desktop keeps the eyebrow on
                one line. */}
            <span className="sm:hidden">
              For manufacturers who sell
              <br />
              to technical buyers
            </span>
            <span className="hidden sm:inline">
              For manufacturers who sell to technical buyers
            </span>
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-[3.1rem] sm:text-[4.2rem] lg:text-[5.7rem] leading-[1.15] sm:leading-[1.1] lg:leading-[1.08] text-ink"
          >
            <span className="block">Your catalogue is</span>
            <span className="block pl-7 sm:pl-10 lg:pl-14">losing you deals.</span>
          </motion.h1>


          <motion.p
            variants={fadeUp}
            className="mt-12 lg:mt-16 max-w-xl text-base sm:text-lg leading-relaxed text-ink-muted"
          >
            {/* Mobile: forced break after "a week" keeps the first
                sentence on a controlled two visual lines. Desktop
                lets the sentence flow naturally and only breaks
                between the two sentences. */}
            Technical buyers spend 10+ hours a week
            <span className="hidden sm:inline"> </span>
            <br className="sm:hidden" />
            digging through PDFs.
            <br />
            We cut that to minutes.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button variant="primary" href="#example">
              {HERO.ctaPrimary}
            </Button>
            <Button variant="secondary" href="#how-it-works">
              {HERO.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

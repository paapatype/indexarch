"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import Accordion from "./ui/Accordion";
import { FAQ as FAQ_DATA } from "@/lib/constants";

export default function FAQ() {
  return (
    <section className="py-section-sm lg:py-section bg-surface-sunken relative">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — Heading */}
          <motion.div
            className="lg:col-span-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-ink sticky top-[calc(var(--header-height)+2rem)]">
              {FAQ_DATA.heading}
            </h2>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div
            className="lg:col-span-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <Accordion items={FAQ_DATA.items} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

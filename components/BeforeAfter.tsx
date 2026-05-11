"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { BEFORE_AFTER } from "@/lib/constants";
import LiveDemo, { DemoGuide } from "./LiveDemo";

const PDF_PAGES = [1, 2, 3, 4] as const;

// PDF carousel — one page visible at a time, prev/next buttons cycle.
// Real screenshots of the K&K catalogue (rendered with PyMuPDF into
// public/kayu-kov/), so the BEFORE side feels like the actual artefact
// the client sent us.
function PdfCarousel() {
  const [page, setPage] = useState(1);
  const prev = () => setPage((p) => (p === 1 ? PDF_PAGES.length : p - 1));
  const next = () => setPage((p) => (p === PDF_PAGES.length ? 1 : p + 1));

  return (
    <div className="relative">
      {/* PDF page */}
      <div className="relative aspect-[1241/1754] bg-surface-raised border border-rule shadow-card overflow-hidden">
        {PDF_PAGES.map((n) => (
          <div
            key={n}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: n === page ? 1 : 0 }}
          >
            <Image
              src={`/kayu-kov/page-${n}.png`}
              alt={`Kayu & Kov original PDF — page ${n}`}
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-top"
              priority={n === 1}
            />
          </div>
        ))}
      </div>

      {/* Carousel controls — pinned bottom, hairline + page counter */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous PDF page"
          className="flex h-9 w-9 items-center justify-center border border-rule text-ink-muted transition-colors hover:border-ink-faint hover:text-ink cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="11" y1="7" x2="3" y2="7" />
            <polyline points="7,3 3,7 7,11" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {PDF_PAGES.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-label={`Go to page ${n}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                n === page ? "w-6 bg-ink" : "w-1.5 bg-rule hover:bg-ink-faint"
              }`}
            />
          ))}
          <span className="ml-3 font-mono text-xs text-ink-faint tracking-wide">
            {page} / {PDF_PAGES.length}
          </span>
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next PDF page"
          className="flex h-9 w-9 items-center justify-center border border-rule text-ink-muted transition-colors hover:border-ink-faint hover:text-ink cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="3" y1="7" x2="11" y2="7" />
            <polyline points="7,3 11,7 7,11" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function BeforePanel() {
  return (
    <motion.div variants={fadeUp} className="flex flex-col">
      <div className="flex items-baseline justify-between mb-5">
        <span className="font-mono text-sm tracking-[0.18em] uppercase text-ink-muted">
          Before
        </span>
        <span className="font-mono text-xs text-ink-faint">
          {BEFORE_AFTER.beforeMeta}
        </span>
      </div>
      <PdfCarousel />
      <p className="mt-4 font-mono text-xs text-ink-faint tracking-wide">
        {BEFORE_AFTER.beforeLabel}
      </p>
    </motion.div>
  );
}

function AfterPanel() {
  return (
    <motion.div variants={fadeUp} className="flex flex-col">
      {/* Label row only — header gets just the AFTER label + meta, mirroring
          the BEFORE row. Demo guide + "See it in action" copy moves below. */}
      <div className="flex items-baseline justify-between mb-5">
        <span className="font-mono text-sm tracking-[0.18em] uppercase text-ink-muted">
          After
        </span>
        <span className="font-mono text-xs text-ink-faint">
          kayuandkov.com
        </span>
      </div>
      <LiveDemo />
      {/* Underneath the catalogue: heading + caption row, then the
          rotating step guide (instructions for what to try). */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
        <div>
          <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-1">
            Live demo
          </span>
          <h3 className="font-serif text-2xl lg:text-3xl text-ink">
            See it in action
          </h3>
        </div>
        <p className="text-sm text-ink-muted max-w-sm">
          {BEFORE_AFTER.afterCaption}
        </p>
      </div>
      <div className="hidden md:block">
        <DemoGuide />
      </div>
      <p className="mt-4 text-center font-mono text-xs text-ink-faint tracking-wide">
        A live catalogue built by IndexArch — 55 products with category filtering, instant search, and detailed product views.
      </p>
    </motion.div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="relative py-section-sm lg:py-section bg-surface-sunken">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-12 lg:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
              {BEFORE_AFTER.eyebrow}
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-ink leading-tight">
              {BEFORE_AFTER.heading}
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-7 text-sm lg:text-[0.95rem] text-ink-muted leading-relaxed lg:pt-14 max-w-xl"
          >
            {BEFORE_AFTER.body}
          </motion.p>
        </motion.div>

        {/* Side-by-side panels — static layout. BEFORE narrow on the left,
            K&K window wide on the right. Stacks single-column on mobile. */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="lg:col-span-3">
            <BeforePanel />
          </div>
          <div className="lg:col-span-9">
            <AfterPanel />
          </div>
        </motion.div>

        {/* Bottom CTA — link to full case study */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            href={BEFORE_AFTER.cta.href}
            className="inline-block font-sans text-sm text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
          >
            {BEFORE_AFTER.cta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { BEFORE_AFTER } from "@/lib/constants";
import { asset } from "@/lib/asset";
import LiveDemo, { DemoGuide } from "./LiveDemo";

const PDF_PAGES = [1, 2, 3, 4] as const;

// ─── Full-screen PDF lightbox ─────────────────────────────────────

interface PdfModalProps {
  page: number | null;
  onClose: () => void;
  onSetPage: (page: number) => void;
}

function PdfModal({ page, onClose, onSetPage }: PdfModalProps) {
  // ESC closes the modal.
  useEffect(() => {
    if (page === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onSetPage(page === 1 ? PDF_PAGES.length : page - 1);
      if (e.key === "ArrowRight") onSetPage(page === PDF_PAGES.length ? 1 : page + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, onClose, onSetPage]);

  // Lock body scroll while open.
  useEffect(() => {
    if (page === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [page]);

  return (
    <AnimatePresence>
      {page !== null && (
        <motion.div
          key="pdf-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-surface/90 backdrop-blur-md px-6 py-12"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90vh] w-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[1241/1754] h-[88vh] max-w-[90vw] bg-surface-raised border border-rule shadow-card-hover overflow-hidden">
              <Image
                src={asset(`/kayu-kov/page-${page}.png`)}
                alt={`Kayu & Kov PDF — page ${page}`}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
              {/* Prev / next arrows inside the lightbox */}
              <button
                type="button"
                onClick={() =>
                  onSetPage(page === 1 ? PDF_PAGES.length : page - 1)
                }
                aria-label="Previous PDF page"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface-raised/90 border border-rule text-ink-muted hover:text-ink hover:border-ink-faint transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="13" y1="8" x2="3" y2="8" />
                  <polyline points="7,4 3,8 7,12" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  onSetPage(page === PDF_PAGES.length ? 1 : page + 1)
                }
                aria-label="Next PDF page"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface-raised/90 border border-rule text-ink-muted hover:text-ink hover:border-ink-faint transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="8" x2="13" y2="8" />
                  <polyline points="9,4 13,8 9,12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-raised/90 border border-rule font-mono text-[11px] tracking-wide text-ink-faint">
                Page {page} of {PDF_PAGES.length}
              </div>
            </div>
            {/* Close button — top-right outside the page */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close PDF view"
              className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface-raised border border-rule text-ink-muted hover:text-ink hover:border-ink-faint transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="3" x2="11" y2="11" />
                <line x1="11" y1="3" x2="3" y2="11" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// PDF carousel — one page visible at a time, prev/next buttons cycle.
// Real screenshots of the K&K catalogue (rendered with PyMuPDF into
// public/kayu-kov/), so the BEFORE side feels like the actual artefact
// the client sent us.
const AUTOFLIP_MS = 2000;

interface PdfCarouselProps {
  onExpand: (page: number) => void;
}

function PdfCarousel({ onExpand }: PdfCarouselProps) {
  const [page, setPage] = useState(1);
  const [hovering, setHovering] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const prev = () =>
    setPage((p) => (p === 1 ? PDF_PAGES.length : p - 1));
  const next = () =>
    setPage((p) => (p === PDF_PAGES.length ? 1 : p + 1));

  // Auto-flip every AUTOFLIP_MS. Pause on hover so the user can read.
  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => {
      setPage((p) => (p === PDF_PAGES.length ? 1 : p + 1));
    }, AUTOFLIP_MS);
    return () => clearInterval(id);
  }, [hovering]);

  // Horizontal swipe → navigate pages (scoped to the carousel only).
  // `touch-action: pan-y` on the page container below tells the browser
  // we own horizontal gestures here, so vertical page scroll still
  // works as normal but the swipe doesn't drag the whole section.
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  return (
    <div
      // Fill the BEFORE column width — matches the deployed site's
      // layout where the PDF stretches across the narrow left column.
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* PDF page + overlaid prev/next arrows + page counter. */}
      <div
        className="relative aspect-[1241/1754] bg-surface-raised border border-rule shadow-card overflow-hidden group"
        style={{ touchAction: "pan-y" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {PDF_PAGES.map((n) => (
          <div
            key={n}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: n === page ? 1 : 0 }}
          >
            <Image
              src={asset(`/kayu-kov/page-${n}.png`)}
              alt={`Kayu & Kov original PDF — page ${n}`}
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-top"
              priority={n === 1}
            />
          </div>
        ))}

        {/* Prev arrow — pinned to the left edge, vertically centred. */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous PDF page"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface-raised/85 backdrop-blur-sm border border-rule text-ink-muted transition-all duration-300 hover:text-ink hover:border-ink-faint opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="11" y1="7" x2="3" y2="7" />
            <polyline points="7,3 3,7 7,11" />
          </svg>
        </button>

        {/* Next arrow — pinned to the right edge. */}
        <button
          type="button"
          onClick={next}
          aria-label="Next PDF page"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface-raised/85 backdrop-blur-sm border border-rule text-ink-muted transition-all duration-300 hover:text-ink hover:border-ink-faint opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="3" y1="7" x2="11" y2="7" />
            <polyline points="7,3 11,7 7,11" />
          </svg>
        </button>

        {/* Expand button — top-right corner, opens the lightbox. */}
        <button
          type="button"
          onClick={() => onExpand(page)}
          aria-label="Expand PDF to full size"
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface-raised/90 backdrop-blur-sm border border-rule text-ink-muted transition-all duration-300 hover:text-ink hover:border-ink-faint opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="3,6 3,3 6,3" />
            <polyline points="7,3 10,3 10,6" />
            <polyline points="10,7 10,10 7,10" />
            <polyline points="6,10 3,10 3,7" />
          </svg>
        </button>

        {/* Page dots + counter — overlaid at the bottom centre. */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-raised/85 backdrop-blur-sm border border-rule">
          {PDF_PAGES.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-label={`Go to page ${n}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                n === page ? "w-5 bg-ink" : "w-1.5 bg-rule hover:bg-ink-faint"
              }`}
            />
          ))}
          <span className="ml-1.5 font-mono text-[10px] text-ink-faint tracking-wide">
            {page}/{PDF_PAGES.length}
          </span>
        </div>
      </div>
    </div>
  );
}

interface PanelProps {
  onExpandPdf: (page: number) => void;
}

function BeforePanel({ onExpandPdf }: PanelProps) {
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
      <PdfCarousel onExpand={onExpandPdf} />
      <p className="mt-4 font-mono text-xs text-ink-faint tracking-wide">
        {BEFORE_AFTER.beforeLabel}
      </p>
    </motion.div>
  );
}

function AfterPanel() {
  return (
    <motion.div variants={fadeUp} className="flex flex-col">
      {/* Label row mirrors the BEFORE panel: AFTER on the left, the
          external Visit link on the right. */}
      <div className="flex items-baseline justify-between mb-5">
        <span className="font-mono text-sm tracking-[0.18em] uppercase text-ink-muted">
          After
        </span>
        <a
          href={BEFORE_AFTER.afterLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm tracking-[0.18em] uppercase text-ink-muted hover:text-ink transition-colors"
        >
          {BEFORE_AFTER.afterLink.label}
        </a>
      </div>
      {/* DemoGuide first — the rotating instruction strip sits ABOVE
          the iframe so users see what to try before the catalogue
          loads (matches the screenshot). */}
      <div className="hidden md:block mb-4">
        <DemoGuide />
      </div>
      <LiveDemo />
    </motion.div>
  );
}

export default function BeforeAfter() {
  // Lift the PDF-lightbox state to the section so both the BEFORE
  // carousel and the inline strip above the iframe can open the same
  // modal.
  const [modalPage, setModalPage] = useState<number | null>(null);
  const handleExpand = useCallback((p: number) => setModalPage(p), []);
  const handleClose = useCallback(() => setModalPage(null), []);

  return (
    <section
      id="example"
      className="relative py-section-sm lg:py-section bg-surface-sunken"
    >
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-12 lg:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="lg:col-span-7 text-center lg:text-left">
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-6 lg:mb-8">
              {BEFORE_AFTER.eyebrow}
            </span>
            <h2 className="font-serif text-[2rem] sm:text-4xl lg:text-5xl xl:text-[3.5rem] text-ink leading-[1.18] lg:leading-[1.1]">
              {BEFORE_AFTER.headingLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </motion.div>
          {/* Right column — Live Demo eyebrow (split into primary +
              secondary tones, matching the screenshot) above the
              body paragraph that introduces the demo. */}
          <motion.div variants={fadeUp} className="lg:col-span-5 lg:pt-[0.4rem]">
            <span className="block font-mono text-xs tracking-widest uppercase mb-6 lg:mb-8">
              <span className="text-ink">{BEFORE_AFTER.liveDemoEyebrow.primary}</span>
              <span className="text-ink-faint">
                {"  "}
                {BEFORE_AFTER.liveDemoEyebrow.secondary}
              </span>
            </span>
            <p
              className="text-base lg:text-lg text-ink-muted leading-relaxed max-w-md"
              style={{ textWrap: "pretty" as never }}
            >
              {BEFORE_AFTER.body}
            </p>
            {/* Mirror of the Methodology section's skip-link — for
                visitors who landed here from the example and want to
                see the approach that produced it. */}
            <p className="mt-5">
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 font-sans text-sm text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
              >
                <span aria-hidden>←</span>
                Back to how it works
              </a>
            </p>
          </motion.div>
        </motion.div>

        {/* Side-by-side — BEFORE narrow on the left (PDF carousel),
            AFTER wide on the right (live demo + instructions). Stacks
            single-column on mobile. */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="lg:col-span-3">
            <BeforePanel onExpandPdf={handleExpand} />
          </div>
          <div className="lg:col-span-9">
            <AfterPanel />
          </div>
        </motion.div>

        {/* Lightbox modal — rendered once at the section root, opened
            from either the BEFORE carousel or the inline mini-strip. */}
        <PdfModal
          page={modalPage}
          onClose={handleClose}
          onSetPage={setModalPage}
        />

        {/* Bottom strip — mobile gets the DemoGuide here (desktop has
            it above the iframe inside AfterPanel and hides this copy)
            with the "Read the full story" link as a tight follow-on
            right underneath. Centering on mobile matches the rest of
            the section's mobile heading treatment. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 lg:mt-14"
        >
          <div className="md:hidden mb-5">
            <DemoGuide />
          </div>
          <div className="text-center">
            <Link
              href={BEFORE_AFTER.cta.href}
              className="inline-block font-sans text-sm text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
            >
              {BEFORE_AFTER.cta.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

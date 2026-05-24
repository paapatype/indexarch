"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Button from "./ui/Button";

// ─── Content ───────────────────────────────────────────────────────
// Kept inline because this is a single bespoke section, not a
// data-driven list. The copy is the entire point of the section —
// pulling it into lib/constants would only add indirection.

const EYEBROW = "Pricing";
const HEADLINE = "It costs less than the deals you’re already losing.";
const SUBHEAD =
  "One project, one-time. We build your catalogue into a sales engine end-to-end — and the next step is a conversation, not a checkout.";

const PRICE_BAND = {
  caption: "Most projects land between",
  rangeLow: "$2,000",
  rangeHigh: "$6,000",
  qualifier: "(one-time)",
  paragraph:
    "Where you fall comes down mostly to how many products you carry — and how deep the spec filtering and variation go inside your range. We scope it exactly on the call — no surprises, no subscriptions quietly stacking up.",
};

const CALCULATOR_LEAD =
  "Read as a line item, it looks like a cost. Read against your order book, it looks like a few extra deals. Move the sliders to your own numbers:";

// Midpoint of the $2k–$6k band. Used both in the payback math and
// disclosed in the caption beneath the result cards.
const PROJECT_COST = 4000;

const CTA = {
  heading: "Every project starts with a call.",
  body:
    "There’s no buy button — and there shouldn’t be. We spend 30 minutes on your range, your buyers, and where deals are leaking, then scope the project exactly. You’ll have a clear number before anything starts.",
  button: "Book a 30-minute call",
  // Same destination the Nav's "Get Started" primary CTA uses. The
  // contact form IS the booking experience on this site.
  href: "#contact",
};

// USD formatter — whole dollars, comma-grouped, no decimals. Used
// everywhere a figure renders so the slider readout, the calculator
// caption, and the result cards all match.
const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

// ─── Section ───────────────────────────────────────────────────────

export default function Pricing() {
  // useId so the <label htmlFor> wiring is collision-safe under React
  // strict-mode double-renders and any future SSR/Suspense boundary
  // changes.
  const orderId = useId();
  const dealsId = useId();

  const [orderValue, setOrderValue] = useState(5000); // USD, step 500, 1k–50k
  const [extraDeals, setExtraDeals] = useState(1); // 1–10 per month

  // Derived figures. Recomputed only when a slider moves so the
  // result-card render stays cheap.
  const { extraAnnual, paybackDeals, firstYearReturn } = useMemo(() => {
    const extraAnnualV = orderValue * extraDeals * 12;
    const paybackDealsV = Math.max(1, Math.ceil(PROJECT_COST / orderValue));
    const firstYearReturnV = Math.round(extraAnnualV / PROJECT_COST);
    return {
      extraAnnual: extraAnnualV,
      paybackDeals: paybackDealsV,
      firstYearReturn: firstYearReturnV,
    };
  }, [orderValue, extraDeals]);

  return (
    <section
      id="pricing"
      className="relative py-section-sm lg:py-section bg-surface-sunken"
    >
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* ── Header — asymmetric editorial grid ───────────────── */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-12 lg:mb-16 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={fadeUp}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
              {EYEBROW}
            </span>
            {/* text-wrap: balance distributes the words evenly across
                whatever line count the column actually fits — kills
                the "losing." orphan that the natural wrap produces in
                the col-span-7 width at lg:text-5xl. Same pattern Hero
                and ContactForm use for their serif headings. */}
            <h2
              className="font-serif text-[2rem] sm:text-4xl lg:text-5xl text-ink leading-[1.2] lg:leading-[1.15]"
              style={{ textWrap: "balance" as never }}
            >
              {HEADLINE}
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 lg:pt-7 text-base lg:text-lg text-ink-muted leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left"
            style={{ textWrap: "pretty" as never }}
          >
            {SUBHEAD}
          </motion.p>
        </motion.div>

        {/* ── Price band ─────────────────────────────────────────
            Bordered panel that anchors the "real number" before the
            calculator. Centred on every viewport so the figure sits
            visually flush with the calculator panel below it and the
            right half of the section doesn't read as empty space.
            Figure is intentionally restrained — closer to a serif-
            companion price than a hero number. */}
        <motion.div
          className="border border-rule bg-surface-raised p-8 lg:p-12 mb-10 lg:mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} className="text-center">
            <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
              {PRICE_BAND.caption}
            </span>
            <div className="flex items-baseline justify-center gap-x-3 gap-y-1 flex-wrap">
              {/* whitespace-nowrap keeps the two figures + dash on a
                  single line on every viewport — mobile included.
                  The dash gets its own generous margin (mx-3 / mx-4)
                  so the two numbers breathe rather than crowding the
                  separator. */}
              <span className="font-mono text-[1.85rem] sm:text-4xl lg:text-[2.75rem] text-ink leading-none tabular-nums whitespace-nowrap">
                {PRICE_BAND.rangeLow}
                <span className="mx-3 sm:mx-4 text-ink-faint">–</span>
                {PRICE_BAND.rangeHigh}
              </span>
              <span className="font-mono text-sm text-ink-muted">
                {PRICE_BAND.qualifier}
              </span>
            </div>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-6 lg:mt-7 text-base lg:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto text-center"
            style={{ textWrap: "pretty" as never }}
          >
            {PRICE_BAND.paragraph}
          </motion.p>
        </motion.div>

        {/* ── Calculator lead-in ─────────────────────────────── */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-base lg:text-lg text-ink-muted leading-relaxed max-w-2xl mb-6 lg:mb-8 text-center mx-auto"
          style={{ textWrap: "pretty" as never }}
        >
          {CALCULATOR_LEAD}
        </motion.p>

        {/* ── Calculator panel ───────────────────────────────────
            One bordered frame containing two slider rows above a
            hairline-divided three-card result grid. Cards use
            min-h so figure-width changes never reflow the panel. */}
        <motion.div
          className="border border-rule bg-surface-raised"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Sliders — stacked vertically so each control reads as
              its own discrete row. Hairline divider between the two
              fields gives each slider its own implicit "card" without
              nested borders. Vertical layout feels more interactable
              than a 2-column grid because each slider gets the full
              width of the panel. */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col divide-y divide-rule"
          >
            <div className="p-6 lg:p-8">
              <SliderField
                id={orderId}
                label="Average order value"
                min={1000}
                max={50000}
                step={500}
                value={orderValue}
                onChange={setOrderValue}
                displayValue={fmtUSD(orderValue)}
                valueText={fmtUSD(orderValue)}
                minLabel="$1k"
                maxLabel="$50k"
              />
            </div>
            <div className="p-6 lg:p-8">
              <SliderField
                id={dealsId}
                label="Extra deals closed / month"
                min={1}
                max={10}
                step={1}
                value={extraDeals}
                onChange={setExtraDeals}
                displayValue={String(extraDeals)}
                valueText={`${extraDeals} extra deal${extraDeals === 1 ? "" : "s"} per month`}
                minLabel="1"
                maxLabel="10"
              />
            </div>
          </motion.div>

          {/* Result cards — same hairline-grid pattern Solution uses
              for its three feature cells (gap-px on bg-rule). */}
          <div className="border-t border-rule grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule">
            <ResultCard
              label="Extra revenue / year"
              figure={fmtUSD(extraAnnual)}
            />
            <ResultCard
              label="Pays for itself after"
              figure={`${paybackDeals} ${paybackDeals === 1 ? "deal" : "deals"}`}
            />
            <ResultCard
              label="First-year return"
              figure={`${firstYearReturn}×`}
            />
          </div>
        </motion.div>

        {/* ── Calculator caption ───────────────────────────────
            Centered with text-wrap: balance so the browser splits
            the caption into evenly-distributed lines on every
            viewport. On desktop this lands as two balanced rows; on
            mobile (where the same text can't physically fit in two
            lines) it gracefully balances across three rather than
            leaving an awkward orphan. max-w-md caps the line length
            on desktop so balance always splits to two — not one
            super-long line and an orphan. */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 font-mono text-xs text-ink-faint tracking-wide text-center max-w-md mx-auto leading-relaxed"
          style={{ textWrap: "balance" as never }}
        >
          Based on a one-time project cost of {fmtUSD(PROJECT_COST)} (midpoint
          of the $2k–$6k range). Your numbers, your math.
        </motion.p>

        {/* ── Closing CTA — bordered panel mirroring the price
            band's frame for symmetry. */}
        <motion.div
          className="mt-14 lg:mt-20 border border-rule bg-surface-raised p-8 lg:p-12 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.h3
            variants={fadeUp}
            className="font-serif text-[1.75rem] sm:text-3xl lg:text-4xl text-ink leading-[1.2]"
            style={{ textWrap: "balance" as never }}
          >
            {CTA.heading}
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-5 lg:mt-6 text-base lg:text-lg text-ink-muted leading-relaxed max-w-xl mx-auto"
            style={{ textWrap: "pretty" as never }}
          >
            {CTA.body}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 lg:mt-10">
            <Button variant="primary" href={CTA.href}>
              {CTA.button}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Slider field (label + value readout + native range) ───────────
// Extracted so the markup for both sliders is symmetrical and the
// accessibility wiring is impossible to forget on one of them.
// `pricing-range` is the class globals.css uses to recolour the
// native range track/thumb to the editorial palette.

interface SliderFieldProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  displayValue: string;
  valueText: string;
  minLabel: string;
  maxLabel: string;
}

function SliderField({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  displayValue,
  valueText,
  minLabel,
  maxLabel,
}: SliderFieldProps) {
  return (
    <div>
      {/* Label + value:
          – Mobile: stacked vertically and centred so the slider
            field reads as a single centred unit (matches the
            centred price band and calculator lead-in above).
          – sm: and up: side-by-side with the label on the left and
            the value on the right, which gives the wider desktop
            slider room to breathe without feeling cramped. */}
      <div className="flex flex-col items-center text-center gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:text-left sm:gap-3 mb-3">
        <label
          htmlFor={id}
          className="font-mono text-xs tracking-widest uppercase text-ink-faint"
        >
          {label}
        </label>
        {/* tabular-nums keeps digit columns aligned so dragging never
            jiggles the readout's width. aria-hidden because the
            range's aria-valuetext already announces the value. */}
        <span
          className="font-mono text-base lg:text-lg text-ink tabular-nums"
          aria-hidden
        >
          {displayValue}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={valueText}
        className="pricing-range w-full"
      />
      {/* Min/max tick labels stay anchored to the slider's range
          endpoints on every viewport — they're positional cues, not
          centred text. */}
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] tracking-[0.15em] uppercase text-ink-faint">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

// ─── Result card ───────────────────────────────────────────────────
// `min-h` locks the card height so the figure swap as a user drags
// never reflows the panel. `aria-live="polite"` on the figure lets
// screen readers hear updates without spam.

interface ResultCardProps {
  label: string;
  figure: string;
}

function ResultCard({ label, figure }: ResultCardProps) {
  return (
    <div className="bg-surface-raised p-6 lg:p-8 min-h-[7.5rem] flex flex-col justify-between">
      <span className="block font-mono text-xs tracking-widest uppercase text-ink-faint">
        {label}
      </span>
      <span
        className="block mt-4 font-mono text-[1.65rem] sm:text-3xl lg:text-4xl text-ink leading-none tabular-nums"
        aria-live="polite"
      >
        {figure}
      </span>
    </div>
  );
}

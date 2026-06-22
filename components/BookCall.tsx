"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Button from "./ui/Button";
import TileGrid from "./TileGrid";
import { mailto } from "@/lib/constants";

// Cal.com booking link as "<username>/<event-slug>", e.g.
// "sankalp-indexarch/30min" (NOT the full https URL). When set,
// "Book a 30-minute call" opens the Cal.com scheduler as a popup
// overlay, brand-coloured to match IndexArch. Empty → falls back to a
// mailto compose so the button always works.
const CAL_LINK = "sankalp-shetty-w7toii/30min";
// Embed namespace + IndexArch brand colours for the scheduler chrome.
const CAL_NAMESPACE = "indexarch-30min";
const CAL_BRAND_LIGHT = "#1A1A1A"; // --color-ink (light)
const CAL_BRAND_DARK = "#F2EDE5"; // --color-ink (dark)

// ─── Content ───────────────────────────────────────────────────────
// Standalone CTA — sits between the Pricing section and the Contact
// form. The page already has two TileGrid sections (Hero, Contact);
// adding this one in between gives the bottom third of the page a
// consistent textured backdrop and visually links "here's the price
// → book a call → fill the form".

const COPY = {
  heading: "Every project starts with a call.",
  // Restructured from the original 3-sentence run into four
  // roughly-balanced sentences (9 / 10 / 10 / 8 words) so each one
  // reads as a discrete beat — philosophy → step 1 → step 2 → outcome
  // — and the "anything starts" orphan that the old long middle
  // sentence produced is gone.
  body:
    "There’s no buy button — and there shouldn’t be. We spend 30 minutes on your range and your buyers. We find where deals are leaking, then scope the project. You’ll have a clear number before anything starts.",
  button: "Book a 30-minute call",
  // Opens a pre-addressed email to info@indexarch.com to book the call.
  href: mailto(
    "Booking a 30-minute call",
    "Hi IndexArch team,\n\nI'd like to book a 30-minute call.\n\nCompany:\nWhat we make:\nBest times to reach me:\n"
  ),
};

// ─── Section ───────────────────────────────────────────────────────

export default function BookCall() {
  // Boot the official Cal.com embed once (only when a link is set).
  // We inject the canonical loader snippet verbatim as a <script> so we
  // don't have to hand-type its untyped queue internals. It loads
  // embed.js, initialises the namespace, and brand-colours the
  // scheduler to match IndexArch. The embed then binds any element with
  // matching data-cal-link / data-cal-namespace to open the popup.
  useEffect(() => {
    if (!CAL_LINK || typeof document === "undefined") return;
    if (document.getElementById("calcom-embed-boot")) return;
    const boot = document.createElement("script");
    boot.id = "calcom-embed-boot";
    boot.text =
      `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");` +
      `Cal("init", ${JSON.stringify(CAL_NAMESPACE)}, {origin:"https://cal.com"});` +
      `Cal.ns[${JSON.stringify(CAL_NAMESPACE)}]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"${CAL_BRAND_LIGHT}"},"dark":{"cal-brand":"${CAL_BRAND_DARK}"}},"hideEventTypeDetails":false,"layout":"month_view"});`;
    document.body.appendChild(boot);
  }, []);

  return (
    <section className="relative overflow-hidden py-section-sm lg:py-0 lg:min-h-screen lg:flex lg:items-center">
      {/* Same TileGrid texture that anchors the Hero and Contact
          sections. -z-10 keeps it behind everything; the section's
          overflow-hidden clips it cleanly to the section bounds. */}
      <TileGrid className="-z-10" />

      {/* On desktop the section is min-h-screen + flex items-center,
          which vertically centres the box in the viewport when the
          user scrolls to it — equal breathing room above and below.
          On mobile we keep the regular py-section-sm rhythm so the
          page doesn't accumulate full-screen blocks.
          Mobile px is bumped to px-10 (40px gutter) so the box reads
          as a slender centred panel with visible TileGrid texture on
          the left and right rather than spanning edge-to-edge. */}
      <div className="relative mx-auto w-full max-w-[var(--max-width)] px-10 sm:px-6 lg:px-8">
        {/* The box sits centred and narrow inside the wide container so
            the TileGrid texture frames it on the left and right. The
            shadow-card lift separates the box from the textured
            background — it should read as a deliberate panel resting
            on the grid, not as a flat strip.
            Mobile padding favours vertical breathing room (py-12)
            over horizontal (px-6) so the box reads as a taller, more
            slender panel — the design language the user asked for on
            phone. sm: and up restore the editorial p-8 / p-12 square
            padding where the box has room to be wider. */}
        <motion.div
          className="mx-auto max-w-2xl border border-rule bg-surface-raised px-6 py-12 sm:p-8 lg:p-12 text-center shadow-card"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.h2
            variants={fadeUp}
            className="font-serif text-[1.75rem] sm:text-3xl lg:text-4xl text-ink leading-[1.2]"
            style={{ textWrap: "balance" as never }}
          >
            {COPY.heading}
          </motion.h2>
          {/* Bumped top margin from mt-5 → mt-7 (mobile) and mt-6 →
              mt-9 (desktop) so the body sits a touch further from the
              heading — gives the four-sentence run room to breathe
              against the serif headline above. text-wrap: balance lets
              the browser distribute words evenly across whatever line
              count the box width actually fits. */}
          <motion.p
            variants={fadeUp}
            className="mt-7 lg:mt-9 text-base lg:text-lg text-ink-muted leading-relaxed max-w-xl mx-auto"
            style={{ textWrap: "balance" as never }}
          >
            {COPY.body}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 lg:mt-10">
            {CAL_LINK ? (
              // Plain <a> so the data-cal-* attributes are valid and the
              // embed script can bind the click. href is a graceful
              // fallback to the Cal.com booking page if the embed JS
              // doesn't load. Styled to match Button's primary variant.
              <a
                href={`https://cal.com/${CAL_LINK}`}
                data-cal-namespace={CAL_NAMESPACE}
                data-cal-link={CAL_LINK}
                data-cal-config='{"layout":"month_view"}'
                className="inline-flex items-center justify-center font-sans font-medium transition-[background-color,transform] duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent bg-ink text-sand-50 px-7 py-3.5 text-sm tracking-wide hover:bg-ink-light active:scale-[0.96]"
              >
                {COPY.button}
              </a>
            ) : (
              <Button variant="primary" href={COPY.href}>
                {COPY.button}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

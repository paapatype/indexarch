"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import FeatureCard from "./ui/FeatureCard";
import { PROBLEM } from "@/lib/constants";

const icons = [
  <svg key="clock" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <circle cx="32" cy="32" r="24" />
    <polyline points="32,16 32,32 44,38" />
    <circle cx="32" cy="32" r="2" fill="currentColor" />
  </svg>,
  <svg key="pages" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <rect x="12" y="8" width="32" height="44" rx="1" />
    <rect x="18" y="14" width="32" height="44" rx="1" />
    <line x1="24" y1="24" x2="44" y2="24" />
    <line x1="24" y1="30" x2="40" y2="30" />
    <line x1="24" y1="36" x2="42" y2="36" />
    <line x1="24" y1="42" x2="36" y2="42" />
  </svg>,
  <svg key="exit" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <rect x="8" y="12" width="32" height="40" rx="1" />
    <path d="M40 28 L56 28" />
    <polyline points="50,22 56,28 50,34" />
    <line x1="24" y1="28" x2="24" y2="40" />
    <circle cx="24" cy="24" r="3" />
  </svg>,
];

const INQUIRIES = [
  // Fasteners
  "Do you have M36 Grade 10.9 in DIN 931?",
  "Need a quote for 500x M24 HDG hex bolts — urgent",
  "What's the lead time on M48 Grade 12.9 plain finish?",
  "Do you make foundation bolts longer than 2 metres?",
  "Is ASTM A193 B7 available in zinc coating?",
  "Can you cross-reference this to ISO 4014?",
  "What proof load does your M30 10.9 have?",
  // Connectors
  "Can you send the spec sheet for your 8STA connectors?",
  "What's the Souriau equivalent for a Deutsch AS size 12 shell?",
  "Do you have a 37-pin circular connector rated for motorsport?",
  "Can I get a wire group configuration for 4x 20A + 12x 7.5A?",
  // Profiles & hardware
  "What profiles do you have in 6063-T5 aluminium?",
  "Do you stock C-channel in 40x20mm?",
  "What's the weight per metre on your 50x50 hollow section?",
  "Is the serrated flat bar available in mill finish?",
  // Tiles & ceramics
  "Is the 600x600 matt porcelain available in anti-skid?",
  "Can I see the full range in the wood-look vitrified series?",
  "What thickness options do you have for the outdoor pavers?",
  "Do you have a shade variation chart for the terrazzo collection?",
];

// Three slots — top, middle, bottom — each cycles through messages independently
type SlotAlign = "left" | "center" | "right";

const SLOTS: { align: SlotAlign; tailPos: string }[] = [
  { align: "left", tailPos: "left-5" },
  { align: "center", tailPos: "left-1/2 -translate-x-1/2" },
  { align: "right", tailPos: "right-5" },
];

function RollingSlot({
  messages,
  interval,
  align,
  tailPos,
}: {
  messages: string[];
  interval: number;
  align: SlotAlign;
  tailPos: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [messages, interval]);

  const justify =
    align === "left" ? "justify-start" :
    align === "center" ? "justify-center" :
    "justify-end";

  const rounding =
    align === "left" ? "rounded-2xl rounded-bl-none" :
    align === "center" ? "rounded-2xl" :
    "rounded-2xl rounded-br-none";

  return (
    <div className={`flex ${justify}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]"
        >
          <div className={`bg-white border border-rule shadow-card px-5 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6 ${rounding}`}>
            <p
              className="font-serif text-base sm:text-lg lg:text-xl text-ink leading-relaxed"
              style={{ fontStyle: "italic" }}
            >
              &ldquo;{messages[index]}&rdquo;
            </p>
          </div>
          {/* Speech bubble tail */}
          <div
            className={`absolute -bottom-[6px] ${tailPos} w-3 h-3 bg-white border-b border-r border-rule`}
            style={{ transform: "rotate(45deg)" }}
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ProblemSection() {
  // Split messages across three slots — mixed industries per slot
  const slot1 = [INQUIRIES[0], INQUIRIES[7], INQUIRIES[11], INQUIRIES[15], INQUIRIES[4], INQUIRIES[17]];
  const slot2 = [INQUIRIES[1], INQUIRIES[8], INQUIRIES[12], INQUIRIES[16], INQUIRIES[5], INQUIRIES[10]];
  const slot3 = [INQUIRIES[2], INQUIRIES[9], INQUIRIES[13], INQUIRIES[14], INQUIRIES[6], INQUIRIES[3]];

  return (
    <section className="py-section-sm lg:py-section relative">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Rolling inquiry messages */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col gap-5 sm:gap-6 lg:gap-8 max-w-sm sm:max-w-xl lg:max-w-2xl mx-auto"
        >
          <RollingSlot messages={slot1} interval={6000} {...SLOTS[0]} />
          <RollingSlot messages={slot2} interval={7500} {...SLOTS[1]} />
          <RollingSlot messages={slot3} interval={6800} {...SLOTS[2]} />
        </motion.div>

        {/* Caption */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm text-ink-muted leading-relaxed text-center max-w-lg mx-auto mb-20"
        >
          Your sales team hears this 20 times a day. They dig through
          300-page PDFs, cross-reference spec sheets, and reply hours
          later — if they reply at all. Meanwhile, the buyer moves on
          to a competitor who made it easy.
        </motion.p>

        {/* Combined: Stat + Problem Cards in one integrated layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-rule"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Left: Big stat */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 p-10 lg:p-14 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-rule"
          >
            <span className="font-mono text-7xl lg:text-8xl font-medium text-ink leading-none">
              {PROBLEM.stat.value}
            </span>
            <p className="mt-6 text-sm text-ink-muted leading-relaxed max-w-xs">
              {PROBLEM.stat.label}
            </p>
            <p className="mt-4 font-mono text-xs text-ink-faint tracking-wide uppercase">
              Source: {PROBLEM.stat.source}
            </p>
          </motion.div>

          {/* Right: Three problem cards stacked */}
          <div className="lg:col-span-7">
            {PROBLEM.cards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className={`flex items-start gap-5 p-7 lg:p-8 ${
                  i < PROBLEM.cards.length - 1 ? "border-b border-rule" : ""
                }`}
              >
                <div className="h-10 w-10 shrink-0 text-ink-faint mt-0.5">
                  {icons[i]}
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-ink mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

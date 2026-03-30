"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PROBLEM } from "@/lib/constants";

// Elegant count-up with motion blur — number resolves from blurry to crisp
function BlurCountUp({ target, suffix = "%" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);
  const [blur, setBlur] = useState(22);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 3300;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * eased));
      setBlur(22 * Math.pow(1 - eased, 0.45));
      setOpacity(Math.min(1, progress * 3));

      if (current >= steps) {
        clearInterval(timer);
        setValue(target);
        setBlur(0);
        setOpacity(1);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="font-mono text-7xl lg:text-[8rem] font-medium text-ink leading-none" style={{ opacity, transition: "opacity 0.15s linear" }}>
      <span
        style={{
          filter: `blur(${blur}px)`,
          transition: "filter 0.08s linear",
        }}
      >
        {value}
      </span>
      <span
        style={{
          filter: `blur(${blur * 0.5}px)`,
          transition: "filter 0.08s linear",
        }}
      >
        {suffix}
      </span>
    </div>
  );
}

// Interactive icon 1: Clock — hands move on hover
function ClockIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="32" cy="32" r="24" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
      {/* Minute hand */}
      <line
        x1="32" y1="32" x2="32" y2="14"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        style={{
          transformOrigin: "32px 32px",
          transform: `rotate(${hovered ? 360 : 0}deg)`,
          transition: "transform 3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {/* Hour hand */}
      <line
        x1="32" y1="32" x2="44" y2="26"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        style={{
          transformOrigin: "32px 32px",
          transform: `rotate(${hovered ? 90 : 0}deg)`,
          transition: "transform 3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {/* Hour markers */}
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="32" y1="10" x2="32" y2="13"
          stroke="currentColor" strokeWidth="1" opacity="0.3"
          style={{ transformOrigin: "32px 32px", transform: `rotate(${deg}deg)` }}
        />
      ))}
    </svg>
  );
}

// Scramble roller — single character cycling rapidly like a conveyor belt
function ScrambleChar({ active, speed, chars }: { active: boolean; speed: number; chars: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) { setIndex(0); return; }
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % chars.length);
    }, speed);
    return () => clearInterval(timer);
  }, [active, speed, chars]);

  return (
    <span className="inline-block overflow-hidden h-[1em] w-[0.6em] relative">
      <span
        className="block transition-transform duration-[60ms] ease-linear"
        style={{ transform: `translateY(${active ? "-0.15em" : "0"})` }}
      >
        {active ? chars[index] : chars[0]}
      </span>
    </span>
  );
}

// Interactive icon 2: PDFs — splits apart, text becomes fast-cycling gibberish rollers
function PdfIcon({ hovered }: { hovered: boolean }) {
  const charSets = [
    "A%B@C#D!E?F$G&H*",
    "P#Q!R%S@T&U*V?W$",
    "X!Y#Z%1@2&3*4?5$",
    "M@N#O%P!Q?R$S&T*",
    "K$L!M#N%O@P&Q?R*",
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {[-1, 0, 1].map((offset) => (
        <div
          key={offset}
          className="absolute"
          style={{
            transform: hovered
              ? `translateX(${offset * 18}px) rotate(${offset * 3}deg)`
              : `translateX(${offset * 3}px) rotate(0deg)`,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: offset === 0 ? 2 : 1,
          }}
        >
          <div
            className="w-8 h-10 border border-current rounded-sm bg-white flex flex-col justify-center px-1 gap-[2px]"
            style={{ opacity: offset === 0 ? 1 : 0.7 }}
          >
            {hovered ? (
              /* Fast-cycling text rollers — 5 rows of scrambling characters */
              <>
                {[0, 1, 2, 3, 4].map((row) => (
                  <div key={row} className="flex gap-[1px] text-[5px] font-mono text-ink-faint leading-none" style={{ opacity: 1 - row * 0.12 }}>
                    {[0, 1, 2, 3, 4].map((col) => (
                      <ScrambleChar
                        key={col}
                        active={hovered}
                        speed={40 + row * 8 + col * 12}
                        chars={charSets[(row + col + offset + 3) % charSets.length]}
                      />
                    ))}
                  </div>
                ))}
              </>
            ) : (
              /* Normal lines */
              <>
                {[0, 1, 2, 3, 4].map((row) => (
                  <div
                    key={row}
                    className="bg-current rounded-full"
                    style={{
                      height: "1px",
                      width: `${70 + (row % 3) * 10}%`,
                      opacity: 0.2,
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Static magnifying glass icon with ? inside — used as default state
function MagnifyingGlassIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="26" cy="26" r="14" />
      <circle cx="26" cy="26" r="11" strokeWidth="0.5" opacity="0.15" />
      <path d="M18 20 Q20 16 24 17" strokeWidth="0.75" opacity="0.2" strokeLinecap="round" fill="none" />
      <line x1="36.5" y1="36.5" x2="50" y2="50" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="44" x2="44" y2="42" strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />
      <line x1="44.5" y1="46.5" x2="46.5" y2="44.5" strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />
      <circle cx="37" cy="37" r="2" strokeWidth="0.75" opacity="0.2" />
      {/* ? inside lens */}
      <path d="M24 23 Q24 20.5 26 20.5 Q28 20.5 28 23 Q28 24.5 26 25.5" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
      <circle cx="26" cy="28.5" r="0.6" fill="currentColor" stroke="none" opacity="0.4" />
    </svg>
  );
}

// Lost Buyers card — magnifying glass follows cursor, blur inside the lens
function LostBuyerCardInteractive({ card }: { card: { title: string; description: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const lensRadius = 20;

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      className="flex flex-col items-center text-center p-10 lg:p-12 relative overflow-hidden"
      style={{ cursor: hovered ? "none" : "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Icon — visible when not hovered */}
      <div
        className="h-14 w-14 shrink-0 text-ink-faint mb-6 transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <MagnifyingGlassIcon />
      </div>

      <h3 className="font-sans text-base font-semibold text-ink mb-2">
        {card.title}
      </h3>
      <p className="text-sm text-ink-muted leading-relaxed max-w-xs" style={{ textWrap: "balance" as never }}>
        {card.description}
      </p>

      {/* Magnifying glass that follows cursor — blur is inside the lens circle */}
      {hovered && (
        <div
          className="pointer-events-none absolute"
          style={{
            left: mousePos.x - lensRadius,
            top: mousePos.y - lensRadius,
            zIndex: 20,
          }}
        >
          {/* Blur lens — the circle with backdrop blur */}
          <div
            style={{
              width: lensRadius * 2,
              height: lensRadius * 2,
              borderRadius: "50%",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              border: "1.5px solid rgba(26,26,26,0.18)",
              background: "rgba(255,255,255,0.04)",
              boxShadow: "0 0 0 0.5px rgba(26,26,26,0.06), inset 0 0 8px rgba(255,255,255,0.1)",
            }}
          />
          {/* Handle — starts at the edge of the circle, extends outward */}
          <div
            style={{
              position: "absolute",
              left: lensRadius + lensRadius * 0.7,
              top: lensRadius + lensRadius * 0.7,
              width: lensRadius * 0.9,
              height: 2,
              background: "rgba(26,26,26,0.22)",
              borderRadius: 2,
              transform: "rotate(45deg)",
              transformOrigin: "0 0",
            }}
          />
          {/* Inner ring detail */}
          <div
            style={{
              position: "absolute",
              left: 3,
              top: 3,
              width: lensRadius * 2 - 6,
              height: lensRadius * 2 - 6,
              borderRadius: "50%",
              border: "0.5px solid rgba(26,26,26,0.06)",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

const INQUIRIES = [
  // Fasteners
  "Do you have M36 Grade\u00A010.9 in DIN\u00A0931?",
  "Need a quote for 500x M24\u00A0HDG hex bolts\u00A0—\u00A0urgent",
  "What's the lead time on M48\u00A0Grade 12.9 plain\u00A0finish?",
  "Do you make foundation bolts\u00A0longer than 2\u00A0metres?",
  "Is ASTM A193 B7 available\u00A0in zinc\u00A0coating?",
  "Can you cross-reference\u00A0this to ISO\u00A04014?",
  "What proof load does\u00A0your M30 10.9\u00A0have?",
  // Connectors
  "Can you send the spec sheet\u00A0for your 8STA\u00A0connectors?",
  "What's the Souriau equivalent for\u00A0a Deutsch AS size 12\u00A0shell?",
  "Do you have a 37-pin circular\u00A0connector rated for\u00A0motorsport?",
  "Can I get a wire group config\u00A0for 4x 20A +\u00A012x 7.5A?",
  // Profiles & hardware
  "What profiles do you have\u00A0in 6063-T5\u00A0aluminium?",
  "Do you stock C-channel\u00A0in 40x20mm?",
  "What's the weight per metre\u00A0on your 50x50 hollow\u00A0section?",
  "Is the serrated flat bar\u00A0available in mill\u00A0finish?",
  // Tiles & ceramics
  "Is the 600x600 matt porcelain\u00A0available in\u00A0anti-skid?",
  "Can I see the full range in\u00A0the wood-look vitrified\u00A0series?",
  "What thickness options do you\u00A0have for the outdoor\u00A0pavers?",
  "Do you have a shade variation\u00A0chart for the terrazzo\u00A0collection?",
];

// Conveyor belt — all messages scroll continuously top to bottom
function ConveyorBelt({ messages }: { messages: string[] }) {
  // Double the messages for seamless loop
  const doubled = [...messages, ...messages];

  return (
    <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Fade at top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none" />
      {/* Fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none" />

      {/* Scrolling belt */}
      <div className="flex flex-col gap-4 animate-conveyor">
        {doubled.map((msg, i) => (
          <div
            key={`${msg}-${i}`}
            className="bg-white border border-rule shadow-card px-6 py-5 lg:px-7 lg:py-6 rounded-xl rounded-bl-sm shrink-0"
          >
            <p className="font-serif text-base lg:text-lg text-ink leading-relaxed italic" style={{ textWrap: "balance" }}>
              &ldquo;{msg}&rdquo;
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes conveyor {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-conveyor {
          animation: conveyor 60s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <>
    {/* Section 1: Messages — its own full viewport */}
    <section className="min-h-screen flex items-center relative">
      <div className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0"
        >
          {/* Left — Copy */}
          <div className="flex flex-col justify-center lg:pr-14">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-serif text-2xl lg:text-3xl text-ink leading-snug mb-6"
            >
              Not just your sales team — anyone would get tired of answering questions like these 20 times a day.
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-base lg:text-lg text-ink-muted leading-relaxed"
            >
              They dig through 300-page PDFs, cross-reference spec sheets,
              and reply hours later — if they reply at all. Meanwhile, the
              buyer moves on to a competitor who made it easy.
            </motion.p>
          </div>

          {/* Right — Rolling messages */}
          <div className="lg:pl-14 lg:border-l lg:border-rule">
            <ConveyorBelt messages={INQUIRIES} />
          </div>
        </motion.div>
      </div>
    </section>

    {/* Section 2: Stats + Problem Cards */}
    <section className="py-section-sm lg:py-section relative">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        {/* Two stats on top, three problem cards at bottom */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Top row: Two stat squares side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-y border-rule">
            {/* Stat 1: 86% */}
            <motion.div
              variants={fadeUp}
              className="p-14 lg:p-20 flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-rule"
            >
              <BlurCountUp target={86} />
              <p className="mt-8 text-sm lg:text-base text-ink-muted leading-relaxed max-w-sm">
                {PROBLEM.stat.label}
              </p>
              <p className="mt-5 font-mono text-xs text-ink-faint tracking-wide uppercase">
                Source:{" "}
                <a
                  href={PROBLEM.stat.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ink-muted transition-colors"
                >
                  {PROBLEM.stat.source}
                </a>
              </p>
            </motion.div>

            {/* Stat 2: 75% */}
            <motion.div
              variants={fadeUp}
              className="p-14 lg:p-20 flex flex-col items-center justify-center text-center"
            >
              <BlurCountUp target={75} />
              <p className="mt-8 text-sm lg:text-base text-ink-muted leading-relaxed max-w-sm">
                B2B buyers prefer a rep-free buying experience
              </p>
              <p className="mt-5 font-mono text-xs text-ink-faint tracking-wide uppercase">
                Source:{" "}
                <a
                  href="https://www.gartner.com/en/sales/insights/b2b-buying-journey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ink-muted transition-colors"
                >
                  Gartner
                </a>
              </p>
            </motion.div>
          </div>

          {/* Bottom row: Three problem cards — centered, interactive icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-x border-rule">
            {PROBLEM.cards.map((card, i) => {
              if (i === 2) {
                return (
                  <div key={card.title}>
                    {/* Desktop: interactive magnifying glass */}
                    <div className="hidden md:block">
                      <LostBuyerCardInteractive card={card} />
                    </div>
                    {/* Mobile: static icon */}
                    <motion.div
                      variants={fadeUp}
                      className="flex flex-col items-center text-center p-10 lg:p-12 md:hidden"
                    >
                      <div className="h-14 w-14 shrink-0 text-ink-faint mb-6">
                        <MagnifyingGlassIcon />
                      </div>
                      <h3 className="font-sans text-base font-semibold text-ink mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-ink-muted leading-relaxed max-w-xs" style={{ textWrap: "balance" as never }}>
                        {card.description}
                      </p>
                    </motion.div>
                  </div>
                );
              }
              const [hovered, setHovered] = useState(false);
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className={`flex flex-col items-center text-center p-10 lg:p-12 cursor-default ${
                    i < PROBLEM.cards.length - 1 ? "border-b md:border-b-0 md:border-r border-rule" : ""
                  }`}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <div className="h-14 w-14 shrink-0 text-ink-faint mb-6">
                    {i === 0 && <ClockIcon hovered={hovered} />}
                    {i === 1 && <PdfIcon hovered={hovered} />}
                  </div>
                  <h3 className="font-sans text-base font-semibold text-ink mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-xs" style={{ textWrap: "balance" }}>
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  animate,
} from "motion/react";
import { fadeUp } from "@/lib/animations";
import { PROBLEM, PROBLEM_CAROUSEL } from "@/lib/constants";
import IndexArchGlobe from "./IndexArchGlobe";

// ─── Forrester count-up ───────────────────────────────────────────

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
    <div
      ref={ref}
      className="font-mono text-7xl lg:text-[8rem] font-medium text-ink leading-none"
      style={{ opacity, transition: "opacity 0.15s linear" }}
    >
      <span style={{ filter: `blur(${blur}px)`, transition: "filter 0.08s linear" }}>
        {value}
      </span>
      <span style={{ filter: `blur(${blur * 0.5}px)`, transition: "filter 0.08s linear" }}>
        {suffix}
      </span>
    </div>
  );
}

// ─── Right-column graphics (all fill the same tall column) ────────

const INQUIRIES = [
  "Do you have M36 Grade 10.9 in DIN 931?",
  "Need a quote for 500x M24 HDG hex bolts — urgent",
  "What's the lead time on M48 Grade 12.9 plain finish?",
  "Do you make foundation bolts longer than 2 metres?",
  "Is ASTM A193 B7 available in zinc coating?",
  "Can you cross-reference this to ISO 4014?",
  "What proof load does your M30 10.9 have?",
  "Can you send the spec sheet for your 8STA connectors?",
  "What's the Souriau equivalent for a Deutsch AS size 12 shell?",
  "Do you have a 37-pin circular connector rated for motorsport?",
  "Can I get a wire group config for 4x 20A + 12x 7.5A?",
  "What profiles do you have in 6063-T5 aluminium?",
  "Do you stock C-channel in 40x20mm?",
  "What's the weight per metre on your 50x50 hollow section?",
  "Is the serrated flat bar available in mill finish?",
  "Is the 600x600 matt porcelain available in anti-skid?",
  "Can I see the full range in the wood-look vitrified series?",
  "What thickness options do you have for the outdoor pavers?",
  "Do you have a shade variation chart for the terrazzo collection?",
];

function ConveyorBelt() {
  const doubled = [...INQUIRIES, ...INQUIRIES];
  // The wrapper in ProblemSection sets an explicit height; we fill it
  // with overflow:hidden so the doubled card list doesn't balloon the
  // page (which was the bug — section became impossibly tall).
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none" />
      <div className="flex flex-col gap-4 animate-conveyor">
        {doubled.map((msg, i) => (
          <div
            key={`${msg}-${i}`}
            className="bg-surface-raised border border-rule shadow-card px-6 py-5 lg:px-7 lg:py-6 rounded-xl rounded-bl-sm shrink-0"
          >
            <p
              className="font-serif text-base lg:text-lg text-ink leading-relaxed italic"
              style={{ textWrap: "balance" as never }}
            >
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

// Clipboarded A4 with a pencil that physically traces every tick and
// cross. Pencil parks clipped to the right edge of the board at the
// end of the cycle. Mark strokes use butt linecaps so unmarked rows
// don't render leading dots.
const CHECKLIST_ROWS = [
  { mark: "check" as const },
  { mark: "check" as const },
  { mark: "cross" as const },
  { mark: "check" as const },
  { mark: "cross" as const },
];
// Clipboard layout (viewBox 320 × 420). The paper holds an A4-ish 192 ×
// 272 rectangle (≈1:1.42 ratio) with comfortable margins; the board
// frames it. Rows have generous gutter so the form reads as a real
// inspection sheet.
const ROW_TOP = 124;
const ROW_GAP = 34;
const CHECKBOX_X = 88;
const CHECKBOX_SIZE = 16;
const ROW_TEXT = [
  { label: 26, value: 78, sub: 64 },
  { label: 32, value: 90, sub: 50 },
  { label: 22, value: 68, sub: 84 },
  { label: 30, value: 100, sub: 60 },
  { label: 24, value: 64, sub: 88 },
];
const TEXT_X = CHECKBOX_X + CHECKBOX_SIZE + 10;
// Pencil "hover" floats above the clipboard before each pass.
// Parked vertical along the right margin so it sits in the latch like a
// real pencil clipped to the side of an inspection board.
const PENCIL_HOVER = { x: 232, y: 72, angle: -32 };
const PENCIL_PARKED = { x: 268, y: 358, angle: -90 };

// Latch — a hinged clip on the right margin of the board.
const LATCH_HINGE = { x: 260, y: 320 };
const LATCH_ARM = 14;
const LATCH_HOOK = 8;

// Monochrome pencil — stays in the same neutral palette as the rest of
// the illustration. Solid fills so the clipboard tint never shows
// through.
const PENCIL_FILL_WOOD = "var(--color-ink-muted)";
const PENCIL_FILL_WOOD_LIGHT = "var(--color-surface-raised)";
const PENCIL_FILL_BARREL = "var(--color-surface-raised)";
const PENCIL_FILL_FERRULE = "var(--color-ink-faint)";
const PENCIL_FILL_FERRULE_BAND = "var(--color-ink-muted)";
const PENCIL_FILL_ERASER = "var(--color-ink-muted)";

// Mark geometries — sized to sit cleanly inside the 16×16 checkbox.
// Both check and cross are centred on the box centre (cx, cy) and a
// touch smaller than before so they don't crowd the box edges.
function checkPath(rowY: number) {
  const cx = CHECKBOX_X + CHECKBOX_SIZE / 2; // 96
  const cy = rowY + CHECKBOX_SIZE / 2; // y + 8
  return {
    A: { x: cx - 5, y: cy },        // left tip
    B: { x: cx - 1.5, y: cy + 3 },  // bottom V
    C: { x: cx + 5, y: cy - 3 },    // top-right tip
  };
}
function crossPath(rowY: number) {
  const cx = CHECKBOX_X + CHECKBOX_SIZE / 2;
  const cy = rowY + CHECKBOX_SIZE / 2;
  const h = 4; // half-extent — total 8×8 around centre
  return {
    A: { x: cx - h, y: cy - h },
    B: { x: cx + h, y: cy + h },
    C: { x: cx + h, y: cy - h },
    D: { x: cx - h, y: cy + h },
  };
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function ChecklistGraphic() {
  // Pencil tip position + body angle. -32° during marking, -90°
  // (vertical) when parked into the latch.
  const pencilX = useMotionValue(PENCIL_HOVER.x);
  const pencilY = useMotionValue(PENCIL_HOVER.y);
  const pencilAngle = useMotionValue(PENCIL_HOVER.angle);
  // Latch openness — 0 closed, 1 fully open. Latch starts open at first
  // mount (because the pencil is already at hover, not in the latch),
  // and closes once the pencil heads back out after parking.
  const latchOpen = useMotionValue(0);
  // Marks fade out as a group after the pencil docks. 1 = fully visible,
  // 0 = faded out. A small blur is layered on top via useTransform so
  // the marks dissolve gracefully rather than flashing off.
  const marksOpacity = useMotionValue(1);
  const marksBlur = useTransform(marksOpacity, (v) => (1 - v) * 1.6);
  const marksFilter = useMotionTemplate`blur(${marksBlur}px)`;

  const c0 = useMotionValue(0);
  const c1 = useMotionValue(0);
  const c2 = useMotionValue(0);
  const c3 = useMotionValue(0);
  const c4 = useMotionValue(0);
  const stroke1 = [c0, c1, c2, c3, c4];
  const x0 = useMotionValue(0);
  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const x3 = useMotionValue(0);
  const x4 = useMotionValue(0);
  const stroke2 = [x0, x1, x2, x3, x4];


  useEffect(() => {
    let cancelled = false;

    const moveTo = (x: number, y: number, duration = 0.42) =>
      Promise.all([
        animate(pencilX, x, { duration, ease: [0.45, 0, 0.2, 1] }),
        animate(pencilY, y, { duration, ease: [0.45, 0, 0.2, 1] }),
      ]);

    const traceCheck = async (i: number, rowY: number) => {
      const { A, B, C } = checkPath(rowY);
      await moveTo(A.x, A.y);
      if (cancelled) return;
      await Promise.all([
        animate(stroke1[i], 1, { duration: 0.55, ease: [0.4, 0, 0.2, 1] }),
        animate(pencilX, [A.x, B.x, C.x], {
          duration: 0.55,
          ease: [0.4, 0, 0.2, 1],
          times: [0, 0.35, 1],
        }),
        animate(pencilY, [A.y, B.y, C.y], {
          duration: 0.55,
          ease: [0.4, 0, 0.2, 1],
          times: [0, 0.35, 1],
        }),
      ]);
    };

    const traceCross = async (i: number, rowY: number) => {
      const { A, B, C, D } = crossPath(rowY);
      await moveTo(A.x, A.y);
      if (cancelled) return;
      await Promise.all([
        animate(stroke1[i], 1, { duration: 0.3, ease: [0.4, 0, 0.2, 1] }),
        animate(pencilX, B.x, { duration: 0.3, ease: [0.4, 0, 0.2, 1] }),
        animate(pencilY, B.y, { duration: 0.3, ease: [0.4, 0, 0.2, 1] }),
      ]);
      if (cancelled) return;
      await moveTo(C.x, C.y, 0.22);
      if (cancelled) return;
      await Promise.all([
        animate(stroke2[i], 1, { duration: 0.3, ease: [0.4, 0, 0.2, 1] }),
        animate(pencilX, D.x, { duration: 0.3, ease: [0.4, 0, 0.2, 1] }),
        animate(pencilY, D.y, { duration: 0.3, ease: [0.4, 0, 0.2, 1] }),
      ]);
    };

    const run = async () => {
      while (!cancelled) {
        // Reset marks for the new cycle. Previous cycle ended with
        // marksOpacity at 0 (faded out) — restore both pathLength and
        // opacity so the marks are ready to redraw cleanly.
        stroke1.forEach((m) => m.set(0));
        stroke2.forEach((m) => m.set(0));
        marksOpacity.set(1);

        // ── DEPART ── pencil starts parked vertically in the latch.
        // Open the latch so the pencil can leave.
        await animate(latchOpen, 1, {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        });
        if (cancelled) return;
        // Pencil glides out and tilts from vertical (-90°) to the
        // marking angle (-32°) as it travels to the hover position.
        await Promise.all([
          animate(pencilX, PENCIL_HOVER.x, {
            duration: 0.65,
            ease: [0.45, 0, 0.2, 1],
          }),
          animate(pencilY, PENCIL_HOVER.y, {
            duration: 0.65,
            ease: [0.45, 0, 0.2, 1],
          }),
          animate(pencilAngle, PENCIL_HOVER.angle, {
            duration: 0.65,
            ease: [0.45, 0, 0.2, 1],
          }),
        ]);
        if (cancelled) return;
        // Pencil has cleared the latch — close it.
        await animate(latchOpen, 0, {
          duration: 0.32,
          ease: [0.4, 0, 0.2, 1],
        });
        await wait(220);
        if (cancelled) return;

        // ── TRACE ── walk down the rows, marking each box.
        for (let i = 0; i < CHECKLIST_ROWS.length; i++) {
          const rowY = ROW_TOP + i * ROW_GAP;
          if (CHECKLIST_ROWS[i].mark === "check") {
            await traceCheck(i, rowY);
          } else {
            await traceCross(i, rowY);
          }
          if (cancelled) return;
          await wait(160);
        }

        // ── DOCK ── pencil heads back to the latch. Open the latch as
        // the pencil approaches; once it's seated, close the latch.
        await animate(latchOpen, 1, {
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1],
        });
        if (cancelled) return;
        await Promise.all([
          animate(pencilX, PENCIL_PARKED.x, {
            duration: 0.75,
            ease: [0.4, 0, 0.2, 1],
          }),
          animate(pencilY, PENCIL_PARKED.y, {
            duration: 0.75,
            ease: [0.4, 0, 0.2, 1],
          }),
          animate(pencilAngle, PENCIL_PARKED.angle, {
            duration: 0.75,
            ease: [0.4, 0, 0.2, 1],
          }),
        ]);
        if (cancelled) return;
        // Latch closes over the seated pencil.
        await animate(latchOpen, 0, {
          duration: 0.32,
          ease: [0.4, 0, 0.2, 1],
        });

        // ── HOLD ── show the completed list briefly with the pencil
        // safely latched, then gracefully dissolve the marks (opacity +
        // blur fade) so the board reads as ready for the next pass.
        await wait(900);
        if (cancelled) return;
        await animate(marksOpacity, 0, {
          duration: 0.95,
          ease: [0.35, 0, 0.55, 1],
        });
        await wait(280);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="problem-graphic-color relative h-full flex items-center justify-center">
      <svg
        viewBox="0 0 320 420"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        // `max-h-full` constrains the SVG to its container's height
        // so the clipboard (taller-than-wide 0.76:1 viewBox) can never
        // overflow the 300px mobile slot and crash into the heading
        // below. Width auto so it scales by height first; max-w-sm
        // still caps it on tablet+ so it doesn't stretch.
        className="h-auto max-h-full w-auto max-w-sm"
        aria-hidden="true"
      >
        {/* Clipboard backing board — longer, generous margins. */}
        <rect
          x="44"
          y="42"
          width="232"
          height="336"
          rx="6"
          strokeWidth="1.6"
          fill="currentColor"
          fillOpacity="0.06"
        />
        {/* Hardware clip at the top */}
        <rect
          x="130"
          y="24"
          width="60"
          height="26"
          rx="3"
          strokeWidth="1.4"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <line x1="130" y1="37" x2="190" y2="37" strokeWidth="0.9" opacity="0.4" />
        <circle cx="144" cy="37" r="1.4" fill="currentColor" opacity="0.55" />
        <circle cx="176" cy="37" r="1.4" fill="currentColor" opacity="0.55" />

        {/* A4 paper (192 × 272 ≈ 1:1.42 ratio) */}
        <rect
          x="64"
          y="64"
          width="192"
          height="272"
          strokeWidth="1.4"
          fill="var(--color-surface)"
        />

        {/* Document header — form ref + serial up top, then a stronger
            title rule and lighter subtitle, divided from the row list
            with a hairline. */}
        <line x1="80" y1="80" x2="124" y2="80" strokeWidth="1.6" opacity="0.85" />
        <line x1="160" y1="80" x2="196" y2="80" strokeWidth="0.9" opacity="0.4" />
        <line x1="80" y1="94" x2="206" y2="94" strokeWidth="1.9" opacity="0.85" />
        <line x1="80" y1="102" x2="172" y2="102" strokeWidth="0.95" opacity="0.45" />
        <line x1="80" y1="108" x2="148" y2="108" strokeWidth="0.85" opacity="0.35" />
        <line x1="74" y1="116" x2="246" y2="116" strokeWidth="0.6" opacity="0.55" />

        {/* Spec rows — checkboxes + text-style line layout. Marks are
            rendered separately below so they can share a fade-out
            opacity+blur group when the cycle resets. */}
        {CHECKLIST_ROWS.map((row, i) => {
          const y = ROW_TOP + i * ROW_GAP;
          const layout = ROW_TEXT[i];
          const valueStart = TEXT_X + layout.label + 6;
          return (
            <g key={i}>
              <rect
                x={CHECKBOX_X}
                y={y}
                width={CHECKBOX_SIZE}
                height={CHECKBOX_SIZE}
                strokeWidth="1.2"
              />
              <line
                x1={TEXT_X}
                y1={y + 5}
                x2={TEXT_X + layout.label}
                y2={y + 5}
                strokeWidth="1.55"
                opacity="0.78"
              />
              <line
                x1={valueStart}
                y1={y + 5}
                x2={valueStart + layout.value}
                y2={y + 5}
                strokeWidth="1.05"
                opacity="0.5"
              />
              <line
                x1={TEXT_X + 10}
                y1={y + 13}
                x2={TEXT_X + 10 + layout.sub}
                y2={y + 13}
                strokeWidth="0.85"
                opacity="0.3"
              />
            </g>
          );
        })}

        {/* Marks — centred + slightly smaller. Wrapped in a motion.g
            with shared opacity + filter so they dissolve gracefully
            (opacity fade + light blur) after the pencil docks instead
            of flashing off at the next cycle. */}
        <motion.g style={{ opacity: marksOpacity, filter: marksFilter }}>
          {CHECKLIST_ROWS.map((row, i) => {
            const y = ROW_TOP + i * ROW_GAP;
            if (row.mark === "check") {
              const cp = checkPath(y);
              return (
                <motion.polyline
                  key={i}
                  points={`${cp.A.x},${cp.A.y} ${cp.B.x},${cp.B.y} ${cp.C.x},${cp.C.y}`}
                  strokeWidth="1.8"
                  stroke="currentColor"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ pathLength: stroke1[i] }}
                />
              );
            }
            const xp = crossPath(y);
            return (
              <g key={i}>
                <motion.line
                  x1={xp.A.x}
                  y1={xp.A.y}
                  x2={xp.B.x}
                  y2={xp.B.y}
                  strokeWidth="1.8"
                  strokeLinecap="butt"
                  stroke="currentColor"
                  style={{ pathLength: stroke1[i] }}
                />
                <motion.line
                  x1={xp.C.x}
                  y1={xp.C.y}
                  x2={xp.D.x}
                  y2={xp.D.y}
                  strokeWidth="1.8"
                  strokeLinecap="butt"
                  stroke="currentColor"
                  style={{ pathLength: stroke2[i] }}
                />
              </g>
            );
          })}
        </motion.g>

        {/* Document footer */}
        <line x1="74" y1="298" x2="246" y2="298" strokeWidth="0.6" opacity="0.55" />
        {/* "Signed:" label + signature line */}
        <line x1="80" y1="312" x2="100" y2="312" strokeWidth="1.3" opacity="0.7" />
        <line x1="106" y1="312" x2="160" y2="312" strokeWidth="0.9" opacity="0.4" />
        {/* "Date:" label + line */}
        <line x1="174" y1="312" x2="192" y2="312" strokeWidth="1.3" opacity="0.7" />
        <line x1="198" y1="312" x2="240" y2="312" strokeWidth="0.9" opacity="0.4" />

        {/* Pencil. Outer motion.g translates the tip; inner motion.g
            rotates the body. `originX: 0, originY: 0.5` makes motion's
            transform-origin land at (left edge of bbox, vertical
            centre) which corresponds to the graphite tip at (0,0). */}
        <motion.g style={{ x: pencilX, y: pencilY }}>
          <motion.g
            style={{ rotate: pencilAngle, originX: 0, originY: 0.5 }}
          >
            {/* Wood cone — solid */}
            <polygon
              points="0,0 14,-4.5 14,4.5"
              fill={PENCIL_FILL_WOOD_LIGHT}
              stroke="currentColor"
              strokeWidth="1.2"
            />
            {/* Graphite tip */}
            <polygon
              points="0,0 5,-1.6 5,1.6"
              fill="var(--color-ink)"
              stroke="none"
            />
            {/* Barrel — solid painted body */}
            <rect
              x="14"
              y="-4.5"
              width="58"
              height="9"
              fill={PENCIL_FILL_BARREL}
              stroke="currentColor"
              strokeWidth="1.2"
            />
            {/* Painted-edge highlight where wood meets paint */}
            <line
              x1="14"
              y1="-4.5"
              x2="14"
              y2="4.5"
              stroke={PENCIL_FILL_WOOD}
              strokeWidth="1.4"
            />
            {/* Ferrule — solid metal */}
            <rect
              x="72"
              y="-4.5"
              width="9"
              height="9"
              fill={PENCIL_FILL_FERRULE}
              stroke="currentColor"
              strokeWidth="1.2"
            />
            {/* Ferrule bands */}
            <line
              x1="75"
              y1="-4.5"
              x2="75"
              y2="4.5"
              stroke={PENCIL_FILL_FERRULE_BAND}
              strokeWidth="0.8"
            />
            <line
              x1="78"
              y1="-4.5"
              x2="78"
              y2="4.5"
              stroke={PENCIL_FILL_FERRULE_BAND}
              strokeWidth="0.8"
            />
            {/* Eraser — solid rubber stub */}
            <rect
              x="81"
              y="-4.5"
              width="9"
              height="9"
              rx="1.2"
              fill={PENCIL_FILL_ERASER}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </motion.g>
        </motion.g>

        {/* Latch — rendered AFTER the pencil so it visibly clasps OVER
            the parked pencil body when closed. */}
        <LatchStrap latchOpen={latchOpen} />
      </svg>
    </div>
  );
}

// Latch buckle width — perpendicular distance between the two band
// rails. Closed band straddles the pencil body so the pencil sits
// between the two rails.
const LATCH_BAND_W = 5;

function LatchStrap({
  latchOpen,
}: {
  latchOpen: ReturnType<typeof useMotionValue<number>>;
}) {
  // The latch reads as a buckle/strap rather than a single line. We
  // model it as a 4-corner band (two parallel rails + closing edges)
  // that rotates around the hinge point. Closed state lies horizontal
  // straddling the parked pencil body. Open state stands vertical,
  // clearing the pencil's exit path.
  const { x: hx, y: hy } = LATCH_HINGE;
  const armLen = LATCH_ARM + 2; // slightly longer so it clearly wraps the pencil
  const halfW = LATCH_BAND_W / 2;
  const theta = useTransform(latchOpen, (v) => (-Math.PI / 2) * v);

  // Corners in hinge-local coords (before rotation):
  //   tl ─── tr
  //    │     │
  //   bl ─── br
  // tl = (0, -halfW), tr = (armLen, -halfW)
  // br = (armLen, +halfW), bl = (0, +halfW)
  const tlX = useTransform(theta, (t) => hx - (-halfW) * Math.sin(t));
  const tlY = useTransform(theta, (t) => hy + (-halfW) * Math.cos(t));
  const trX = useTransform(
    theta,
    (t) => hx + armLen * Math.cos(t) - (-halfW) * Math.sin(t)
  );
  const trY = useTransform(
    theta,
    (t) => hy + armLen * Math.sin(t) + (-halfW) * Math.cos(t)
  );
  const brX = useTransform(
    theta,
    (t) => hx + armLen * Math.cos(t) - halfW * Math.sin(t)
  );
  const brY = useTransform(
    theta,
    (t) => hy + armLen * Math.sin(t) + halfW * Math.cos(t)
  );
  const blX = useTransform(theta, (t) => hx - halfW * Math.sin(t));
  const blY = useTransform(theta, (t) => hy + halfW * Math.cos(t));

  return (
    <g>
      {/* Mount bracket — fixed strip bolted to the board. */}
      <line
        x1={hx - 3}
        y1={hy - 10}
        x2={hx - 3}
        y2={hy + 12}
        strokeWidth="1.5"
        stroke="currentColor"
        opacity="0.55"
        strokeLinecap="round"
      />
      <line
        x1={hx - 5}
        y1={hy - 10}
        x2={hx - 1}
        y2={hy - 10}
        strokeWidth="1"
        stroke="currentColor"
        opacity="0.45"
        strokeLinecap="round"
      />
      <line
        x1={hx - 5}
        y1={hy + 12}
        x2={hx - 1}
        y2={hy + 12}
        strokeWidth="1"
        stroke="currentColor"
        opacity="0.45"
        strokeLinecap="round"
      />

      {/* Band — 4 sides of the buckle rotate together around the hinge.
          Two parallel rails (top + bottom) make it read as a strap
          rather than a single line; the closing edge at the far end
          forms the clasp loop. */}
      {/* Top rail */}
      <motion.line
        x1={tlX}
        y1={tlY}
        x2={trX}
        y2={trY}
        strokeWidth="1.4"
        stroke="currentColor"
        strokeLinecap="round"
      />
      {/* Bottom rail */}
      <motion.line
        x1={blX}
        y1={blY}
        x2={brX}
        y2={brY}
        strokeWidth="1.4"
        stroke="currentColor"
        strokeLinecap="round"
      />
      {/* Clasp edge — closes the band at the far end so it loops back
          over the pencil. */}
      <motion.line
        x1={trX}
        y1={trY}
        x2={brX}
        y2={brY}
        strokeWidth="1.4"
        stroke="currentColor"
        strokeLinecap="round"
      />
      {/* Hinge edge — small connector at the hinge, completing the
          buckle outline. */}
      <motion.line
        x1={tlX}
        y1={tlY}
        x2={blX}
        y2={blY}
        strokeWidth="1.2"
        stroke="currentColor"
        opacity="0.7"
        strokeLinecap="round"
      />
    </g>
  );
}

function ProblemGraphic({ name }: { name: string }) {
  if (name === "workforce") return <ConveyorBelt />;
  if (name === "globe") return <IndexArchGlobe />;
  return <ChecklistGraphic />;
}

// ─── Section ──────────────────────────────────────────────────────

const CYCLE_MS = 14000;

export default function ProblemSection() {
  const problems = PROBLEM_CAROUSEL.problems;
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % problems.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [hovering, problems.length]);

  const goTo = (i: number) =>
    setActive(((i % problems.length) + problems.length) % problems.length);

  return (
    <section className="relative min-h-screen flex items-center hairline-top">
      <div
        className="mx-auto w-full max-w-[var(--max-width)] px-6 lg:px-8 py-14 sm:py-20 lg:py-36"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Two-column carousel — no surrounding container. Vertical
            hairline divides the title/body on the left from the
            graphic on the right. Auto-cycles every 9s, pauses on
            hover.

            Order on mobile (single column):
              1. graphic
              2. nav controls   ← positioned right under the graphic so
                                  they're visible immediately
              3. heading + body
            Order on desktop (two columns):
              left  = heading + body + nav controls
              right = graphic
            The desktop layout is unchanged — only the third grid
            child (mobile-only nav) is added with `lg:hidden`. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 min-h-0 lg:min-h-[72vh] lg:divide-x lg:divide-rule">
          {/* GRAPHIC — mobile order-1 (top), desktop right column.
              Mobile heights use fixed px so the whole slide (graphic
              + heading + body + nav) lands inside one phone screen
              instead of pushing the controls below the fold. */}
          <div className="order-1 lg:order-2 lg:pl-12 xl:pl-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`graphic-${active}`}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.015 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                // Tighter mobile height to keep the slide compact;
                // illustration color is inherited from
                // `.problem-graphic-color` on the inner wrappers
                // (light → graphite, dark → warm cream).
                className="h-[280px] sm:h-[340px] md:h-[44vh] lg:h-[72vh]"
              >
                <ProblemGraphic name={problems[active].graphic} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* TEXT + NAV — mobile order-2 (after graphic), desktop
              order-1 (left column). The nav controls live INSIDE this
              column so they belong to the slide on every breakpoint
              and scroll with the section — never floating relative to
              the viewport. Mobile centres the whole block; desktop
              keeps the left-aligned editorial layout untouched. */}
          <div className="order-2 lg:order-1 lg:pr-12 xl:pr-16 flex flex-col justify-center text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[1.65rem] sm:text-3xl lg:text-[2.6rem] text-ink leading-[1.3] lg:leading-[1.28]"
                style={{ textWrap: "balance" as never }}
              >
                {problems[active].title}
              </motion.h2>
            </AnimatePresence>

            {/* Body sits tight beneath the heading. `text-wrap: pretty`
                pulls extra words down to the last line so it never
                ends on a one-word widow. */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`body-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 lg:mt-7 mx-auto lg:mx-0 max-w-xl text-[15px] sm:text-base lg:text-lg text-ink-muted leading-relaxed"
                style={{ textWrap: "pretty" as never }}
              >
                {problems[active].description}
              </motion.p>
            </AnimatePresence>

            {/* Nav controls — under the body on mobile so the user
                reads the point first, then taps prev/next. Same row
                on desktop, just left-aligned via the column's
                text-center→lg:text-left switch above. */}
            <div className="mt-8 lg:mt-12 flex items-center gap-5 justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Previous problem"
                className="flex h-11 w-11 lg:h-10 lg:w-10 items-center justify-center border border-rule bg-surface text-ink-muted transition-colors hover:border-ink-faint hover:text-ink cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="13" y1="8" x2="3" y2="8" />
                  <polyline points="7,4 3,8 7,12" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label="Next problem"
                className="flex h-11 w-11 lg:h-10 lg:w-10 items-center justify-center border border-rule bg-surface text-ink-muted transition-colors hover:border-ink-faint hover:text-ink cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="8" x2="13" y2="8" />
                  <polyline points="9,4 13,8 9,12" />
                </svg>
              </button>
              <div className="ml-1 flex items-center gap-2">
                {problems.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to problem ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === active ? "w-6 bg-ink" : "w-1.5 bg-rule hover:bg-ink-faint"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 font-mono text-xs text-ink-faint tracking-wide">
                {String(active + 1).padStart(2, "0")} / {String(problems.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Industry stats — two stats side-by-side, then a 3-card
            breakdown of the concrete symptoms underneath. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-28 lg:mt-40 grid grid-cols-1 lg:grid-cols-2 border border-rule"
        >
          <StatCell
            value={86}
            label={PROBLEM.stat.label}
            source={PROBLEM.stat.source}
            sourceUrl={PROBLEM.stat.sourceUrl}
          />
          <StatCell
            value={75}
            label={PROBLEM.stat2.label}
            source={PROBLEM.stat2.source}
            sourceUrl={PROBLEM.stat2.sourceUrl}
            className="lg:border-l border-t lg:border-t-0 border-rule"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 border border-rule border-t-0"
        >
          {PROBLEM.cards.map((card, i) =>
            i === 2 ? (
              <LostBuyerCard key={card.title} card={card} />
            ) : (
              <SymptomCard
                key={card.title}
                card={card}
                index={i}
                isLast={i === PROBLEM.cards.length - 1}
              />
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

function StatCell({
  value,
  label,
  source,
  sourceUrl,
  className = "",
}: {
  value: number;
  label: string;
  source: string;
  sourceUrl: string;
  className?: string;
}) {
  return (
    <div
      className={`p-14 lg:p-20 flex flex-col items-center text-center ${className}`}
    >
      <BlurCountUp target={value} suffix="%" />
      {/* Body copy uses the default sans body font (DM Sans) — matches
          the live indexarch.com stat cards exactly. */}
      <p className="mt-8 text-sm lg:text-base text-ink-muted leading-relaxed max-w-sm">
        {label}
      </p>
      <p className="mt-5 font-mono text-xs text-ink-faint tracking-wide uppercase">
        Source:{" "}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-ink-muted transition-colors"
        >
          {source}
        </a>
      </p>
    </div>
  );
}

// — Interactive symptom-card icons —
// Clock: hands rotate on hover. PDF: three pages split apart and text
// scrambles into rapid rollers. Magnifier: static glass that pairs with
// a cursor-following lens overlay on the Lost Buyers card.

function ClockIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-full h-full"
    >
      <circle cx="32" cy="32" r="24" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
      <line
        x1="32"
        y1="32"
        x2="32"
        y2="14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transformOrigin: "32px 32px",
          transform: `rotate(${hovered ? 360 : 0}deg)`,
          transition: "transform 3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      <line
        x1="32"
        y1="32"
        x2="44"
        y2="26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          transformOrigin: "32px 32px",
          transform: `rotate(${hovered ? 90 : 0}deg)`,
          transition: "transform 3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="32"
          y1="10"
          x2="32"
          y2="13"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
          style={{ transformOrigin: "32px 32px", transform: `rotate(${deg}deg)` }}
        />
      ))}
    </svg>
  );
}

function ScrambleChar({
  active,
  speed,
  chars,
}: {
  active: boolean;
  speed: number;
  chars: string;
}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active) {
      setIndex(0);
      return;
    }
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
            className="w-8 h-10 border border-current rounded-sm bg-surface-raised flex flex-col justify-center px-1 gap-[2px]"
            style={{ opacity: offset === 0 ? 1 : 0.7 }}
          >
            {hovered ? (
              <>
                {[0, 1, 2, 3, 4].map((row) => (
                  <div
                    key={row}
                    className="flex gap-[1px] text-[5px] font-mono text-ink-faint leading-none"
                    style={{ opacity: 1 - row * 0.12 }}
                  >
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

function MagnifyingGlassIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-full h-full"
    >
      <circle cx="26" cy="26" r="14" />
      <circle cx="26" cy="26" r="11" strokeWidth="0.5" opacity="0.15" />
      <path
        d="M18 20 Q20 16 24 17"
        strokeWidth="0.75"
        opacity="0.2"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="36.5"
        y1="36.5"
        x2="50"
        y2="50"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line x1="42" y1="44" x2="44" y2="42" strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />
      <line x1="44.5" y1="46.5" x2="46.5" y2="44.5" strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />
      <circle cx="37" cy="37" r="2" strokeWidth="0.75" opacity="0.2" />
      <path
        d="M24 23 Q24 20.5 26 20.5 Q28 20.5 28 23 Q28 24.5 26 25.5"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <circle cx="26" cy="28.5" r="0.6" fill="currentColor" stroke="none" opacity="0.4" />
    </svg>
  );
}

function SymptomCard({
  card,
  index,
  isLast,
}: {
  card: { title: string; description: string };
  index: number;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className={`flex flex-col items-center text-center p-10 lg:p-12 cursor-default ${
        !isLast ? "border-b md:border-b-0 md:border-r border-rule" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-14 w-14 shrink-0 text-ink-faint mb-6">
        {index === 0 && <ClockIcon hovered={hovered} />}
        {index === 1 && <PdfIcon hovered={hovered} />}
      </div>
      <h3 className="font-sans text-base font-semibold text-ink mb-2">
        {card.title}
      </h3>
      <p
        className="text-sm text-ink-muted leading-relaxed max-w-xs"
        style={{ textWrap: "balance" as never }}
      >
        {card.description}
      </p>
    </motion.div>
  );
}

// Shared card content so the sharp base layer and the magnified
// duplicate layer render identical markup (guarantees the clipped
// reveal stays pixel-aligned with what's underneath). The static
// magnifier icon fades out while the cursor is over the card — the
// moving lens takes its place. opacity (not display:none) keeps the
// icon's layout box so both layers stay aligned.
function LostBuyerContent({
  card,
  hideIcon = false,
}: {
  card: { title: string; description: string };
  hideIcon?: boolean;
}) {
  return (
    <>
      <div
        className="h-14 w-14 shrink-0 text-ink-faint mb-6"
        style={{ opacity: hideIcon ? 0 : 1, transition: "opacity 0.2s ease" }}
      >
        <MagnifyingGlassIcon />
      </div>
      <h3 className="font-sans text-base font-semibold text-ink mb-2">
        {card.title}
      </h3>
      <p
        className="text-sm text-ink-muted leading-relaxed max-w-xs"
        style={{ textWrap: "balance" as never }}
      >
        {card.description}
      </p>
    </>
  );
}

// Lost Buyers magnifier — duplicate-content glass lens.
//
// Why this technique (not backdrop-filter): backdrop-filter:blur() —
// the deployed approach — silently fails to composite inside an
// overflow:hidden parent on iOS Safari, so the lens never blurred on
// phones. Instead we render the card content twice: a sharp base
// layer, and a duplicate that is magnified + blurred + glass-distorted
// and clipped to a circle that tracks the cursor. The duplicate has an
// OPAQUE card-coloured background (var(--color-surface)) so the sharp
// base underneath is fully hidden — otherwise the sharp text bleeds
// through the translucent blur and the effect disappears.
//
// The look (blur 3 / magnify 1.85 / brightness 1.8 / SVG glass
// distortion scale 20) was dialled in interactively and transcribed
// here. The SVG feTurbulence + feDisplacementMap filter is applied via
// `filter: url(#...)` (NOT backdrop-filter: url(), which is
// Chrome-only) so the glass warp works cross-browser including Safari.
function LostBuyerCard({ card }: { card: { title: string; description: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const lensRadius = 22; // 44px diameter
  const clip = `circle(${lensRadius}px at ${pos.x}px ${pos.y}px)`;
  const lensFilter =
    "url(#lostBuyersGlass) blur(3px) brightness(1.8)";

  const move = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: clientX - rect.left, y: clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      className="flex flex-col items-center text-center p-10 lg:p-12 relative overflow-hidden"
      style={{ cursor: active ? "none" : "default" }}
      onMouseEnter={(e) => {
        setActive(true);
        move(e.clientX, e.clientY);
      }}
      onMouseLeave={() => setActive(false)}
      onMouseMove={(e) => move(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (!t) return;
        setActive(true);
        move(t.clientX, t.clientY);
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (!t) return;
        move(t.clientX, t.clientY);
      }}
      onTouchEnd={() => setActive(false)}
      onTouchCancel={() => setActive(false)}
    >
      {/* SVG glass-distortion filter — Perlin noise (feTurbulence)
          drives feDisplacementMap to warp the magnified text like
          real refracting glass. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="lostBuyersGlass" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.015}
            numOctaves={2}
            seed={4}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={20}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Base (sharp) layer — icon hidden while the lens is active */}
      <LostBuyerContent card={card} hideIcon={active} />

      {/* Magnified glass duplicate, clipped to the lens circle. The
          clip lives on the WRAPPER so the magnify scale on the inner
          layer doesn't enlarge the lens itself. */}
      {active && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: clip, WebkitClipPath: clip, zIndex: 10 }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center text-center p-10 lg:p-12"
            style={{
              background: "var(--color-surface)",
              filter: lensFilter,
              WebkitFilter: lensFilter,
              transform: "scale(1.85)",
              transformOrigin: `${pos.x}px ${pos.y}px`,
            }}
          >
            <LostBuyerContent card={card} hideIcon />
          </div>
        </div>
      )}

      {/* Lens frame — ring + inner ring + diagonal handle */}
      {active && (
        <div
          className="pointer-events-none absolute text-ink-muted"
          style={{ left: pos.x - lensRadius, top: pos.y - lensRadius, zIndex: 20 }}
        >
          <div
            style={{
              width: lensRadius * 2,
              height: lensRadius * 2,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.5)",
              boxShadow: "inset 0 0 8px rgba(255,255,255,0.06)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 3,
              top: 3,
              width: lensRadius * 2 - 6,
              height: lensRadius * 2 - 6,
              borderRadius: "50%",
              border: "0.5px solid rgba(255,255,255,0.35)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: lensRadius + lensRadius * 0.707,
              top: lensRadius + lensRadius * 0.707,
              width: 26,
              height: 2,
              borderRadius: 2,
              background: "rgba(255,255,255,0.5)",
              transform: "rotate(45deg)",
              transformOrigin: "left center",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

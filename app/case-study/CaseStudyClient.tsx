"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

const META = [
  { label: "Industry", value: "Tiles & Ceramics" },
  { label: "Products", value: "180+ SKUs" },
  { label: "Timeline", value: "5 weeks" },
  { label: "Result", value: "-40% email volume" },
];

const RESULTS = [
  { label: "Email Volume", before: "120/month", after: "72/month" },
  { label: "Response Time", before: "48 hours", after: "Instant" },
  { label: "Qualified Inquiries", before: "15/month", after: "22/month" },
  { label: "Sample Requests", before: "8/month", after: "14/month" },
];

const FEATURES = [
  "Filter by collection, size, finish, application, and slip resistance rating",
  "Side-by-side comparison of up to 3 tiles with full spec sheets",
  "3D texture preview so architects can see surface detail before ordering samples",
  "One-click inquiry form pre-filled with product name, size, and finish",
  "Downloadable spec sheets generated on demand",
];

export default function CaseStudyClient() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-[calc(var(--header-height)+4rem)] pb-12 lg:pb-16">
          <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={fadeUp}
                className="block font-mono text-xs tracking-widest uppercase text-ink-muted mb-4"
              >
                Case Study
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight max-w-3xl"
              >
                How Kayu & Kov reduced architect emails by 40% with a 3D catalog
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base lg:text-lg text-ink-muted leading-relaxed max-w-2xl"
              >
                A premium tiles and surfaces manufacturer transformed their sales
                workflow by replacing a 200-page PDF with an interactive product
                experience.
              </motion.p>

              {/* Meta strip */}
              <motion.div
                variants={fadeUp}
                className="mt-10 grid grid-cols-2 sm:grid-cols-4 border border-rule"
              >
                {META.map((item) => (
                  <div
                    key={item.label}
                    className="p-5 lg:p-6 border-b sm:border-b-0 sm:border-r border-rule last:border-r-0 last:border-b-0"
                  >
                    <p className="font-mono text-xs text-ink-faint tracking-wider uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-ink">{item.value}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Hairline */}
        <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
          <div className="hairline-bottom" />
        </div>

        {/* Content */}
        <section className="py-12 lg:py-20">
          <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <motion.div
                className="lg:col-span-8"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {/* The Problem */}
                <h2 className="font-serif text-2xl lg:text-3xl text-ink mb-6">
                  The Problem
                </h2>
                <p className="text-sm text-ink-light leading-[1.8] mb-5">
                  Kayu & Kov manufactures premium ceramic tiles and natural stone
                  surfaces for architects and interior designers across India and
                  the Middle East. With over 180 products across 12 collections,
                  their catalog was a 200-page PDF that hadn&apos;t been redesigned
                  since 2019.
                </p>
                <p className="text-sm text-ink-light leading-[1.8] mb-8">
                  Their sales team of 4 spent most of their day answering the same
                  questions: &ldquo;What sizes does the Carrara come in?&rdquo;
                  &ldquo;Is the matte finish available in 600x600?&rdquo;
                  &ldquo;Can you send me the spec sheet for the outdoor
                  range?&rdquo;
                </p>

                {/* Email thread */}
                <div className="border-l-2 border-ink/10 pl-6 py-6 mb-8 bg-surface-sunken/50 pr-6">
                  <p className="font-mono text-xs text-ink-faint tracking-wide mb-3">
                    <span className="text-ink-muted">From:</span>{" "}
                    architect.sharma@designfirm.in
                  </p>
                  <p className="font-mono text-xs text-ink-faint tracking-wide mb-4">
                    <span className="text-ink-muted">Subject:</span> RE: RE: RE:
                    Tile specs for Horizon project
                  </p>
                  <p className="text-sm text-ink-light leading-relaxed mb-4">
                    Hi Priya,
                  </p>
                  <p className="text-sm text-ink-light leading-relaxed mb-4">
                    Thanks for the PDF. I couldn&apos;t find the slip resistance
                    rating for the Limestone Ivory in 800x800. Also, is the Basalt
                    Nero available in a honed finish? The PDF shows polished only.
                  </p>
                  <p className="text-sm text-ink-light leading-relaxed mb-4">
                    We need to finalize specs by Thursday. Can you confirm?
                  </p>
                  <p className="font-mono text-xs text-ink-muted mt-4">
                    — This was email #7 in a thread that started 3 weeks ago.
                  </p>
                </div>

                <p className="text-sm text-ink-light leading-[1.8] mb-12">
                  Each architect inquiry took an average of 48 hours to resolve. By
                  the time Kayu & Kov responded, many architects had already
                  specified a competitor&apos;s product.
                </p>

                {/* The Solution */}
                <h2 className="font-serif text-2xl lg:text-3xl text-ink mb-6">
                  The Solution
                </h2>
                <p className="text-sm text-ink-light leading-[1.8] mb-5">
                  Index built Kayu & Kov an interactive 3D catalog that lets
                  architects browse, filter, compare, and inquire — all without
                  sending a single email.
                </p>

                <ul className="space-y-3 my-8">
                  {FEATURES.map((f) => (
                    <li
                      key={f}
                      className="flex gap-3 text-sm text-ink-light leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-ink-light leading-[1.8] mb-12">
                  The project took 5 weeks from kickoff to launch, including data
                  migration from their existing PDF and 2 rounds of design
                  revisions.
                </p>

                {/* The Results */}
                <h2 className="font-serif text-2xl lg:text-3xl text-ink mb-6">
                  The Results
                </h2>
                <p className="text-sm text-ink-light leading-[1.8] mb-8">
                  Within 60 days of launching the interactive catalog, Kayu & Kov
                  saw measurable improvements across their entire sales funnel:
                </p>

                {/* Results grid */}
                <div className="grid grid-cols-2 gap-px bg-rule border border-rule mb-8">
                  {RESULTS.map((r) => (
                    <div key={r.label} className="bg-surface p-5 lg:p-6">
                      <p className="font-mono text-xs text-ink-faint tracking-wider uppercase mb-3">
                        {r.label}
                      </p>
                      <p className="text-sm text-ink-muted line-through decoration-rule mb-1">
                        {r.before}
                      </p>
                      <p className="font-mono text-lg font-medium text-ink">
                        {r.after}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-ink-light leading-[1.8] mb-5">
                  The most significant change was in inquiry quality. Before the
                  catalog, 60% of inquiries were basic spec questions. After
                  launch, 85% of inquiries came with product name, size, finish,
                  and quantity already specified — ready for quoting.
                </p>
                <p className="text-sm text-ink-light leading-[1.8]">
                  &ldquo;Our sales team went from answering questions to closing
                  deals,&rdquo; says Rohan Mehta, Director at Kayu & Kov.
                  &ldquo;That&apos;s the real ROI.&rdquo;
                </p>
              </motion.div>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] space-y-8">
                  {/* Quick Facts */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="border border-rule p-6 lg:p-8"
                  >
                    <h3 className="font-mono text-xs tracking-widest uppercase text-ink-muted mb-6">
                      Quick Facts
                    </h3>
                    <dl className="space-y-4">
                      {[
                        ["Client", "Kayu & Kov"],
                        ["Industry", "Tiles & Surfaces"],
                        ["Products", "180+ SKUs"],
                        ["Timeline", "5 weeks"],
                        ["Plan", "Professional"],
                      ].map(([dt, dd]) => (
                        <div
                          key={dt}
                          className="flex justify-between items-baseline border-b border-rule pb-3 last:border-b-0 last:pb-0"
                        >
                          <dt className="text-xs text-ink-muted">{dt}</dt>
                          <dd className="text-sm font-medium text-ink">{dd}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>

                  {/* Quote */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="border-l-2 pl-6"
                    style={{ borderColor: "#8B3A2A" }}
                  >
                    <p className="font-serif text-base text-ink leading-relaxed italic">
                      &ldquo;We used to dread Monday mornings because of the email
                      backlog. Now architects find everything they need on the
                      catalog. Our inbox is actually manageable.&rdquo;
                    </p>
                    <p className="mt-3 font-mono text-xs text-ink-faint">
                      — Priya Desai, Sales Lead, Kayu & Kov
                    </p>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="border border-rule bg-surface-sunken p-6 lg:p-8"
                  >
                    <h3 className="font-sans text-sm font-semibold text-ink mb-2">
                      See what your catalog could look like
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed mb-5">
                      We&apos;ll build a free 10-product demo using your real
                      products.
                    </p>
                    <Button
                      variant="primary"
                      href="/#contact"
                      className="w-full justify-center"
                    >
                      Get Free Demo →
                    </Button>
                  </motion.div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

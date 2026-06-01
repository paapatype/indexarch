"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Button from "./ui/Button";
import TileGrid from "./TileGrid";
import { CONTACT, CONTACT_EMAIL } from "@/lib/constants";

interface FormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  products: string;
  productsCustom: string;
  industry: string;
  industryCustom: string;
  message: string;
}

const initial: FormData = {
  company: "",
  name: "",
  email: "",
  phone: "",
  products: "",
  productsCustom: "",
  industry: "",
  industryCustom: "",
  message: "",
};

// Formspree form endpoint. Paste the URL from your Formspree form here
// (looks like "https://formspree.io/f/abcdwxyz"); set the form's
// notification recipient to info@indexarch.com inside Formspree.
// While this is empty, the form falls back to a mailto: compose so the
// live form never breaks — once the endpoint is set, submissions POST
// to Formspree and you get the email automatically (no mail app).
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeedbzqq";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Optional catalogue-PDF attachment.
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_MB = 10;

  const acceptFile = (f: File | undefined | null) => {
    if (!f) return;
    const isPdf =
      f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setFileError("Please upload a PDF file.");
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`That PDF is over ${MAX_FILE_MB}MB — email it to us instead.`);
      return;
    }
    setFileError(null);
    setFile(f);
  };

  // True once a Formspree endpoint is configured — drives both the
  // submit path and the confirmation copy.
  const hasBackend = FORMSPREE_ENDPOINT.length > 0;

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.company.trim()) errs.company = "Company name is required";
    if (!form.name.trim()) errs.name = "Your name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (form.phone && !/^[\d\s\-+()]{7,}$/.test(form.phone))
      errs.phone = "Enter a valid phone number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const products =
      form.products === "Other" ? form.productsCustom : form.products;
    const industry =
      form.industry === "Other" ? form.industryCustom : form.industry;
    const subject = `Demo request — ${form.company || form.name}`;

    // ── Real submission path: POST to Formspree → emails the team.
    // Sent as multipart/form-data (FormData) so an optional PDF
    // attachment rides along. Note: file attachments require a paid
    // Formspree plan; text fields submit fine on any plan. Do NOT set
    // Content-Type — the browser sets the multipart boundary.
    if (hasBackend) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const fd = new FormData();
        fd.append("company", form.company);
        fd.append("name", form.name);
        fd.append("email", form.email);
        fd.append("phone", form.phone);
        fd.append("products", products);
        fd.append("industry", industry);
        fd.append("message", form.message);
        fd.append("_subject", subject);
        if (file) fd.append("catalogue", file, file.name);

        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: fd,
        });
        if (res.ok) {
          setSubmitted(true);
        } else {
          const data = (await res.json().catch(() => null)) as
            | { errors?: { message?: string }[] }
            | null;
          setSubmitError(
            data?.errors?.[0]?.message ||
              `Something went wrong. Please email us directly at ${CONTACT_EMAIL}.`
          );
        }
      } catch {
        setSubmitError(
          `Couldn't send right now. Please email us directly at ${CONTACT_EMAIL}.`
        );
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // ── Fallback (no backend yet): compose a pre-filled email so the
    // form still works. Replaced by the Formspree path above as soon as
    // FORMSPREE_ENDPOINT is set.
    const body = [
      `Company: ${form.company}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      products ? `Number of products: ${products}` : null,
      industry ? `Industry: ${industry}` : null,
      "",
      form.message ? `Message:\n${form.message}` : null,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const inputClass = (key: keyof FormData) =>
    `w-full border bg-surface-raised px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-ink focus:outline-none ${
      errors[key] ? "border-red-400" : "border-rule"
    }`;

  if (submitted) {
    return (
      <section id="contact" className="py-section-sm lg:py-section relative">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block font-mono text-6xl mb-6 text-signal">&#10003;</span>
            <h2 className="font-serif text-4xl text-ink mb-4">
              {hasBackend
                ? "We've got your details."
                : "Almost there — hit send."}
            </h2>
            <p className="text-ink-muted">
              {hasBackend ? (
                <>
                  Thanks — your enquiry is on its way to us. We&apos;ll reply
                  within 24 hours with your free demo plan. (Or reach us
                  directly at{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .)
                </>
              ) : (
                <>
                  Your email to {CONTACT_EMAIL} just opened in your mail app
                  with your details filled in. Send it and we&apos;ll reply
                  within 24 hours with your free demo plan.
                </>
              )}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative py-section-sm lg:py-section overflow-hidden"
    >
      {/* Background — same tile-grid + cursor light source as the hero,
          so the page bookends with the same texture. */}
      <TileGrid className="-z-10" />
      <div className="relative mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left — Copy. items-start on the grid + no self-center so the
              headline's first line aligns with the form box's top edge. */}
          <motion.div
            className="lg:col-span-5 text-center lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-serif text-[2.1rem] sm:text-5xl lg:text-6xl text-ink leading-[1.2]"
            >
              {/* Mobile: forced break after "deals" so the heading lands
                  as two balanced lines ("Stop losing deals" / "to messy
                  PDFs.") instead of an unbalanced three-line auto-wrap.
                  Desktop keeps the natural flow. */}
              <span className="sm:hidden">
                Stop losing deals
                <br />
                to messy PDFs.
              </span>
              <span className="hidden sm:inline">{CONTACT.heading}</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-base lg:text-lg text-ink-muted leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              {CONTACT.subheading}
            </motion.p>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="lg:col-span-7"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="border border-rule bg-surface-raised p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Company */}
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block font-mono text-xs text-ink-muted tracking-wide uppercase mb-2">
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    required
                    value={form.company}
                    onChange={set("company")}
                    className={inputClass("company")}
                    placeholder="Acme Manufacturing Ltd."
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-red-500">{errors.company}</p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-ink-muted tracking-wide uppercase mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={set("name")}
                    className={inputClass("name")}
                    placeholder="Rajesh Kumar"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-ink-muted tracking-wide uppercase mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    className={inputClass("email")}
                    placeholder="rajesh@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block font-mono text-xs text-ink-muted tracking-wide uppercase mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    className={inputClass("phone")}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Number of Products */}
                <div>
                  <label htmlFor="products" className="block font-mono text-xs text-ink-muted tracking-wide uppercase mb-2">
                    Number of Products
                  </label>
                  <select
                    id="products"
                    value={form.products}
                    onChange={set("products")}
                    className={`${inputClass("products")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6"><path d="M0 0l6 6 6-6" fill="none" stroke="%23999" stroke-width="1.5"/></svg>')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat`}
                  >
                    <option value="">Select range</option>
                    {CONTACT.productOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {form.products === "Other" && (
                    <input
                      type="text"
                      value={form.productsCustom}
                      onChange={set("productsCustom")}
                      className={`${inputClass("productsCustom")} mt-2`}
                      placeholder="e.g. 750 products"
                    />
                  )}
                </div>

                {/* Industry */}
                <div>
                  <label htmlFor="industry" className="block font-mono text-xs text-ink-muted tracking-wide uppercase mb-2">
                    Industry
                  </label>
                  <select
                    id="industry"
                    value={form.industry}
                    onChange={set("industry")}
                    className={`${inputClass("industry")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6"><path d="M0 0l6 6 6-6" fill="none" stroke="%23999" stroke-width="1.5"/></svg>')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat`}
                  >
                    <option value="">Select industry</option>
                    {CONTACT.industryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {form.industry === "Other" && (
                    <input
                      type="text"
                      value={form.industryCustom}
                      onChange={set("industryCustom")}
                      className={`${inputClass("industryCustom")} mt-2`}
                      placeholder="e.g. Automotive, Aerospace"
                    />
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mt-5">
                <label htmlFor="message" className="block font-mono text-xs text-ink-muted tracking-wide uppercase mb-2">
                  Anything else you&apos;d like to mention
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputClass("message")} resize-vertical min-h-[80px]`}
                  placeholder="Tell us about your project, timeline, or any specific requirements..."
                />
              </div>

              {/* Catalogue PDF upload — drag/drop or click. Sent as a
                  Formspree attachment. */}
              <div className="mt-5">
                <label htmlFor="catalogue" className="block font-mono text-xs text-ink-muted tracking-wide uppercase mb-2">
                  Send us your catalogue (PDF, optional)
                </label>
                <input
                  ref={fileInputRef}
                  id="catalogue"
                  type="file"
                  accept=".pdf,application/pdf"
                  className="sr-only"
                  onChange={(e) => acceptFile(e.target.files?.[0])}
                />
                {!file ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      acceptFile(e.dataTransfer.files?.[0]);
                    }}
                    className={`flex w-full flex-col items-center justify-center gap-1.5 border border-dashed px-4 py-6 text-center transition-colors ${
                      dragging
                        ? "border-ink bg-surface-sunken"
                        : "border-rule hover:border-ink-faint bg-surface-raised"
                    }`}
                  >
                    <svg
                      className="h-5 w-5 text-ink-faint"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 16V4" />
                      <path d="m7 9 5-5 5 5" />
                      <path d="M5 20h14" />
                    </svg>
                    <span className="font-sans text-sm text-ink-muted">
                      Drag your PDF here, or{" "}
                      <span className="text-ink underline underline-offset-4 decoration-rule">
                        browse
                      </span>
                    </span>
                    <span className="font-mono text-[10px] tracking-wide uppercase text-ink-faint">
                      PDF · up to {MAX_FILE_MB}MB
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between gap-3 border border-rule bg-surface-raised px-4 py-3">
                    <span className="flex items-center gap-2 min-w-0">
                      <svg
                        className="h-4 w-4 shrink-0 text-ink-faint"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                      </svg>
                      <span className="truncate font-sans text-sm text-ink">
                        {file.name}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] text-ink-faint">
                        {(file.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setFileError(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      aria-label="Remove file"
                      className="shrink-0 font-mono text-xs text-ink-muted hover:text-ink transition-colors cursor-pointer"
                    >
                      Remove ✕
                    </button>
                  </div>
                )}
                {fileError && (
                  <p className="mt-1 text-xs text-red-500">{fileError}</p>
                )}
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending…" : CONTACT.submitLabel}
                </Button>
                {submitError && (
                  <p className="mt-3 text-sm text-red-500">{submitError}</p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

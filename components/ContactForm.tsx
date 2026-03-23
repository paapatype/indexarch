"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Button from "./ui/Button";
import { CONTACT } from "@/lib/constants";

interface FormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  products: string;
  productsCustom: string;
  industry: string;
  industryCustom: string;
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
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
              We&apos;ll be in touch soon.
            </h2>
            <p className="text-ink-muted">
              Thanks for your interest. We&apos;ll review your catalog details and
              reach out within 24 hours with your free demo plan.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-section-sm lg:py-section grid-bg relative">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — Copy */}
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-height)+3rem)] lg:self-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={fadeUp}
              className="block font-mono text-xs tracking-widest uppercase text-ink-faint mb-6"
            >
              Get Started
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-2xl sm:text-3xl text-ink leading-snug"
            >
              {CONTACT.heading}
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="mt-8 w-10 border-t-2"
              style={{ borderColor: "#8B3A2A" }}
              aria-hidden="true"
            />

            <motion.p
              variants={fadeUp}
              className="mt-8 text-sm text-ink-muted leading-relaxed max-w-xs"
            >
              {CONTACT.subheading}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-12 border-t border-rule pt-6"
            >
              <p className="font-mono text-xs text-ink-faint tracking-wide leading-relaxed">
                {CONTACT.footnote}
              </p>
            </motion.div>
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

              <div className="mt-8">
                <Button type="submit" variant="primary" className="w-full sm:w-auto justify-center">
                  {CONTACT.submitLabel}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Logo from "./Logo";
import { FOOTER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-sand-300 relative">
      <div className="mx-auto max-w-[var(--max-width)] px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <Logo className="h-5 w-auto text-sand-100 mb-6" />
            <p className="text-sm leading-relaxed text-sand-400 max-w-xs">
              {FOOTER.brand.description}
            </p>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs tracking-widest uppercase text-sand-500 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {FOOTER.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="text-sm text-sand-400 hover:text-sand-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-sand-400 hover:text-sand-100 transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs tracking-widest uppercase text-sand-500 mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-sand-400">
              <li>
                <a
                  href={`mailto:${FOOTER.contact.email}`}
                  className="hover:text-sand-100 transition-colors"
                >
                  {FOOTER.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${FOOTER.contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-sand-100 transition-colors"
                >
                  {FOOTER.contact.phone}
                </a>
              </li>
              <li>{FOOTER.contact.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-sand-500/20">
          <p className="font-mono text-xs text-sand-500 tracking-wide">
            {FOOTER.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

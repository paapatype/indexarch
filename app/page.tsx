import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import Methodology from "@/components/Methodology";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import SolutionSection from "@/components/SolutionSection";
import Pricing from "@/components/Pricing";
import BookCall from "@/components/BookCall";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <Methodology />
        <BeforeAfter />
        <Process />
        <SolutionSection />
        {/* Pricing sits after the "what you get" feature panel and
            before the contact form — claims the footer's #pricing
            anchor. */}
        <Pricing />
        {/* Standalone "book a call" CTA — its own section with a
            TileGrid texture, sitting between Pricing and the actual
            contact form. The narrow centred box gives Pricing a
            clean closing beat without bloating the Pricing section
            itself. */}
        <BookCall />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import Methodology from "@/components/Methodology";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import SolutionSection from "@/components/SolutionSection";
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
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

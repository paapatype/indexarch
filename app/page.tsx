import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import CaseStudy from "@/components/CaseStudy";
import ImpactStats from "@/components/ImpactStats";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Industries from "@/components/Industries";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <CaseStudy />
        <ImpactStats />
        <Process />
        <Pricing />
        <Industries />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

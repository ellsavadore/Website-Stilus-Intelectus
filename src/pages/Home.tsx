import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import IntellectualStatement from '@/sections/IntellectualStatement';
import AcademicPhilosophy from '@/sections/AcademicPhilosophy';
import ServiceRing from '@/sections/ServiceRing';
import ResearchEcosystem from '@/sections/ResearchEcosystem';
import ToolsMethods from '@/sections/ToolsMethods';
import ResultsImpact from '@/sections/ResultsImpact';
import Testimonials from '@/sections/Testimonials';
import EthicalCommitment from '@/sections/EthicalCommitment';
import FAQ from '@/sections/FAQ';
import ContactCTA from '@/sections/ContactCTA';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="bg-stilus-black min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <IntellectualStatement />
        <AcademicPhilosophy />
        <ServiceRing />
        <ResearchEcosystem />
        <ToolsMethods />
        <ResultsImpact />
        <Testimonials />
        <EthicalCommitment />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

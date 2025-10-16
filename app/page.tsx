
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import PhasesSection from "@/components/sections/phases-section";
import DifferentialsSection from "@/components/sections/differentials-section";
import CtaSection from "@/components/sections/cta-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <PhasesSection />
      <DifferentialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "./HeroSection";
import { WhatWeDoSection } from "./WhatWeDoSection";
import { ServicesSection } from "./ServicesSection";
import { EliteProfessionalsSection } from "./EliteProfessionalsSection";
import { LatestProjectsSection } from "./LatestProjectsSection";
import { TrustedProfessionalsSection } from "./TrustedProfessionalsSection";
import { JoinCtaSection } from "./JoinCtaSection";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WhatWeDoSection />
        <ServicesSection />
        <EliteProfessionalsSection />
        <LatestProjectsSection />
        <TrustedProfessionalsSection />
        <JoinCtaSection />
      </main>
      <Footer />
    </>
  );
}

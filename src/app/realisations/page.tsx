import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import MaquetteHero, { HeroBadge } from "@/components/ui/MaquetteHero";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez nos réalisations et projets : développement web, design graphique, community management et plus encore — Ideatys Digital à Dakar.",
};

export default function RealisationsPage() {
  return (
    <MainLayout>
      <MaquetteHero
        src="/img/portfolio_df12.png"
        alt="Réalisations Ideatys Digital — projets web et digitaux à Dakar"
        textSide="left"
        textWidthPercent={42}
      >
        <AnimatedSection>
          <HeroBadge>Portfolio</HeroBadge>
          <h1 className="font-bold leading-[1.12] text-white text-[clamp(1.4rem,3.1vw,3rem)]">
            Nos réalisations qui{" "}
            <span className="text-accent">inspirent</span>
          </h1>
          <p className="mt-[0.75em] text-white/90 leading-snug text-[clamp(0.9rem,1.45vw,1.2rem)] max-w-[40ch]">
            Chaque projet est une histoire unique. Découvrez comment nous aidons
            nos clients à transformer leurs idées en succès digital, depuis Dakar.
          </p>
        </AnimatedSection>
      </MaquetteHero>

      <section className="py-20 md:py-28 bg-gray-light">
        <Container>
          <PortfolioGrid />
        </Container>
      </section>

      <CTASection />
    </MainLayout>
  );
}

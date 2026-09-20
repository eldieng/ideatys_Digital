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
        src="/img/DEV_WEB_1a8c.png"
        alt="Réalisations Ideatys Digital — projets web et digitaux à Dakar"
        align="stack"
        imagePosition="center"
        priority
      >
        <AnimatedSection>
          <HeroBadge>Portfolio</HeroBadge>
          <h1 className="font-bold leading-[1.15] text-white text-[clamp(1.75rem,3.5vw,3.25rem)] mt-1">
            Ils nous ont fait{" "}
            <span className="text-accent">confiance</span>
          </h1>
          <p className="mt-5 mx-auto text-white/90 leading-relaxed text-[clamp(1rem,1.55vw,1.25rem)] max-w-2xl">
            De la stratégie à la réalisation, nous couvrons tous vos besoins
            digitaux avec expertise et créativité.
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

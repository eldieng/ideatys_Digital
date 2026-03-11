import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import PortfolioGrid from "@/components/sections/PortfolioGrid";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez nos réalisations et projets : développement web, design graphique, community management et plus encore.",
};

export default function RealisationsPage() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Nos réalisations
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Des projets qui parlent d&apos;eux-mêmes
              </h1>
              <p className="mt-6 text-lg text-white/70">
                Chaque projet est une histoire unique. Découvrez comment nous
                avons aidé nos clients à atteindre leurs objectifs.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Portfolio Grid with dynamic filters */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <PortfolioGrid />
        </Container>
      </section>

      <CTASection />
    </MainLayout>
  );
}

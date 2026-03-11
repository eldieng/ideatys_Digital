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
      {/* Hero with gradient and decorative elements */}
      <section className="relative py-24 md:py-32 lg:py-40 bg-linear-to-br from-primary via-primary-dark to-primary overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-accent text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Portfolio
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                Nos réalisations
                <span className="block text-accent">qui inspirent</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                Chaque projet est une histoire unique. Découvrez comment nous
                avons aidé nos clients à transformer leurs idées en succès digital.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Portfolio Grid with dynamic filters */}
      <section className="py-20 md:py-28 bg-gray-light">
        <Container>
          <PortfolioGrid />
        </Container>
      </section>

      <CTASection />
    </MainLayout>
  );
}

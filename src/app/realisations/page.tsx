import type { Metadata } from "next";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";
import PortfolioGrid from "@/components/sections/PortfolioGrid";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez nos réalisations et projets : développement web, design graphique, community management et plus encore — Ideatys Digital à Dakar.",
};

export default function RealisationsPage() {
  return (
    <MainLayout>
      {/* Maquette Portfolio — image pleine largeur (cover) */}
      <section className="relative w-full overflow-hidden bg-[#00352c]">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[220px] sm:min-h-[280px] lg:min-h-[360px]">
          <Image
            src="/img/portfolio_df12.png"
            alt="Ils nous ont fait confiance — portfolio Ideatys Digital à Dakar"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-light">
        <Container>
          <PortfolioGrid />
        </Container>
      </section>

      <CTASection />
    </MainLayout>
  );
}

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
      {/* Portfolio : cover plein écran mobile, maquette desktop */}
      <section className="relative w-full overflow-hidden bg-[#00352c]">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[220px] md:hidden">
          <Image
            src="/img/portfolio_df12.png"
            alt="Ils nous ont fait confiance — portfolio Ideatys Digital à Dakar"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative hidden md:block w-full aspect-[1062/493]">
          <Image
            src="/img/portfolio_df12.png"
            alt="Ils nous ont fait confiance — portfolio Ideatys Digital à Dakar"
            fill
            className="object-contain object-center"
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

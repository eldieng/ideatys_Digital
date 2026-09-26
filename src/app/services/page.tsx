import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Code,
  Users,
  Video,
  Palette,
  Printer,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import MaquetteHero, { HeroBadge } from "@/components/ui/MaquetteHero";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Services Digitaux à Dakar | Web, Stratégie, Cybersécurité",
  description:
    "Développement web, stratégie digitale, community management, design, print et cybersécurité : découvrez les services d'IDEATYS Digital au Sénégal.",
};

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-10 h-10" />,
  Code: <Code className="w-10 h-10" />,
  Users: <Users className="w-10 h-10" />,
  Video: <Video className="w-10 h-10" />,
  Palette: <Palette className="w-10 h-10" />,
  Printer: <Printer className="w-10 h-10" />,
  Shield: <Shield className="w-10 h-10" />,
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return (
    <MainLayout>
      <MaquetteHero
        src="/img/SERVICES_WST_825e.png"
        alt="Services digitaux au Sénégal — Ideatys Digital à Dakar"
        textSide="right"
        textWidthPercent={48}
        priority
      >
        <AnimatedSection>
          <HeroBadge>Nos services</HeroBadge>
          <h1 className="font-bold leading-[1.12] text-white text-[clamp(1.4rem,3.1vw,3rem)]">
            Des solutions digitales{" "}
            <span className="text-accent">sur mesure</span>
          </h1>
          <p className="mt-[0.75em] text-white/85 leading-snug text-[clamp(0.9rem,1.45vw,1.2rem)] max-w-[40ch]">
            De la stratégie à la réalisation, nous couvrons vos besoins digitaux
            avec expertise et créativité — à Dakar et en Afrique de l&apos;Ouest.
          </p>
        </AnimatedSection>
      </MaquetteHero>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-gray-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.slug} delay={index * 0.1}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="relative bg-white rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      {/* Icon with background */}
                      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-white/20 group-hover:text-white transition-all duration-500">
                        {iconMap[service.icon]}
                      </div>
                      
                      <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3 group-hover:text-white transition-colors duration-500 flex items-center gap-2">
                        {service.title}
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </h2>
                      
                      <p className="text-gray-dark leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-500">
                        {service.shortDesc}
                      </p>
                      
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 text-sm text-gray-dark group-hover:text-white/70 transition-colors duration-500"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-white shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 pt-6 border-t border-gray/30 group-hover:border-white/20 transition-colors duration-500">
                        <span className="text-sm font-semibold text-accent group-hover:text-white transition-colors duration-500">
                          En savoir plus →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </MainLayout>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Code,
  Users,
  Video,
  Palette,
  Printer,
  ArrowUpRight,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Découvrez nos services : stratégie digitale, développement web, community management, production audiovisuelle, design graphique et print.",
};

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-10 h-10" />,
  Code: <Code className="w-10 h-10" />,
  Users: <Users className="w-10 h-10" />,
  Video: <Video className="w-10 h-10" />,
  Palette: <Palette className="w-10 h-10" />,
  Printer: <Printer className="w-10 h-10" />,
};

export default function ServicesPage() {
  return (
    <MainLayout>
      {/* Hero with gradient and decorative elements */}
      <section className="relative py-24 md:py-32 lg:py-40 bg-linear-to-br from-primary via-primary-dark to-primary overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-accent text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Nos services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                Des solutions digitales
                <span className="block text-accent">sur mesure</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                De la stratégie à la réalisation, nous couvrons tous vos besoins
                digitaux avec expertise et créativité.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

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
                        {service.shortDescription}
                      </p>
                      
                      <ul className="space-y-2">
                        {service.results.slice(0, 3).map((result) => (
                          <li
                            key={result}
                            className="flex items-center gap-3 text-sm text-gray-dark group-hover:text-white/70 transition-colors duration-500"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-white shrink-0" />
                            {result}
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

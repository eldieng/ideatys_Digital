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
      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Nos services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Des solutions digitales complètes
              </h1>
              <p className="mt-6 text-lg text-white/70">
                De la stratégie à la réalisation, nous couvrons tous vos besoins
                digitaux avec expertise et créativité.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.slug} delay={index * 0.1}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="bg-white border border-gray/50 rounded-2xl p-8 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="text-accent mb-6 transition-transform duration-300 group-hover:scale-110">
                      {iconMap[service.icon]}
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                      {service.title}
                      <ArrowUpRight className="w-5 h-5 opacity-0 transition-all group-hover:opacity-100 text-accent" />
                    </h2>
                    <p className="text-gray-dark leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>
                    <ul className="space-y-2">
                      {service.results.slice(0, 3).map((result) => (
                        <li
                          key={result}
                          className="flex items-center gap-2 text-sm text-gray-dark"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
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

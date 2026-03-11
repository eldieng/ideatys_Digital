"use client";

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
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-8 h-8" />,
  Code: <Code className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Video: <Video className="w-8 h-8" />,
  Palette: <Palette className="w-8 h-8" />,
  Printer: <Printer className="w-8 h-8" />,
};

export default function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <AnimatedSection>
          <SectionHeading
            label="Nos services"
            title="Des solutions digitales complètes"
            subtitle="De la stratégie à la réalisation, nous couvrons tous vos besoins digitaux avec expertise et créativité."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.slug} delay={index * 0.1}>
              <Link href={`/services/${service.slug}`} className="block h-full">
                <Card className="h-full group" padding="lg">
                  <div className="text-accent mb-4 transition-transform duration-300 group-hover:scale-110">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-accent" />
                  </h3>
                  <p className="text-gray-dark text-sm leading-relaxed">
                    {service.shortDescription}
                  </p>
                </Card>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}

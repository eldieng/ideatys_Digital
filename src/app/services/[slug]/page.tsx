import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Target,
  Code,
  Users,
  Video,
  Palette,
  Printer,
  Shield,
  CheckCircle,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import MaquetteHero, { HeroBadge } from "@/components/ui/MaquetteHero";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-12 h-12" />,
  Code: <Code className="w-12 h-12" />,
  Users: <Users className="w-12 h-12" />,
  Video: <Video className="w-12 h-12" />,
  Palette: <Palette className="w-12 h-12" />,
  Printer: <Printer className="w-12 h-12" />,
  Shield: <Shield className="w-12 h-12" />,
};

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {(() => {
        const imageMap: Record<string, string> = {
          "strategie-digitale": "/img/S_DIGITAL_7299.png",
          "developpement-web": "/img/DEV_WEB_1a8c.png",
          "community-management": "/img/C_MANAGER_fce4.png",
          "production-audiovisuelle": "/img/P_AUDIOVISUEL_b690.png",
          "design-graphique": "/img/D_GRAPHIC_a81f.png",
          "print-impression": "/img/Print_Impression_74c7.png",
        };
        const imageSrc = imageMap[service.slug];
        const subtitle = service.shortDescription || service.description;

        if (!imageSrc) {
          return (
            <section className="relative py-16 md:py-24 bg-primary text-white overflow-hidden">
              <Container className="relative z-10">
                <div className="max-w-xl">
                  <AnimatedSection>
                    <div className="text-accent mb-4">{iconMap[service.icon]}</div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      {service.title}
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-white/85 leading-snug">
                      {subtitle}
                    </p>
                  </AnimatedSection>
                </div>
              </Container>
            </section>
          );
        }

        return (
          <MaquetteHero
            src={imageSrc}
            alt={`${service.title} — services digitaux Ideatys à Dakar, Sénégal`}
            textSide="left"
            textWidthPercent={40}
          >
            <AnimatedSection>
              <HeroBadge>Nos services</HeroBadge>
              <div className="text-accent mb-[0.45em] scale-75 origin-left sm:scale-90 lg:scale-100">
                {iconMap[service.icon]}
              </div>
              <h1 className="font-bold text-white leading-[1.12] tracking-tight text-[clamp(1rem,2.35vw,2.35rem)]">
                {service.title}
              </h1>
              <p className="mt-[0.7em] text-white/90 leading-snug text-[clamp(0.62rem,1.1vw,1rem)] max-w-[34ch]">
                {subtitle}
              </p>
            </AnimatedSection>
          </MaquetteHero>
        );
      })()}

      {/* Problématique */}
      <section className="py-20 md:py-28 bg-white">
        <Container size="md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection direction="left">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                La problématique
              </span>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Le défi à relever
              </h2>
              <p className="text-gray-dark leading-relaxed">
                {service.problematic}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Notre solution
              </span>
              <h2 className="text-3xl font-bold text-primary mb-6">
                L&apos;approche IDEATYS
              </h2>
              <p className="text-gray-dark leading-relaxed">
                {service.solution}
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Processus */}
      <section className="py-20 md:py-28 bg-gray-light">
        <Container size="md">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Notre processus
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Comment nous travaillons
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 0.15}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-dark text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Résultats */}
      <section className="py-20 md:py-28 bg-white">
        <Container size="md">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Résultats
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Ce que vous obtenez
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {service.results.map((result, index) => (
              <AnimatedSection key={result} delay={index * 0.1}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-light">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-primary font-medium">{result}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="text-center mt-12">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Demander un devis pour ce service
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <CTASection 
        title={`Besoin ${service.slug === 'kc-radar' ? "d'un audit cybersécurité" : service.slug === 'strategie-digitale' ? "d'une stratégie sur mesure" : service.slug === 'developpement-web' ? "d'un site performant" : service.slug === 'community-management' ? "d'animer vos réseaux" : service.slug === 'production-audiovisuelle' ? 'de contenus impactants' : service.slug === 'design-graphique' ? "d'une identité forte" : 'de supports print professionnels'} ?`}
        description={`Parlons de votre projet ${service.title.toLowerCase()} et trouvons ensemble la solution adaptée à vos objectifs.`}
        primaryButtonText="Demander un devis"
      />
    </MainLayout>
  );
}

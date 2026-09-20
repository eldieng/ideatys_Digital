import type { Metadata } from "next";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import MaquetteHero from "@/components/ui/MaquetteHero";
import { values } from "@/data/stats";
import { team } from "@/data/team";
import {
  Lightbulb,
  Shield,
  TrendingUp,
  Award,
  Heart,
  Linkedin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez IDEATYS Digital, notre histoire, notre mission et notre équipe passionnée. Une agence digitale créative au service de votre réussite.",
};

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  Award: <Award className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
};

export default function AProposPage() {
  return (
    <MainLayout>
      <MaquetteHero
        src="/img/A_propos_2d05.png"
        alt="À propos d'IDEATYS Digital — agence digitale à Dakar"
        textSide="left"
        textWidthPercent={40}
      >
        <AnimatedSection>
          <span className="inline-block text-[clamp(0.6rem,1vw,0.8rem)] font-semibold uppercase tracking-wider text-accent mb-[0.55em]">
            À propos
          </span>
          <h1 className="font-bold leading-[1.12] text-white text-[clamp(1.1rem,2.5vw,2.5rem)] drop-shadow-md">
            Une agence digitale animée par la passion
          </h1>
          <p className="mt-[0.65em] text-white/90 leading-snug text-[clamp(0.65rem,1.15vw,1rem)] max-w-[34ch]">
            Nous accompagnons les entreprises dans leur transformation digitale
            avec créativité et expertise, depuis Dakar.
          </p>
        </AnimatedSection>
      </MaquetteHero>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/img/A_propos_2d05.png"
                  alt="À propos d'IDEATYS Digital - Agence digitale créative à Dakar, Sénégal"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Notre mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Transformer vos idées en succès digital
              </h2>
              <p className="text-gray-dark leading-relaxed mb-4">
                Chez IDEATYS Digital, nous croyons que chaque entreprise mérite
                une présence digitale à la hauteur de ses ambitions. Notre
                mission est de concevoir des solutions sur mesure qui allient
                esthétique, performance et résultats.
              </p>
              <p className="text-gray-dark leading-relaxed">
                De la stratégie à la réalisation, nous mettons notre expertise
                au service de votre croissance. Chaque projet est une
                opportunité de repousser les limites de la créativité et de
                l&apos;innovation.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Valeurs */}
      <section className="py-20 md:py-28 bg-gray-light">
        <Container>
          <AnimatedSection>
            <SectionHeading
              label="Nos valeurs"
              title="Ce qui nous guide au quotidien"
              subtitle="Nos valeurs sont le fondement de chaque décision, chaque projet et chaque interaction."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="text-accent mb-4">
                    {iconMap[value.icon]}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-dark text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Équipe */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <AnimatedSection>
            <SectionHeading
              label="Notre équipe"
              title="Les talents derrière IDEATYS"
              subtitle="Une équipe passionnée et pluridisciplinaire au service de vos projets."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 0.1}>
                <div className="text-center group">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-light">
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/30">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-primary">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm font-medium mt-1">
                    {member.role}
                  </p>
                  <p className="text-gray-dark text-sm mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <CTASection 
        title="Envie de travailler avec nous ?"
        description="Rejoignez nos clients satisfaits et donnons ensemble vie à votre vision digitale."
        primaryButtonText="Discutons de votre projet"
      />
    </MainLayout>
  );
}

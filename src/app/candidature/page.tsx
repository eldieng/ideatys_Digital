import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CandidatureForm from "@/components/forms/CandidatureForm";
import { Sparkles, Users, Rocket, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Candidature",
  description:
    "Rejoignez IDEATYS Digital et participez à des projets innovants. Envoyez votre candidature.",
};

const perks = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Projets innovants",
    description: "Travaillez sur des projets variés et stimulants.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Équipe passionnée",
    description: "Intégrez une équipe soudée et bienveillante.",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Évolution",
    description: "Développez vos compétences et évoluez rapidement.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Bien-être",
    description: "Un environnement de travail flexible et agréable.",
  },
];

export default function CandidaturePage() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Rejoignez-nous
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Rejoignez IDEATYS Digital
              </h1>
              <p className="mt-6 text-lg text-white/70">
                Participez à des projets innovants et donnez un nouvel élan à
                votre carrière.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Perks */}
      <section className="py-16 bg-gray-light">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, index) => (
              <AnimatedSection key={perk.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                    {perk.icon}
                  </div>
                  <h3 className="font-bold text-primary mb-2">{perk.title}</h3>
                  <p className="text-sm text-gray-dark">{perk.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Form */}
      <section className="py-20 md:py-28 bg-white">
        <Container size="md">
          <AnimatedSection>
            <CandidatureForm />
          </AnimatedSection>
        </Container>
      </section>
    </MainLayout>
  );
}

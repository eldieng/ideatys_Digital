import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
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

      {/* No Recruitment Message */}
      <section className="py-20 md:py-28 bg-white">
        <Container size="md">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 text-center border border-gray-200">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 text-accent mb-6">
                <Users className="w-10 h-10" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Pas de recrutement en cours
              </h2>
              <p className="text-gray-dark text-lg mb-6 max-w-xl mx-auto">
                Nous ne recrutons pas actuellement, mais nous sommes toujours à la recherche de talents exceptionnels. 
                N&apos;hésitez pas à revenir consulter cette page régulièrement ou à nous suivre sur nos réseaux sociaux 
                pour être informé de nos prochaines opportunités.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.linkedin.com/company/ideatysdigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Suivez-nous sur LinkedIn
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl border-2 border-primary hover:bg-primary/5 transition-colors"
                >
                  Contactez-nous
                </a>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </MainLayout>
  );
}

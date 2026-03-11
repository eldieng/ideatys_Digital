import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} – ${project.client}`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { label: "Réalisations", href: "/realisations" },
          { label: project.title },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <Container>
          <AnimatedSection>
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux réalisations
            </Link>
            <div className="max-w-3xl">
              <Badge variant="light">{project.category}</Badge>
              <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {project.title}
              </h1>
              <p className="mt-4 text-lg text-white/70">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/10 text-sm text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Project Image */}
      <section className="py-12 bg-gray-light">
        <Container>
          <AnimatedSection>
            <div className="aspect-video rounded-2xl overflow-hidden bg-white shadow-xl">
              <div className="w-full h-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <span className="text-6xl font-bold text-primary/10">
                  {project.client}
                </span>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Context & Solution */}
      <section className="py-20 md:py-28 bg-white">
        <Container size="md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection direction="left">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Le contexte
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Brief client
              </h2>
              <p className="text-gray-dark leading-relaxed">{project.context}</p>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Notre solution
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                L&apos;approche IDEATYS
              </h2>
              <p className="text-gray-dark leading-relaxed">
                {project.solution}
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <Container size="md">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-light mb-4">
                Résultats
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Des résultats concrets
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {project.results.map((result, index) => (
              <AnimatedSection key={result} delay={index * 0.1}>
                <div className="flex items-center gap-3 p-5 rounded-xl bg-white/10">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="font-medium">{result}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-gray-light">
        <Container>
          <div className="flex items-center justify-between">
            {prevProject ? (
              <Link
                href={`/realisations/${prevProject.slug}`}
                className="group flex items-center gap-3 text-primary hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-xs text-gray-medium uppercase tracking-wider">
                    Précédent
                  </span>
                  <p className="font-semibold">{prevProject.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/realisations/${nextProject.slug}`}
                className="group flex items-center gap-3 text-right text-primary hover:text-accent transition-colors"
              >
                <div>
                  <span className="text-xs text-gray-medium uppercase tracking-wider">
                    Suivant
                  </span>
                  <p className="font-semibold">{nextProject.title}</p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Un projet similaire ?
              </h2>
              <p className="mt-4 text-gray-dark max-w-xl mx-auto">
                Discutons de vos objectifs et voyons comment nous pouvons vous
                aider à obtenir des résultats similaires.
              </p>
              <div className="mt-8">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Demander un devis
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </MainLayout>
  );
}

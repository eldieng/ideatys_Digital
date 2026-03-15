import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, Facebook, Instagram, Linkedin } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/ui/Breadcrumb";
import prisma from "@/lib/prisma";

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
}

export async function generateStaticParams() {
  const realisations = await prisma.realisation.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return realisations.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.realisation.findUnique({
    where: { slug, published: true },
    select: { title: true, description: true, client: true, image: true },
  });
  if (!project) return {};

  return {
    title: `${project.title}${project.client ? ` – ${project.client}` : ""}`,
    description: project.description,
    openGraph: project.image ? { images: [project.image] } : undefined,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.realisation.findUnique({
    where: { slug, published: true },
  });

  if (!project) {
    notFound();
  }

  // Get prev/next projects
  const allProjects = await prisma.realisation.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { slug: true, title: true },
  });
  
  const projectIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null;
  const nextProject = projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : null;

  const socialLinks = project.socialLinks as SocialLinks | null;

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
            <div className="aspect-video rounded-2xl overflow-hidden bg-white shadow-xl relative">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/10">
                    {project.client || project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Description */}
      <section className="py-20 md:py-28 bg-white">
        <Container size="md">
          <AnimatedSection>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                À propos du projet
              </h2>
              <p className="text-gray-dark leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Infos projet */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {project.client && (
                <div>
                  <span className="text-sm text-gray-medium">Client</span>
                  <p className="font-semibold text-primary">{project.client}</p>
                </div>
              )}
              {project.year && (
                <div>
                  <span className="text-sm text-gray-medium">Année</span>
                  <p className="font-semibold text-primary">{project.year}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-medium">Catégorie</span>
                <p className="font-semibold text-primary">{project.category}</p>
              </div>
              {project.websiteUrl && (
                <div>
                  <span className="text-sm text-gray-medium">Site web</span>
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-semibold text-accent hover:underline"
                  >
                    Visiter <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Liens réseaux sociaux - Pour CM */}
            {socialLinks && Object.values(socialLinks).some(v => v) && (
              <div className="mt-8">
                <span className="text-sm text-gray-medium block mb-3">Réseaux sociaux</span>
                <div className="flex gap-3">
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-light rounded-lg text-primary hover:bg-accent hover:text-white transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-light rounded-lg text-primary hover:bg-accent hover:text-white transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-light rounded-lg text-primary hover:bg-accent hover:text-white transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {socialLinks.tiktok && (
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-light rounded-lg text-primary hover:bg-accent hover:text-white transition-colors"
                    >
                      <span className="text-sm font-bold">TikTok</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </AnimatedSection>
        </Container>
      </section>

      {/* Galerie d'images - Pour Design et CM */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 md:py-28 bg-gray-light">
          <Container>
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Galerie
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((img, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="aspect-square rounded-xl overflow-hidden relative bg-white shadow-lg">
                    <Image
                      src={img}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Vidéo - Pour Production Audiovisuelle */}
      {project.videoUrl && (
        <section className="py-20 md:py-28 bg-gray-light">
          <Container size="md">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Vidéo du projet
              </h2>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src={project.videoUrl.replace("watch?v=", "embed/")}
                  title={project.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

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

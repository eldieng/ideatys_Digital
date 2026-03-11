"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

const projects = [
  {
    slug: "projet-1",
    title: "Refonte Site E-commerce",
    category: "Développement Web",
    image: "/img/projects/project-1.jpg",
  },
  {
    slug: "projet-2",
    title: "Campagne Social Media",
    category: "Community Management",
    image: "/img/projects/project-2.jpg",
  },
  {
    slug: "projet-3",
    title: "Identité Visuelle Startup",
    category: "Design Graphique",
    image: "/img/projects/project-3.jpg",
  },
];

export default function RealisationsPreview() {
  return (
    <section className="py-20 md:py-28 bg-gray-light">
      <Container>
        <AnimatedSection>
          <SectionHeading
            label="Nos réalisations"
            title="Des projets qui font la différence"
            subtitle="Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={project.slug} delay={index * 0.15}>
              <Link
                href={`/realisations/${project.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-gray">
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      Voir le projet
                    </span>
                  </div>
                  <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary/20">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12">
            <Button
              href="/realisations"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Voir toutes les réalisations
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}

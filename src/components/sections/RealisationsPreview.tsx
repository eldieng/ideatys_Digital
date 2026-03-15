"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

interface Realisation {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string | null;
}

export default function RealisationsPreview() {
  const [projects, setProjects] = useState<Realisation[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/realisations");
        if (res.ok) {
          const data = await res.json();
          setProjects(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des réalisations:", error);
      }
    };

    fetchProjects();
  }, []);
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
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/20">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
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

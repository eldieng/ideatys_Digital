import type { Metadata } from "next";
import MaquetteHero, { HeroBadge } from "@/components/ui/MaquetteHero";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BlogGrid from "@/components/sections/BlogGrid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles, conseils et retours d'expérience pour booster votre présence digitale — Ideatys Digital à Dakar.",
};

export default function BlogPage() {
  return (
    <MainLayout>
      <MaquetteHero
        src="/img/BLOG_7a1e.png"
        alt="Blog Ideatys Digital — actualités et expertise digitale à Dakar"
        align="stack"
        imagePosition="top"
        priority
      >
        <AnimatedSection>
          <HeroBadge tone="orange">Blog</HeroBadge>
          <h1 className="font-bold leading-[1.15] text-white text-[clamp(1.75rem,3.5vw,3.25rem)]">
            Actualités &amp; Expertise
          </h1>
          <p className="mt-5 mx-auto text-white/90 leading-relaxed text-[clamp(1rem,1.55vw,1.25rem)] max-w-2xl">
            Articles, conseils et retours d&apos;expérience pour booster votre
            présence digitale.
          </p>
        </AnimatedSection>
      </MaquetteHero>

      <section className="py-20 md:py-28 bg-white">
        <Container>
          <BlogGrid />
        </Container>
      </section>
    </MainLayout>
  );
}

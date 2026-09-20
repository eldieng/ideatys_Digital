import type { Metadata } from "next";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BlogGrid from "@/components/sections/BlogGrid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles et conseils sur le marketing digital, le SEO, le branding, le développement web et plus encore.",
};

export default function BlogPage() {
  return (
    <MainLayout>
      {/* Hero avec maquette en fond */}
      <section className="relative py-20 md:py-28 text-white overflow-hidden">
        {/* Maquette en fond */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/img/BLOG_7a1e.png"
            alt="Blog IDEATYS Digital - Conseils, actualités et guides sur le marketing digital au Sénégal"
            fill
            className="object-cover object-center"
          />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <AnimatedSection>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4 bg-primary/40 px-3 py-1 rounded">
                Blog
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-lg">
                Actualités & Expertise
              </h1>
              <p className="mt-6 text-lg text-white/90 drop-shadow">
                Articles, conseils et retours d&apos;expérience pour booster
                votre présence digitale.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Articles with dynamic filters + search */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <BlogGrid />
        </Container>
      </section>
    </MainLayout>
  );
}

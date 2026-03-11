import type { Metadata } from "next";
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
      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Blog
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Actualités & Expertise
              </h1>
              <p className="mt-6 text-lg text-white/70">
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

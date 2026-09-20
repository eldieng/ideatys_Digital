import type { Metadata } from "next";
import MaquetteHero, { HeroBadge } from "@/components/ui/MaquetteHero";
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
      <MaquetteHero
        src="/img/BLOG_7a1e.png"
        alt="Blog Ideatys Digital — conseils digitaux à Dakar"
        textSide="left"
        textWidthPercent={42}
      >
        <AnimatedSection>
          <HeroBadge>Blog</HeroBadge>
          <h1 className="font-bold leading-[1.12] text-white text-[clamp(1.15rem,2.55vw,2.55rem)]">
            Insights &amp; actualités{" "}
            <span className="text-accent">digitales</span>
          </h1>
          <p className="mt-[0.75em] text-white/90 leading-snug text-[clamp(0.65rem,1.15vw,1.05rem)] max-w-[36ch]">
            Stratégie, web, IA et communication — pour avancer concrètement sur
            le marché sénégalais et ouest-africain.
          </p>
        </AnimatedSection>
      </MaquetteHero>


      {/* Articles with dynamic filters + search */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <BlogGrid />
        </Container>
      </section>
    </MainLayout>
  );
}

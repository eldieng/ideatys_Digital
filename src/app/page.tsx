import MainLayout from "@/components/layout/MainLayout";
import JsonLd from "@/components/ui/JsonLd";
import HeroSection from "@/components/sections/HeroSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import RealisationsPreview from "@/components/sections/RealisationsPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogPreview from "@/components/sections/BlogPreview";
import CTASection from "@/components/sections/CTASection";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IDEATYS Digital",
  url: "https://ideatys.digital",
  logo: "https://ideatys.digital/img/ideatysdigital_logo.jpg",
  description:
    "Agence digitale créative spécialisée en stratégie digitale, développement web, community management, production audiovisuelle et design graphique.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@ideatys.digital",
    contactType: "customer service",
    availableLanguage: "French",
  },
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "IDEATYS Digital",
  url: "https://ideatys.digital",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://ideatys.digital/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <MainLayout>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUs />
      <RealisationsPreview />
      <TestimonialsSection />
      <BlogPreview />
      <CTASection />
    </MainLayout>
  );
}

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
  url: "https://ideatysdigital.com",
  logo: "https://ideatysdigital.com/img/ideatysdigital_logo.jpg",
  description:
    "Agence digitale à Dakar, Sénégal. Spécialisée en création de sites web, stratégie digitale, community management, production audiovisuelle et design graphique.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+221786087014",
    email: "ideatysdigital@gmail.com",
    contactType: "customer service",
    availableLanguage: "French",
    areaServed: "SN",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
  sameAs: [
    "https://www.linkedin.com/company/ideatysdigital/",
    "https://www.facebook.com/ideatys.digital",
    "https://www.instagram.com/ideatysdigital/"
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "IDEATYS Digital",
  url: "https://ideatysdigital.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://ideatysdigital.com/blog?q={search_term_string}",
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

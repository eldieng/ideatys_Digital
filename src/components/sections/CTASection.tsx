"use client";

import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function CTASection({
  title = "Prêt à donner vie à votre projet ?",
  description = "Discutons de vos ambitions et construisons ensemble la solution digitale qui fera la différence.",
  primaryButtonText = "Demander un devis gratuit",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Voir nos réalisations",
  secondaryButtonHref = "/realisations",
}: CTASectionProps) {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {title}
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
              {description}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={primaryButtonHref}
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                {primaryButtonText}
              </Button>
              <Button
                href={secondaryButtonHref}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                {secondaryButtonText}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}

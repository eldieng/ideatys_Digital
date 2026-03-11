import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/forms/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez IDEATYS Digital pour discuter de votre projet. Demandez un devis gratuit et personnalisé.",
};

export default function ContactPage() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                Contact
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Parlons de votre projet
              </h1>
              <p className="mt-6 text-lg text-white/70">
                Remplissez le formulaire ci-dessous et nous vous répondrons sous
                24h ouvrées.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <AnimatedSection direction="left">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Nos coordonnées
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">Adresse</h3>
                        <p className="text-sm text-gray-dark mt-1">
                          Adresse de l&apos;agence IDEATYS Digital
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">
                          Téléphone
                        </h3>
                        <a
                          href="tel:+33000000000"
                          className="text-sm text-gray-dark mt-1 hover:text-accent transition-colors"
                        >
                          +33 0 00 00 00 00
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">Email</h3>
                        <a
                          href="mailto:contact@ideatys.digital"
                          className="text-sm text-gray-dark mt-1 hover:text-accent transition-colors"
                        >
                          contact@ideatys.digital
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">Horaires</h3>
                        <p className="text-sm text-gray-dark mt-1">
                          Lun - Ven : 9h00 - 18h00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right" className="lg:col-span-2">
              <ContactForm />
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}

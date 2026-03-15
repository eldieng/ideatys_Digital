import type { Metadata } from "next";
import Image from "next/image";
import { Rocket, Mail, Phone, Linkedin, Facebook, Instagram, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Bientôt disponible | IDEATYS Digital - Agence Digitale au Sénégal",
  description: "IDEATYS Digital - Votre partenaire digital au Sénégal. Développement web, Community Management, Design graphique et Production audiovisuelle. Notre nouveau site arrive bientôt !",
  keywords: ["IDEATYS Digital", "agence digitale", "Sénégal", "développement web", "community management", "design graphique"],
  openGraph: {
    title: "IDEATYS Digital - Agence Digitale au Sénégal",
    description: "Votre partenaire digital pour transformer vos idées en succès. Notre nouveau site arrive bientôt !",
    images: ["/img/ideatysdigital_logo.jpg"],
    type: "website",
  },
};

export default function EnConstructionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl text-center relative z-10">
        {/* Logo */}
        <div className="inline-block mb-6">
          <Image
            src="/img/ideatysdigital_logo_sans_fond.png"
            alt="IDEATYS Digital"
            width={280}
            height={80}
            className="h-16 md:h-20 w-auto brightness-0 invert"
            priority
          />
        </div>

        {/* Image showcase */}
        <div className="relative mb-8">
          <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-accent/20 border border-white/10">
            <Image
              src="/img/1.jpeg"
              alt="IDEATYS Digital - Équipe créative"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-accent rounded-full flex items-center gap-2 shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white font-semibold text-sm">Nouveau site en préparation</span>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full mb-6">
            <Rocket className="w-5 h-5 text-accent" />
            <span className="text-accent font-medium">Lancement imminent</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Quelque chose de
            <span className="text-accent"> génial </span>
            arrive
          </h1>

          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Nous préparons une expérience digitale exceptionnelle pour vous. 
            En attendant, contactez-nous pour discuter de vos projets !
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:+221786087014"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white font-semibold rounded-2xl hover:bg-accent-dark transition-all hover:scale-105 shadow-lg shadow-accent/30"
            >
              <Phone className="w-5 h-5" />
              +221 78 608 70 14
            </a>

            <a
              href="mailto:ideatysdigital@gmail.com"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/20 transition-all border border-white/20"
            >
              <Mail className="w-5 h-5" />
              ideatysdigital@gmail.com
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-4 justify-center mb-8">
            <a
              href="https://www.linkedin.com/company/ideatysdigital/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-accent hover:scale-110 transition-all border border-white/10"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://www.facebook.com/ideatys.digital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-accent hover:scale-110 transition-all border border-white/10"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://www.instagram.com/ideatysdigital/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-accent hover:scale-110 transition-all border border-white/10"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
          </div>

          {/* Footer */}
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} IDEATYS Digital. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}

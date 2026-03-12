import type { Metadata } from "next";
import Image from "next/image";
import { Construction, Mail, Phone, Linkedin, Facebook, Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Site en construction | IDEATYS Digital",
  description: "Notre site est en cours de construction. Contactez-nous pour vos projets digitaux !",
};

export default function EnConstructionPage() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="inline-block mb-8">
          <Image
            src="/img/ideatysdigital_logo_sans_fond.png"
            alt="IDEATYS Digital"
            width={250}
            height={70}
            className="h-20 w-auto filter-[brightness(0)_invert(1)]"
          />
        </div>

        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8">
          <Construction className="w-10 h-10 text-accent" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Site en construction
        </h1>

        <p className="text-white/70 text-lg mb-8">
          Nous travaillons actuellement sur notre site pour vous offrir la
          meilleure expérience possible. Revenez bientôt !
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href="tel:+221786087014"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors"
          >
            <Phone className="w-4 h-4" />
            +221 78 608 70 14
          </a>

          <a
            href="mailto:ideatysdigital@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Nous contacter
          </a>
        </div>

        <div className="flex gap-4 justify-center">
          <a
            href="https://www.linkedin.com/company/ideatysdigital/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Linkedin className="w-5 h-5 text-white" />
          </a>
          <a
            href="https://www.facebook.com/ideatys.digital"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Facebook className="w-5 h-5 text-white" />
          </a>
          <a
            href="https://www.instagram.com/ideatysdigital/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Instagram className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>

      <p className="absolute bottom-8 text-white/40 text-sm">
        &copy; {new Date().getFullYear()} IDEATYS Digital. Tous droits réservés.
      </p>
    </div>
  );
}

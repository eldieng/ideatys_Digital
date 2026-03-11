import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Construction, ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "En construction",
  description: "Cette page est en cours de construction. Revenez bientôt !",
};

export default function EnConstructionPage() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <Link href="/" className="inline-block mb-8">
          <Image
            src="/img/ideatysdigital_logo_sans_fond.png"
            alt="IDEATYS Digital"
            width={200}
            height={56}
            className="h-16 w-auto filter-[brightness(0)_invert(1)]"
          />
        </Link>

        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8">
          <Construction className="w-10 h-10 text-accent" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page en construction
        </h1>

        <p className="text-white/70 text-lg mb-8">
          Nous travaillons actuellement sur cette page pour vous offrir la
          meilleure expérience possible. Revenez bientôt !
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>

          <a
            href="mailto:contact@ideatys.digital"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Nous contacter
          </a>
        </div>
      </div>

      <p className="absolute bottom-8 text-white/40 text-sm">
        &copy; {new Date().getFullYear()} IDEATYS Digital. Tous droits réservés.
      </p>
    </div>
  );
}

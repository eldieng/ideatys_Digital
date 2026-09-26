"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { HeroBadge } from "@/components/ui/MaquetteHero";

/**
 * Hero accueil : image pleine largeur (cover) + texte en dessous.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full bg-white">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] bg-[#f5f5f5]">
        <Image
          src="/img/Home_page_4f45.png"
          alt="Agence digitale à Dakar — équipe Ideatys Digital au travail"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <div className="px-5 sm:px-8 py-8 sm:py-10 md:py-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex justify-center"
          >
            <HeroBadge tone="light">Agence digitale créative</HeroBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="font-bold text-primary leading-tight tracking-tight text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl"
          >
            <span className="text-primary">Créativité.</span>{" "}
            <span className="text-accent">Professionnalisme.</span>{" "}
            <span className="text-primary">Impact.</span>
            <span className="block mt-2 text-[0.85em] font-semibold text-primary/90">
              À Dakar &amp; en Afrique de l&apos;Ouest
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-4 text-base sm:text-lg text-gray-dark leading-relaxed max-w-2xl mx-auto"
          >
            Nous transformons vos idées en solutions digitales performantes et
            durables — sites, stratégie, communication et cybersécurité.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3"
          >
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              className="justify-center !text-sm sm:!text-base !px-6 !py-3"
            >
              Demander un devis
            </Button>
            <Button
              href="/services"
              variant="outline"
              size="sm"
              className="justify-center !text-sm sm:!text-base !px-6 !py-3"
            >
              Nos services
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex justify-center pb-4"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-gray-medium" />
        </motion.div>
      </motion.div>
    </section>
  );
}

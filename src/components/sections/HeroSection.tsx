"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

/**
 * Hero = maquette WEB SITE NUL (1062×493) comme canvas.
 * Le texte HTML est posé sur la zone claire à gauche — pas une colonne séparée.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full bg-white">
      <div className="relative w-full aspect-[1062/493]">
        <Image
          src="/img/Home_page_4f45.png"
          alt="Agence digitale à Dakar — équipe Ideatys Digital au travail"
          fill
          className="object-contain object-center"
          sizes="100vw"
          priority
        />

        {/* Texte sur la zone gauche claire de la maquette (~45%) */}
        <div className="absolute inset-0 z-10">
          <div className="h-full max-w-7xl mx-auto px-[4%] sm:px-[5%] lg:px-[6%] flex items-center">
            <div className="w-[48%] min-w-[11.5rem] max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="text-[clamp(0.55rem,1.1vw,0.8rem)] font-semibold uppercase tracking-[0.16em] text-accent mb-[0.6em]"
              >
                Agence digitale créative · Dakar
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 }}
                className="font-bold text-primary leading-[1.1] tracking-tight text-[clamp(0.95rem,2.6vw,2.75rem)]"
              >
                Des solutions digitales
                <span className="block">qui font vraiment</span>
                <span className="block text-accent">la différence.</span>
                <span className="block mt-[0.25em] text-[0.78em] font-semibold text-primary/85">
                  À Dakar &amp; en Afrique de l&apos;Ouest
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="mt-[0.7em] text-[clamp(0.55rem,1.15vw,1rem)] text-gray-dark leading-snug max-w-[36ch] hidden xs:block sm:block"
              >
                Sites web, stratégie, communication et cybersécurité — pour les
                entreprises qui grandissent depuis le Sénégal ou à l&apos;international.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="mt-[1em] flex flex-wrap items-center gap-[0.5em]"
              >
                <Button
                  href="/contact"
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  className="!text-[clamp(0.6rem,1.1vw,0.95rem)] !px-[clamp(0.6rem,1.5vw,1.5rem)] !py-[clamp(0.35rem,0.9vw,0.75rem)]"
                >
                  Demander un devis
                </Button>
                <Button
                  href="/services"
                  variant="outline"
                  size="sm"
                  className="!text-[clamp(0.6rem,1.1vw,0.95rem)] !px-[clamp(0.6rem,1.5vw,1.5rem)] !py-[clamp(0.35rem,0.9vw,0.75rem)]"
                >
                  Nos services
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex justify-center py-2"
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

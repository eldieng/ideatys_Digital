"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { HeroBadge } from "@/components/ui/MaquetteHero";

function HeroCopy() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <HeroBadge tone="light">Agence digitale créative</HeroBadge>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06 }}
        className="font-bold text-primary leading-[1.15] tracking-tight text-[1.75rem] sm:text-[2rem] md:text-[clamp(1.35rem,3.2vw,3.1rem)]"
      >
        <span className="text-primary">Créativité.</span>{" "}
        <span className="text-accent">Professionnalisme.</span>{" "}
        <span className="text-primary">Impact.</span>
        <span className="block mt-2 md:mt-[0.35em] text-[0.85em] md:text-[0.72em] font-semibold text-primary/90">
          À Dakar &amp; en Afrique de l&apos;Ouest
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14 }}
        className="mt-4 md:mt-[0.7em] text-base sm:text-lg md:text-[clamp(0.9rem,1.5vw,1.25rem)] text-gray-dark leading-relaxed md:leading-snug max-w-xl md:max-w-[40ch]"
      >
        Nous transformons vos idées en solutions digitales performantes et
        durables — sites, stratégie, communication et cybersécurité.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="mt-6 md:mt-[1em] flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 md:gap-[0.5em]"
      >
        <Button
          href="/contact"
          variant="primary"
          size="sm"
          icon={<ArrowRight className="w-4 h-4" />}
          className="justify-center !text-sm sm:!text-base md:!text-[clamp(0.8rem,1.25vw,1.05rem)] !px-5 sm:!px-6 md:!px-[clamp(0.6rem,1.5vw,1.5rem)] !py-3 md:!py-[clamp(0.35rem,0.9vw,0.75rem)]"
        >
          Demander un devis
        </Button>
        <Button
          href="/services"
          variant="outline"
          size="sm"
          className="justify-center !text-sm sm:!text-base md:!text-[clamp(0.8rem,1.25vw,1.05rem)] !px-5 sm:!px-6 md:!px-[clamp(0.6rem,1.5vw,1.5rem)] !py-3 md:!py-[clamp(0.35rem,0.9vw,0.75rem)]"
        >
          Nos services
        </Button>
      </motion.div>
    </>
  );
}

/**
 * Hero accueil = maquette WEB SITE NUL + texte HTML.
 * Mobile: image + texte empilés. Desktop: overlay sur zone claire gauche.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full bg-white">
      {/* Mobile / tablette portrait */}
      <div className="md:hidden">
        <div className="relative w-full aspect-[16/10] min-h-[200px] bg-[#f5f5f5]">
          <Image
            src="/img/Home_page_4f45.png"
            alt="Agence digitale à Dakar — équipe Ideatys Digital au travail"
            fill
            className="object-cover object-[72%_center]"
            sizes="100vw"
            priority
          />
        </div>
        <div className="px-5 py-8 sm:px-6 sm:py-10">
          <div className="max-w-xl mx-auto">
            <HeroCopy />
          </div>
        </div>
      </div>

      {/* Desktop: overlay sur maquette */}
      <div className="relative hidden md:block w-full aspect-[1062/493]">
        <Image
          src="/img/Home_page_4f45.png"
          alt="Agence digitale à Dakar — équipe Ideatys Digital au travail"
          fill
          className="object-contain object-center"
          sizes="100vw"
          priority
        />

        <div className="absolute inset-0 z-10">
          <div className="h-full max-w-[90rem] mx-auto px-[4%] sm:px-[5%] flex items-center">
            <div className="w-[46%] min-w-[11rem] max-w-[30rem] pr-[2%]">
              <HeroCopy />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="hidden md:flex justify-center py-2 bg-white"
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

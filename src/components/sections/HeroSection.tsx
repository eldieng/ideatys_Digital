"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Maquette en fond pleine largeur */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/img/Home_page_4f45.png"
          alt="Agence digitale à Dakar - Solutions web, stratégie digitale et cybersécurité pour entreprises au Sénégal"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <Container className="relative z-10">
        <div className="py-20 lg:py-32">
          {/* Texte posé sur la zone gauche claire de la maquette */}
          <div className="max-w-2xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-6">
              Agence Digitale à Dakar
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight"
          >
            Des solutions digitales qui font{" "}
            <span className="text-accent">vraiment la différence</span>, à Dakar et en Afrique de l&apos;Ouest
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-6 text-lg md:text-xl text-gray-dark max-w-2xl mx-auto leading-relaxed"
          >
            Que vous lanciez votre entreprise à Dakar ou que vous développiez votre marque depuis l'Europe ou les États-Unis, IDEATYS Digital conçoit vos sites web, votre stratégie de communication et votre sécurité numérique pour qu'ils servent vraiment votre croissance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Demander un devis
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Découvrir nos services
            </Button>
          </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-gray-medium" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

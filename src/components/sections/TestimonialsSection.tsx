"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="py-20 md:py-28 bg-white">
      <Container size="md">
        <AnimatedSection>
          <SectionHeading
            label="Témoignages"
            title="Ce que nos clients disent de nous"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative max-w-3xl mx-auto">
            <div className="text-center">
              <Quote className="w-12 h-12 text-accent/20 mx-auto mb-6" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <blockquote className="text-lg md:text-xl text-gray-dark leading-relaxed italic">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>
                  <div className="mt-8">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent mx-auto mb-3 flex items-center justify-center text-white font-bold">
                      {testimonials[current].name.charAt(0)}
                    </div>
                    <p className="font-bold text-primary">
                      {testimonials[current].name}
                    </p>
                    <p className="text-sm text-gray-dark">
                      {testimonials[current].role},{" "}
                      {testimonials[current].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === current ? "bg-accent" : "bg-gray"
                    }`}
                    aria-label={`Témoignage ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gray hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}

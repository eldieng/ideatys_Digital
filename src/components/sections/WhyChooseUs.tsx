"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { stats } from "@/data/stats";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-accent">
      {count}
      {suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-primary text-white">
      <Container>
        <AnimatedSection>
          <SectionHeading
            label="Pourquoi nous choisir"
            title="Des résultats qui parlent d'eux-mêmes"
            subtitle="Notre expertise et notre engagement se mesurent en chiffres concrets."
            light
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.15}>
              <div className="text-center">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                />
                <p className="mt-2 text-white/70 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}

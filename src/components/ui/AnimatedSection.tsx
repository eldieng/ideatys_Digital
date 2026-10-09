"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

const directionVariants = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

/** Sur mobile : jamais de translateX (évite le jitter / scroll horizontal). */
const mobileSafeVariants = {
  up: { y: 20, x: 0 },
  down: { y: -20, x: 0 },
  left: { y: 20, x: 0 },
  right: { y: 20, x: 0 },
  none: { x: 0, y: 0 },
};

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const offset = (isMobile ? mobileSafeVariants : directionVariants)[direction];

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...offset,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...offset }
      }
      transition={{
        duration: 0.55,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn("min-w-0", className)}
    >
      {children}
    </motion.div>
  );
}

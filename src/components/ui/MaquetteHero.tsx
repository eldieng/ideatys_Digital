import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextSide = "left" | "right";

interface MaquetteHeroProps {
  src: string;
  alt: string;
  textSide?: TextSide;
  /** % de largeur pour la colonne texte (rester dans la zone libre) */
  textWidthPercent?: number;
  children: ReactNode;
  className?: string;
  priority?: boolean;
}

/** Badge type maquette Ideatys (point orange + label) */
export function HeroBadge({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  /** dark = texte blanc sur fond vert ; light = texte foncé sur zone claire (accueil) */
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <span
      className={
        isLight
          ? "inline-flex items-center gap-2 rounded-md border border-primary/25 px-3 py-1.5 mb-[0.85em]"
          : "inline-flex items-center gap-2 rounded-md border border-white/35 px-3 py-1.5 mb-[0.85em]"
      }
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden />
      <span
        className={
          isLight
            ? "text-[clamp(0.7rem,1.15vw,0.9rem)] font-semibold uppercase tracking-[0.14em] text-accent"
            : "text-[clamp(0.7rem,1.15vw,0.9rem)] font-semibold uppercase tracking-[0.14em] text-white"
        }
      >
        {children}
      </span>
    </span>
  );
}

/**
 * Hero = maquette WEB SITE NUL (1062×493) en canvas.
 * Texte HTML posé dans la zone libre, style type WEB SITE Copie (badge, accents orange).
 */
export default function MaquetteHero({
  src,
  alt,
  textSide = "left",
  textWidthPercent = 42,
  children,
  className,
  priority = false,
}: MaquetteHeroProps) {
  const width = Math.min(Math.max(textWidthPercent, 30), 52);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-[#00352c]",
        className
      )}
    >
      <div className="relative w-full aspect-[1062/493]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-center"
          sizes="100vw"
          priority={priority}
        />

        <div className="absolute inset-0 z-10">
          <div
            className={cn(
              "h-full w-full max-w-[90rem] mx-auto px-[4%] sm:px-[5%] flex items-center",
              textSide === "right" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "min-w-0 text-white",
                textSide === "right" ? "pl-[4%]" : "pr-[2%]"
              )}
              style={{
                width: `${width}%`,
                maxWidth: textSide === "right" ? "34rem" : "30rem",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

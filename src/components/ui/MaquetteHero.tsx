import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextSide = "left" | "right";
type Align = "side" | "center" | "stack";

interface MaquetteHeroProps {
  src?: string;
  alt?: string;
  textSide?: TextSide;
  /**
   * side = texte dans la zone libre de la bannière
   * center = texte centré sur fond maquette
   * stack = image en haut, bloc texte vert en dessous (Blog / Réalisations)
   */
  align?: Align;
  textWidthPercent?: number;
  children: ReactNode;
  className?: string;
  priority?: boolean;
  /** Pour align=stack : quelle partie de l'image montrer (Blog = top) */
  imagePosition?: "center" | "top" | "bottom";
}

/** Badge type maquette Ideatys (point orange + label) */
export function HeroBadge({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light" | "orange";
}) {
  if (tone === "orange") {
    return (
      <span className="inline-flex items-center justify-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden />
        <span className="text-[clamp(0.85rem,1.3vw,1.05rem)] font-bold uppercase tracking-[0.12em] text-accent">
          {children}
        </span>
      </span>
    );
  }

  const isLight = tone === "light";
  return (
    <span
      className={
        isLight
          ? "inline-flex items-center gap-2 rounded-full border border-primary/25 px-3.5 py-1.5 mb-[0.85em]"
          : "inline-flex items-center gap-2 rounded-full border border-white/35 px-3.5 py-1.5 mb-[0.85em]"
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
 * Hero Ideatys — maquettes WEB SITE NUL + texte HTML style Copie.
 */
export default function MaquetteHero({
  src,
  alt = "",
  textSide = "left",
  align = "side",
  textWidthPercent = 42,
  children,
  className,
  priority = false,
  imagePosition = "center",
}: MaquetteHeroProps) {
  const width = Math.min(Math.max(textWidthPercent, 30), 52);

  /* Image en haut + texte centré dans un bloc vert en dessous */
  if (align === "stack") {
    return (
      <section
        className={cn("relative w-full overflow-hidden bg-[#00352c]", className)}
      >
        {src ? (
          <div className="relative w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px]">
            <Image
              src={src}
              alt={alt}
              fill
              className={
                imagePosition === "top"
                  ? "object-cover object-top"
                  : imagePosition === "bottom"
                    ? "object-cover object-bottom"
                    : "object-cover object-center"
              }
              sizes="100vw"
              priority={priority}
            />
          </div>
        ) : null}
        <div className="relative z-10 w-full px-6 py-8 sm:py-9 md:py-10 text-center text-white">
          <div className="max-w-3xl mx-auto">{children}</div>
        </div>
      </section>
    );
  }

  if (align === "center") {
    return (
      <section
        className={cn("relative w-full overflow-hidden bg-[#00352c]", className)}
      >
        <div className="relative w-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px] flex items-center justify-center">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={priority}
            />
          ) : null}
          <div className="absolute inset-0 bg-[#00352c]/40" aria-hidden />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-10 sm:py-12 md:py-14 text-center text-white">
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn("relative w-full overflow-hidden bg-[#00352c]", className)}
    >
      <div className="relative w-full aspect-[1062/493]">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain object-center"
            sizes="100vw"
            priority={priority}
          />
        ) : null}

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

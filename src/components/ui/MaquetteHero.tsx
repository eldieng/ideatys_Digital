import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextSide = "left" | "right";
type Align = "side" | "center";

interface MaquetteHeroProps {
  src?: string;
  alt?: string;
  textSide?: TextSide;
  /** side = texte dans la zone libre ; center = titre centré (ex. Portfolio) */
  align?: Align;
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
  tone?: "dark" | "light";
}) {
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
 * Hero = maquette WEB SITE NUL (1062×493) en canvas, ou bandeau centré (Portfolio).
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
}: MaquetteHeroProps) {
  const width = Math.min(Math.max(textWidthPercent, 30), 52);

  if (align === "center") {
    return (
      <section
        className={cn(
          "relative w-full overflow-hidden bg-[#00352c]",
          className
        )}
      >
        <div className="relative w-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px] lg:aspect-[1062/493] flex items-center justify-center">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-center opacity-35"
              sizes="100vw"
              priority={priority}
            />
          ) : null}
          <div className="absolute inset-0 bg-[#00352c]/55" aria-hidden />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 sm:py-20 text-center text-white">
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

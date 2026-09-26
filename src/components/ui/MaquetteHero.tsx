import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextSide = "left" | "right";
type Align = "side" | "center" | "stack" | "bottom";

interface MaquetteHeroProps {
  src?: string;
  alt?: string;
  textSide?: TextSide;
  /**
   * side = texte dans la zone libre de la bannière (desktop)
   * center = texte centré sur fond maquette
   * stack = image en haut, bloc texte vert en dessous
   * bottom = texte dans la zone basse (desktop) / stack mobile
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
      <span className="inline-flex items-center justify-center gap-2 mb-3 sm:mb-4">
        <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden />
        <span className="text-sm sm:text-[clamp(0.85rem,1.3vw,1.05rem)] font-bold uppercase tracking-[0.12em] text-accent">
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
          ? "inline-flex items-center gap-2 rounded-full border border-primary/25 px-3 py-1.5 mb-3 sm:mb-[0.85em]"
          : "inline-flex items-center gap-2 rounded-full border border-white/35 px-3 py-1.5 mb-3 sm:mb-[0.85em]"
      }
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden />
      <span
        className={
          isLight
            ? "text-xs sm:text-[clamp(0.7rem,1.15vw,0.9rem)] font-semibold uppercase tracking-[0.14em] text-accent"
            : "text-xs sm:text-[clamp(0.7rem,1.15vw,0.9rem)] font-semibold uppercase tracking-[0.14em] text-white"
        }
      >
        {children}
      </span>
    </span>
  );
}

function MaquetteImage({
  src,
  alt,
  priority,
  objectClass,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  objectClass: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={objectClass}
      sizes="100vw"
      priority={priority}
    />
  );
}

/**
 * Hero Ideatys — maquettes WEB SITE NUL + texte HTML.
 * Mobile (< md) : image + texte empilés (lisible).
 * Desktop (md+) : overlay sur la maquette.
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

  const coverClass =
    imagePosition === "top"
      ? "object-cover object-top"
      : imagePosition === "bottom"
        ? "object-cover object-bottom"
        : "object-cover object-center";

  /* Texte centré dans la zone basse de la maquette (Blog NUL) */
  if (align === "bottom") {
    return (
      <section
        className={cn("relative w-full overflow-hidden bg-[#00352c]", className)}
      >
        {/* Mobile: stack */}
        <div className="md:hidden">
          {src ? (
            <div className="relative w-full aspect-[16/10] min-h-[180px]">
              <MaquetteImage
                src={src}
                alt={alt}
                priority={priority}
                objectClass="object-cover object-top"
              />
            </div>
          ) : null}
          <div className="relative z-10 w-full px-5 py-8 text-center text-white">
            <div className="max-w-xl mx-auto [&_h1]:text-[1.75rem] [&_h1]:leading-tight [&_p]:text-base [&_p]:leading-relaxed">
              {children}
            </div>
          </div>
        </div>

        {/* Desktop: overlay bas */}
        <div className="relative hidden md:block w-full aspect-[1062/493]">
          {src ? (
            <MaquetteImage
              src={src}
              alt={alt}
              priority={priority}
              objectClass="object-contain object-center"
            />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pb-[5%] lg:pb-[6%] px-6">
            <div className="w-full max-w-3xl text-center text-white pt-[2%]">
              {children}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* Image en haut + texte centré dans un bloc vert en dessous */
  if (align === "stack") {
    return (
      <section
        className={cn("relative w-full overflow-hidden bg-[#00352c]", className)}
      >
        {src ? (
          <div className="relative w-full h-[180px] sm:h-[200px] md:h-[240px] lg:h-[280px]">
            <MaquetteImage
              src={src}
              alt={alt}
              priority={priority}
              objectClass={coverClass}
            />
          </div>
        ) : null}
        <div className="relative z-10 w-full px-5 sm:px-6 py-8 sm:py-9 md:py-10 text-center text-white">
          <div className="max-w-3xl mx-auto [&_h1]:text-[1.75rem] sm:[&_h1]:text-[clamp(1.6rem,3.2vw,3rem)] [&_h1]:leading-tight [&_p]:text-base sm:[&_p]:text-[clamp(0.95rem,1.4vw,1.2rem)]">
            {children}
          </div>
        </div>
      </section>
    );
  }

  if (align === "center") {
    return (
      <section
        className={cn("relative w-full overflow-hidden bg-[#00352c]", className)}
      >
        <div className="relative w-full min-h-[260px] sm:min-h-[280px] md:min-h-[300px] lg:min-h-[340px] flex items-center justify-center">
          {src ? (
            <MaquetteImage
              src={src}
              alt={alt}
              priority={priority}
              objectClass="object-cover object-center"
            />
          ) : null}
          <div className="absolute inset-0 bg-[#00352c]/40" aria-hidden />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-6 py-10 sm:py-12 md:py-14 text-center text-white [&_h1]:text-[1.75rem] sm:[&_h1]:text-[clamp(1.4rem,3.1vw,3rem)] [&_h1]:leading-tight [&_p]:text-base">
            {children}
          </div>
        </div>
      </section>
    );
  }

  /* side — overlay desktop, stack mobile */
  return (
    <section
      className={cn("relative w-full overflow-hidden bg-[#00352c]", className)}
    >
      {/* Mobile: image puis texte lisible */}
      <div className="md:hidden">
        {src ? (
          <div className="relative w-full aspect-[16/10] min-h-[180px]">
            <MaquetteImage
              src={src}
              alt={alt}
              priority={priority}
              objectClass={
                textSide === "right"
                  ? "object-cover object-[70%_center]"
                  : "object-cover object-[30%_center]"
              }
            />
          </div>
        ) : null}
        <div className="relative z-10 w-full px-5 py-8 text-white">
          <div className="max-w-xl mx-auto sm:mx-0 [&_h1]:text-[1.75rem] [&_h1]:leading-tight [&_p]:text-base [&_p]:leading-relaxed [&_p]:max-w-none">
            {children}
          </div>
        </div>
      </div>

      {/* Desktop: texte posé sur la maquette */}
      <div className="relative hidden md:block w-full aspect-[1062/493]">
        {src ? (
          <MaquetteImage
            src={src}
            alt={alt}
            priority={priority}
            objectClass="object-contain object-center"
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

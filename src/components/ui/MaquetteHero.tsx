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
   * center = texte centré sur fond maquette (desktop)
   * stack = image en haut, bloc texte en dessous (tous écrans)
   * bottom = texte dans la zone basse (desktop)
   */
  align?: Align;
  textWidthPercent?: number;
  children: ReactNode;
  className?: string;
  priority?: boolean;
  /** Cadrage image (surtout mobile / stack) */
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
      <span className="inline-flex items-center justify-center gap-2 mb-3 sm:mb-4 md:mb-[0.85em]">
        <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden />
        <span className="text-sm md:text-[clamp(0.85rem,1.3vw,1.05rem)] font-bold uppercase tracking-[0.12em] text-accent">
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
          ? "inline-flex items-center gap-2 rounded-full border border-primary/25 px-3 py-1.5 mb-3 md:mb-[0.85em]"
          : "inline-flex items-center gap-2 rounded-full border border-white/35 px-3 py-1.5 mb-3 md:mb-[0.85em]"
      }
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden />
      <span
        className={
          isLight
            ? "text-xs md:text-[clamp(0.7rem,1.15vw,0.9rem)] font-semibold uppercase tracking-[0.14em] text-accent"
            : "text-xs md:text-[clamp(0.7rem,1.15vw,0.9rem)] font-semibold uppercase tracking-[0.14em] text-white"
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

/** Bloc texte mobile (sous l'image) — toujours centré */
function MobileTextBlock({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 w-full px-5 py-8 text-white md:hidden">
      <div
        className={cn(
          "max-w-xl mx-auto flex flex-col items-center text-center",
          "[&_h1]:text-[1.75rem] [&_h1]:leading-tight [&_h1]:font-bold",
          "[&_p]:text-base [&_p]:leading-relaxed [&_p]:max-w-none",
          "[&_.hero-icon]:flex [&_.hero-icon]:justify-center"
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Image pleine largeur mobile.
 * Les maquettes NUL ont une zone vide (texte) + une photo :
 * - textSide=left  → photo à droite → on cadre à droite
 * - textSide=right → photo à gauche → on cadre à gauche
 */
function MobileFullImage({
  src,
  alt,
  priority,
  textSide = "left",
  objectClass,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  textSide?: TextSide;
  objectClass?: string;
}) {
  const cropClass =
    objectClass ??
    (textSide === "right"
      ? "object-cover object-[20%_center] scale-110"
      : "object-cover object-[85%_center] scale-110");

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[240px] overflow-hidden md:hidden">
      <MaquetteImage
        src={src}
        alt={alt}
        priority={priority}
        objectClass={cropClass}
      />
    </div>
  );
}

/**
 * Hero Ideatys
 * - Mobile : image pleine largeur (cover) + texte en dessous
 * - Desktop : overlay sur maquette (comme avant)
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

  /* Texte centré dans la zone basse (Blog) — desktop overlay, mobile stack */
  if (align === "bottom") {
    return (
      <section
        className={cn("relative w-full overflow-hidden bg-[#00352c]", className)}
      >
        {src ? (
          <MobileFullImage
            src={src}
            alt={alt}
            priority={priority}
            textSide="left"
            objectClass="object-cover object-center scale-105"
          />
        ) : null}
        <MobileTextBlock>{children}</MobileTextBlock>

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

  /* stack explicite — même structure tous écrans */
  if (align === "stack") {
    return (
      <section
        className={cn("relative w-full overflow-hidden bg-[#00352c]", className)}
      >
        {src ? (
          <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] overflow-hidden">
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
        {src ? (
          <MobileFullImage
            src={src}
            alt={alt}
            priority={priority}
            textSide="left"
            objectClass="object-cover object-center scale-105"
          />
        ) : null}
        <MobileTextBlock>{children}</MobileTextBlock>

        <div className="relative hidden md:flex w-full min-h-[300px] lg:min-h-[340px] items-center justify-center">
          {src ? (
            <MaquetteImage
              src={src}
              alt={alt}
              priority={priority}
              objectClass="object-cover object-center"
            />
          ) : null}
          <div className="absolute inset-0 bg-[#00352c]/40" aria-hidden />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-14 text-center text-white">
            {children}
          </div>
        </div>
      </section>
    );
  }

  /* side — mobile stack full-bleed, desktop overlay maquette */
  return (
    <section
      className={cn("relative w-full overflow-hidden bg-[#00352c]", className)}
    >
      {src ? (
        <MobileFullImage
          src={src}
          alt={alt}
          priority={priority}
          textSide={textSide}
        />
      ) : null}
      <MobileTextBlock>{children}</MobileTextBlock>

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

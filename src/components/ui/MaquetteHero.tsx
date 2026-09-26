import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextSide = "left" | "right";
type Align = "side" | "center" | "stack" | "bottom";

interface MaquetteHeroProps {
  src?: string;
  alt?: string;
  /** Conservé pour compatibilité — le layout est toujours image pleine + texte en bas */
  textSide?: TextSide;
  /** Conservé pour compatibilité — le layout est toujours empilé */
  align?: Align;
  textWidthPercent?: number;
  children: ReactNode;
  className?: string;
  priority?: boolean;
  /** Cadrage de l'image (object-position) */
  imagePosition?: "center" | "top" | "bottom";
  /** Fond du bloc texte */
  tone?: "dark" | "light";
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
        <span className="text-sm sm:text-base font-bold uppercase tracking-[0.12em] text-accent">
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
          ? "inline-flex items-center gap-2 rounded-full border border-primary/25 px-3 py-1.5 mb-3 sm:mb-4"
          : "inline-flex items-center gap-2 rounded-full border border-white/35 px-3 py-1.5 mb-3 sm:mb-4"
      }
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden />
      <span
        className={
          isLight
            ? "text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-accent"
            : "text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-white"
        }
      >
        {children}
      </span>
    </span>
  );
}

/**
 * Hero unifié : image pleine largeur (cover, centrée) + texte en dessous.
 * Même structure sur mobile et desktop.
 */
export default function MaquetteHero({
  src,
  alt = "",
  children,
  className,
  priority = false,
  imagePosition = "center",
  tone = "dark",
}: MaquetteHeroProps) {
  const objectPosition =
    imagePosition === "top"
      ? "object-cover object-top"
      : imagePosition === "bottom"
        ? "object-cover object-bottom"
        : "object-cover object-center";

  const isLight = tone === "light";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        isLight ? "bg-white" : "bg-[#00352c]",
        className
      )}
    >
      {/* Image pleine largeur — remplit tout l'espace du bandeau */}
      {src ? (
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[220px] sm:min-h-[280px] lg:min-h-[360px]">
          <Image
            src={src}
            alt={alt}
            fill
            className={objectPosition}
            sizes="100vw"
            priority={priority}
          />
        </div>
      ) : null}

      {/* Texte en bas, centré */}
      <div
        className={cn(
          "relative z-10 w-full px-5 sm:px-8 py-8 sm:py-10 md:py-12",
          isLight ? "text-primary" : "text-white"
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-3xl text-center",
            "[&_h1]:text-[1.75rem] sm:[&_h1]:text-3xl md:[&_h1]:text-4xl lg:[&_h1]:text-5xl",
            "[&_h1]:leading-tight [&_h1]:font-bold",
            "[&_p]:mt-4 [&_p]:text-base sm:[&_p]:text-lg [&_p]:leading-relaxed",
            "[&_p]:max-w-2xl [&_p]:mx-auto",
            isLight ? "[&_p]:text-gray-dark" : "[&_p]:text-white/90"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

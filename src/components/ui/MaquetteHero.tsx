import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextSide = "left" | "right";

interface MaquetteHeroProps {
  src: string;
  alt: string;
  /** Zone texte libre sur la maquette */
  textSide?: TextSide;
  /**
   * Largeur max de la colonne texte en % de la bannière.
   * Garder serré pour ne pas chevaucher la photo (souvent ~38–45).
   */
  textWidthPercent?: number;
  children: ReactNode;
  className?: string;
  priority?: boolean;
}

/**
 * Bannière 1062×493 (WEB SITE NUL) : image = canvas, texte HTML dans la zone libre.
 */
export default function MaquetteHero({
  src,
  alt,
  textSide = "left",
  textWidthPercent = 40,
  children,
  className,
  priority = false,
}: MaquetteHeroProps) {
  const width = Math.min(Math.max(textWidthPercent, 28), 55);

  return (
    <section className={cn("relative w-full bg-primary overflow-hidden", className)}>
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
              "h-full max-w-7xl mx-auto px-[3.5%] sm:px-[4.5%] flex items-center",
              textSide === "right" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className="min-w-0"
              style={{ width: `${width}%`, maxWidth: textSide === "right" ? "36rem" : "28rem" }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

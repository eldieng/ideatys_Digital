/**
 * Le menu public reste visible.
 * La page en construction est décidée par l'hôte dans middleware.ts :
 * ideatysdigital.com uniquement, pas test.ideatysdigital.com.
 */
export const siteConfig = {
  PRESENTATION_MODE: false,

  // Pages visibles en mode présentation (les autres redirigent vers /en-construction)
  visiblePages: ["/", "/en-construction"],
};

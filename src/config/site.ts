/**
 * Configuration du site
 * Mettre PRESENTATION_MODE à true pour masquer les pages en construction
 */
export const siteConfig = {
  // Mode présentation : masque les liens vers les pages non finalisées
  PRESENTATION_MODE: false,

  // Pages visibles en mode présentation (les autres redirigent vers /en-construction)
  visiblePages: ["/", "/en-construction"],
};

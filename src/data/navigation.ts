import { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Stratégie digitale", href: "/services/strategie-digitale" },
      { label: "Développement web", href: "/services/developpement-web" },
      {
        label: "Community management",
        href: "/services/community-management",
      },
      {
        label: "Production audiovisuelle",
        href: "/services/production-audiovisuelle",
      },
      { label: "Design graphique", href: "/services/design-graphique" },
      { label: "Print & impression", href: "/services/print-impression" },
    ],
  },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "Candidature", href: "/candidature" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  services: [
    { label: "Stratégie digitale", href: "/services/strategie-digitale" },
    { label: "Développement web", href: "/services/developpement-web" },
    { label: "Community management", href: "/services/community-management" },
    {
      label: "Production audiovisuelle",
      href: "/services/production-audiovisuelle",
    },
    { label: "Design graphique", href: "/services/design-graphique" },
    { label: "Print & impression", href: "/services/print-impression" },
  ],
  entreprise: [
    { label: "À propos", href: "/a-propos" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Blog", href: "/blog" },
    { label: "Candidature", href: "/candidature" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    {
      label: "Politique de confidentialité",
      href: "/politique-confidentialite",
    },
  ],
};

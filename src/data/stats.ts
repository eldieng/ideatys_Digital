import { Stat, Value } from "@/types";

export const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Projets réalisés" },
  { value: 80, suffix: "+", label: "Clients satisfaits" },
  { value: 5, suffix: " ans", label: "D'expérience" },
  { value: 98, suffix: "%", label: "Taux de satisfaction" },
];

export const values: Value[] = [
  {
    title: "Créativité",
    description:
      "Nous repoussons les limites du design et de l'innovation pour créer des solutions uniques.",
    icon: "Lightbulb",
  },
  {
    title: "Professionnalisme",
    description:
      "Rigueur, ponctualité et qualité irréprochable dans chaque projet que nous réalisons.",
    icon: "Shield",
  },
  {
    title: "Impact",
    description:
      "Chaque action est pensée pour générer des résultats mesurables et durables.",
    icon: "TrendingUp",
  },
  {
    title: "Excellence",
    description:
      "Nous visons l'excellence dans les moindres détails, du concept à la livraison finale.",
    icon: "Award",
  },
  {
    title: "Proximité",
    description:
      "Une relation de confiance et de transparence avec chacun de nos clients.",
    icon: "Heart",
  },
];

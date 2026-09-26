import { Stat, Value } from "@/types";

export const stats: Stat[] = [
  { value: 7, suffix: "", label: "Services digitaux" },
  { value: 100, suffix: "%", label: "Engagement qualité" },
  { value: 3, suffix: "", label: "Pays couverts" },
  { value: 24, suffix: "h", label: "Support disponible" },
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

import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "refonte-site-ecommerce",
    title: "Refonte Site E-commerce",
    category: "Développement Web",
    client: "TechStart",
    description:
      "Refonte complète d'une plateforme e-commerce pour améliorer l'expérience utilisateur et augmenter les conversions.",
    image: "/img/projects/project-1.jpg",
    context:
      "TechStart, une entreprise tech en pleine croissance, avait besoin de moderniser sa plateforme e-commerce vieillissante qui souffrait de taux de rebond élevés et de faibles conversions.",
    solution:
      "Nous avons conçu et développé une plateforme e-commerce moderne avec Next.js, offrant une navigation fluide, un design responsive et une expérience d'achat optimisée.",
    results: [
      "Taux de conversion +45%",
      "Taux de rebond -30%",
      "Temps de chargement < 1.5s",
      "Satisfaction client +60%",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    date: "2025-11",
  },
  {
    slug: "campagne-social-media",
    title: "Campagne Social Media",
    category: "Community Management",
    client: "GreenLeaf",
    description:
      "Stratégie et gestion complète des réseaux sociaux pour une marque éco-responsable.",
    image: "/img/projects/project-2.jpg",
    context:
      "GreenLeaf souhaitait développer sa communauté en ligne et augmenter sa visibilité auprès d'une audience sensible aux enjeux environnementaux.",
    solution:
      "Nous avons élaboré une stratégie éditoriale axée sur le storytelling environnemental, avec du contenu engageant et des campagnes ciblées.",
    results: [
      "Communauté +200% en 6 mois",
      "Engagement rate 8.5%",
      "Portée organique x3",
      "Leads qualifiés +120%",
    ],
    technologies: ["Instagram", "LinkedIn", "TikTok", "Canva"],
    date: "2025-09",
  },
  {
    slug: "identite-visuelle-startup",
    title: "Identité Visuelle Startup",
    category: "Design Graphique",
    client: "ModaStyle",
    description:
      "Création d'une identité visuelle complète pour une startup dans la mode durable.",
    image: "/img/projects/project-3.jpg",
    context:
      "ModaStyle, une nouvelle marque de mode durable, avait besoin d'une identité visuelle forte pour se démarquer sur un marché compétitif.",
    solution:
      "Nous avons créé une identité visuelle premium incluant logo, charte graphique, packaging et supports de communication cohérents.",
    results: [
      "Reconnaissance de marque immédiate",
      "Cohérence sur tous les supports",
      "Image premium et moderne",
      "Différenciation concurrentielle forte",
    ],
    technologies: ["Illustrator", "Photoshop", "InDesign", "Figma"],
    date: "2025-07",
  },
  {
    slug: "application-web-saas",
    title: "Application Web SaaS",
    category: "Développement Web",
    client: "DataFlow",
    description:
      "Développement d'une application SaaS de gestion de données pour entreprises B2B.",
    image: "/img/projects/project-4.jpg",
    context:
      "DataFlow avait besoin d'une plateforme SaaS intuitive permettant à ses clients B2B de gérer et visualiser leurs données en temps réel.",
    solution:
      "Nous avons développé une application web complète avec dashboard interactif, gestion des utilisateurs et API REST sécurisée.",
    results: [
      "100+ entreprises utilisatrices",
      "99.9% uptime",
      "NPS score de 72",
      "Temps de déploiement -50%",
    ],
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Chart.js"],
    date: "2025-05",
  },
  {
    slug: "film-corporate",
    title: "Film Corporate",
    category: "Production Audiovisuelle",
    client: "InnoGroup",
    description:
      "Production d'un film corporate pour présenter la vision et les valeurs de l'entreprise.",
    image: "/img/projects/project-5.jpg",
    context:
      "InnoGroup souhaitait un film corporate de haute qualité pour communiquer sa vision et attirer de nouveaux talents et partenaires.",
    solution:
      "Nous avons produit un film corporate de 3 minutes mêlant interviews, plans aériens et motion design, avec une direction artistique soignée.",
    results: [
      "50K+ vues sur LinkedIn",
      "Partages x5 vs ancien contenu",
      "Candidatures spontanées +80%",
      "Utilisé en événements B2B",
    ],
    technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Drone"],
    date: "2025-03",
  },
  {
    slug: "strategie-lancement",
    title: "Stratégie de Lancement",
    category: "Stratégie Digitale",
    client: "NovaBrand",
    description:
      "Élaboration et exécution d'une stratégie de lancement digital complète pour une nouvelle marque.",
    image: "/img/projects/project-6.jpg",
    context:
      "NovaBrand préparait le lancement de sa marque et avait besoin d'une stratégie digitale globale pour maximiser l'impact de son entrée sur le marché.",
    solution:
      "Nous avons orchestré un lancement multicanal combinant site web, réseaux sociaux, emailing et relations presse digitale.",
    results: [
      "10K visiteurs la première semaine",
      "500+ inscriptions newsletter",
      "Couverture presse dans 15 médias",
      "ROI campagne de 320%",
    ],
    technologies: ["Google Ads", "Meta Ads", "Mailchimp", "Analytics"],
    date: "2025-01",
  },
];

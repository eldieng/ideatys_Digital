import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const services = [
  {
    slug: "strategie-digitale",
    title: "Stratégie Digitale",
    description: "Nous élaborons des stratégies digitales sur mesure pour propulser votre entreprise vers de nouveaux sommets. De l'audit à la mise en œuvre, nous vous accompagnons à chaque étape.",
    shortDesc: "Des stratégies sur mesure pour propulser votre croissance digitale.",
    icon: "Target",
    features: ["Audit et analyse", "Stratégie personnalisée", "Mise en œuvre", "Optimisation continue"],
    published: true,
    order: 1,
  },
  {
    slug: "developpement-web",
    title: "Développement Web",
    description: "Nous concevons et développons des sites web et applications sur mesure, performants et évolutifs. Technologies modernes, code propre, résultats concrets.",
    shortDesc: "Sites web et applications performants, modernes et sur mesure.",
    icon: "Code",
    features: ["Sites vitrines", "E-commerce", "Applications web", "Maintenance"],
    published: true,
    order: 2,
  },
  {
    slug: "community-management",
    title: "Community Management",
    description: "Nous gérons et animons vos réseaux sociaux pour construire une communauté engagée autour de votre marque. Contenu créatif, stratégie éditoriale, croissance organique.",
    shortDesc: "Animation de vos réseaux sociaux et construction de communauté.",
    icon: "Users",
    features: ["Stratégie éditoriale", "Création de contenu", "Animation quotidienne", "Reporting mensuel"],
    published: true,
    order: 3,
  },
  {
    slug: "production-audiovisuelle",
    title: "Production Audiovisuelle",
    description: "Nous produisons des contenus vidéo et photo de qualité professionnelle pour raconter votre histoire et captiver votre audience.",
    shortDesc: "Vidéos et photos professionnelles pour captiver votre audience.",
    icon: "Video",
    features: ["Films corporate", "Spots publicitaires", "Photographie", "Motion design"],
    published: true,
    order: 4,
  },
  {
    slug: "design-graphique",
    title: "Design Graphique",
    description: "Nous créons des identités visuelles fortes et des supports graphiques qui reflètent l'essence de votre marque. Du logo à la charte complète.",
    shortDesc: "Identités visuelles et supports graphiques percutants.",
    icon: "Palette",
    features: ["Logo et identité", "Charte graphique", "Supports marketing", "Packaging"],
    published: true,
    order: 5,
  },
  {
    slug: "print-impression",
    title: "Print & Impression",
    description: "Nous concevons et produisons tous vos supports print : cartes de visite, brochures, flyers, affiches et bien plus. Qualité premium garantie.",
    shortDesc: "Supports print de qualité : cartes, brochures, flyers, affiches.",
    icon: "Printer",
    features: ["Cartes de visite", "Brochures", "Flyers", "Affiches"],
    published: true,
    order: 6,
  },
];

const realisations = [
  {
    slug: "refonte-site-ecommerce",
    title: "Refonte Site E-commerce",
    description: "Refonte complète d'une plateforme e-commerce pour améliorer l'expérience utilisateur et augmenter les conversions. TechStart, une entreprise tech en pleine croissance, avait besoin de moderniser sa plateforme e-commerce vieillissante.",
    category: "Développement Web",
    client: "TechStart",
    year: "2025",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    published: true,
    featured: true,
  },
  {
    slug: "campagne-social-media",
    title: "Campagne Social Media",
    description: "Stratégie et gestion complète des réseaux sociaux pour une marque éco-responsable. GreenLeaf souhaitait développer sa communauté en ligne et augmenter sa visibilité.",
    category: "Community Management",
    client: "GreenLeaf",
    year: "2025",
    technologies: ["Instagram", "LinkedIn", "TikTok", "Canva"],
    published: true,
    featured: true,
  },
  {
    slug: "identite-visuelle-startup",
    title: "Identité Visuelle Startup",
    description: "Création d'une identité visuelle complète pour une startup dans la mode durable. ModaStyle avait besoin d'une identité visuelle forte pour se démarquer.",
    category: "Design Graphique",
    client: "ModaStyle",
    year: "2025",
    technologies: ["Illustrator", "Photoshop", "InDesign", "Figma"],
    published: true,
    featured: false,
  },
  {
    slug: "application-web-saas",
    title: "Application Web SaaS",
    description: "Développement d'une application SaaS de gestion de données pour entreprises B2B. DataFlow avait besoin d'une plateforme intuitive pour ses clients.",
    category: "Développement Web",
    client: "DataFlow",
    year: "2025",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Chart.js"],
    published: true,
    featured: false,
  },
  {
    slug: "film-corporate",
    title: "Film Corporate",
    description: "Production d'un film corporate pour présenter la vision et les valeurs de l'entreprise. InnoGroup souhaitait un film de haute qualité pour communiquer sa vision.",
    category: "Production Audiovisuelle",
    client: "InnoGroup",
    year: "2025",
    technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Drone"],
    published: true,
    featured: false,
  },
  {
    slug: "strategie-lancement",
    title: "Stratégie de Lancement",
    description: "Élaboration et exécution d'une stratégie de lancement digital complète pour une nouvelle marque. NovaBrand préparait le lancement de sa marque.",
    category: "Stratégie Digitale",
    client: "NovaBrand",
    year: "2025",
    technologies: ["Google Ads", "Meta Ads", "Mailchimp", "Analytics"],
    published: true,
    featured: false,
  },
];

const articles = [
  {
    slug: "optimiser-seo-2026",
    title: "Comment optimiser votre SEO en 2026",
    excerpt: "Découvrez les meilleures pratiques SEO pour améliorer votre visibilité en ligne et attirer plus de trafic qualifié.",
    content: `<h2>Introduction</h2>
<p>Le SEO évolue constamment. En 2026, les moteurs de recherche sont plus intelligents que jamais, et les stratégies qui fonctionnaient hier ne suffisent plus. Voici un guide complet pour optimiser votre référencement naturel.</p>

<h2>1. L'expérience utilisateur au cœur du SEO</h2>
<p>Google privilégie désormais les sites qui offrent une excellente expérience utilisateur. Les Core Web Vitals restent des métriques clés : LCP, FID et CLS doivent être optimisés.</p>
<p>Assurez-vous que votre site se charge en moins de 2 secondes, que l'interactivité est immédiate et que la mise en page est stable.</p>

<h2>2. Le contenu E-E-A-T</h2>
<p>Experience, Expertise, Authoritativeness, Trustworthiness — ces quatre piliers sont essentiels. Google veut du contenu créé par des experts, basé sur une expérience réelle.</p>

<h2>3. L'optimisation technique</h2>
<p>Les bases techniques restent fondamentales : balises meta, structure des URL, sitemap XML, données structurées Schema.org, et une architecture de site claire.</p>

<h2>Conclusion</h2>
<p>Le SEO en 2026, c'est avant tout créer de la valeur pour vos utilisateurs tout en respectant les bonnes pratiques techniques. Investissez dans le contenu de qualité et l'expérience utilisateur.</p>`,
    category: "SEO",
    author: "IDEATYS Digital",
    readTime: "5 min",
    published: true,
  },
  {
    slug: "strategie-social-media",
    title: "Les clés d'une stratégie social media réussie",
    excerpt: "Apprenez à construire une stratégie social media efficace qui engage votre audience et génère des résultats.",
    content: `<h2>Pourquoi une stratégie social media est indispensable</h2>
<p>Les réseaux sociaux sont devenus un canal de communication incontournable. Mais publier sans stratégie, c'est comme naviguer sans boussole.</p>

<h2>1. Définir vos objectifs</h2>
<p>Notoriété, engagement, génération de leads, recrutement... Chaque objectif nécessite une approche différente. Soyez précis et mesurable.</p>

<h2>2. Connaître votre audience</h2>
<p>Créez des personas détaillés. Où se trouve votre audience ? Quels contenus consomme-t-elle ? À quels moments est-elle active ?</p>

<h2>3. Créer du contenu à forte valeur ajoutée</h2>
<p>Le contenu roi reste le pilier de toute stratégie. Variez les formats : carrousels, vidéos courtes, infographies, stories, articles longs.</p>

<h2>Conclusion</h2>
<p>Une stratégie social media réussie demande de la cohérence, de la créativité et de l'analyse. Testez, mesurez, ajustez.</p>`,
    category: "Marketing Digital",
    author: "IDEATYS Digital",
    readTime: "7 min",
    published: true,
  },
  {
    slug: "importance-branding",
    title: "Pourquoi le branding est essentiel pour votre entreprise",
    excerpt: "Le branding va bien au-delà du logo. Découvrez comment une identité de marque forte peut transformer votre business.",
    content: `<h2>Le branding, bien plus qu'un logo</h2>
<p>Votre marque est la perception que les gens ont de votre entreprise. Elle englobe votre identité visuelle, votre ton de communication, vos valeurs et l'expérience que vous offrez.</p>

<h2>1. Se différencier de la concurrence</h2>
<p>Sur un marché saturé, une identité de marque forte est votre meilleur atout pour vous démarquer. Elle crée une connexion émotionnelle avec votre audience.</p>

<h2>2. Construire la confiance</h2>
<p>Une marque cohérente et professionnelle inspire confiance. Les consommateurs achètent auprès de marques qu'ils reconnaissent et en qui ils ont confiance.</p>

<h2>3. Augmenter la valeur perçue</h2>
<p>Un branding premium permet de justifier des prix plus élevés. La perception de qualité est directement liée à l'image de marque.</p>

<h2>Conclusion</h2>
<p>Investir dans votre branding, c'est investir dans l'avenir de votre entreprise. Une marque forte est un actif stratégique inestimable.</p>`,
    category: "Branding",
    author: "IDEATYS Digital",
    readTime: "6 min",
    published: true,
  },
];

export async function POST() {
  try {
    // Seed services
    for (const service of services) {
      await prisma.service.upsert({
        where: { slug: service.slug },
        update: service,
        create: service,
      });
    }

    // Seed realisations
    for (const realisation of realisations) {
      await prisma.realisation.upsert({
        where: { slug: realisation.slug },
        update: realisation,
        create: realisation,
      });
    }

    // Seed articles
    for (const article of articles) {
      await prisma.article.upsert({
        where: { slug: article.slug },
        update: article,
        create: article,
      });
    }

    return NextResponse.json({
      message: "Données importées avec succès",
      services: services.length,
      realisations: realisations.length,
      articles: articles.length,
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'import des données" },
      { status: 500 }
    );
  }
}

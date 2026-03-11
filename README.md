# IDEATYS Digital — Site Web v4.0

Site vitrine de l'agence **IDEATYS Digital**, construit avec Next.js 16, TypeScript et Tailwind CSS v4.

## Stack technique

- **Framework** : Next.js 16+ (App Router, Turbopack)
- **Langage** : TypeScript
- **Styles** : Tailwind CSS v4
- **Animations** : Framer Motion
- **Validation** : Zod
- **Icônes** : Lucide React
- **Font** : Plus Jakarta Sans (Google Fonts)

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
src/
├── app/                    # Pages (App Router)
│   ├── page.tsx            # Accueil
│   ├── a-propos/           # À propos
│   ├── services/           # Services (index + [slug])
│   ├── realisations/       # Réalisations (index + [slug])
│   ├── blog/               # Blog (index + [slug])
│   ├── candidature/        # Formulaire candidature
│   ├── contact/            # Formulaire contact/devis
│   ├── mentions-legales/   # Mentions légales
│   ├── politique-confidentialite/  # RGPD
│   ├── api/                # API Routes (contact, candidature, newsletter)
│   ├── sitemap.ts          # Sitemap XML dynamique
│   ├── robots.ts           # Robots.txt
│   └── not-found.tsx       # Page 404
├── components/
│   ├── ui/                 # Composants réutilisables (Button, Card, Badge, etc.)
│   ├── layout/             # Header, Footer, MainLayout, PageTransition
│   ├── sections/           # Sections homepage + grilles dynamiques
│   └── forms/              # Formulaires client (Contact, Candidature, Newsletter)
├── data/                   # Données statiques (services, projets, équipe, etc.)
├── lib/                    # Utilitaires, hooks, validation Zod
└── types/                  # Interfaces TypeScript
```

## Pages (32 routes)

| Route | Type | Description |
|---|---|---|
| `/` | Static | Page d'accueil |
| `/a-propos` | Static | Mission, valeurs, équipe |
| `/services` | Static | Liste des services |
| `/services/[slug]` | SSG (x6) | Détail service |
| `/realisations` | Static | Portfolio avec filtres dynamiques |
| `/realisations/[slug]` | SSG (x6) | Détail projet |
| `/blog` | Static | Blog avec filtres + recherche |
| `/blog/[slug]` | SSG (x3) | Article complet |
| `/candidature` | Static | Formulaire candidature |
| `/contact` | Static | Formulaire contact/devis |
| `/mentions-legales` | Static | Mentions légales |
| `/politique-confidentialite` | Static | Politique RGPD |
| `/api/contact` | Dynamic | API formulaire contact |
| `/api/candidature` | Dynamic | API formulaire candidature |
| `/api/newsletter` | Dynamic | API newsletter |

## Charte graphique

| Couleur | Hex | Usage |
|---|---|---|
| Vert foncé | `#09312A` | Couleur principale |
| Orange | `#C15A18` | Couleur d'accent |
| Blanc | `#FFFFFF` | Arrière-plans |
| Gris clair | `#F5F5F5` | Sections alternées |

## Fonctionnalités

- **SEO** : Metadata dynamiques, Open Graph, JSON-LD, sitemap XML, robots.txt, breadcrumbs
- **Formulaires** : Validation Zod, honeypot anti-spam, rate limiting, états loading/success/error
- **UX** : Scroll-to-top, transitions de page, animations au scroll, filtres dynamiques
- **Sécurité** : Headers HTTP (X-Frame-Options, CSP, etc.), validation serveur
- **Performance** : Static generation (SSG), optimisation images (AVIF/WebP), Turbopack

## Documentation

- `docs/CAHIER_DES_CHARGES.md` — Cahier des charges complet
- `docs/PHASES_DEVELOPPEMENT.md` — Plan de développement en 10 phases

## Déploiement

```bash
npm run build   # Build production
npm start       # Serveur Node.js
```

Compatible Vercel, Netlify, ou tout hébergeur Node.js.

## TODO (prochaines phases)

- [ ] Intégration email (Resend/SendGrid)
- [ ] Stockage fichiers CV (S3/Uploadthing)
- [ ] CMS headless pour le blog (Sanity/Strapi)
- [ ] Analytics (Plausible/Umami)
- [ ] Tests E2E (Playwright)
- [ ] CI/CD pipeline

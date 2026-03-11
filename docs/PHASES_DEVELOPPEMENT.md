# Phases de Développement – Site Web IDEATYS Digital

**Version :** 4.0
**Date :** 15 février 2026
**Estimation totale :** 8 à 10 semaines

---

## Vue d'ensemble

| Phase | Intitulé | Durée estimée |
|-------|----------|---------------|
| 1 | Setup & Architecture | 3-4 jours |
| 2 | Layout & Navigation | 3-4 jours |
| 3 | Page Accueil | 4-5 jours |
| 4 | Pages Institutionnelles | 3-4 jours |
| 5 | Pages Services | 5-6 jours |
| 6 | Portfolio / Réalisations | 4-5 jours |
| 7 | Blog | 5-6 jours |
| 8 | Formulaires & API | 5-6 jours |
| 9 | SEO, Performance & Sécurité | 3-4 jours |
| 10 | Tests, QA & Déploiement | 4-5 jours |

---

## Phase 1 – Setup & Architecture

**Durée :** 3-4 jours
**Priorité :** 🔴 Critique

### Tâches

- [ ] Initialisation du projet Next.js 14+ (App Router) + TypeScript
- [ ] Configuration Tailwind CSS avec la charte graphique IDEATYS
  - Couleurs : `#09312A`, `#C15A18`, `#FFFFFF`, `#F5F5F5`
  - Typographies (Inter / Plus Jakarta Sans)
  - Spacing, breakpoints personnalisés
- [ ] Configuration ESLint + Prettier
- [ ] Structure des dossiers

```
src/
├── app/                    # App Router (pages)
│   ├── (main)/             # Groupe layout principal
│   │   ├── page.tsx        # Accueil
│   │   ├── a-propos/
│   │   ├── services/
│   │   ├── realisations/
│   │   ├── blog/
│   │   ├── candidature/
│   │   ├── contact/
│   │   ├── mentions-legales/
│   │   └── politique-confidentialite/
│   ├── api/                # API Routes
│   ├── layout.tsx          # Root layout
│   ├── not-found.tsx       # Page 404
│   └── sitemap.ts          # Sitemap dynamique
├── components/
│   ├── ui/                 # Composants UI réutilisables (boutons, cards, inputs)
│   ├── layout/             # Header, Footer, Navigation
│   ├── sections/           # Sections de pages (Hero, Testimonials, CTA)
│   └── forms/              # Composants formulaires
├── lib/                    # Utilitaires, helpers, config
├── content/                # Contenu MDX (blog, services)
├── data/                   # Données statiques (services, équipe, témoignages)
├── types/                  # Types TypeScript
└── styles/                 # Styles globaux
```

- [ ] Installation des dépendances clés
  - `framer-motion` (animations)
  - `lucide-react` (icônes)
  - `zod` (validation)
  - `@next/mdx` + `contentlayer` ou `next-mdx-remote` (blog)
  - `resend` (emails)
- [ ] Configuration des métadonnées globales (metadata API Next.js)
- [ ] Setup Git + repository GitHub
- [ ] Configuration Vercel (preview deployments)

### Livrable
Projet initialisé, buildable, déployé sur Vercel (page blanche fonctionnelle).

---

## Phase 2 – Layout & Navigation

**Durée :** 3-4 jours
**Priorité :** 🔴 Critique

### Tâches

- [ ] **Header**
  - Logo IDEATYS (SVG)
  - Navigation principale (liens vers toutes les pages)
  - CTA "Demander un devis" (bouton orange)
  - Menu hamburger responsive (mobile/tablette)
  - Header fixe avec effet de scroll (fond opaque au scroll)
- [ ] **Footer**
  - Logo + description courte
  - Navigation par colonnes (Services, Entreprise, Contact)
  - Liens réseaux sociaux
  - Champ newsletter (email + bouton)
  - Copyright + liens mentions légales / politique confidentialité
- [ ] **Layout global**
  - Wrapper de contenu responsive
  - Transitions de page (Framer Motion)
  - Scroll to top
- [ ] **Composants UI de base**
  - Bouton primaire (orange)
  - Bouton secondaire (outline vert)
  - Card générique
  - Section wrapper (padding, max-width)
  - Badge / Tag
  - Titre de section (pattern réutilisable)

### Livrable
Navigation complète et responsive, layout cohérent, composants UI de base.

---

## Phase 3 – Page Accueil

**Durée :** 4-5 jours
**Priorité :** 🔴 Critique

### Tâches

- [ ] **Hero Section**
  - Titre : "Créativité. Professionnalisme. Impact."
  - Sous-titre : "Nous transformons vos idées en solutions digitales performantes et durables."
  - CTA primaire : "Demander un devis" (orange)
  - CTA secondaire : "Découvrir nos services" (outline vert)
  - Animation d'entrée (Framer Motion)
  - Fond blanc ou dégradé subtil vert
- [ ] **Aperçu Services**
  - Grille de 6 cards (icône, titre, description, lien)
  - Animation au scroll (stagger)
- [ ] **Pourquoi nous choisir**
  - 4-6 arguments clés avec compteurs animés
  - Icônes + chiffres (projets, clients, années)
- [ ] **Réalisations (aperçu)**
  - Grille ou carrousel des 3-6 meilleurs projets
  - Images avec overlay hover (titre + catégorie)
  - Lien "Voir toutes les réalisations"
- [ ] **Témoignages**
  - Slider/carrousel de témoignages
  - Photo client, nom, entreprise, citation
  - Navigation dots/flèches
- [ ] **CTA Final**
  - Bannière pleine largeur fond vert foncé
  - Titre accrocheur + bouton orange
  - Lien vers page contact

### Livrable
Page d'accueil complète, animée, responsive, avec toutes les sections.

---

## Phase 4 – Pages Institutionnelles

**Durée :** 3-4 jours
**Priorité :** 🟡 Moyenne

### Tâches

- [ ] **Page À propos**
  - Section introduction (vision de l'agence)
  - Timeline histoire de l'agence
  - Section mission
  - Valeurs (cards avec icônes)
  - Équipe (grille de profils : photo, nom, poste, bio, LinkedIn)
- [ ] **Mentions légales**
  - Contenu statique structuré
- [ ] **Politique de confidentialité**
  - Contenu statique structuré RGPD
- [ ] **Page 404**
  - Design cohérent charte graphique
  - Message clair + illustration
  - CTA retour accueil
  - Suggestions de pages

### Livrable
Toutes les pages institutionnelles et légales fonctionnelles.

---

## Phase 5 – Pages Services

**Durée :** 5-6 jours
**Priorité :** 🔴 Critique

### Tâches

- [ ] **Page Services (index)**
  - Hero avec titre + description
  - Grille des 6 services (cards détaillées)
  - Chaque card : icône, titre, description, lien vers sous-page
- [ ] **Template sous-page service** (composant réutilisable)
  - Hero service (titre + description + visuel)
  - Section Problématique
  - Section Solution
  - Section Processus (timeline/steps)
  - Section Résultats (chiffres, exemples)
  - Réalisations liées (filtrage dynamique)
  - CTA spécifique au service
- [ ] **Créer les 6 sous-pages**
  - Stratégie digitale (`/services/strategie-digitale`)
  - Développement web (`/services/developpement-web`)
  - Community management (`/services/community-management`)
  - Production audiovisuelle (`/services/production-audiovisuelle`)
  - Design graphique (`/services/design-graphique`)
  - Print & impression (`/services/print-impression`)
- [ ] **Contenu MDX ou data** pour chaque service
- [ ] **SEO** : meta dynamiques par service, Schema.org Service

### Livrable
Page services index + 6 sous-pages complètes avec template réutilisable.

---

## Phase 6 – Portfolio / Réalisations

**Durée :** 4-5 jours
**Priorité :** 🟡 Moyenne

### Tâches

- [ ] **Page Réalisations (index)**
  - Grille dynamique de projets (images)
  - Système de filtres par catégorie de service
  - Animation de transition entre filtres (Framer Motion layout)
  - Hover effect sur les cards (overlay avec titre + catégorie)
- [ ] **Page détail projet (template)**
  - Hero projet (image principale + titre)
  - Contexte / Brief client
  - Solution apportée
  - Résultats (chiffres, métriques)
  - Galerie d'images
  - Technologies utilisées
  - Navigation précédent/suivant
  - CTA "Discuter de votre projet"
- [ ] **Données projets** : structure JSON ou MDX
- [ ] **SEO** : meta dynamiques par projet

### Livrable
Portfolio complet avec filtres, pages détaillées et navigation.

---

## Phase 7 – Blog

**Durée :** 5-6 jours
**Priorité :** 🟡 Moyenne

### Tâches

- [ ] **Système de contenu MDX**
  - Configuration next-mdx-remote ou contentlayer
  - Frontmatter : title, description, date, author, category, tags, image, readTime
  - Composants MDX personnalisés (code blocks, callouts, images)
- [ ] **Page Blog (index)**
  - Liste des articles avec pagination
  - Image, titre, excerpt, date, auteur, temps de lecture
  - Filtres par catégorie (SEO, Marketing digital, Branding, Web)
  - Barre de recherche
- [ ] **Page Article (template)**
  - Hero article (image, titre, meta)
  - Rendu MDX complet
  - Table des matières (optionnel)
  - Boutons de partage social (LinkedIn, Twitter/X, Facebook)
  - Articles similaires en fin de page
  - CTA newsletter
- [ ] **SEO Blog**
  - Meta dynamiques par article
  - Schema.org Article / BlogPosting
  - URL propres (`/blog/slug-article`)
- [ ] **Créer 2-3 articles de démonstration**

### Livrable
Blog fonctionnel avec MDX, pagination, filtres, partage social.

---

## Phase 8 – Formulaires & API

**Durée :** 5-6 jours
**Priorité :** 🔴 Critique

### Tâches

- [ ] **Composants formulaire réutilisables**
  - Input text, email, tel
  - Select / dropdown
  - Textarea
  - File upload avec preview
  - Validation en temps réel (Zod + React Hook Form)
  - Messages d'erreur stylisés
  - État de chargement (loading/success/error)
- [ ] **Page Contact / Devis**
  - Formulaire complet (nom, email, tel, entreprise, service, budget, message)
  - Carte interactive (adresse agence)
  - Informations de contact (email, tel, horaires, réseaux sociaux)
- [ ] **API Route : Contact** (`/api/contact`)
  - Validation serveur (Zod)
  - Envoi email notification interne (Resend/SendGrid)
  - Email de confirmation au client
  - Rate limiting
  - Honeypot anti-spam
- [ ] **Page Candidature**
  - Section introduction + culture d'entreprise
  - Formulaire candidature (nom, prénom, email, tel, poste, expérience, motivation, CV, portfolio)
  - Upload CV : validation PDF, max 5MB
  - Upload portfolio : URL ou fichier
- [ ] **API Route : Candidature** (`/api/candidature`)
  - Validation serveur (Zod)
  - Upload fichier vers stockage cloud (S3/Uploadthing)
  - Enregistrement en base de données (PostgreSQL)
  - Email notification RH
  - Email confirmation candidat
  - Rate limiting
- [ ] **API Route : Newsletter** (`/api/newsletter`)
  - Validation email
  - Intégration service emailing
- [ ] **Tests des formulaires** (soumission, validation, erreurs)

### Livrable
Tous les formulaires fonctionnels avec API, emails, uploads, validation.

---

## Phase 9 – SEO, Performance & Sécurité

**Durée :** 3-4 jours
**Priorité :** 🔴 Critique

### Tâches

- [ ] **SEO**
  - Vérification de toutes les balises meta (title, description, canonical)
  - Open Graph images par page
  - Twitter Cards
  - Sitemap XML dynamique (`/sitemap.xml`)
  - Robots.txt
  - Schema.org : Organization, LocalBusiness, Service, Article, BreadcrumbList
  - Fil d'Ariane sur les pages internes
  - Vérification des alt texts
  - Maillage interne
- [ ] **Performance**
  - Audit Lighthouse (objectif > 90 sur les 4 métriques)
  - Optimisation des images (Next.js Image, WebP/AVIF)
  - Lazy loading composants lourds
  - Analyse bundle (bundle analyzer)
  - Vérification Core Web Vitals
- [ ] **Sécurité**
  - Headers de sécurité (CSP, X-Frame-Options, etc.) via `next.config.js`
  - Rate limiting sur toutes les API routes
  - Sanitization des inputs
  - Vérification CSRF
- [ ] **RGPD**
  - Bandeau cookies fonctionnel (accepter/refuser/personnaliser)
  - Intégration analytics conditionnelle (après consentement)
  - Cases de consentement sur les formulaires
- [ ] **Accessibilité**
  - Audit WCAG 2.1 AA
  - Navigation clavier complète
  - Attributs ARIA
  - Focus visible
  - Contraste vérifié

### Livrable
Site optimisé SEO, performant, sécurisé, accessible et conforme RGPD.

---

## Phase 10 – Tests, QA & Déploiement

**Durée :** 4-5 jours
**Priorité :** 🔴 Critique

### Tâches

- [ ] **Tests fonctionnels**
  - Navigation complète (tous les liens)
  - Formulaires (soumission, validation, erreurs, succès)
  - Upload fichiers
  - Filtres portfolio et blog
  - Responsive (mobile, tablette, desktop)
- [ ] **Tests cross-browser**
  - Chrome
  - Firefox
  - Safari
  - Edge
- [ ] **Tests mobile**
  - iOS Safari
  - Android Chrome
  - Différentes tailles d'écran
- [ ] **Audit final**
  - Lighthouse Performance > 90
  - Lighthouse Accessibility > 90
  - Lighthouse Best Practices > 90
  - Lighthouse SEO > 90
- [ ] **Contenu**
  - Intégration du contenu final (textes, images, vidéos)
  - Vérification orthographe et grammaire
  - Vérification des liens morts
- [ ] **Déploiement production**
  - Configuration domaine personnalisé sur Vercel
  - SSL/HTTPS vérifié
  - Redirections configurées (si migration)
  - DNS configuré
  - Google Search Console
  - Analytics activé
- [ ] **Documentation**
  - README technique
  - Guide d'ajout de contenu (blog, portfolio)
  - Documentation API
  - Credentials et accès

### Livrable
Site en production, testé, documenté, prêt pour le client.

---

## Récapitulatif des jalons

| Semaine | Phase | Jalon |
|---------|-------|-------|
| S1 | Phase 1 + 2 | Projet initialisé + Layout complet |
| S2 | Phase 3 | Page d'accueil terminée |
| S3 | Phase 4 + 5 (début) | Pages institutionnelles + début services |
| S4 | Phase 5 (fin) | Pages services complètes |
| S5 | Phase 6 | Portfolio complet |
| S6-S7 | Phase 7 + 8 | Blog + Formulaires & API |
| S8 | Phase 9 | SEO, Performance, Sécurité |
| S9-S10 | Phase 10 | Tests, QA, Déploiement |

---

## Dépendances & Prérequis

### Fournis par le client
- Logo IDEATYS (formats SVG + PNG)
- Contenus textuels (À propos, services, valeurs, équipe)
- Photos de l'équipe
- Visuels des réalisations (images, vidéos)
- Témoignages clients
- Informations légales (SIRET, adresse, etc.)
- Accès domaine DNS
- Contenus blog initiaux (au moins 2-3 articles)

### Décisions techniques à valider
- Service email : Resend vs SendGrid
- Stockage fichiers : Uploadthing vs AWS S3
- Analytics : Plausible vs Umami vs GA4
- Base de données : Neon vs Supabase (PostgreSQL)
- Newsletter : Mailchimp vs Brevo

---

*Document rédigé le 15 février 2026 – IDEATYS Digital*

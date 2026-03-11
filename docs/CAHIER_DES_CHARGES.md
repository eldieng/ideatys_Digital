# Cahier des Charges – Site Web IDEATYS Digital

**Version :** 4.0
**Type :** Développement sur mesure
**Date :** 15 février 2026
**Statut :** Validé

---

## Table des matières

1. [Identité visuelle](#1-identité-visuelle)
2. [Positionnement stratégique](#2-positionnement-stratégique)
3. [Objectifs du site](#3-objectifs-du-site)
4. [Arborescence du site](#4-arborescence-du-site)
5. [Détail des pages](#5-détail-des-pages)
6. [Fonctionnalités transversales](#6-fonctionnalités-transversales)
7. [Stack technique](#7-stack-technique)
8. [SEO & Performance](#8-seo--performance)
9. [Sécurité & RGPD](#9-sécurité--rgpd)
10. [Expérience utilisateur](#10-expérience-utilisateur)
11. [Livrables](#11-livrables)

---

## 1. Identité visuelle

### 1.1 Palette de couleurs

| Rôle | Couleur | Code HEX |
|------|---------|-----------|
| Principal (fond, titres) | Vert foncé | `#09312A` |
| Accent (boutons, hover, CTA) | Orange | `#C15A18` |
| Fond principal | Blanc | `#FFFFFF` |
| Fond secondaire | Gris clair | `#F5F5F5` |

### 1.2 Règles de design

- Le **vert foncé (#09312A)** est la couleur principale : backgrounds, titres importants, navigation
- L'**orange (#C15A18)** est la couleur d'accent : boutons principaux, hover, éléments clés, liens actifs
- Fond **majoritairement blanc** pour un rendu premium et aéré
- **Aucune couleur supplémentaire** en dehors de la charte
- Typographie moderne et lisible (Inter, Plus Jakarta Sans ou équivalent)
- Espacement généreux, design minimaliste et épuré

### 1.3 Logo

- Logo fourni par le client
- Déclinaisons : couleur, blanc, monochrome
- Formats : SVG (web), PNG (fallback)

---

## 2. Positionnement stratégique

Le site doit refléter les valeurs suivantes à travers chaque page et interaction :

- **Créativité** — Design moderne, animations subtiles, mise en page originale
- **Professionnalisme** — Structure claire, contenu soigné, performance technique
- **Impact** — Chiffres clés, résultats concrets, études de cas
- **Excellence** — Qualité de finition, attention aux détails, UX irréprochable
- **Proximité** — Ton accessible, formulaires de contact, présentation de l'équipe

---

## 3. Objectifs du site

| Objectif | KPI associé |
|----------|-------------|
| Générer des leads qualifiés | Nombre de demandes de devis/mois |
| Positionner IDEATYS comme agence experte | Trafic organique, temps passé sur site |
| Valoriser les réalisations | Pages portfolio vues, études de cas lues |
| Attirer des talents | Candidatures reçues/mois |
| Améliorer la visibilité SEO | Positionnement mots-clés cibles |

---

## 4. Arborescence du site

```
├── 🏠 Accueil
├── 🏢 À propos
├── 🛠 Services
│   ├── Stratégie digitale
│   ├── Développement web
│   ├── Community management
│   ├── Production audiovisuelle
│   ├── Design graphique
│   └── Print & impression
├── 🏆 Réalisations
├── 📰 Blog
├── 👥 Candidature
├── 📩 Contact / Devis
├── 📄 Mentions légales
└── 📄 Politique de confidentialité
```

---

## 5. Détail des pages

### 5.1 Accueil

#### Hero – Proposition de valeur

- **Titre principal :** Créativité. Professionnalisme. Impact.
- **Sous-titre :** Nous transformons vos idées en solutions digitales performantes et durables.
- **CTA principal :** Demander un devis → bouton orange `#C15A18`
- **CTA secondaire :** Découvrir nos services → bouton outline vert `#09312A`
- **Design :** Fond blanc ou dégradé subtil vert, animation d'entrée

#### Sections de la page

1. **Hero** — Proposition de valeur + CTA
2. **Aperçu services** — Grille des 6 services avec icônes, titre, description courte, lien
3. **Pourquoi nous choisir** — 4 à 6 arguments clés avec chiffres (projets réalisés, clients, années d'expérience)
4. **Réalisations** — Carrousel ou grille des 3-6 meilleures réalisations
5. **Témoignages** — Slider de témoignages clients avec nom, entreprise, photo
6. **CTA final** — Bannière d'appel à l'action vers la page contact/devis

### 5.2 À propos

| Section | Contenu |
|---------|---------|
| Introduction | Phrase d'accroche + vision de l'agence |
| Histoire | Timeline de l'évolution d'IDEATYS |
| Mission | Ce que l'agence accomplit au quotidien |
| Valeurs | Créativité, Professionnalisme, Impact, Excellence, Proximité |
| Équipe | Photos, noms, postes, courte bio, liens LinkedIn |

### 5.3 Services

**Page principale :** Vue d'ensemble des 6 services avec cards cliquables.

**6 sous-pages dédiées :**

1. Stratégie digitale
2. Développement web
3. Community management
4. Production audiovisuelle
5. Design graphique
6. Print & impression

**Structure de chaque sous-page :**

| Section | Description |
|---------|-------------|
| Hero service | Titre + description + visuel |
| Problématique | Quel problème ce service résout |
| Solution | L'approche IDEATYS |
| Processus | Étapes de travail (timeline ou steps) |
| Résultats | Exemples concrets, chiffres |
| Réalisations liées | Projets portfolio en lien avec ce service |
| CTA | Demander un devis pour ce service |

### 5.4 Réalisations

- **Portfolio dynamique** avec grille visuelle (images/vidéos)
- **Système de filtres** par catégorie de service
- **Études de cas détaillées** : contexte, brief, solution, résultats, visuels
- **Navigation** entre les projets (précédent/suivant)

### 5.5 Blog

**Catégories :**
- SEO
- Marketing digital
- Branding
- Web
- Articles expertise

**Fonctionnalités :**
- Liste des articles avec pagination
- Filtres par catégorie et tags
- Barre de recherche
- Articles avec : titre, date, auteur, temps de lecture, image, contenu riche
- Articles similaires en fin de page
- Partage social (LinkedIn, Twitter/X, Facebook)
- **Système de contenu : MDX** (fichiers locaux) pour démarrer, migration possible vers headless CMS

### 5.6 Candidature

#### Objectif
Détecter et recruter des talents pour renforcer l'équipe IDEATYS.

#### Section 1 – Introduction
> Rejoignez IDEATYS Digital et participez à des projets innovants.

Présentation de la culture d'entreprise, avantages, ambiance.

#### Section 2 – Offres d'emploi (optionnel)
Liste des postes ouverts avec description, compétences requises.

#### Section 3 – Formulaire de candidature

| Champ | Type | Obligatoire |
|-------|------|-------------|
| Nom | text | ✅ |
| Prénom | text | ✅ |
| Email | email | ✅ |
| Téléphone | tel | ✅ |
| Poste souhaité | select | ✅ |
| Niveau d'expérience | select | ✅ |
| Message de motivation | textarea | ✅ |
| CV | file upload (PDF, max 5MB) | ✅ |
| Portfolio | URL ou file upload | ❌ |

#### Fonctionnement technique
- Stockage cloud sécurisé (ex: AWS S3, Cloudinary)
- Enregistrement en base de données
- Notification email interne à l'équipe RH
- Email de confirmation automatique au candidat
- Validation côté client ET serveur

### 5.7 Contact / Devis

#### Formulaire de contact

| Champ | Type | Obligatoire |
|-------|------|-------------|
| Nom complet | text | ✅ |
| Email | email | ✅ |
| Téléphone | tel | ❌ |
| Entreprise | text | ❌ |
| Service concerné | select | ✅ |
| Budget estimé | select (tranches) | ❌ |
| Message / Description du projet | textarea | ✅ |

#### Informations complémentaires
- Adresse de l'agence + carte interactive (Google Maps ou Mapbox)
- Email de contact direct
- Numéro de téléphone
- Horaires d'ouverture
- Liens réseaux sociaux

#### Fonctionnement technique
- Envoi via API Route Next.js
- Notification email interne (Resend ou SendGrid)
- Email de confirmation automatique au client
- Protection anti-spam (honeypot + rate limiting)

### 5.8 Mentions légales

Page statique conforme à la loi française :
- Éditeur du site (raison sociale, SIRET, adresse, directeur de publication)
- Hébergeur (nom, adresse)
- Propriété intellectuelle
- Responsabilité

### 5.9 Politique de confidentialité

Page statique conforme RGPD :
- Données collectées et finalités
- Durée de conservation
- Droits des utilisateurs (accès, rectification, suppression)
- Cookies utilisés
- Contact DPO

---

## 6. Fonctionnalités transversales

### 6.1 Navigation
- Header fixe avec logo, liens principaux, CTA "Demander un devis"
- Menu hamburger responsive pour mobile
- Footer complet : navigation, services, contact, réseaux sociaux, newsletter, mentions légales

### 6.2 Newsletter
- Champ email dans le footer
- Intégration avec service d'emailing (Mailchimp, Brevo ou équivalent)
- Double opt-in conforme RGPD

### 6.3 Bandeau cookies
- Consentement RGPD avant chargement des cookies non essentiels
- Options : Accepter tout / Refuser / Personnaliser
- Sauvegarde du choix de l'utilisateur

### 6.4 Animations
- Animations d'entrée au scroll (Framer Motion)
- Transitions de page fluides
- Hover effects subtils sur les éléments interactifs
- Performance : animations GPU-accelerated uniquement

### 6.5 Page 404 personnalisée
- Design cohérent avec la charte graphique
- Message clair + CTA de retour à l'accueil
- Suggestions de pages populaires

### 6.6 Open Graph & Social Sharing
- Images OG dynamiques par page
- Meta tags Twitter Card
- Prévisualisation optimisée pour LinkedIn, Facebook, Twitter/X

### 6.7 Analytics
- Intégration analytics respectueuse RGPD (Plausible, Umami ou GA4 avec consentement)
- Suivi des conversions (formulaires soumis)
- Événements personnalisés (clics CTA, téléchargements)

---

## 7. Stack technique

### 7.1 Frontend

| Technologie | Rôle |
|-------------|------|
| **Next.js 14+** (App Router) | Framework React, SSR/SSG |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styling utilitaire |
| **Framer Motion** | Animations |
| **Lucide React** | Icônes |
| **MDX** | Contenu blog |

### 7.2 Backend / API

| Technologie | Rôle |
|-------------|------|
| **Next.js API Routes** | Endpoints serveur |
| **Resend** ou **SendGrid** | Service email transactionnel |
| **Zod** | Validation des données |
| **Uploadthing** ou **AWS S3** | Upload fichiers (CV) |

### 7.3 Infrastructure

| Technologie | Rôle |
|-------------|------|
| **Vercel** | Hébergement & CDN |
| **GitHub** | Versioning |
| **Base de données** | PostgreSQL (Neon/Supabase) pour candidatures |

### 7.4 Qualité

| Outil | Rôle |
|-------|------|
| **ESLint** | Linting |
| **Prettier** | Formatage |
| **Lighthouse** | Audits performance |

---

## 8. SEO & Performance

### 8.1 SEO

- **Balises meta dynamiques** par page (title, description, canonical)
- **Open Graph** et Twitter Card par page
- **Sitemap XML** généré automatiquement
- **Schema.org** : Organization, LocalBusiness, Service, Article, BreadcrumbList
- **URLs propres** et sémantiques (`/services/developpement-web`)
- **Balises Hn** structurées correctement
- **Alt text** sur toutes les images
- **Fil d'Ariane** (breadcrumbs) sur les pages internes
- **Blog optimisé** : mots-clés, maillage interne, meta par article

### 8.2 Performance

| Métrique | Objectif |
|----------|----------|
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.0s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 2.0s |
| Score Lighthouse Performance | > 90 |

**Moyens :**
- Next.js Image optimization (WebP/AVIF automatique)
- Lazy loading des images et composants
- Code splitting automatique
- Prefetch des liens
- Minification CSS/JS
- Cache CDN via Vercel

---

## 9. Sécurité & RGPD

### 9.1 Sécurité

- **HTTPS** obligatoire
- **Headers de sécurité** : CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Rate limiting** sur les API routes (formulaires)
- **Honeypot** anti-spam sur les formulaires
- **Validation** côté client (UX) ET serveur (sécurité) avec Zod
- **Sanitization** des inputs utilisateur
- **Protection CSRF** sur les formulaires

### 9.2 RGPD

- Bandeau cookies avec consentement explicite
- Politique de confidentialité détaillée
- Mentions légales conformes
- Formulaires avec case de consentement
- Droit d'accès, de rectification et de suppression des données
- Durée de conservation définie pour chaque type de donnée
- Pas de transfert de données hors UE sans garanties

---

## 10. Expérience utilisateur

### 10.1 Principes UX

- **Rapide** : chargement < 2 secondes
- **Responsive** : mobile-first, adapté tablette et desktop
- **Minimaliste** : pas de surcharge visuelle, hiérarchie claire
- **Moderne** : tendances actuelles du web design
- **Premium** : finition soignée, micro-interactions, typographie de qualité

### 10.2 Accessibilité (WCAG 2.1 AA)

- Contraste suffisant texte/fond
- Navigation au clavier
- Attributs ARIA appropriés
- Focus visible sur les éléments interactifs
- Textes alternatifs sur les médias
- Taille de police minimum lisible (16px base)

### 10.3 Breakpoints responsive

| Device | Breakpoint |
|--------|------------|
| Mobile | < 640px |
| Tablette | 640px – 1024px |
| Desktop | 1024px – 1280px |
| Large Desktop | > 1280px |

---

## 11. Livrables

- Code source complet (repository GitHub)
- Site déployé sur Vercel
- Documentation technique
- Guide de contenu (comment ajouter des articles blog, projets portfolio)
- Fichiers de design (si applicable)
- Accès admin et credentials

---

*Document rédigé le 15 février 2026 – IDEATYS Digital*

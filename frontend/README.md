# AISSIA SÉCURITÉ - Site Vitrine Frontend

Site vitrine professionnel et haut de gamme pour l'entreprise AISSIA SÉCURITÉ, développé avec Next.js et Tailwind CSS.

## 🚀 Stack Technique

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Déploiement**: Vercel (recommandé)

## 📋 Fonctionnalités

### Pages
- ✅ Accueil (Hero, Services, Formations, Stats, CTA)
- ✅ Qui sommes-nous (Vision, Valeurs, Expertise)
- ✅ Services (6 services détaillés)
- ✅ Produits (Équipements et matériels)
- ✅ Formations (Programme complet, Modules, Critères d'admission)
- ✅ Actualités (Liste et détails)
- ✅ Contact (Formulaire + Informations)

### Fonctionnalités Techniques
- ✅ Multilingue (Français / Anglais)
- ✅ Responsive Design (Mobile, Tablette, Desktop)
- ✅ SEO Optimisé (Métadonnées, Sitemap, Robots.txt)
- ✅ Composants Réutilisables
- ✅ Architecture Professionnelle
- ✅ Intégration API Backend Laravel

## 🏗️ Architecture du Projet

```
frontend/
├── app/
│   ├── [locale]/              # Routes multilingues
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── about/             # Qui sommes-nous
│   │   ├── services/          # Services
│   │   ├── products/          # Produits
│   │   ├── training/          # Formations
│   │   ├── news/              # Actualités
│   │   └── contact/           # Contact
│   ├── layout.tsx             # Layout racine
│   ├── sitemap.ts             # Sitemap SEO
│   └── robots.ts              # Robots.txt
├── components/
│   ├── layout/                # Header, Footer
│   ├── sections/              # Hero, PageHeader
│   └── ui/                    # Button, Card, Input, etc.
├── lib/
│   ├── api.ts                 # Client API
│   ├── i18n.ts                # Configuration i18n
│   ├── translations.ts        # Traductions FR/EN
│   ├── metadata.ts            # Métadonnées SEO
│   └── hooks/
│       └── useTranslation.ts  # Hook de traduction
└── public/                    # Assets statiques
```

## 🛠️ Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs
```

## 🚀 Développement

```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

Le site sera accessible sur `http://localhost:3000/fr` (français) ou `http://localhost:3000/en` (anglais).

## 🏭 Production

```bash
# Build de production
npm run build

# Lancer en production
npm start
```

## 🌐 Configuration API Backend

Éditer le fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Remplacer par l'URL de votre API Laravel backend en production.

## 🎨 Design System

### Palette de Couleurs
- **Primary**: `#1a365d` (Bleu marine profond)
- **Primary Dark**: `#0f2847`
- **Primary Light**: `#2d4a7c`
- **Secondary**: `#b8860b` (Or sobre)
- **Secondary Dark**: `#8b6508`

### Typographie
- Font système optimisée pour la lisibilité
- Hiérarchie claire (h1-h6)
- Tailles responsives

### Composants UI
- **Button**: 4 variantes (primary, secondary, outline, ghost)
- **Card**: Avec hover effects
- **Input/Textarea**: Validation et erreurs
- **Container**: Responsive widths

## 🌍 Internationalisation

Le site supporte le français et l'anglais. Les traductions se trouvent dans `lib/translations.ts`.

### Ajouter une nouvelle traduction

```typescript
// Dans lib/translations.ts
export const translations = {
  fr: {
    // ... traductions françaises
    newKey: 'Nouvelle traduction',
  },
  en: {
    // ... traductions anglaises
    newKey: 'New translation',
  },
};
```

## 📱 Pages Spécifiques

### Page Formations
Caractéristiques importantes :
- Durée : 2 à 5 semaines
- Examen final éliminatoire
- Critères d'admission détaillés :
  - Taille minimale : 1,72 m
  - Savoir lire et écrire
  - Casier judiciaire vierge
  - Enquête DST validée
  - Dossier administratif complet
  - Certificat médical

### Page Contact
- Formulaire complet avec validation
- Intégration API backend
- Messages de succès/erreur
- Informations de contact

## 🔍 SEO

- Métadonnées dynamiques par page
- Sitemap.xml automatique
- Robots.txt configuré
- Open Graph tags
- Twitter Cards
- URLs propres et SEO-friendly

## 📊 Performance

- Optimisation des images
- Code splitting automatique
- Lazy loading
- Caching optimisé
- Bundle size minimal

## 🚢 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Autres plateformes
Le site peut être déployé sur n'importe quelle plateforme supportant Next.js :
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Docker

## 🔐 Sécurité

- Validation des formulaires côté client et serveur
- Protection CSRF
- Headers de sécurité configurés
- Pas de données sensibles en frontend

## 📞 Support

Pour toute question ou problème :
- Email : contact@aissia-securite.com
- Documentation : [Ce fichier]

## 📝 License

Propriétaire - AISSIA SÉCURITÉ © 2026

---

**Note**: Ce projet est le frontend uniquement. Le backend Laravel doit être configuré séparément.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

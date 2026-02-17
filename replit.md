# MyJantes - Application Mobile

## Overview
Application mobile Expo React Native pour MyJantes, un service professionnel de rénovation et personnalisation de jantes automobiles. L'app permet aux particuliers et professionnels de demander des devis gratuits en ligne.

## Architecture
- **Frontend**: Expo React Native (Expo Router, file-based routing)
- **Backend**: API externe hébergée sur `appmyjantes.mytoolsgroup.eu`
- **Auth**: Sessions avec cookies (stockés via expo-secure-store / AsyncStorage)
- **State**: React Query pour les données serveur, React Context pour l'auth

## API Backend
Base URL: `https://appmyjantes.mytoolsgroup.eu`

### Endpoints principaux
- `POST /api/register` - Inscription (email, password, firstName, lastName, role, etc.)
- `POST /api/login` - Connexion (email, password) → retourne user + cookie session
- `POST /api/logout` - Déconnexion
- `GET /api/auth/user` - Profil utilisateur authentifié
- `GET /api/services` - Liste des services (auth requise)
- `GET /api/quotes` - Liste des devis de l'utilisateur (auth requise)
- `POST /api/quotes` - Créer une demande de devis
- `POST /api/upload` - Upload de fichiers (multipart/form-data, field "media")
- `POST /api/support/contact` - Formulaire de contact
- `POST /api/ocr/scan` - OCR pour scanner des documents

### Roles utilisateur
- `client` - Particulier
- `client_professionnel` - Professionnel (+ infos société)

## Structure du projet
```
app/
  _layout.tsx           # Root layout (providers, fonts)
  index.tsx             # Redirect basé sur auth
  (auth)/               # Flux d'authentification
    _layout.tsx
    login.tsx
    register.tsx
  (main)/               # App principale (authentifié)
    _layout.tsx
    (tabs)/
      _layout.tsx       # Tab navigation
      index.tsx         # Accueil + liste services
      quotes.tsx        # Historique des devis
      profile.tsx       # Profil utilisateur
      more.tsx          # Mentions légales, contact, etc.
    new-quote.tsx       # Formulaire nouveau devis
  support.tsx           # Formulaire de support (formSheet)
  legal.tsx             # Mentions légales
  privacy.tsx           # Politique de confidentialité
components/
  FloatingSupport.tsx   # Bouton flottant support
  ErrorBoundary.tsx     # Error boundary
lib/
  api.ts                # Client API
  auth-context.tsx      # Context d'authentification
  query-client.ts       # React Query config
```

## User Preferences
- Language: Français
- Interface entièrement en français
- Design professionnel automobile (bleu primaire)
- Font: Inter (Google Fonts)

## Recent Changes
- Feb 2026: Initial build of MyJantes mobile app

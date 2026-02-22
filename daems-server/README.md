# Daems Tracker - Serveur Vercel

## Installation en 5 etapes

### 1. Creer le repo GitHub
- Allez sur github.com -> "New repository"
- Nommez-le `daems-tracker-server`
- Uploadez tous les fichiers de ce dossier

### 2. Configurer l'app Twitch
- Allez sur https://dev.twitch.tv/console/apps
- Editez votre app existante
- Ajoutez cette URL de redirection : `https://VOTRE-APP.vercel.app/api/callback`
  (vous connaitrez l'URL apres l'etape 3)

### 3. Deployer sur Vercel
- Allez sur vercel.com -> "Add New Project"
- Importez votre repo GitHub `daems-tracker-server`
- Cliquez "Deploy"
- Notez votre URL (ex: `daems-tracker-server.vercel.app`)

### 4. Ajouter les variables d'environnement sur Vercel
Dans Vercel -> Settings -> Environment Variables, ajoutez :
- `TWITCH_CLIENT_ID` = votre Client ID Twitch
- `TWITCH_CLIENT_SECRET` = votre Client Secret Twitch

Pour trouver le Client Secret : dev.twitch.tv -> votre app -> "New Secret"

### 5. Activer Vercel KV (base de donnees)
- Dans Vercel -> votre projet -> "Storage" -> "Create KV Database"
- Nommez-la `daems-kv`
- Cliquez "Connect" -> elle se connecte automatiquement

### 6. Mettre a jour l'extension
Dans `background.js` de l'extension, ligne 3 :
```js
const SERVER_URL = 'https://daems-tracker-server.vercel.app';
```

Rechargez l'extension et c'est pret !

## Avantages
- Une seule URL de redirection pour tout le monde
- Gold sauvegarde en base de donnees (pas local)
- Mises a jour du serveur sans redistribuer l'extension

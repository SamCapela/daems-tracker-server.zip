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

---

## Setup Soundboard OBS

### 1. Ajouter les fichiers MP3
Deposer les 7 fichiers MP3 dans `public/sounds/` avant de deployer :
- `pet.mp3`
- `pig.mp3`
- `coq.mp3`
- `first_blood.mp3`
- `gg.mp3`
- `screamer.mp3`
- `thank_you.mp3`

Ces fichiers seront accessibles via `https://VOTRE-APP.vercel.app/sounds/nom.mp3`

### 2. Ajouter la Browser Source dans OBS
- Dans OBS : Sources -> + -> Browser Source
- URL : `https://VOTRE-APP.vercel.app/api/soundboard`
- Width : 400 / Height : 200
- Cocher "Shutdown source when not visible" : NON (doit tourner en permanence)
- Cocher "Refresh browser when scene becomes active" : NON

La page poll automatiquement `/api/sound?next=1` toutes les 2 secondes.
Quand un viewer joue un son, l'audio est joue directement par OBS via l'API Web Audio.
Un toast s'affiche brievement avec le nom du son et le pseudo du viewer.

### 3. Capture audio OBS
Pour que le son soit entendu sur le stream :
- Dans les proprietes de la Browser Source -> cocher "Control audio via OBS"
- Ou ajouter un filtre "Compresseur" si le volume est trop fort

### Cooldown
Le cooldown de 1h est verifie **cote serveur** (cle Redis globale `sound-global-last`).
Meme si un utilisateur contourne l'extension, le serveur bloque les requetes trop rapprochees.

---

## Avantages
- Une seule URL de redirection pour tout le monde
- Gold sauvegarde en base de donnees (pas local)
- Mises a jour du serveur sans redistribuer l'extension
- Soundboard 100% dans le navigateur OBS, pas de script Python

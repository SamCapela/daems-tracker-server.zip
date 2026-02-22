// api/login.js
// Redirige l'utilisateur vers Twitch pour la connexion OAuth

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const REDIRECT_URI = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL + '/api/callback'
  : 'http://localhost:3000/api/callback';

export default function handler(req, res) {
  const { ext_id } = req.query;

  if (!ext_id) {
    return res.status(400).json({ error: 'ext_id manquant' });
  }

  const authUrl = 'https://id.twitch.tv/oauth2/authorize'
    + '?client_id=' + CLIENT_ID
    + '&redirect_uri=' + encodeURIComponent(REDIRECT_URI)
    + '&response_type=code'
    + '&scope=' + encodeURIComponent('user:read:email')
    + '&state=' + encodeURIComponent(ext_id);

  res.redirect(authUrl);
}

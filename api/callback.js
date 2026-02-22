// api/callback.js
// Recoit le code Twitch, echange contre un token, redirige vers l'extension

import { kv } from '@vercel/kv';

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const REDIRECT_URI = process.env.VERCEL_URL
  ? 'https://' + process.env.VERCEL_URL + '/api/callback'
  : 'http://localhost:3000/api/callback';

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).send('Paramètres manquants');
  }

  try {
    // Echanger le code contre un token
    const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI
      })
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) throw new Error('Token invalide');

    // Recuperer les infos utilisateur
    const userRes = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': 'Bearer ' + tokenData.access_token
      }
    });
    const userData = await userRes.json();
    const user = userData.data[0];

    // Creer un session token simple
    const sessionToken = Math.random().toString(36).slice(2) + Date.now().toString(36);

    // Sauvegarder en KV
    await kv.set('session:' + sessionToken, JSON.stringify({
      twitchToken: tokenData.access_token,
      userId: user.id,
      login: user.login,
      displayName: user.display_name,
      profileImage: user.profile_image_url
    }), { ex: 60 * 60 * 24 * 30 }); // 30 jours

    // Initialiser le gold si nouveau joueur
    var existing = await kv.get('gold:' + user.id);
    if (existing === null) {
      await kv.set('gold:' + user.id, '0');
    }

    // Rediriger vers une page qui communique avec l'extension
    res.redirect('/api/success?token=' + sessionToken + '&login=' + encodeURIComponent(user.display_name));

  } catch (err) {
    console.error('Callback error:', err);
    res.status(500).send('Erreur lors de la connexion : ' + err.message);
  }
}

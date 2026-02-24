// api/me.js
// Retourne les infos de l'utilisateur connecté + statut abonné Twitch

import { Redis } from '@upstash/redis';
const kv = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

const CLIENT_ID  = process.env.TWITCH_CLIENT_ID;
const STREAMER_ID = process.env.DAEMS_USER_ID; // ID numérique Twitch de daems_ (variable Vercel)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  var token = req.query.token;
  if (!token) return res.status(400).json({ error: 'Token manquant' });

  var data = await kv.get('session:' + token);
  if (!data) return res.status(401).json({ error: 'Session invalide' });

  var session = typeof data === 'string' ? JSON.parse(data) : data;

  // Vérification abonnement (mis en cache 10 min)
  var isSub = false;
  var subCacheKey = 'sub:' + session.userId;
  var subCached = await kv.get(subCacheKey);

  if (subCached !== null) {
    isSub = subCached === 'true';
  } else if (session.twitchToken && STREAMER_ID) {
    try {
      var subRes = await fetch(
        'https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=' + STREAMER_ID + '&user_id=' + session.userId,
        { headers: { 'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + session.twitchToken } }
      );
      var subData = await subRes.json();
      isSub = !!(subData.data && subData.data.length > 0);
      await kv.set(subCacheKey, isSub ? 'true' : 'false', { ex: 600 });
    } catch (e) {
      console.error('Sub check failed:', e);
    }
  }

  res.json({
    login: session.login,
    displayName: session.displayName,
    profileImage: session.profileImage,
    isSub
  });
}

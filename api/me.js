// api/me.js
// Retourne les infos de l'utilisateur connecte

import { Redis } from '@upstash/redis';
const kv = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  var token = req.query.token;
  if (!token) return res.status(400).json({ error: 'Token manquant' });

  var data = await kv.get('session:' + token);
  if (!data) return res.status(401).json({ error: 'Session invalide' });

  var session = typeof data === 'string' ? JSON.parse(data) : data;
  var gold = await kv.get('gold:' + session.userId);

  res.json({
    login: session.login,
    displayName: session.displayName,
    profileImage: session.profileImage,
    gold: parseInt(gold || '0')
  });
}

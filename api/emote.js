// api/emote.js
// POST /api/emote — reçoit une émote envoyée par un viewer et la publie dans le mur

import { Redis } from '@upstash/redis';
const kv = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

const VALID_EMOTES = ['heart', 'poop', 'GG', 'SLT', 'CAT', 'DaemPeepoFire', 'noob', 'BYE'];

async function getSession(token) {
  if (!token) return null;
  var data = await kv.get('session:' + token);
  if (!data) return null;
  return typeof data === 'string' ? JSON.parse(data) : data;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non supportée' });

  var token   = req.body && req.body.token;
  var emoteId = req.body && req.body.emote;

  if (!emoteId || !VALID_EMOTES.includes(emoteId)) {
    return res.status(400).json({ error: 'Émote invalide' });
  }

  var login = 'Anonyme';
  if (token) {
    var session = await getSession(token);
    if (session) login = session.displayName || session.login;
  }

  var event = JSON.stringify({ emote: emoteId, login, ts: Date.now() });
  await kv.lpush('emote-wall', event);
  await kv.ltrim('emote-wall', 0, 99);

  return res.json({ ok: true });
}

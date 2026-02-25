// api/sound.js
// POST /api/sound        — un viewer demande à jouer un son (cooldown global 1h vérifié côté serveur)
// GET  /api/sound?next=1 — OBS poll : retourne et supprime le prochain son en attente

import { Redis } from '@upstash/redis';
const kv = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

const VALID_SOUNDS = ['pet', 'pig', 'coq', 'first_blood', 'gg', 'screamer', 'thank_you'];
const SOUND_COOLDOWN_MS = 5 * 1000; // 5s (TEST) — remettre 3600 * 1000 en prod

async function getSession(token) {
  if (!token) return null;
  var data = await kv.get('session:' + token);
  if (!data) return null;
  return typeof data === 'string' ? JSON.parse(data) : data;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET ?next=1 — OBS polling ──────────────────────────────────────────────
  if (req.method === 'GET') {
    if (req.query.next !== '1') return res.status(400).json({ error: 'Paramètre manquant' });

    var item = await kv.rpop('sound-queue');
    if (!item) return res.json({ sound: null });

    var event = typeof item === 'string' ? JSON.parse(item) : item;
    return res.json({ sound: event.sound, login: event.login, ts: event.ts });
  }

  // ── POST — viewer envoie un son ────────────────────────────────────────────
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non supportée' });

  var token   = req.body && req.body.token;
  var soundId = req.body && req.body.sound;

  if (!soundId || !VALID_SOUNDS.includes(soundId)) {
    return res.status(400).json({ error: 'Son invalide' });
  }

  // Vérification cooldown GLOBAL côté serveur (clé partagée, pas par user)
  var lastTs = await kv.get('sound-global-last');
  var now = Date.now();
  if (lastTs && (now - parseInt(lastTs)) < SOUND_COOLDOWN_MS) {
    var remainingSec = Math.ceil((SOUND_COOLDOWN_MS - (now - parseInt(lastTs))) / 1000);
    return res.status(429).json({ ok: false, reason: 'cooldown', remainingSec });
  }

  var login = 'Anonyme';
  if (token) {
    var session = await getSession(token);
    if (session) login = session.displayName || session.login;
  }

  // Enregistrer le timestamp global et mettre le son dans la queue
  await kv.set('sound-global-last', String(now));
  var event = JSON.stringify({ sound: soundId, login, ts: now });
  await kv.lpush('sound-queue', event);
  await kv.ltrim('sound-queue', 0, 9); // max 10 sons en attente

  return res.json({ ok: true });
}

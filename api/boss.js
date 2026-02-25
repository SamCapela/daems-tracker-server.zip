// api/boss.js
// Gestion du boss communautaire — HP partagés entre tous les viewers

import { Redis } from '@upstash/redis';
const kv = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

const BOSS_MAX_HP      = 10000;  // HP total du boss
const MAX_HITS_PER_SEC = 20;     // Anti-cheat : max 20 hits/s par user

async function getSession(token) {
  if (!token) return null;
  var data = await kv.get('session:' + token);
  if (!data) return null;
  return typeof data === 'string' ? JSON.parse(data) : data;
}

async function getBossState() {
  var state = await kv.get('boss:state');
  if (!state) {
    state = { hp: BOSS_MAX_HP, maxHp: BOSS_MAX_HP, dead: false, participants: [] };
  } else if (typeof state === 'string') {
    state = JSON.parse(state);
  }
  // S'assurer que maxHp est toujours défini
  if (!state.maxHp) state.maxHp = BOSS_MAX_HP;
  return state;
}

async function saveBossState(state) {
  await kv.set('boss:state', JSON.stringify(state));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET /api/boss — état actuel du boss ──────────────────────────────────
  if (req.method === 'GET') {
    var state = await getBossState();
    return res.json(state);
  }

  // ── POST /api/boss — frapper le boss ─────────────────────────────────────
  if (req.method === 'POST') {
    var token = req.body && req.body.token;
    var hits  = parseInt(req.body && req.body.hits) || 1;

    if (!token) return res.status(401).json({ error: 'Non connecté' });

    var session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    var userId = session.userId;
    var login  = session.displayName || session.login;

    // Anti-cheat : rate limit par user (max MAX_HITS_PER_SEC par seconde)
    var rateLimitKey = 'boss:ratelimit:' + userId;
    var currentRate  = await kv.get(rateLimitKey);
    var alreadyHit   = currentRate ? parseInt(currentRate) : 0;
    var validHits    = Math.min(hits, Math.max(0, MAX_HITS_PER_SEC - alreadyHit));

    if (validHits <= 0) {
      var state = await getBossState();
      return res.json({ ok: true, blocked: true, state });
    }

    // Incrémenter le rate limit (expire après 1 seconde)
    await kv.incrby(rateLimitKey, validHits);
    await kv.expire(rateLimitKey, 1);

    // Récupérer et modifier l'état du boss (avec retry simple)
    var state = await getBossState();

    if (state.dead) {
      return res.json({ ok: true, state, alreadyDead: true });
    }

    var oldHp = state.hp;
    state.hp  = Math.max(0, state.hp - validHits);

    // Ajouter ce user aux participants s'il n'y est pas déjà
    if (!state.participants) state.participants = [];
    if (!state.participants.includes(userId)) {
      state.participants.push(userId);
    }

    var justDied = oldHp > 0 && state.hp === 0;

    // Boss mort → récompenser tous les participants
    if (justDied) {
      state.dead = true;
      state.killedAt = Date.now();
      state.killedBy = login;

      // Ajouter 1 daembox à chaque participant
      for (var participantId of state.participants) {
        var userKey  = 'user:' + participantId;
        var userData = await kv.get(userKey);
        if (userData) {
          var user = typeof userData === 'string' ? JSON.parse(userData) : userData;
          user.daemboxes = (user.daemboxes || 0) + 1;
          await kv.set(userKey, JSON.stringify(user));
        }
      }

      // Planifier le respawn du boss dans 60 secondes
      await kv.set('boss:respawn', Date.now() + 60000);
    }

    await saveBossState(state);
    return res.json({ ok: true, state, validHits, justDied });
  }

  // ── POST /api/boss?action=respawn — respawn admin ─────────────────────────
  if (req.method === 'DELETE') {
    var newState = { hp: BOSS_MAX_HP, maxHp: BOSS_MAX_HP, dead: false, participants: [] };
    await saveBossState(newState);
    return res.json({ ok: true, state: newState });
  }

  return res.status(405).json({ error: 'Méthode non supportée' });
}

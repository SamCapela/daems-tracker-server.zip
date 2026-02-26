// api/dev.js — Route de développement (à retirer en production !)
// Usage :
//   POST /api/dev?action=give_levels  { token, levels: 5 }
//   POST /api/dev?action=give_gold    { token, gold: 500 }
//   POST /api/dev?action=reset        { token }
//   POST /api/dev?action=give_item    { token, itemId: 'dragon_weapon' }
//   GET  /api/dev?action=me&token=... → voir ton joueur brut

import { Redis } from '@upstash/redis';
import {
  computePlayerStats, rollSpellsForLevelUp, expForLevel, getItemById
} from './gamedata.js';

const kv = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

async function getSession(token) {
  if (!token) return null;
  const data = await kv.get('session:' + token);
  if (!data) return null;
  return typeof data === 'string' ? JSON.parse(data) : data;
}

async function getPlayer(userId) {
  const data = await kv.get('player:' + userId);
  if (!data) return null;
  return typeof data === 'string' ? JSON.parse(data) : data;
}

async function savePlayer(userId, p) {
  await kv.set('player:' + userId, JSON.stringify(p));
}

function refreshMaxHp(player) {
  const stats = computePlayerStats(player);
  player.maxHp = stats.hp;
  player.hp = Math.max(0, Math.min(player.hp || stats.hp, player.maxHp));
  return player;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action || '';
  const token  = req.query.token || (req.body && req.body.token);

  if (!token) return res.status(401).json({ error: 'Token manquant' });

  const session = await getSession(token);
  if (!session) return res.status(401).json({ error: 'Session invalide' });

  const userId = session.userId;
  let player   = await getPlayer(userId);
  if (!player) return res.status(404).json({ error: 'Joueur introuvable' });

  // ── GET me ──────────────────────────────────────────────────────────────────
  if (action === 'me') {
    const stats = computePlayerStats(player);
    return res.json({ player, stats });
  }

  // ── give_levels ──────────────────────────────────────────────────────────────
  if (action === 'give_levels') {
    const levels = Math.max(1, Math.min(20, parseInt(req.body?.levels || req.query.levels || 1)));
    const spellsOfferedAll = [];

    for (let i = 0; i < levels; i++) {
      player.level = (player.level || 1) + 1;
      player.exp   = 0;

      // Proposer 3 sorts à choisir (on les ajoute tous en pending)
      if (!player.pendingSpellChoice || !player.pendingSpellChoice.spells?.length) {
        const knownIds = (player.spells || []).map(s => s.spellId);
        const offered  = rollSpellsForLevelUp(knownIds);
        player.pendingSpellChoice = { spells: offered.map(s => s.id) };
        spellsOfferedAll.push(player.pendingSpellChoice.spells);
      }
    }

    refreshMaxHp(player);
    player.hp = player.maxHp; // Full HP on level up dev
    await savePlayer(userId, player);

    return res.json({
      ok: true,
      message: `+${levels} niveau(x). Tu es maintenant niveau ${player.level}.`,
      newLevel: player.level,
      pendingChoice: player.pendingSpellChoice,
      player,
    });
  }

  // ── give_gold ────────────────────────────────────────────────────────────────
  if (action === 'give_gold') {
    const gold = Math.max(1, Math.min(100000, parseInt(req.body?.gold || req.query.gold || 500)));
    player.gold = (player.gold || 0) + gold;
    await savePlayer(userId, player);
    return res.json({ ok: true, message: `+${gold} gold. Total: ${player.gold}`, gold: player.gold });
  }

  // ── give_item ────────────────────────────────────────────────────────────────
  if (action === 'give_item') {
    const itemId = req.body?.itemId || req.query.itemId;
    const item   = getItemById(itemId);
    if (!item) return res.status(400).json({ error: `Item "${itemId}" introuvable` });

    if (!player.inventory) player.inventory = [];
    const ex = player.inventory.find(i => i.itemId === itemId);
    if (ex) ex.qty = (ex.qty || 1) + 1;
    else player.inventory.push({ itemId, qty: 1 });

    await savePlayer(userId, player);
    return res.json({ ok: true, message: `${item.emoji} ${item.name} ajouté à l'inventaire`, item });
  }

  // ── heal ─────────────────────────────────────────────────────────────────────
  if (action === 'heal') {
    refreshMaxHp(player);
    player.hp     = player.maxHp;
    player.dead   = false;
    player.deadUntil = null;
    await savePlayer(userId, player);
    return res.json({ ok: true, message: `PV restaurés (${player.hp}/${player.maxHp})` });
  }

  // ── reset ─────────────────────────────────────────────────────────────────────
  if (action === 'reset') {
    const fresh = {
      userId,
      level: 1, exp: 0, gold: 0,
      hp: 50, maxHp: 50,
      dead: false, deadUntil: null,
      equippedItems: { head: null, chest: null, boots: null, weapon: null },
      inventory: [],
      spells: [{ spellId: 'base_attack', level: 1 }],
      equippedSpells: ['base_attack', null, null, null],
      pendingSpellChoice: null,
    };
    await savePlayer(userId, fresh);
    return res.json({ ok: true, message: 'Joueur réinitialisé', player: fresh });
  }

  return res.status(400).json({ error: `Action inconnue: ${action}`, availableActions: ['me', 'give_levels', 'give_gold', 'give_item', 'heal', 'reset'] });
}

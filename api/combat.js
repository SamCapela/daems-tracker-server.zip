// api/combat.js
// Système de combat RPG — monstre partagé, sorts, stats joueur
// Remplace l'ancien boss.js (clicker) par un vrai système de combat tour-par-tour côté serveur

import { Redis } from '@upstash/redis';
import { MONSTERS, ITEMS, SPELLS, getItemById, getSpellById, computePlayerStats, computeSpellDamage, computeCooldown, rollItemForPlayer, rollSpellsForLevelUp } from './gamedata.js';

const kv = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

// ── HELPERS ──────────────────────────────────────────────────────────────────

async function getSession(token) {
  if (!token) return null;
  const data = await kv.get('session:' + token);
  if (!data) return null;
  return typeof data === 'string' ? JSON.parse(data) : data;
}

async function getPlayerData(userId) {
  const data = await kv.get('player:' + userId);
  if (!data) {
    // Nouveau joueur — données par défaut
    return {
      userId,
      level: 1,
      exp: 0,
      gold: 0,
      equippedItems: { head: null, chest: null, boots: null, weapon: null },
      inventory: [],         // { itemId, qty }
      spells: [],            // { spellId, level }
      equippedSpells: [],    // [spellId, spellId, spellId, ultimateSpellId] — 4 slots
      pendingSpellChoice: null, // { spells: [] } — au level up
    };
  }
  return typeof data === 'string' ? JSON.parse(data) : data;
}

async function savePlayerData(userId, data) {
  await kv.set('player:' + userId, JSON.stringify(data));
}

async function getCombatState() {
  const state = await kv.get('combat:state');
  if (!state) return createNewCombat();
  const parsed = typeof state === 'string' ? JSON.parse(state) : state;
  // Vérifier si le monstre est mort et doit respawn
  if (parsed.dead && Date.now() >= parsed.respawnAt) {
    return createNewCombat();
  }
  return parsed;
}

function createNewCombat() {
  // Sélectionner un monstre aléatoire parmi ceux disponibles
  const monster = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
  return {
    monsterId: monster.id,
    monsterName: monster.name,
    monsterEmoji: monster.emoji,
    monsterLevel: monster.level,
    hp: monster.hp,
    maxHp: monster.maxHp,
    dead: false,
    participants: [],
    lastDmg: [],      // derniers dégâts pour l'affichage
    killedAt: null,
    killedBy: null,
    respawnAt: null,
  };
}

async function saveCombatState(state) {
  await kv.set('combat:state', JSON.stringify(state));
}

function expForLevel(level) {
  return 40 + level * 20;
}

// ── HANDLER PRINCIPAL ─────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action || (req.body && req.body.action) || '';

  // ══════════════════════════════════════════════════════════════════════════
  // GET /api/combat — état du combat + état joueur
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'GET') {
    const token = req.query.token;
    const combat = await getCombatState();

    let playerData = null;
    if (token) {
      const session = await getSession(token);
      if (session) playerData = await getPlayerData(session.userId);
    }

    return res.json({ combat, player: playerData });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=cast — utiliser un sort sur le monstre
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'cast') {
    const { token, spellId } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const userId = session.userId;
    const login  = session.displayName || session.login;

    const combat = await getCombatState();
    if (combat.dead) return res.json({ ok: false, error: 'Le monstre est mort, attends le respawn' });

    const player = await getPlayerData(userId);
    const spell  = getSpellById(spellId);
    if (!spell) return res.status(400).json({ error: 'Sort invalide' });

    // Vérifier que le joueur possède ce sort
    const playerSpell = player.spells.find(s => s.spellId === spellId);
    if (!playerSpell) return res.status(400).json({ error: 'Tu ne possèdes pas ce sort' });

    // Anti-cheat cooldown côté serveur
    const cdKey = `cd:${userId}:${spellId}`;
    const lastUsed = await kv.get(cdKey);
    const stats = computePlayerStats(player);
    const cd = computeCooldown(spell, playerSpell.level, stats);
    if (lastUsed && Date.now() - parseInt(lastUsed) < cd) {
      return res.json({ ok: false, error: 'Cooldown actif', remainingMs: cd - (Date.now() - parseInt(lastUsed)) });
    }

    // Enregistrer le timestamp d'utilisation
    await kv.set(cdKey, String(Date.now()), { ex: Math.ceil(cd / 1000) + 5 });

    // Calculer les dégâts
    let damage = 0;
    let heal   = 0;
    let effect = '';

    if (spell.type === 'damage') {
      damage = computeSpellDamage(spell, playerSpell.level, stats);
      // Chance de critique (dextérité)
      const critChance = Math.min(0.5, (stats.dexterite - 1) * 0.04);
      const isCrit = Math.random() < critChance;
      if (isCrit) { damage = Math.floor(damage * 1.8); effect = 'CRITIQUE'; }
    } else if (spell.type === 'heal') {
      heal = computeSpellDamage(spell, playerSpell.level, stats);
      effect = `+${heal} PV`;
    } else {
      effect = spell.effects[Math.min(playerSpell.level - 1, spell.effects.length - 1)] || 'Effet activé';
    }

    // Appliquer au monstre
    const oldHp = combat.hp;
    combat.hp = Math.max(0, combat.hp - damage);

    // Enregistrer dans participants
    if (!combat.participants.includes(userId)) combat.participants.push(userId);

    // Log dégâts pour affichage
    if (!combat.lastDmg) combat.lastDmg = [];
    combat.lastDmg.unshift({ login, spell: spell.name, damage, heal, effect, ts: Date.now() });
    if (combat.lastDmg.length > 10) combat.lastDmg = combat.lastDmg.slice(0, 10);

    let justDied = false;
    let rewards = null;

    if (oldHp > 0 && combat.hp === 0) {
      // Monstre mort !
      justDied = true;
      combat.dead = true;
      combat.killedAt = Date.now();
      combat.killedBy = login;

      const monster = MONSTERS.find(m => m.id === combat.monsterId) || MONSTERS[0];
      const respawnSeconds = monster.respawn || 60;
      combat.respawnAt = Date.now() + respawnSeconds * 1000;

      // Récompenser tous les participants
      for (const participantId of combat.participants) {
        const p = await getPlayerData(participantId);
        const monsterData = MONSTERS.find(m => m.id === combat.monsterId) || MONSTERS[0];

        // XP
        const xpGain = monsterData.reward.xp;
        p.exp = (p.exp || 0) + xpGain;

        // Gold
        const goldGain = Math.floor(monsterData.reward.gold.min + Math.random() * (monsterData.reward.gold.max - monsterData.reward.gold.min));
        p.gold = (p.gold || 0) + goldGain;

        // Level up
        let leveledUp = false;
        let spellsOffered = null;
        const expNeeded = expForLevel(p.level || 1);
        if (p.exp >= expNeeded && (!p.pendingSpellChoice || !p.pendingSpellChoice.spells.length)) {
          p.exp -= expNeeded;
          p.level = (p.level || 1) + 1;
          leveledUp = true;

          // Proposer 3 sorts au choix
          const knownIds = (p.spells || []).map(s => s.spellId);
          spellsOffered = rollSpellsForLevelUp(knownIds);
          p.pendingSpellChoice = { spells: spellsOffered.map(s => s.id) };
        }

        // Coffre (chance selon monstre)
        let itemWon = null;
        if (Math.random() < monsterData.reward.chestChance) {
          itemWon = rollItemForPlayer(p.level || 1);
          if (itemWon) {
            if (!p.inventory) p.inventory = [];
            const existing = p.inventory.find(i => i.itemId === itemWon.id);
            if (existing) existing.qty = (existing.qty || 1) + 1;
            else p.inventory.push({ itemId: itemWon.id, qty: 1 });
          }
        }

        await savePlayerData(participantId, p);

        // Stocker les récompenses du joueur courant
        if (participantId === userId) {
          rewards = { xp: xpGain, gold: goldGain, leveledUp, item: itemWon, spellsOffered };
        }
      }
    }

    await saveCombatState(combat);
    return res.json({ ok: true, combat, damage, heal, effect, justDied, rewards, player: await getPlayerData(userId) });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=choose_spell — choisir un sort au level up
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'choose_spell') {
    const { token, spellId } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const player = await getPlayerData(session.userId);

    if (!player.pendingSpellChoice || !player.pendingSpellChoice.spells.includes(spellId)) {
      return res.status(400).json({ error: 'Sort non disponible dans le choix actuel' });
    }

    const spell = getSpellById(spellId);
    if (!spell) return res.status(400).json({ error: 'Sort invalide' });

    // Améliorer ou ajouter le sort
    const existing = (player.spells || []).find(s => s.spellId === spellId);
    if (existing) {
      existing.level = Math.min(existing.level + 1, 5);
    } else {
      if (!player.spells) player.spells = [];
      player.spells.push({ spellId, level: 1 });
    }

    player.pendingSpellChoice = null;
    await savePlayerData(session.userId, player);
    return res.json({ ok: true, player, spell });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=equip — équiper un objet
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'equip') {
    const { token, itemId } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const player = await getPlayerData(session.userId);
    const item   = getItemById(itemId);
    if (!item) return res.status(400).json({ error: 'Objet invalide' });

    // Vérifier que le joueur possède l'objet
    const inInventory = (player.inventory || []).find(i => i.itemId === itemId);
    if (!inInventory) return res.status(400).json({ error: 'Objet non possédé' });

    if (!player.equippedItems) player.equippedItems = {};
    player.equippedItems[item.slot] = itemId;

    await savePlayerData(session.userId, player);
    return res.json({ ok: true, player });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=equip_spell — équiper un sort dans un slot
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'equip_spell') {
    const { token, spellId, slot } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const player = await getPlayerData(session.userId);
    if (!player.spells.find(s => s.spellId === spellId)) {
      return res.status(400).json({ error: 'Sort non possédé' });
    }

    if (!player.equippedSpells) player.equippedSpells = [null, null, null, null];
    const slotIdx = parseInt(slot);
    if (isNaN(slotIdx) || slotIdx < 0 || slotIdx > 3) return res.status(400).json({ error: 'Slot invalide (0-3)' });
    player.equippedSpells[slotIdx] = spellId;

    await savePlayerData(session.userId, player);
    return res.json({ ok: true, player });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=shop_refresh — rafraîchir la boutique (3 items aléatoires)
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'shop_refresh') {
    const { token } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const player = await getPlayerData(session.userId);

    // Générer 3 items aléatoires avec probabilité par niveau
    const shopItems = [];
    for (let i = 0; i < 3; i++) {
      const item = rollItemForPlayer(player.level || 1);
      if (item) shopItems.push(item);
    }

    return res.json({ ok: true, shopItems });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=buy — acheter un item en boutique
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'buy') {
    const { token, itemId } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const player = await getPlayerData(session.userId);
    const item   = getItemById(itemId);
    if (!item) return res.status(400).json({ error: 'Objet invalide' });

    if ((player.gold || 0) < item.price) {
      return res.status(400).json({ error: 'Pas assez de gold', needed: item.price, have: player.gold || 0 });
    }

    player.gold -= item.price;
    if (!player.inventory) player.inventory = [];
    const existing = player.inventory.find(i => i.itemId === itemId);
    if (existing) existing.qty = (existing.qty || 1) + 1;
    else player.inventory.push({ itemId, qty: 1 });

    await savePlayerData(session.userId, player);
    return res.json({ ok: true, player, item });
  }

  return res.status(405).json({ error: 'Méthode ou action non supportée' });
}

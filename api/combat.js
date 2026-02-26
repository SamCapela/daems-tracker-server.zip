// api/combat.js v2
// Système de combat RPG complet :
//  - Un seul monstre actif à la fois, HP stables
//  - Spawn par niveaux pondérés (Lv1=40%…Lv5=1%)
//  - Attaque du monstre toutes les 60s sur tous les joueurs
//  - Mort joueur → 5 min mort, revient avec 50% HP
//  - Coffre 5 min après la mort du monstre, cliquable pour gold
//  - Sort de base "Attaque de Base" donné à tous les nouveaux joueurs

import { Redis } from '@upstash/redis';
import {
  MONSTERS, SPELLS, getItemById, getSpellById, getMonsterById,
  computePlayerStats, computeSpellValue, computeCooldown,
  rollItemForPlayer, rollSpellsForLevelUp, rollMonsterLevel,
  expForLevel, rollMonsterHp
} from './gamedata.js';

const kv = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

const MONSTER_ATTACK_INTERVAL = 60000; // 60s entre chaque attaque du monstre
const PLAYER_DEATH_DURATION   = 5 * 60 * 1000; // 5 min mort
const CHEST_DURATION          = 5 * 60 * 1000; // 5 min pour ouvrir le coffre

// ── HELPERS ──────────────────────────────────────────────────────────────────

async function getSession(token) {
  if (!token) return null;
  const data = await kv.get('session:' + token);
  if (!data) return null;
  return typeof data === 'string' ? JSON.parse(data) : data;
}

function defaultPlayer(userId) {
  return {
    userId,
    level: 1,
    exp: 0,
    gold: 0,
    hp: 50,        // PV actuels
    maxHp: 50,     // PV max (recalculé à partir des stats)
    dead: false,
    deadUntil: null,
    equippedItems: { head: null, chest: null, boots: null, weapon: null },
    inventory: [],
    spells: [{ spellId: 'base_attack', level: 1 }],  // Sort de base
    equippedSpells: ['base_attack', null, null, null],
    pendingSpellChoice: null,
  };
}

async function getPlayerData(userId) {
  const data = await kv.get('player:' + userId);
  if (!data) return defaultPlayer(userId);
  const p = typeof data === 'string' ? JSON.parse(data) : data;
  // Migration : s'assurer que l'attaque de base est présente
  if (!p.spells) p.spells = [];
  if (!p.spells.find(s => s.spellId === 'base_attack')) {
    p.spells.unshift({ spellId: 'base_attack', level: 1 });
  }
  if (!p.equippedSpells) p.equippedSpells = [null, null, null, null];
  if (p.equippedSpells[0] === null && !p.equippedSpells.includes('base_attack')) {
    p.equippedSpells[0] = 'base_attack';
  }
  if (p.hp === undefined) p.hp = p.maxHp || 50;
  if (p.maxHp === undefined) p.maxHp = 50;
  return p;
}

async function savePlayerData(userId, data) {
  await kv.set('player:' + userId, JSON.stringify(data));
}

// Recalcule et met à jour maxHp d'un joueur selon ses stats actuelles
function refreshMaxHp(player) {
  const stats = computePlayerStats(player);
  const oldMax = player.maxHp || 50;
  player.maxHp = stats.hp;
  // Si le maxHp augmente, augmenter le HP courant proportionnellement
  if (stats.hp > oldMax) {
    const ratio = player.hp / oldMax;
    player.hp = Math.min(stats.hp, Math.floor(player.hp + (stats.hp - oldMax) * 0.5));
  }
  player.hp = Math.max(0, Math.min(player.hp, player.maxHp));
  return player;
}

// ── ÉTAT DU COMBAT ────────────────────────────────────────────────────────────

async function getCombatState() {
  const raw = await kv.get('combat:state');
  if (!raw) return null;
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

async function saveCombatState(state) {
  await kv.set('combat:state', JSON.stringify(state));
}

function createNewCombat() {
  const level   = rollMonsterLevel();
  const pool    = MONSTERS.filter(m => m.level === level);
  const monster = pool[Math.floor(Math.random() * pool.length)] || MONSTERS[0];
  const hp      = rollMonsterHp(level);
  return {
    monsterId:    monster.id,
    monsterName:  monster.name,
    monsterEmoji: monster.emoji,
    monsterLevel: monster.level,
    monsterDesc:  monster.desc,
    attackDmg:    monster.attackDmg,
    hp,
    maxHp: hp,
    dead: false,
    chestOpen: false,    // coffre disponible après mort
    chestUntil: null,    // timestamp fin du coffre
    participants: [],
    lastDmg: [],
    killedAt: null,
    killedBy: null,
    nextRespawnAt: null,
    lastMonsterAttack: Date.now(),
  };
}

// Déclenche l'attaque du monstre sur tous les joueurs participants (appelé dans GET)
async function maybeMonsterAttack(combat) {
  if (combat.dead || !combat.participants || combat.participants.length === 0) return combat;
  const now = Date.now();
  if (now - (combat.lastMonsterAttack || 0) < MONSTER_ATTACK_INTERVAL) return combat;

  combat.lastMonsterAttack = now;
  const dmg = combat.attackDmg || 1;

  for (const userId of combat.participants) {
    const p = await getPlayerData(userId);
    if (p.dead) continue;
    p.hp = Math.max(0, (p.hp || p.maxHp) - dmg);
    if (p.hp <= 0) {
      p.hp = 0;
      p.dead = true;
      p.deadUntil = now + PLAYER_DEATH_DURATION;
    }
    await savePlayerData(userId, p);
  }

  // Log de l'attaque
  combat.lastDmg.unshift({
    login: `⚔️ ${combat.monsterName}`,
    spell: 'Attaque',
    damage: dmg,
    heal: 0,
    effect: `Frappe tous les joueurs pour ${dmg} dégât${dmg > 1 ? 's' : ''}`,
    ts: now,
  });
  if (combat.lastDmg.length > 10) combat.lastDmg = combat.lastDmg.slice(0, 10);

  return combat;
}

// ── HANDLER PRINCIPAL ─────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action || (req.body && req.body.action) || '';

  // ══════════════════════════════════════════════════════════════════════════
  // GET /api/combat
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'GET') {
    const token = req.query.token;

    let combat = await getCombatState();

    // Vérifier si le coffre est expiré → spawn nouveau monstre
    if (combat && combat.dead && combat.chestUntil && Date.now() > combat.chestUntil) {
      combat = createNewCombat();
      await saveCombatState(combat);
    }

    // Pas de combat en cours → en créer un
    if (!combat) {
      combat = createNewCombat();
      await saveCombatState(combat);
    }

    // Attaque du monstre sur les joueurs (si le délai est écoulé)
    if (!combat.dead) {
      combat = await maybeMonsterAttack(combat);
      await saveCombatState(combat);
    }

    let playerData = null;
    if (token) {
      const session = await getSession(token);
      if (session) {
        playerData = await getPlayerData(session.userId);
        // Vérifier si le joueur revient de la mort
        if (playerData.dead && playerData.deadUntil && Date.now() > playerData.deadUntil) {
          playerData.dead = false;
          playerData.deadUntil = null;
          const stats = computePlayerStats(playerData);
          playerData.maxHp = stats.hp;
          playerData.hp = Math.floor(stats.hp * 0.5); // revient avec 50%
          await savePlayerData(session.userId, playerData);
        }
      }
    }

    return res.json({ combat, player: playerData });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=cast
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'cast') {
    const { token, spellId } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const userId = session.userId;
    const login  = session.displayName || session.login;

    const player = await getPlayerData(userId);

    // Joueur mort ?
    if (player.dead) {
      const remaining = Math.max(0, Math.ceil(((player.deadUntil || 0) - Date.now()) / 1000));
      return res.json({ ok: false, error: `Tu es mort ! Résurrection dans ${remaining}s`, deadRemaining: remaining });
    }

    let combat = await getCombatState();
    if (!combat) {
      combat = createNewCombat();
      await saveCombatState(combat);
    }
    if (combat.dead) {
      return res.json({ ok: false, error: 'Le monstre est mort ! Ouvre le coffre.', combat });
    }

    const spell = getSpellById(spellId);
    if (!spell) return res.status(400).json({ error: 'Sort invalide' });

    const playerSpell = (player.spells || []).find(s => s.spellId === spellId);
    if (!playerSpell) return res.status(400).json({ error: 'Sort non possédé' });

    // Cooldown côté serveur
    const stats = computePlayerStats(player);
    const cd    = computeCooldown(spell, playerSpell.level, stats);
    const cdKey = `cd:${userId}:${spellId}`;
    const lastUsed = await kv.get(cdKey);
    if (lastUsed && Date.now() - parseInt(lastUsed) < cd) {
      const rem = cd - (Date.now() - parseInt(lastUsed));
      return res.json({ ok: false, error: 'Cooldown actif', remainingMs: rem });
    }
    await kv.set(cdKey, String(Date.now()), { ex: Math.ceil(cd / 1000) + 5 });

    // Vérifier PA
    const paCost = spell.pa || 0;
    const currentPa = player.pa !== undefined ? player.pa : stats.pa;
    if (currentPa < paCost) {
      return res.json({ ok: false, error: `Pas assez de PA (${currentPa}/${paCost})` });
    }

    // Consommer les PA (se régénèrent avec le temps — 1 PA/12s, géré côté client)
    player.pa = Math.max(0, currentPa - paCost);

    // Calculer dégâts / soins
    let damage = 0, heal = 0, effect = '';
    const spellValue = computeSpellValue(spell, playerSpell.level, stats);

    if (spell.dmgType === 'physical' || spell.dmgType === 'magical') {
      damage = spellValue;
      // Critique : chance = dexterite * 3%, max 60%, dégâts = 150%
      const critChance = Math.min(0.60, (stats.dexterite - 1) * 0.03);
      if (Math.random() < critChance) {
        damage = Math.floor(damage * 1.5);
        effect = '💥 CRITIQUE !';
      }
    } else if (spell.dmgType === 'heal') {
      heal = spellValue;
      player.hp = Math.min(player.maxHp || stats.hp, (player.hp || 0) + heal);
      effect = `+${heal} PV`;
    } else {
      effect = spell.effects[Math.min(playerSpell.level - 1, spell.effects.length - 1)] || 'Effet activé';
    }

    // Appliquer dégâts au monstre
    const oldHp = combat.hp;
    combat.hp = Math.max(0, combat.hp - damage);
    if (!combat.participants.includes(userId)) combat.participants.push(userId);

    // Log
    if (!combat.lastDmg) combat.lastDmg = [];
    combat.lastDmg.unshift({ login, spell: spell.name, damage, heal, effect, ts: Date.now() });
    if (combat.lastDmg.length > 10) combat.lastDmg = combat.lastDmg.slice(0, 10);

    let justDied = false;
    let rewards  = null;

    // Monstre mort ?
    if (oldHp > 0 && combat.hp === 0) {
      justDied = true;
      combat.dead     = true;
      combat.killedAt = Date.now();
      combat.killedBy = login;
      combat.chestOpen  = true;
      combat.chestUntil = Date.now() + CHEST_DURATION;
      combat.nextRespawnAt = Date.now() + CHEST_DURATION;

      const monsterData = getMonsterById(combat.monsterId) || MONSTERS[0];

      // Récompenser tous les participants
      for (const participantId of combat.participants) {
        const p = await getPlayerData(participantId);
        if (p.dead) continue;

        const xpGain   = monsterData.reward.xp;
        const goldGain = Math.floor(monsterData.reward.gold.min + Math.random() * (monsterData.reward.gold.max - monsterData.reward.gold.min));
        p.exp  = (p.exp  || 0) + xpGain;
        p.gold = (p.gold || 0) + goldGain;

        let leveledUp = false, spellsOffered = null;
        const expNeeded = expForLevel(p.level || 1);
        if (p.exp >= expNeeded && (!p.pendingSpellChoice || !p.pendingSpellChoice.spells.length)) {
          p.exp  -= expNeeded;
          p.level = (p.level || 1) + 1;
          leveledUp = true;
          const knownIds = (p.spells || []).map(s => s.spellId);
          spellsOffered = rollSpellsForLevelUp(knownIds);
          p.pendingSpellChoice = { spells: spellsOffered.map(s => s.id) };
        }

        let itemWon = null;
        if (Math.random() < monsterData.reward.chestChance) {
          itemWon = rollItemForPlayer(p.level || 1);
          if (itemWon) {
            if (!p.inventory) p.inventory = [];
            const ex = p.inventory.find(i => i.itemId === itemWon.id);
            if (ex) ex.qty = (ex.qty || 1) + 1;
            else p.inventory.push({ itemId: itemWon.id, qty: 1 });
          }
        }

        refreshMaxHp(p);
        await savePlayerData(participantId, p);

        if (participantId === userId) {
          rewards = { xp: xpGain, gold: goldGain, leveledUp, item: itemWon, spellsOffered };
        }
      }
    }

    refreshMaxHp(player);
    await savePlayerData(userId, player);
    await saveCombatState(combat);

    return res.json({ ok: true, combat, damage, heal, effect, justDied, rewards, player });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=open_chest — ouvrir le coffre après mort monstre
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'open_chest') {
    const { token } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const combat = await getCombatState();
    if (!combat || !combat.dead || !combat.chestOpen) {
      return res.json({ ok: false, error: 'Pas de coffre disponible' });
    }
    if (combat.chestUntil && Date.now() > combat.chestUntil) {
      return res.json({ ok: false, error: 'Le coffre a disparu !' });
    }

    const userId = session.userId;
    const chestKey = `chest:opened:${combat.killedAt}:${userId}`;
    const alreadyOpened = await kv.get(chestKey);
    if (alreadyOpened) return res.json({ ok: false, error: 'Tu as déjà ouvert ce coffre !' });

    await kv.set(chestKey, '1', { ex: 600 });

    const player = await getPlayerData(userId);
    const monsterData = getMonsterById(combat.monsterId) || MONSTERS[0];

    // Gold du coffre
    const goldBonus = Math.floor(monsterData.reward.gold.min * 0.5 + Math.random() * monsterData.reward.gold.min);
    player.gold = (player.gold || 0) + goldBonus;

    // Chance d'item supplémentaire
    let item = null;
    if (Math.random() < 0.4) {
      item = rollItemForPlayer(player.level || 1);
      if (item) {
        if (!player.inventory) player.inventory = [];
        const ex = player.inventory.find(i => i.itemId === item.id);
        if (ex) ex.qty = (ex.qty || 1) + 1;
        else player.inventory.push({ itemId: item.id, qty: 1 });
      }
    }

    await savePlayerData(userId, player);
    return res.json({ ok: true, gold: goldBonus, item, player });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=choose_spell
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

    const existing = (player.spells || []).find(s => s.spellId === spellId);
    if (existing) { existing.level = Math.min(existing.level + 1, 5); }
    else { if (!player.spells) player.spells = []; player.spells.push({ spellId, level: 1 }); }

    player.pendingSpellChoice = null;
    refreshMaxHp(player);
    await savePlayerData(session.userId, player);
    return res.json({ ok: true, player, spell });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=equip
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'equip') {
    const { token, itemId } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const player = await getPlayerData(session.userId);
    const item   = getItemById(itemId);
    if (!item) return res.status(400).json({ error: 'Objet invalide' });

    const inInventory = (player.inventory || []).find(i => i.itemId === itemId);
    if (!inInventory) return res.status(400).json({ error: 'Objet non possédé' });

    if (!player.equippedItems) player.equippedItems = {};
    player.equippedItems[item.slot] = itemId;

    refreshMaxHp(player);
    await savePlayerData(session.userId, player);
    return res.json({ ok: true, player });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=equip_spell
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'equip_spell') {
    const { token, spellId, slot } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const player  = await getPlayerData(session.userId);
    const slotIdx = parseInt(slot);
    if (isNaN(slotIdx) || slotIdx < 0 || slotIdx > 3) return res.status(400).json({ error: 'Slot invalide (0-3)' });
    if (!player.spells.find(s => s.spellId === spellId)) return res.status(400).json({ error: 'Sort non possédé' });

    if (!player.equippedSpells) player.equippedSpells = [null, null, null, null];
    player.equippedSpells[slotIdx] = spellId;

    await savePlayerData(session.userId, player);
    return res.json({ ok: true, player });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=regen_pa — régénère 1 PA (appelé par le client)
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'regen_pa') {
    const { token } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const player = await getPlayerData(session.userId);
    const stats  = computePlayerStats(player);
    const maxPa  = stats.pa;

    if ((player.pa || 0) < maxPa) {
      player.pa = Math.min(maxPa, (player.pa || 0) + 1);
      await savePlayerData(session.userId, player);
    }
    return res.json({ ok: true, pa: player.pa });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=shop_refresh
  // ══════════════════════════════════════════════════════════════════════════
  if (req.method === 'POST' && action === 'shop_refresh') {
    const { token } = req.body || {};
    if (!token) return res.status(401).json({ error: 'Non connecté' });

    const session = await getSession(token);
    if (!session) return res.status(401).json({ error: 'Session invalide' });

    const player   = await getPlayerData(session.userId);
    const shopItems = [];
    for (let i = 0; i < 3; i++) {
      const item = rollItemForPlayer(player.level || 1);
      if (item) shopItems.push(item);
    }
    return res.json({ ok: true, shopItems });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/combat?action=buy
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
    const ex = player.inventory.find(i => i.itemId === itemId);
    if (ex) ex.qty = (ex.qty || 1) + 1;
    else player.inventory.push({ itemId, qty: 1 });

    await savePlayerData(session.userId, player);
    return res.json({ ok: true, player, item });
  }

  return res.status(405).json({ error: 'Méthode ou action non supportée' });
}

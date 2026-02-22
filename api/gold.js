// api/gold.js
// GET /api/gold?token=xxx -> retourne le gold
// POST /api/gold?token=xxx -> ajoute du gold

import { kv } from '@vercel/kv';

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

  var token = req.query.token || (req.body && req.body.token);
  var session = await getSession(token);

  if (!session) {
    return res.status(401).json({ error: 'Non connecte' });
  }

  var key = 'gold:' + session.userId;

  if (req.method === 'GET') {
    var gold = await kv.get(key);
    return res.json({
      gold: parseInt(gold || '0'),
      login: session.displayName
    });
  }

  if (req.method === 'POST') {
    var current = parseInt(await kv.get(key) || '0');
    var amount = parseInt((req.body && req.body.amount) || req.query.amount || '1');
    var newGold = current + amount;
    await kv.set(key, String(newGold));
    return res.json({ gold: newGold });
  }

  res.status(405).json({ error: 'Methode non supportee' });
}

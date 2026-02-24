// api/wall.js
// Mur d'émotes pour OBS — Browser Source
// Poll toutes les 2s les nouvelles émotes et les fait flotter à l'écran

import { kv } from '@vercel/kv';

export default async function handler(req, res) {

  // Mode API poll : retourne les émotes récentes
  if (req.query.poll === '1') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var since = parseInt(req.query.since || '0');
    var items = await kv.lrange('emote-wall', 0, 49);
    var events = items
      .map(i => { try { return typeof i === 'string' ? JSON.parse(i) : i; } catch { return null; } })
      .filter(Boolean)
      .filter(e => e.ts > since);
    return res.json(events);
  }

  // Mode page HTML pour OBS
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval';">
<title>Daems Emote Wall</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
  background: transparent;
  overflow: hidden;
  width: 300px;
  height: 250px;
  transform-origin: top left;
}
#wall { position: relative; width: 300px; height: 250px; }

  .emote-pop {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    animation: floatUp 4.5s ease-out forwards;
    pointer-events: none;
  }
  .emote-pop .emoji {
    font-size: 80px;
    filter: drop-shadow(0 3px 10px rgba(0,0,0,0.7));
    animation: wiggle 0.4s ease-in-out 4;
  }
  .emote-pop .tag {
    background: rgba(0,0,0,0.75);
    color: white;
    font-family: 'Segoe UI', sans-serif;
    font-size: 12px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    white-space: nowrap;
    border: 1px solid rgba(145,71,255,0.5);
    backdrop-filter: blur(4px);
    box-shadow: 0 0 8px rgba(145,71,255,0.3);
  }

  @keyframes floatUp {
    0%   { opacity: 0; transform: translateY(0)     scale(0.4); }
    12%  { opacity: 1; transform: translateY(-30px)  scale(1.15); }
    75%  { opacity: 1; transform: translateY(-140px) scale(1); }
    100% { opacity: 0; transform: translateY(-190px) scale(0.85); }
  }
  @keyframes wiggle {
    0%,100% { transform: rotate(-10deg); }
    50%      { transform: rotate(10deg); }
  }
</style>
</head>
<body>
<div id="wall"></div>
<script>

var EMOTE_MAP = {
  heart:         '\u2764\uFE0F',
  poop:          '\uD83D\uDCA9',
  GG:            '\uD83C\uDFC6',
  SLT:           '\uD83D\uDC4B',
  CAT:           '\uD83D\uDC31',
  DaemPeepoFire: '\uD83D\uDD25',
  noob:          '\uD83D\uDC80',
  BYE:           '\u270C\uFE0F',
};

var lastTs = Date.now() - 5000;
var wall = document.getElementById('wall');

function spawn(emoteId, login) {
  var emoji = EMOTE_MAP[emoteId] || '\u2B50';
  var el = document.createElement('div');
  el.className = 'emote-pop';
  var x = 60 + Math.random() * (300 - 120);
  var y = 250 - 100;
  el.style.cssText = 'left:' + x + 'px;top:' + y + 'px';
  el.innerHTML = '<div class="emoji">' + emoji + '</div><div class="tag">' + login + '</div>';
  wall.appendChild(el);
  setTimeout(function() { el.remove(); }, 5000);
}

function poll() {
  fetch('/api/wall?poll=1&since=' + lastTs)
    .then(function(r) { return r.json(); })
    .then(function(events) {
      if (events.length) {
        events.forEach(function(e) { spawn(e.emote, e.login); });
        lastTs = Math.max.apply(null, events.map(function(e) { return e.ts; }));
      }
    })
    .catch(function() {})
    .finally(function() { setTimeout(function() { poll(); }, 2000); });
}

poll();
</script>
</body>
</html>`);
}
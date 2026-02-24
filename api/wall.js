// api/wall.js
// Mur d'émotes pour OBS — Browser Source 1920x1080
// Les émotes spawent uniquement dans la zone de la cam de Daems

import { kv } from '@vercel/kv';

export default async function handler(req, res) {

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
    width: 1920px;
    height: 1080px;
    transform-origin: top left;
  }
  #wall {
    position: relative;
    width: 1920px;
    height: 1080px;
  }

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
    font-size: 120px;
    line-height: 1;
    filter: drop-shadow(0 3px 10px rgba(0,0,0,0.7));
    animation: wiggle 0.4s ease-in-out 4;
  }
  .emote-pop .tag {
    background: rgba(0,0,0,0.75);
    color: white;
    font-family: 'Segoe UI', sans-serif;
    font-size: 18px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 20px;
    white-space: nowrap;
    border: 1px solid rgba(145,71,255,0.5);
    box-shadow: 0 0 8px rgba(145,71,255,0.3);
  }

  @keyframes floatUp {
    0%   { opacity: 0; transform: translateY(0)     scale(0.4); }
    12%  { opacity: 1; transform: translateY(-30px)  scale(1.1); }
    75%  { opacity: 1; transform: translateY(-200px) scale(1); }
    100% { opacity: 0; transform: translateY(-280px) scale(0.9); }
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
// ── ZONE DE LA CAM DE DAEMS (en pixels 1920x1080) ──
var CAM_X = 0;     // bord gauche
var CAM_Y = 780;   // bord haut de la cam
var CAM_W = 290;   // largeur
var CAM_H = 300;   // hauteur

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

// Scale la page pour remplir la fenêtre OBS
function resize() {
  var scaleX = window.innerWidth  / 1920;
  var scaleY = window.innerHeight / 1080;
  document.body.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
}
resize();
window.addEventListener('resize', resize);

var lastTs = Date.now() - 5000;
var wall = document.getElementById('wall');

function spawn(emoteId, login) {
  var emoji = EMOTE_MAP[emoteId] || '\u2B50';
  var el = document.createElement('div');
  el.className = 'emote-pop';

  // Spawn aléatoire dans la zone de la cam
  var x = CAM_X + Math.random() * (CAM_W - 80);
  var y = CAM_Y - 20 + (Math.random() * 40 - 20);

  el.style.left = x + 'px';
  el.style.top  = y + 'px';
  el.innerHTML = '<div class="emoji">' + emoji + '</div><div class="tag">' + login + '</div>';
  wall.appendChild(el);
  setTimeout(function() { el.remove(); }, 5000);
}

function poll() {
  fetch('/api/wall?poll=1&since=' + lastTs)
    .then(function(r) { return r.json(); })
    .then(function(events) {
      if (events.length) {
        events.forEach(function(e, i) {
          setTimeout(function() { spawn(e.emote, e.login); }, i * 600);
        });
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

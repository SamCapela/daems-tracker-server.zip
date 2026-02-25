// api/soundboard.js
// GET /api/soundboard — Page HTML pour OBS Browser Source
// Polle /api/sound?next=1 et joue les MP3 en local via Audio API
// Les fichiers MP3 doivent être hébergés sur le même domaine (dossier /public/sounds/)

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Daems Soundboard OBS</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    background: transparent;
    overflow: hidden;
    width: 400px;
    height: 200px;
    font-family: 'Segoe UI', sans-serif;
  }
  #toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(60px);
    background: rgba(0,0,0,0.85);
    color: white;
    font-size: 22px;
    font-weight: 700;
    padding: 12px 28px;
    border-radius: 30px;
    border: 2px solid rgba(145,71,255,0.6);
    box-shadow: 0 0 20px rgba(145,71,255,0.4);
    white-space: nowrap;
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    pointer-events: none;
  }
  #toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
</style>
</head>
<body>
<div id="toast"></div>
<script>
var SERVER = '';  // même domaine, pas besoin de préfixe

var SOUND_LABELS = {
  pet:         '🐾 Pet',
  pig:         '🐷 Pig',
  coq:         '🐓 Coq',
  first_blood: '💀 First Blood',
  gg:          '🏆 GG',
  screamer:    '😱 Screamer',
  thank_you:   '🙏 Thank You'
};

var toastEl = document.getElementById('toast');
var toastTimer;

function showToast(label, login) {
  toastEl.textContent = label + '  •  ' + login;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toastEl.classList.remove('show');
  }, 4000);
}

function playSound(soundId, login) {
  // Les MP3 sont dans /public/sounds/ sur Vercel
  var audio = new Audio('/sounds/' + soundId + '.mp3');
  audio.volume = 1.0;
  audio.play().catch(function(e) {
    console.warn('Audio play failed:', e);
  });
  showToast(SOUND_LABELS[soundId] || soundId, login);
  console.log('[Soundboard] Joue:', soundId, 'pour', login);
}

function poll() {
  fetch('/api/sound?next=1')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.sound) {
        playSound(data.sound, data.login || 'Anonyme');
        // Repoll rapidement si potentiellement d'autres sons en attente
        setTimeout(poll, 500);
      } else {
        setTimeout(poll, 2000);
      }
    })
    .catch(function() {
      setTimeout(poll, 5000);
    });
}

poll();
</script>
</body>
</html>`);
}

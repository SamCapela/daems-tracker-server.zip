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
  #activate {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.85);
    z-index: 99;
  }
  #activate button {
    background: #9147ff;
    color: white;
    border: none;
    padding: 14px 28px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Segoe UI', sans-serif;
  }
  #activate button:hover { background: #6c31c9; }
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

<!-- Overlay cliquable pour débloquer l'audio (obligatoire navigateur) -->
<div id="activate">
  <button onclick="unlock()">🔊 Activer le son</button>
</div>

<div id="toast"></div>
<script>
var SERVER = '';
var audioUnlocked = false;

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
  var audio = new Audio('/sounds/' + soundId + '.mp3');
  audio.volume = 1.0;
  audio.play().catch(function(e) {
    console.warn('Audio play failed:', e);
  });
  showToast(SOUND_LABELS[soundId] || soundId, login);
  console.log('[Soundboard] Joue:', soundId, 'pour', login);
}

function unlock() {
  // Jouer un silence pour débloquer le contexte audio
  var silent = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
  silent.play().then(function() {
    audioUnlocked = true;
    document.getElementById('activate').style.display = 'none';
    console.log('[Soundboard] Audio débloqué, polling démarré');
    poll();
  }).catch(function(e) {
    console.error('Unlock failed:', e);
  });
}

function poll() {
  fetch('/api/sound?next=1')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.sound) {
        playSound(data.sound, data.login || 'Anonyme');
        setTimeout(poll, 500);
      } else {
        setTimeout(poll, 2000);
      }
    })
    .catch(function() {
      setTimeout(poll, 5000);
    });
}
</script>
</body>
</html>`);
}

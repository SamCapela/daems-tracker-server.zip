// api/success.js
// Page intermediaire qui envoie le token a l'extension via postMessage

export default function handler(req, res) {
  const { token, login } = req.query;

  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Connexion réussie</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0d0d14;
      color: white;
      font-family: sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      flex-direction: column;
      gap: 16px;
    }
    .icon { font-size: 48px; }
    h1 { font-size: 22px; }
    p { color: #7a7a9a; font-size: 14px; }
    .name { color: #9147ff; font-weight: bold; }
  </style>
</head>
<body>
  <div class="icon">✅</div>
  <h1>Connecté en tant que <span class="name">${login}</span> !</h1>
  <p>Vous pouvez fermer cet onglet.</p>
  <script>
    // Envoyer le token a l'extension via localStorage trick
    // L'extension va lire cette valeur depuis content script
    localStorage.setItem('daems_session_token', '${token}');
    localStorage.setItem('daems_login', '${login}');

    // Essayer postMessage vers la fenetre parente
    if (window.opener) {
      window.opener.postMessage({ type: 'DAEMS_AUTH', token: '${token}', login: '${login}' }, '*');
      setTimeout(function() { window.close(); }, 1500);
    } else {
      // Fermer apres 3s
      setTimeout(function() { window.close(); }, 3000);
    }
  </script>
</body>
</html>`);
}

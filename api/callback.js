import { Redis } from '@upstash/redis';

const kv = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const REDIRECT_URI = 'https://daemsweb-igtm.vercel.app/api/callback';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Code manquant');
  }

  try {
    const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI
      })
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) throw new Error('Token invalide');

    const userRes = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': 'Bearer ' + tokenData.access_token
      }
    });
    const userData = await userRes.json();
    const user = userData.data[0];

    const sessionToken = Math.random().toString(36).slice(2) + Date.now().toString(36);

    await kv.set('session:' + sessionToken, JSON.stringify({
      twitchToken: tokenData.access_token,
      userId: user.id,
      login: user.login,
      displayName: user.display_name,
      profileImage: user.profile_image_url
    }), { ex: 60 * 60 * 24 * 30 });

    const existing = await kv.get('gold:' + user.id);
    if (existing === null) {
      await kv.set('gold:' + user.id, '0');
    }

    res.redirect('/api/success?token=' + sessionToken + '&login=' + encodeURIComponent(user.display_name));

  } catch (err) {
    res.status(500).send('Erreur: ' + err.message);
  }
}

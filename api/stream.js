// api/stream.js
// Verifie si daems_ est en live

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const STREAMER = 'daems_';

var appToken = null;
var tokenExpiry = 0;

async function getAppToken() {
  if (appToken && Date.now() < tokenExpiry) return appToken;

  var res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    })
  });

  var data = await res.json();
  appToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return appToken;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    var token = await getAppToken();
    var streamRes = await fetch(
      'https://api.twitch.tv/helix/streams?user_login=' + STREAMER,
      {
        headers: {
          'Client-ID': CLIENT_ID,
          'Authorization': 'Bearer ' + token
        }
      }
    );

    var data = await streamRes.json();
    var stream = data.data && data.data[0];

    res.json({
      isLive: !!stream,
      title: stream ? stream.title : null,
      game: stream ? stream.game_name : null,
      viewers: stream ? stream.viewer_count : 0,
      thumbnail: stream ? stream.thumbnail_url : null
    });

  } catch (err) {
    console.error('Stream check error:', err);
    res.status(500).json({ error: err.message });
  }
}

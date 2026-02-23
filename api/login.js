const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const REDIRECT_URI = 'https://daemsweb-igtm.vercel.app/api/callback';

export default function handler(req, res) {
  const authUrl = 'https://id.twitch.tv/oauth2/authorize'
    + '?client_id=' + CLIENT_ID
    + '&redirect_uri=' + encodeURIComponent(REDIRECT_URI)
    + '&response_type=code'
    + '&scope=' + encodeURIComponent('user:read:email')
    + '&force_verify=true';

  res.redirect(authUrl);
}

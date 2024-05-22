import jwt from 'jsonwebtoken';

export default async function (req, res) {
  const path = req.query.path;

  const origin = req.headers.referer;

  if (origin && origin.includes('www.1998.media/api/origin') && path.includes('me/')) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Generate token
  const p8 = process.env.APPLE_MUSIC_p8;
  const payload = {
    iss: process.env.APPLE_MUSIC_TEAM_ID,
    iat: Math.floor(new Date().getTime() / 1000),
    exp: Math.floor(new Date().getTime() / 1000) + 3600,
  };
  const signOptions = {
    algorithm: 'ES256',
    header : {
      alg: 'ES256',
      kid: process.env.APPLE_MUSIC_KEY_ID,
    }
  };
  const token = jwt.sign(payload, p8, signOptions);

  await fetch(`https://api.music.apple.com/v1/${path}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Music-User-Token': process.env.APPLE_MUSIC_USER_TOKEN,
    },
  }).then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error });
    });
}

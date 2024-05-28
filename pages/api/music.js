import jwt from 'jsonwebtoken';
import qqMusic from 'qq-music-api';
import opencc from 'node-opencc';

export const config = {
  maxDuration: 60,
};

export default async function (req, res) {
  const { provider, path } = req.query;

  if (provider === 'qq') {
    await qqMusic
      .api(path, {
        key: req.query.key,
        t: req.query.t,
        type: req.query.typeID,
        singermid: req.query.singermid,
        albummid: req.query.albummid,
        songmid: req.query.songmid,
        pageSize: req.query.pageSize,
      })
      .then(async (data) => {
        const trans = await convertJsonToTraditional(data);
        res.status(200).json(trans);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  };

  const origin = req.headers.referer;

  if (
    origin &&
    origin.includes('www.1998.media/api/origin') &&
    path.includes('me/')
  ) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Generate token
  const p8 = process.env.APPLE_MUSIC_p8.replace(/\\n/g, '\n');
  const payload = {
    iss: process.env.APPLE_MUSIC_TEAM_ID,
    iat: Math.floor(new Date().getTime() / 1000),
    exp: Math.floor(new Date().getTime() / 1000) + 3600,
  };
  const signOptions = {
    algorithm: 'ES256',
    header: {
      alg: 'ES256',
      kid: process.env.APPLE_MUSIC_KEY_ID,
    },
  };
  const token = jwt.sign(payload, p8, signOptions);

  await fetch(`https://api.music.apple.com/v1/${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Music-User-Token': process.env.APPLE_MUSIC_USER_TOKEN,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error });
    });
}

async function convertJsonToTraditional(jsonObj) {
  let keys = Object.keys(jsonObj);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (typeof jsonObj[key] === 'string') {
      jsonObj[key] = await opencc.simplifiedToTraditional(jsonObj[key]);
    } else if (typeof jsonObj[key] === 'object') {
      jsonObj[key] = await convertJsonToTraditional(jsonObj[key]);
    }
  }
  return jsonObj;
}
export default async function (req, res) {
  const { type, url } = req.query;

  if (type === 'apple') {
    // POST https://tools.applemediaservices.com/api/short-link/shorten
    // { "url": "https://apple.com" }

    // Modify URL, say https://www.apple.com to https://apple.com
    const modURL = url.replace('www.', '');

    await fetch('https://tools.applemediaservices.com/api/short-link/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': process.env.APPLE_SHORTEN_CSRF_TOKEN,
        cookie: process.env.APPLE_SHORTEN_COOKIE,
        pragma: 'no-cache',
      },
      body: JSON.stringify({ url: modURL }),
    })
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    res.status(400).json({ error: 'Invalid type' });
  }
}

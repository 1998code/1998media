import NodeGeocoder from 'node-geocoder';

export default async function (req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const latitude = req.query.la || req.headers['x-vercel-ip-latitude'];
  const longitude = req.query.lo || req.headers['x-vercel-ip-longitude'];

  let geo;
  try {
    if (latitude && longitude) {
      const options = {
        provider: 'openstreetmap',
        language: req.query.l || 'en',
      };
      const geoCoder = NodeGeocoder(options);
      const res = await geoCoder.reverse({ lat: latitude, lon: longitude });
      geo = {
        city: res[0].city,
        state: res[0].state,
      };
    } else {
      geo = {
        city: 'Local',
        state: 'Local',
      };
    }
  } catch (error) {
    console.log(error);
    geo = {
      city: '?',
      state: '?',
    };
  }

  res.status(200).json({ ip, geo, latitude, longitude });
}

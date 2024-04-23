import NodeGeocoder from 'node-geocoder'

let options = {
    provider: 'openstreetmap',
    language: 'en'
  };
  
  let geoCoder = NodeGeocoder(options);

export default async function (req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    const latitude = '22.2842' || req.headers['x-vercel-ip-latitude']
    const longitude = '114.1759' || req.headers['x-vercel-ip-longitude']

    let geo = null;
    if(latitude && longitude) {
        const res = await geoCoder.reverse({lat: latitude, lon: longitude});
        geo = {
            city: res[0].city,
            country: res[0].country
        }
    }

    res.status(200).json({ ip, geo, latitude, longitude })
}
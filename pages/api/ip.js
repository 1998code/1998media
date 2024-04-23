import NodeGeocoder from 'node-geocoder'

export default async function (req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    const latitude = req.headers['x-vercel-ip-latitude']
    const longitude = req.headers['x-vercel-ip-longitude']

    let geo = null;
    if (latitude && longitude) {
        const options = {
            provider: 'openstreetmap',
            language: req.headers['accept-language'].split(',')[0] || 'en',
        };
        const geoCoder = NodeGeocoder(options);
        const res = await geoCoder.reverse({ lat: latitude, lon: longitude });
        geo = {
            city: res[0].city,
            country: res[0].country
        }
    } else {
        geo = {
            city: 'Unknown',
            country: 'Unknown'
        }
    }

    res.status(200).json({ ip, geo, latitude, longitude })
}
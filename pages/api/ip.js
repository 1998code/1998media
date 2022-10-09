export default function (req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geoip = require('geoip-lite');
    const geo = geoip.lookup(ip);

    const latitude = req.headers['x-vercel-ip-latitude'];
    const longitude = req.headers['x-vercel-ip-longitude'];

    res.status(200).json({ ip, geo, latitude, longitude });
}
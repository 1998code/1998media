export default function (req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geoip = require('geoip-lite');
    const geo = geoip.lookup(ip);
    res.status(200).json({ ip, geo });
}
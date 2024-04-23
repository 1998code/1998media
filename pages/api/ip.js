import geoip from 'geoip-lite'

export default function (req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    let geo = geoip.lookup(ip)

    if (!geo) {
        geo = null
    }

    const latitude = req.headers['x-vercel-ip-latitude']
    const longitude = req.headers['x-vercel-ip-longitude']

    res.status(200).json({ ip, geo, latitude, longitude })
}
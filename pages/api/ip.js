export default function (req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.status(200).json({ ip });
}
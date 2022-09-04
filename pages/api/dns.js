export default function (req, res) {
    const domain = req.query.domain;
    if (!domain) {
        res.status(400).json({ error: "Domain is required" });
        return;
    };
    const dns = require('dns');
    const rrtype="A";
    dns.resolve(domain, rrtype, (err, addresses) => {
        if (err) {
            res.status(200).json({ error: err })
        } else {
            res.status(200).json({ addresses })
        }
    });
}
export default function (req, res) {
    const url = req.query.url;
    if (!url) {
        res.status(400).json({ error: "URL is required" });
        return;
    }
    const axios = require('axios');
    axios.get(url).then((response) => {
        // response as html
        res.status(200).json({ response })
    }
    ).catch((err) => {
        res.status(200).json({ error: err })
    })
}
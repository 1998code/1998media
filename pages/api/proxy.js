export default function (req, res) {
    // write a proxy 
    // GET /proxy?url=(URL from request)
    // then return the response from the URL

    const url = req.query.url;
    if (!url) {
        res.status(400).json({ error: "URL is required" });
        return;
    }
    const axios = require('axios');
    axios.get(url).then((response) => {
        res.status(200).json(response.data)
    }
    ).catch((err) => {
        res.status(200).json({ error: err })
    })
}
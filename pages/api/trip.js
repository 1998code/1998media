export default function (req, res) {
    const locale = req.query.locale || 'en-US';

    if (!req.query.cid) {
        res.status(500).json({ error: 'Missing cid' });
        return;
    }
    if (!req.query.type) {
        res.status(500).json({ error: 'Missing type' });
        return;
    }
    
    if (req.query.type == 'medal') {
        fetch('https://www.trip.com/restapi/soa2/18066/getAllMedal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "clientAuth": "E1B9A703A2E3FEF984D86D1D507FB324B4A7CBA7500F0E62A0BFA68DCC95C09E",
                "source": "medal_sort",
                "head": {
                    "cver": "1.0",
                    "cid": req.query.cid,
                    "locale": locale,
                    "extension": [
                        {
                            "name": "locale",
                            "value": locale
                        },
                        {
                            "name": "platform",
                            "value": "Online"
                        }
                    ]
                }
            }),
        })
            .then(response => response.json())
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                res.status(500).json({ error: error });
            });
    } else if (req.query.type == 'moment') {
        // POST https://hk.trip.com/restapi/soa2/18066/searchMomentList
        fetch('https://www.trip.com/restapi/soa2/18066/searchMomentList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "bizType": "personalList",
                "clientAuthList": [
                    "E1B9A703A2E3FEF984D86D1D507FB324B4A7CBA7500F0E62A0BFA68DCC95C09E"
                ],
                "source": "pc_h5",
                "pageNo": 1,
                "pageSize": 100,
                "head": {
                    "cver": "1.0",
                    "cid": req.query.cid,
                    "locale": locale,
                    "extension": [
                        {
                            "name": "locale",
                            "value": locale
                        },
                        {
                            "name": "platform",
                            "value": "Online"
                        }
                    ]
                }
            }),
        })
            .then(response => response.json())
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                res.status(500).json({ error: error });
            });
    }
}

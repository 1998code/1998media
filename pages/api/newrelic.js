import newrelic from 'newrelic';

export default function (req, res) {
    newrelic;
    res.status(200).json({say: 'Hello World!'})
}
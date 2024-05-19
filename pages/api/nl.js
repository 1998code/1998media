import { franc } from 'franc-min';

export default function (req, res) {
  const lang = franc(req.query.text);
  res.status(200).json({
    text: req.query.text,
    lang,
  });
}

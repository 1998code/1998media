import translatte from 'translatte';

export default async function (req, res) {
  const { text, from, to } = req.query;
  const translation = await translatte(text, { from, to });

  res.status(200).json({
    input: text,
    output: translation.text,
    from,
    to,
  });
}

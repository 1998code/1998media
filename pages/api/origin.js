export const runtime = 'edge';

export default async function (req, res) {
  const origin = req.headers;

  return res.status(200).json({ origin });
}

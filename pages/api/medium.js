import { parse } from 'rss-to-json';

export default async function (req, res) {
  const feed = await parse('https://medium.com/feed/@1998design');
  res.json(feed);
}

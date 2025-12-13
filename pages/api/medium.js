export const runtime = 'edge';

export default async function (req, res) {
  try {
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%401998design'
    );
    const feed = await response.json();
    res.json(feed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the Medium feed' });
  }
}

export default async function (req, res) {
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://post.1998.media/rss/');
    const feed = await response.json();
    res.json(feed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the Medium feed' });
  }
}
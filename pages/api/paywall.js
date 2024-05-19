import { sql } from '@vercel/postgres';
import axios from 'axios';
import cheerio from 'cheerio';

export default async function (req, res) {
  const domain = 'https://blog.1998.media/';

  const status = req.query.status || 'public';
  const offset = req.query.offset || 0;

  const { rows } =
    status === 'draft'
      ? await sql`SELECT * from paywall WHERE date > CURRENT_DATE ORDER BY id DESC LIMIT 10 OFFSET ${offset}`
      : await sql`SELECT * from paywall WHERE date < CURRENT_DATE ORDER BY id DESC LIMIT 10 OFFSET ${offset}`;

  const finalData = await Promise.all(
    rows.map(async (row) => {
      const postData = await getMediumPostThumbnail(domain + row.postID);
      return {
        id: row.id,
        title: postData.title,
        postID: row.postID,
        secret: row.secret,
        thumbnail: postData.thumbnail,
        date: row.date,
      };
    })
  );

  res.status(200).json(finalData);
}

async function getMediumPostThumbnail(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return {
      title: $('meta[property="og:title"]').attr('content'),
      thumbnail: $('meta[property="og:image"]').attr('content'),
    };
  } catch (error) {
    console.error(error);
  }
}

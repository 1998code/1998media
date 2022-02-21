// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);
const url = 'https://1998.media/s5/RYD.zip';

const handler = async (req, res) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=RYD.app');
  await pipeline(response.body, res);
};

export default handler;
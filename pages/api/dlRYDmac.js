// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);
const url = 'https://1998.media/s5/RYDmac.tar.gz';

const handler = async (req, res) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', 'application/tar+gzip');
  res.setHeader('Content-Disposition', 'attachment; filename=RYDmac.tar.gz');
  await pipeline(response.body, res);
};

export default handler;
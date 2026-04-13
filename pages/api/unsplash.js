export const runtime = 'edge';

export default async function handler() {
  try {
    const key =
      process.env.UNSPLASH_ACCESS_KEY ||
      'hjm0tzh_dDQx2REubp1NiT1P4jxE5wmnCbKQLbD-BZ8';

    const [statsRes, photosRes] = await Promise.all([
      fetch(
        `https://api.unsplash.com/users/1998media/statistics?client_id=${key}`
      ),
      fetch(`https://api.unsplash.com/users/1998media/photos?client_id=${key}`),
    ]);

    const stats = statsRes.ok ? await statsRes.json() : null;
    const photos = photosRes.ok ? await photosRes.json() : [];

    return new Response(
      JSON.stringify({
        stats: stats ? { totalViews: stats.views?.total || 0 } : null,
        photos,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ stats: null, photos: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

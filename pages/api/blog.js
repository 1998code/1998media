export const runtime = 'edge';

import {
  fetchBlogPosts,
  fetchTripMedals,
  fetchTripMoments,
} from '../../lib/fetchData';

export default async function handler(req) {
  const url = new URL(req.url);
  const locale = url.searchParams.get('locale') || 'en';

  const [postsResult, medalsResult, momentsResult] = await Promise.allSettled([
    fetchBlogPosts(),
    fetchTripMedals(locale),
    fetchTripMoments(locale),
  ]);

  return new Response(
    JSON.stringify({
      posts: postsResult.status === 'fulfilled' ? postsResult.value : [],
      medals: medalsResult.status === 'fulfilled' ? medalsResult.value : [],
      moments: momentsResult.status === 'fulfilled' ? momentsResult.value : [],
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}

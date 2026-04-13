export const runtime = 'edge';

import { fetchBlogPosts, fetchTripMedals, fetchTripMoments } from '../../lib/fetchData';

const CID = '09031029418990699836';
const PROD_API = 'https://www.1998.media/api/trip';

function tripLocale(locale) {
  const map = { ja: 'ja-JP', ko: 'ko-KR', zh: 'zh-CN', 'zh-HK': 'zh-TW' };
  return map[locale] || 'en-US';
}

async function fetchMedalsViaProxy(locale) {
  const res = await fetch(
    `${PROD_API}?type=medal&cid=${CID}&locale=${tripLocale(locale)}`
  );
  const data = await res.json();
  return data.medalList || [];
}

async function fetchMomentsViaProxy(locale) {
  const res = await fetch(
    `${PROD_API}?type=moment&cid=${CID}&locale=${tripLocale(locale)}`
  );
  const data = await res.json();
  return data.resourceBlockList || [];
}

export default async function handler(req) {
  const url = new URL(req.url);
  const locale = url.searchParams.get('locale') || 'en';
  const isDev = process.env.NODE_ENV === 'development';

  const [postsResult, medalsResult, momentsResult] = await Promise.allSettled([
    fetchBlogPosts(),
    isDev ? fetchMedalsViaProxy(locale) : fetchTripMedals(locale),
    isDev ? fetchMomentsViaProxy(locale) : fetchTripMoments(locale),
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

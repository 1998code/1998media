export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  
  const ip = req.headers.get('x-forwarded-for') || 
             req.headers.get('cf-connecting-ip') || 
             'unknown';

  const latitude = url.searchParams.get('la') || 
                   req.headers.get('cf-iplatitude') || 
                   req.headers.get('x-vercel-ip-latitude');
  const longitude = url.searchParams.get('lo') || 
                    req.headers.get('cf-iplongitude') || 
                    req.headers.get('x-vercel-ip-longitude');
  const lang = url.searchParams.get('l') || 'en';

  let geo;
  try {
    if (latitude && longitude) {
      // Use OpenStreetMap Nominatim API for edge-compatible reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${lang}`,
        { headers: { 'User-Agent': '1998media/1.0' } }
      );
      
      if (response.ok) {
        const data = await response.json();
        geo = {
          city: data.address?.city || data.address?.town || data.address?.village || '?',
          state: data.address?.state || data.address?.country || '?',
        };
      } else {
        geo = { city: '?', state: '?' };
      }
    } else {
      geo = {
        city: 'Local',
        state: 'Local',
      };
    }
  } catch (error) {
    console.log(error);
    geo = {
      city: '?',
      state: '?',
    };
  }

  return new Response(JSON.stringify({ ip, geo, latitude, longitude }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const runtime = 'edge';

export default async function handler(req) {
  const url = new URL(req.url);
  const locale = url.searchParams.get('locale') || 'en-US';
  const cid = url.searchParams.get('cid');
  const type = url.searchParams.get('type');

  if (!cid) {
    return new Response(JSON.stringify({ error: 'Missing cid' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!type) {
    return new Response(JSON.stringify({ error: 'Missing type' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    if (type === 'medal') {
      const response = await fetch('https://www.trip.com/restapi/soa2/18066/getAllMedal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientAuth:
            'E1B9A703A2E3FEF984D86D1D507FB324B4A7CBA7500F0E62A0BFA68DCC95C09E',
          source: 'medal_sort',
          head: {
            cver: '1.0',
            cid: cid,
            locale: locale,
            extension: [
              { name: 'locale', value: locale },
              { name: 'platform', value: 'Online' },
            ],
          },
        }),
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (type === 'moment') {
      const response = await fetch('https://www.trip.com/restapi/soa2/18066/searchMomentList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bizType: 'personalList',
          clientAuthList: [
            'E1B9A703A2E3FEF984D86D1D507FB324B4A7CBA7500F0E62A0BFA68DCC95C09E',
          ],
          source: 'pc_h5',
          pageNo: 1,
          pageSize: 50,
          head: {
            cver: '1.0',
            cid: cid,
            locale: locale,
            extension: [
              { name: 'locale', value: locale },
              { name: 'platform', value: 'Online' },
            ],
          },
        }),
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

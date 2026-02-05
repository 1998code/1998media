export const runtime = 'edge';

export default async function handler(req) {
  const baseUrl = 'https://www.1998.media';
  const supportedLocales = ['en', 'zh', 'zh-HK', 'ko', 'ja'];

  // Main pages with priorities and change frequencies
  const pages = [
    { path: '', priority: '1.0', changefreq: 'weekly' }, // home/index
    { path: 'about', priority: '0.9', changefreq: 'monthly' },
    { path: 'achievements', priority: '0.9', changefreq: 'monthly' },
    { path: 'gallery', priority: '0.9', changefreq: 'weekly' },
    { path: 'experience', priority: '0.8', changefreq: 'monthly' },
    { path: 'skills', priority: '0.8', changefreq: 'monthly' },
    { path: 'projects', priority: '0.9', changefreq: 'weekly' },
    { path: 'ai', priority: '0.8', changefreq: 'weekly' },
    { path: 'blog', priority: '0.9', changefreq: 'daily' },
    { path: 'faq', priority: '0.7', changefreq: 'monthly' },
    { path: 'contact', priority: '0.7', changefreq: 'monthly' },
    { path: 'credits', priority: '0.5', changefreq: 'yearly' },
    { path: 'openAPI', priority: '0.8', changefreq: 'monthly' },
    { path: 'games/bf6-ea', priority: '0.7', changefreq: 'weekly' },
  ];

  // Generate URLs for all locales and pages
  const urlMap = new Map(); // Use Map to group by page path for hreflang

  for (const page of pages) {
    const pageUrls = [];
    for (const locale of supportedLocales) {
      const path = page.path ? `/${page.path}` : '';
      const loc = `${baseUrl}/${locale}${path}`;
      pageUrls.push({ loc, locale });
    }
    urlMap.set(page.path, { page, urls: pageUrls });
  }

  // Generate XML with hreflang support
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Array.from(urlMap.values())
  .flatMap(({ page, urls }) =>
    urls.map((url, index) => {
      // Generate hreflang links for all alternate language versions
      const hreflangLinks = urls
        .map((altUrl) => {
          const langCode =
            altUrl.locale === 'zh-HK'
              ? 'zh-HK'
              : altUrl.locale === 'zh'
                ? 'zh-CN'
                : altUrl.locale === 'ja'
                  ? 'ja'
                  : altUrl.locale === 'ko'
                    ? 'ko'
                    : 'en';
          return `    <xhtml:link rel="alternate" hreflang="${langCode}" href="${altUrl.loc}" />`;
        })
        .join('\n');

      // Add x-default pointing to English version
      const defaultUrl = urls.find((u) => u.locale === 'en') || urls[0];
      const hreflangDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl.loc}" />`;

      return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${hreflangLinks}
${hreflangDefault}
  </url>`;
    })
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}

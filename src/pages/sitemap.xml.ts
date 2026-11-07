import type { APIRoute } from 'astro';
import { posts } from '../data/posts';
import { services } from '../data/services';

const site = 'https://atlc.cl';

export const GET: APIRoute = () => {
  const urls: { loc: string; lastmod?: string }[] = [
    { loc: '/' },
    { loc: '/equipo/' },
    { loc: '/servicios/' },
    ...services.map((s) => ({ loc: `/servicios/${s.slug}/` })),
    { loc: '/blog/' },
    ...posts.map((p) => ({ loc: `/blog/${p.slug}/`, lastmod: p.date })),
    { loc: '/contacto/' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${site}${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`)
  .join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

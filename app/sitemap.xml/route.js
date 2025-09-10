import { getActiveGames } from '../lib/data';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
    const games = getActiveGames();
    
    const staticPages = [
        '',
        '/game',
        '/game/random',
        '/privacy-policy'
    ];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `
    <url>
        <loc>${baseUrl}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page === '/game/random' ? 'always' : 'daily'}</changefreq>
        <priority>${page === '' || page === '/game' ? '1.0' : '0.8'}</priority>
    </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400'
        }
    });
}

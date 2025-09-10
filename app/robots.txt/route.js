export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
    
    const robots = `User-agent: *
Allow: /
Allow: /game
Allow: /game/random
Allow: /privacy-policy
Disallow: /api/
Disallow: /source/

Sitemap: ${baseUrl}/sitemap.xml`;

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, s-maxage=86400'
        }
    });
}

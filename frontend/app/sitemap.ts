import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
    const locales = ['fr', 'en'];
    const now = new Date();

    const routes = [
        '',
        '/about',
        '/services',
        '/training',
        '/products',
        '/technologies',
        '/contact',
        '/recrutement',
        '/news',
        '/legal/privacy',
        '/legal/terms',
    ];

    const sitemap: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        routes.forEach((route) => {
            const isHome = route === '';
            const isHighIntent = ['/services', '/contact', '/training', '/recrutement'].includes(route);

            const routePath = isHome ? `/${locale}/` : `/${locale}${route}/`;
            const pageUrl = new URL(routePath, `${baseUrl}/`).toString();

            sitemap.push({
                url: pageUrl,
                lastModified: now,
                changeFrequency: route === '/news' ? 'daily' : isHome ? 'daily' : 'weekly',
                priority: isHome ? 1 : isHighIntent ? 0.9 : 0.8,
            });
        });
    });

    return sitemap.filter((entry) => Boolean(entry.url));
}

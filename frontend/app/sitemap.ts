import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const locales = ['fr', 'en'];

    const routes = [
        '',
        '/about',
        '/services',
        '/training',
        '/products',
        '/technologies',
        '/contact',
    ];

    const sitemap: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        routes.forEach((route) => {
            sitemap.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: route === '' || route === '/news' ? 'daily' : 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemap;
}

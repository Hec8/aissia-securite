import type { Metadata } from 'next';

type SupportedLocale = 'fr' | 'en';

type PageMetadataOptions = {
    locale?: SupportedLocale;
    path?: string;
    title: string;
    description: string;
    keywords?: string[];
    noIndex?: boolean;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
const siteName = 'AISSIA SÉCURITÉ';
const defaultOgImage = '/images/Whisk_6e32ef6726784ffaef04ff7fe96685e3dr.jpeg';

const commonKeywordsByLocale: Record<SupportedLocale, string[]> = {
    fr: [
        'securite privee',
        'sécurité privée',
        'societe de securite',
        'entreprise de sécurité',
        'agent de sécurité',
        'gardiennage',
        'gardiennage abidjan',
        'surveillance',
        'surveillance de site',
        'securite cote d ivoire',
        'sécurité côte d’ivoire',
        'sécurité événementielle',
        'sécurité entreprise',
        'protection des biens',
        'protection des personnes',
        'formation sécurité',
        'formation agent de sécurité',
        'AISSIA Sécurité',
        'Abidjan',
        'Côte d’Ivoire',
    ],
    en: [
        'private security',
        'security guards',
        'surveillance services',
        'event security',
        'corporate security',
        'asset protection',
        'professional security training',
        'AISSIA Security',
        'Abidjan',
        'Ivory Coast',
    ],
};

function sanitizePath(path: string): string {
    if (!path || path === '/') return '/';

    const prefixedPath = path.startsWith('/') ? path : `/${path}`;
    const pathWithoutTrailingSlash = prefixedPath.replace(/\/+$/, '');

    return `${pathWithoutTrailingSlash}/`;
}

function buildLocalizedUrl(locale: SupportedLocale, path: string): string {
    return `${siteUrl}/${locale}${sanitizePath(path)}`;
}

function uniqueKeywords(locale: SupportedLocale, extraKeywords: string[] = []): string[] {
    return [...new Set([...commonKeywordsByLocale[locale], ...extraKeywords])];
}

export function generatePageMetadata({
    locale = 'fr',
    path = '',
    title,
    description,
    keywords = [],
    noIndex = false,
}: PageMetadataOptions): Metadata {
    const canonicalUrl = buildLocalizedUrl(locale, path);
    const frUrl = buildLocalizedUrl('fr', path);
    const enUrl = buildLocalizedUrl('en', path);

    return {
        title,
        description,
        keywords: uniqueKeywords(locale, keywords),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                fr: frUrl,
                en: enUrl,
                'x-default': frUrl,
            },
        },
        openGraph: {
            type: 'website',
            locale: locale === 'fr' ? 'fr_FR' : 'en_US',
            url: canonicalUrl,
            siteName,
            title,
            description,
            images: [
                {
                    url: defaultOgImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [defaultOgImage],
        },
        robots: noIndex
            ? {
                  index: false,
                  follow: false,
                  googleBot: {
                      index: false,
                      follow: false,
                      'max-video-preview': -1,
                      'max-image-preview': 'large',
                      'max-snippet': -1,
                  },
              }
            : {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      'max-video-preview': -1,
                      'max-image-preview': 'large',
                      'max-snippet': -1,
                  },
              },
    };
}

export function getOrganizationStructuredData(locale: SupportedLocale = 'fr') {
    const companyDescription =
        locale === 'fr'
            ? 'Entreprise de sécurité privée et de formation professionnelle en Côte d’Ivoire.'
            : 'Private security and professional training company in Ivory Coast.';

    return {
        '@context': 'https://schema.org',
        '@type': 'SecurityService',
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/logo/Variantes logo-03.png`,
        image: `${siteUrl}${defaultOgImage}`,
        description: companyDescription,
        areaServed: 'CI',
        telephone: ['+2252722261328', '+2250717512692', '+2250717508264', '+2250717509044'],
        email: 'contact@aissia-securite.com',
    };
}

export function getWebsiteStructuredData(locale: SupportedLocale = 'fr') {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
        inLanguage: locale,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/${locale}/news?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };
}

export function getFaqStructuredData(
    locale: SupportedLocale,
    questions: Array<{ question: string; answer: string }>
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: locale,
        mainEntity: questions.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

export function getBreadcrumbStructuredData(
    locale: SupportedLocale,
    items: Array<{ name: string; path: string }>
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: buildLocalizedUrl(locale, item.path),
        })),
    };
}

export function generateMetadata(
    title: string,
    description: string,
    locale: string = 'fr'
): Metadata {
    return generatePageMetadata({
        locale: locale === 'en' ? 'en' : 'fr',
        title: `${title} | ${siteName}`,
        description,
    });
}

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'AISSIA SÉCURITÉ - Excellence en Sécurité Privée',
        template: '%s | AISSIA SÉCURITÉ',
    },
    description: 'AISSIA SÉCURITÉ, votre partenaire de confiance pour tous vos besoins en sécurité privée et formation professionnelle.',
    applicationName: 'AISSIA SÉCURITÉ',
    keywords: uniqueKeywords('fr'),
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        siteName,
        title: 'AISSIA SÉCURITÉ - Excellence en Sécurité Privée',
        description: 'Votre partenaire de confiance pour tous vos besoins en sécurité privée et formation professionnelle.',
        url: siteUrl,
        images: [
            {
                url: defaultOgImage,
                width: 1200,
                height: 630,
                alt: 'AISSIA SÉCURITÉ',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AISSIA SÉCURITÉ',
        description: 'Excellence en Sécurité Privée',
        images: [defaultOgImage],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        // À compléter avec les codes de vérification Google, Bing, etc.
        // google: 'verification_code',
        // yandex: 'verification_code',
        // bing: 'verification_code',
    },
};

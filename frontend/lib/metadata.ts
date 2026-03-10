import type { Metadata } from 'next';

export function generateMetadata(
    title: string,
    description: string,
    locale: string = 'fr'
): Metadata {
    const siteName = 'AISSIA SÉCURITÉ';
    const fullTitle = `${title} | ${siteName}`;

    return {
        title: fullTitle,
        description,
        keywords: 'sécurité, sécurité privée, agent de sécurité, formation sécurité, gardiennage, surveillance, AISSIA',
        authors: [{ name: siteName }],
        openGraph: {
            title: fullTitle,
            description,
            siteName,
            locale: locale === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
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
    };
}

export const defaultMetadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
        default: 'AISSIA SÉCURITÉ - Excellence en Sécurité Privée',
        template: '%s | AISSIA SÉCURITÉ',
    },
    description: 'AISSIA SÉCURITÉ, votre partenaire de confiance pour tous vos besoins en sécurité privée et formation professionnelle.',
    applicationName: 'AISSIA SÉCURITÉ',
    keywords: [
        'sécurité',
        'sécurité privée',
        'agent de sécurité',
        'formation sécurité',
        'gardiennage',
        'surveillance',
        'protection',
        'sécurité événementielle',
        'AISSIA',
    ],
    authors: [{ name: 'AISSIA SÉCURITÉ' }],
    creator: 'AISSIA SÉCURITÉ',
    publisher: 'AISSIA SÉCURITÉ',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        siteName: 'AISSIA SÉCURITÉ',
        title: 'AISSIA SÉCURITÉ - Excellence en Sécurité Privée',
        description: 'Votre partenaire de confiance pour tous vos besoins en sécurité privée et formation professionnelle.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AISSIA SÉCURITÉ',
        description: 'Excellence en Sécurité Privée',
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

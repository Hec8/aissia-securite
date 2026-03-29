import type { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;

    return generatePageMetadata({
        locale,
        path: '/contact',
        title: locale === 'fr' ? 'Contact AISSIA SÉCURITÉ - Demande de devis sécurité' : 'Contact AISSIA SECURITY - Request a Security Quote',
        description:
            locale === 'fr'
                ? 'Contactez AISSIA SÉCURITÉ pour vos besoins en gardiennage, surveillance, sécurité événementielle et formation professionnelle.'
                : 'Contact AISSIA SECURITY for guarding, surveillance, event security and professional training needs.',
        keywords:
            locale === 'fr'
                ? ['contact sécurité privée', 'devis sécurité', 'entreprise de gardiennage Abidjan']
                : ['contact private security', 'security quote', 'guarding company Abidjan'],
    });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}

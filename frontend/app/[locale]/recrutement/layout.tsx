import type { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;

    return generatePageMetadata({
        locale,
        path: '/recrutement',
        title: locale === 'fr' ? 'Recrutement sécurité - AISSIA SÉCURITÉ' : 'Security Recruitment - AISSIA SECURITY',
        description:
            locale === 'fr'
                ? 'Consultez nos offres de recrutement en sécurité privée et postulez pour rejoindre les équipes AISSIA SÉCURITÉ.'
                : 'Browse our private security job offers and apply to join AISSIA SECURITY teams.',
        keywords:
            locale === 'fr'
                ? ['recrutement agent de sécurité', 'emploi sécurité privée', 'offres emploi sécurité Abidjan']
                : ['security guard recruitment', 'private security jobs', 'security jobs Abidjan'],
    });
}

export default function RecruitmentLayout({ children }: { children: React.ReactNode }) {
    return children;
}

import type { Metadata } from 'next';
import { generatePageMetadata, getBreadcrumbStructuredData, getFaqStructuredData } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const normalizedLocale = locale === 'en' ? 'en' : 'fr';

    return generatePageMetadata({
        locale: normalizedLocale,
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

export default async function RecruitmentLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const normalizedLocale = locale === 'en' ? 'en' : 'fr';

    const faqSchema = getFaqStructuredData(normalizedLocale, [
        {
            question: locale === 'fr' ? 'Comment postuler aux offres de sécurité ?' : 'How can I apply for security jobs?',
            answer:
                locale === 'fr'
                    ? 'Sélectionnez une offre sur la page recrutement et soumettez votre candidature via le formulaire dédié.'
                    : 'Select a job offer on the recruitment page and submit your application through the dedicated form.',
        },
        {
            question: locale === 'fr' ? 'Quels profils recherchez-vous ?' : 'Which profiles are you looking for?',
            answer:
                locale === 'fr'
                    ? 'Nous recherchons des profils motivés pour les métiers de la sécurité privée, de la surveillance et des opérations terrain.'
                    : 'We are looking for motivated profiles for private security, surveillance and field operations roles.',
        },
    ]);
    const breadcrumbSchema = getBreadcrumbStructuredData(normalizedLocale, [
        { name: locale === 'fr' ? 'Accueil' : 'Home', path: '' },
        { name: locale === 'fr' ? 'Recrutement' : 'Recruitment', path: '/recrutement' },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {children}
        </>
    );
}

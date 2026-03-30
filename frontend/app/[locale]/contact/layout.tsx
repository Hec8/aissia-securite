import type { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { generatePageMetadata, getBreadcrumbStructuredData, getFaqStructuredData } from '@/lib/metadata';

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

export default async function ContactLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const faqSchema = getFaqStructuredData(locale, [
        {
            question: locale === 'fr' ? 'Comment contacter AISSIA SÉCURITÉ rapidement ?' : 'How can I quickly contact AISSIA SECURITY?',
            answer:
                locale === 'fr'
                    ? 'Vous pouvez nous écrire via le formulaire de contact, par email ou par téléphone pour une réponse rapide.'
                    : 'You can contact us through the contact form, email or phone for a fast response.',
        },
        {
            question: locale === 'fr' ? 'Puis-je demander un devis personnalisé ?' : 'Can I request a custom quote?',
            answer:
                locale === 'fr'
                    ? 'Oui, nous proposons des devis personnalisés selon votre activité, votre site et vos contraintes de sécurité.'
                    : 'Yes, we provide custom quotes based on your business, site and security requirements.',
        },
    ]);
    const breadcrumbSchema = getBreadcrumbStructuredData(locale, [
        { name: locale === 'fr' ? 'Accueil' : 'Home', path: '' },
        { name: locale === 'fr' ? 'Contact' : 'Contact', path: '/contact' },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {children}
        </>
    );
}

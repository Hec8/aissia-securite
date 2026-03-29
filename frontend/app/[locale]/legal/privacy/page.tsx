import { Header, Footer } from '@/components/layout';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections';
import { Container, AnimatedSection } from '@/components/ui';
import { Locale } from '@/lib/i18n';
import { translations } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;

    return generatePageMetadata({
        locale,
        path: '/legal/privacy',
        title: locale === 'fr' ? 'Politique de confidentialité - AISSIA SÉCURITÉ' : 'Privacy Policy - AISSIA SECURITY',
        description:
            locale === 'fr'
                ? 'Consultez la politique de confidentialité d’AISSIA SÉCURITÉ concernant la collecte, l’usage et la protection de vos données personnelles.'
                : 'Read the AISSIA SECURITY privacy policy about personal data collection, usage and protection.',
        keywords: locale === 'fr' ? ['politique de confidentialité', 'protection des données', 'RGPD sécurité'] : ['privacy policy', 'data protection', 'personal data'],
    });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const t = translations[locale];
    const updated = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <>
            <Header />
            <main>
                <AnimatedSection>
                    <PageHeader
                        title={t.legal.privacy.title}
                        subtitle={t.legal.privacy.subtitle}
                        breadcrumbs={[{ name: t.nav.home, href: `/${locale}` }, { name: t.legal.privacy.breadcrumb }]}
                    />
                </AnimatedSection>

                <section className="py-12 bg-white">
                    <Container>
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-6">
                                <div className="inline-block bg-white/5 text-[var(--text-secondary)] px-4 py-2 rounded-md text-sm">{t.legal.privacy.lastUpdated} : {updated}</div>
                            </div>
                            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
                                <p>{t.legal.privacy.intro}</p>
                            </div>
                        </div>
                    </Container>
                </section>

                <section className="py-16 bg-gray-50">
                    <Container>
                        <div className="max-w-3xl mx-auto space-y-10">
                            {t.legal.privacy.sections.map((section, i) => (
                                <div key={i}>
                                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{section.title}</h2>
                                    <div className="text-[var(--text-secondary)] space-y-4">
                                        <p>{section.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            </main>
            <Footer />
        </>
    );
}

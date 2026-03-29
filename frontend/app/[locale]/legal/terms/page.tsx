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
        path: '/legal/terms',
        title: locale === 'fr' ? 'Conditions d’utilisation - AISSIA SÉCURITÉ' : 'Terms of Use - AISSIA SECURITY',
        description:
            locale === 'fr'
                ? 'Consultez les conditions d’utilisation du site AISSIA SÉCURITÉ, les responsabilités et les règles applicables à nos services en ligne.'
                : 'Read the AISSIA SECURITY website terms of use, responsibilities and applicable online service rules.',
        keywords: locale === 'fr' ? ['conditions d’utilisation', 'mentions légales', 'conditions de service'] : ['terms of use', 'legal notice', 'service terms'],
    });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const t = translations[locale];
    const updated = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <>
            <Header />
            <main>
                <AnimatedSection>
                    <PageHeader
                        title={t.legal.terms.title}
                        subtitle={t.legal.terms.subtitle}
                        breadcrumbs={[{ name: t.nav.home, href: `/${locale}` }, { name: t.legal.terms.breadcrumb }]}
                    />
                </AnimatedSection>

                <section className="py-12 bg-white">
                    <Container>
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-6">
                                <div className="inline-block bg-white/5 text-[var(--text-secondary)] px-4 py-2 rounded-md text-sm">{t.legal.terms.lastUpdated} : {updated}</div>
                            </div>
                            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
                                <p>{t.legal.terms.intro}</p>
                            </div>
                        </div>
                    </Container>
                </section>

                <section className="py-16 bg-gray-50">
                    <Container>
                        <div className="max-w-3xl mx-auto space-y-10">
                            {t.legal.terms.sections.map((section, i) => (
                                <div key={i}>
                                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{section.title}</h2>
                                    <p className="text-[var(--text-secondary)]">{section.body}</p>
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

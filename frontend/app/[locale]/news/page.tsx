import { Header, Footer } from '@/components/layout';
import { PageHeader } from '@/components/sections';
import { Card, CardBody, Container } from '@/components/ui';
import { ParticleNetwork } from '@/components/ui/ParticleNetwork';
import { translations } from '@/lib/translations';
import { Locale } from '@/lib/i18n';
import Link from 'next/link';

export default async function NewsPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const t = translations[locale] ?? translations['fr'];

    // Fetch articles server-side
    let news: any[] = [];
    let error: string | null = null;
    try {
        const res = await (await import('@/lib/api')).api.getArticles({ limit: 12 });
        if (res.success) news = res.data || [];
        else error = res.message || 'Erreur de chargement';
    } catch (e) {
        error = 'Erreur de chargement';
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <>
            <Header />
            <ParticleNetwork />
            <main>
                <PageHeader
                    title={t.news.title}
                    subtitle={t.news.subtitle}
                    breadcrumbs={[
                        { name: t.nav.home, href: `/${locale}` },
                        { name: t.nav.news },
                    ]}
                />

                <section className="py-20 bg-white">
                    <Container>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((article) => (
                                <Card key={article.id} hover>
                                    <div className="relative h-48 bg-[var(--accent)] flex items-center justify-center overflow-hidden">
                                        {/* Placeholder for image */}
                                        <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center">
                                            <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="absolute top-4 right-4 bg-[var(--secondary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            {article.category}
                                        </span>
                                    </div>
                                    <CardBody>
                                        <div className="flex items-center text-sm text-[var(--text-secondary)] mb-3">
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                            {article.published_at ? new Date(article.published_at).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                                        </div>
                                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 hover:text-[var(--primary)] transition-colors">
                                            <Link href={`/${locale}/news/${article.id}`}>
                                                {article.title}
                                            </Link>
                                        </h3>
                                        <p className="text-[var(--text-secondary)] mb-4 line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                        <Link
                                            href={`/${locale}/news/${article.id}`}
                                            className="text-[var(--primary)] font-semibold hover:underline inline-flex items-center"
                                        >
                                            {t.common.readMore}
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                        {/* Pagination à implémenter avec l'API */}
                    </Container>
                </section>
            </main>
            <Footer />
        </>
    );
}

import { Header, Footer } from '@/components/layout';
import { PageHeader } from '@/components/sections';
import { Container } from '@/components/ui';
import { ParticleNetwork } from '@/components/ui/ParticleNetwork';
import { translations } from '@/lib/translations';
import { Locale } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';
import DocsExpandable from '@/components/ui/DocsExpandable';
import { AnimatedSection, ScaleAnimation, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';

export default async function TrainingPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const t = translations[locale];

    const moduleImages = [
        '/images/Whisk_935eee3760f5b579dc6493b3f649dd4cdr.jpeg',
        '/images/Whisk_5b6a220cce09155b41b4433c57706c64dr.jpeg',
        '/images/Whisk_6e32ef6726784ffaef04ff7fe96685e3dr.jpeg',
        '/images/Whisk_b3295edd22f0c9aaef84b8a0cb61a288dr.jpeg',
        '/images/Whisk_4c173eda2ddccc68af54a6bd0f0abda5dr.jpeg',
        '/images/Whisk_e3e1cdf449f884b8f5b406bdbe966519dr.jpeg',
        '/images/Whisk_cf25d71bd9128dfb22141568e15d04a3dr.jpeg',
        '/images/Whisk_de2cf0006a6e0838ea9477dbb5ba68cedr.jpeg',
        '/images/Whisk_47b0b5038e58a95a87042a6fd0231c05dr.jpeg',
        '/images/Whisk_b45eac5d7cb2009b2e648461d62d93e9dr.jpeg',
        '/images/Whisk_b3295edd22f0c9aaef84b8a0cb61a288dr.jpeg',
        '/images/Whisk_e6308d781c51042a7cf4162c4757b890dr.jpeg',
    ];
    const trainingModules = t.training.modules.map((m, i) => ({ ...m, image: moduleImages[i] }));

    return (
        <>
            <Header />
            <ParticleNetwork />
            <main>
                <AnimatedSection>
                <PageHeader
                    title={t.training.title}
                    subtitle={t.training.subtitle}
                    image="/images/Whisk_935eee3760f5b579dc6493b3f649dd4cdr.jpeg"
                    breadcrumbs={[
                        { name: t.nav.home, href: `/${locale}` },
                        { name: t.nav.training },
                    ]}
                />
                </AnimatedSection>

                {/* Section Programme de formation */}
                <AnimatedSection>
                    <section className="py-20 bg-white">
                        <Container>
                            <ScaleAnimation>
                                <div className="bg-[var(--primary)] text-white rounded-2xl p-8 sm:p-12 text-center">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
                                        {t.training.programTitle}
                                    </h2>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white">
                                        {t.training.programSubtitle}
                                    </h3>
                                    <p className="text-xl mb-8">{t.training.viewModules}</p>
                                    
                                    <div className="max-w-3xl mx-auto text-sm md:text-base">
                                        <p className="font-semibold">
                                            {t.training.durationFull}
                                        </p>

                                        <p className="font-semibold text-[var(--secondary)] mt-4 mb-6">
                                            {t.training.admissionCriteria}
                                        </p>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 text-left items-start">
                                            {/* Colonne gauche : 3 critères */}
                                            <ul className="space-y-4">
                                                <li className="flex items-start gap-3">
                                                    <span className="flex-none w-7 h-7 rounded-full bg-white/10 text-[var(--secondary)] flex items-center justify-center"> 
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                    <span>{t.training.heightReq}</span>
                                                </li>

                                                <li className="flex items-start gap-3">
                                                    <span className="flex-none w-7 h-7 rounded-full bg-white/10 text-[var(--secondary)] flex items-center justify-center"> 
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                    <span>{t.training.literacyReq}</span>
                                                </li>

                                                <li className="flex items-start gap-3">
                                                    <span className="flex-none w-7 h-7 rounded-full bg-white/10 text-[var(--secondary)] flex items-center justify-center"> 
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                    <span>{t.training.medicalCertReq}</span>
                                                </li>
                                            </ul>

                                            {/* Colonne droite : titre du dossier + rectangle liste */}
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-start gap-3">
                                                    <span className="flex-none w-7 h-7 rounded-full bg-white/10 text-[var(--secondary)] flex items-center justify-center"> 
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                    <span>{t.training.requirementsList.adminFile}</span>
                                                </div>
                                                <div className="rounded-xl bg-white/5 border border-white/10 p-4 sm:p-5">
                                                    <DocsExpandable
                                                        items={t.training.adminDocuments}
                                                        moreLabel={locale === 'en' ? 'More' : 'Plus'}
                                                        lessLabel={locale === 'en' ? 'Less' : 'Moins'}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-[var(--secondary)] mt-4">
                                            {t.training.criteriaNote}
                                        </p>
                                    </div>
                                </div>
                            </ScaleAnimation>
                        </Container>
                    </section>
                </AnimatedSection>

                {/* Section Modules de formation - Grille 2x2 style cards */}
                <section className="py-20 bg-gray-50">
                    <Container>
                        <AnimatedSection>
                            <div className="text-center mb-16">
                                <div className="inline-block bg-[var(--primary)] text-white text-sm font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-4">
                                    Modules
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                                    Nos modules de formation
                                </h2>
                                <div className="w-16 h-1 bg-[var(--secondary)] rounded-full mx-auto"></div>
                            </div>
                        </AnimatedSection>

                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.08}>
                            {trainingModules.map((module, index) => (
                                <StaggerItem key={index} direction="up">
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-[var(--secondary)] hover:shadow-xl transition-all duration-300 group">
                                        <div className="flex flex-col sm:flex-row">
                                            {/* Image */}
                                            <div className="relative w-full sm:w-2/5 min-h-[200px] sm:min-h-[220px] flex-shrink-0">
                                                <Image
                                                    src={module.image}
                                                    alt={module.title}
                                                    fill
                                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            {/* Texte */}
                                            <div className="flex-1 p-6 flex flex-col justify-center">
                                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                                                    {module.title}
                                                </h3>
                                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                                                    {module.description}
                                                </p>
                                                <Link
                                                    href={`/${locale}/contact`}
                                                    className="inline-flex items-center gap-1.5 text-[var(--secondary)] font-semibold text-sm hover:text-[var(--primary)] transition-colors group/link"
                                                >
                                                    {t.common.learnMore}
                                                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </Container>
                </section>

                {/* CTA Section */}
                <AnimatedSection>
                    <section className="py-20 bg-white">
                        <Container>
                            <div className="text-center">
                                <ScaleAnimation>
                                    <Link 
                                        href={`/${locale}/contact`}
                                        className="inline-block px-12 py-4 bg-[var(--secondary)] text-[var(--primary)] font-bold text-lg rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:scale-110 transform duration-300"
                                    >
                                        {t.training.cta}
                                    </Link>
                                </ScaleAnimation>
                            </div>
                        </Container>
                    </section>
                </AnimatedSection>
            </main>
            <Footer />
        </>
    );
}

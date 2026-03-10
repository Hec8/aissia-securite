import { Header, Footer } from '@/components/layout';
import { PageHeader } from '@/components/sections';
import { Container } from '@/components/ui';
import { ParticleNetwork } from '@/components/ui/ParticleNetwork';
import { translations } from '@/lib/translations';
import { Locale } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection, ScaleAnimation, } from '@/components/animations/AnimatedSection';

export default async function TechnologiesPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const t = translations[locale];

    const technologies = [
        {
            name: 'Aissia Guard',
            category: t.technologies.alertguard.category,
            title: t.technologies.alertguard.title,
            description: t.technologies.alertguard.description,
            image: '/mobile/Design sans titre-3.jpg.jpeg',
            features: t.technologies.alertguard.features, 
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <Header />
            <ParticleNetwork />
            <main>
                <AnimatedSection>
                    <PageHeader
                        title={t.technologies.title}
                        subtitle={t.technologies.subtitle}
                        image="/images/Whisk_e3e1cdf449f884b8f5b406bdbe966519dr.jpeg"
                        breadcrumbs={[
                            { name: t.nav.home, href: `/${locale}` },
                            { name: t.nav.technologies },
                        ]}
                    />
                </AnimatedSection>

                {/* Introduction */}
                <section className="py-20 bg-white">
                    <Container>
                        <AnimatedSection>
                            <div className="max-w-3xl mx-auto text-center">
                                
                                <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6">
                                    {t.technologies.introTitle}
                                </h2>
                                <div className="w-16 h-1 bg-[var(--secondary)] rounded-full mx-auto mb-6" />
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {t.technologies.introDescription}
                                </p>
                            </div>
                        </AnimatedSection>
                    </Container>
                </section>

                {/* Technologies showcase */}
                {technologies.map((tech, index) => (
                    <section key={index} className={`py-20 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <Container>
                            <AnimatedSection direction={index % 2 === 0 ? 'left' : 'right'}>
                                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100`}>
                                    
                                    {/* Image */}
                                    <div className={`relative min-h-[350px] lg:min-h-[500px] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <Image
                                            src={tech.image}
                                            alt={tech.name}
                                            fill
                                            className="object-contain"
                                        />
                                        {/* Category badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[var(--secondary)] text-[var(--primary)] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                                                {tech.category}
                                            </span>
                                        </div>
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className={`flex flex-col justify-center p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        <div className="w-14 h-14 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-[var(--secondary)] mb-6 shadow-md">
                                            {tech.icon}
                                        </div>

                                        <h2 className="text-3xl lg:text-4xl font-black text-[var(--primary)] mb-2 tracking-tight uppercase">
                                            {tech.name}
                                        </h2>
                                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                                            {tech.title}
                                        </h3>
                                        <div className="w-12 h-1 bg-[var(--secondary)] rounded-full mb-6" />

                                        <p className="text-gray-600 leading-relaxed mb-8">
                                            {tech.description}
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-3 mb-8">
                                            {tech.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 bg-[var(--secondary)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <svg className="w-3.5 h-3.5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-gray-700 text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <Link
                                                href={`/${locale}/contact`}
                                                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--secondary)] text-[var(--primary)] font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg group"
                                            >
                                                {t.technologies.cta}
                                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </Container>
                    </section>
                ))}

                {/* How it works */}

                {/* Satellite Diagram Section */}
                <section className="py-20 bg-white">
                    <Container>
                        <AnimatedSection>
                            <div className="relative w-full max-w-6xl mx-auto px-4">
                                <Image
                                    src="/mobile/Design sans titre.jpg.jpeg"
                                    alt="Aissia Guard System Diagram"
                                    width={1920}
                                    height={800}
                                    className="w-full h-auto rounded-2xl shadow-lg"
                                />
                            </div>
                        </AnimatedSection>
                    </Container>
                </section>

                {/* Application Mobile Section */}

                {/* CTA Section */}
                <section className="relative py-32 overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/images/Whisk_cf25d71bd9128dfb22141568e15d04a3dr.jpeg"
                            alt="Technologies"
                            fill
                            className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-black/70" />
                    </div>

                    <Container className="relative z-10">
                        <AnimatedSection>
                            <div className="max-w-4xl mx-auto text-center">
                                <div className="inline-block px-6 py-2 bg-[var(--secondary)] text-[var(--primary)] rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
                                    {t.technologies.ctaSection.badge}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    {t.technologies.ctaSection.title}
                                </h2>
                                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                    {t.technologies.ctaSection.description}
                                </p>
                                <ScaleAnimation delay={0.3}>
                                    <Link
                                        href={`/${locale}/contact`}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[var(--primary)] transition-all duration-300 hover:scale-110 transform"
                                    >
                                        {t.technologies.ctaSection.button}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </ScaleAnimation>
                            </div>
                        </AnimatedSection>
                    </Container>
                </section>
            </main>
            <Footer />
        </>
    );
}

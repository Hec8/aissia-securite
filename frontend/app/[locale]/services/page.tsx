import { Header, Footer } from '@/components/layout';
import { PageHeader } from '@/components/sections';
import { Container } from '@/components/ui';
import { ParticleNetwork } from '@/components/ui/ParticleNetwork';
import { translations } from '@/lib/translations';
import { Locale } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection, ScaleAnimation, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const t = translations[locale];

    const serviceImages = [
        '/images/Whisk_5b6a220cce09155b41b4433c57706c64dr.jpeg',
        '/images/Whisk_b3295edd22f0c9aaef84b8a0cb61a288dr.jpeg',
        '/images/Whisk_935eee3760f5b579dc6493b3f649dd4cdr.jpeg',
        '/images/Whisk_4c173eda2ddccc68af54a6bd0f0abda5dr.jpeg',
    ];
    const serviceIcons = [
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>),
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>),
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>),
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    ];
    const services = t.services.servicesList.map((s, i) => ({ ...s, icon: serviceIcons[i], image: serviceImages[i] }));

    return (
        <>
            <Header />
            <ParticleNetwork />
            <main>
                <AnimatedSection>
                <PageHeader
                    title={t.services.title}
                    subtitle={t.services.subtitle}
                    image="/images/Whisk_6e32ef6726784ffaef04ff7fe96685e3dr.jpeg"
                    breadcrumbs={[
                        { name: t.nav.home, href: `/${locale}` },
                        { name: t.nav.services },
                    ]}
                />
                </AnimatedSection>

                {/* Services Section */}
                <section className="py-20 bg-white">
                    <Container>
                        <AnimatedSection>
                            <div className="text-center mb-16">
                                <div className="inline-block bg-[var(--primary)] text-white text-sm font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-4">
                                    {t.services.title}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                                    {t.services.subtitle}
                                </h2>
                                <div className="w-16 h-1 bg-[var(--secondary)] rounded-full mx-auto"></div>
                            </div>
                        </AnimatedSection>

                        <div className="space-y-20">
                            {services.map((service, index) => (
                                <AnimatedSection key={index} direction={index % 2 === 0 ? 'left' : 'right'}>
                                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-500 ${index % 2 === 1 ? '' : ''}`}>
                                        
                                        {/* Image */}
                                        <div className={`relative min-h-[320px] lg:min-h-[400px] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover object-top"
                                            />
                                            {/* Badge sur l'image */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-[var(--secondary)] text-[var(--primary)] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                                                    {service.badge}
                                                </span>
                                            </div>
                                            {/* Numéro en overlay */}
                                            <div className="absolute bottom-4 right-4">
                                                <span className="text-white/20 text-8xl font-black leading-none">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Contenu texte */}
                                        <div className={`flex flex-col justify-center p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                            <div className="w-14 h-14 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-[var(--secondary)] mb-6 shadow-md">
                                                {service.icon}
                                            </div>
                                            <h3 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                                                {service.title}
                                            </h3>
                                            <div className="w-10 h-1 bg-[var(--secondary)] rounded-full mb-5"></div>
                                            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                                                {service.description}
                                            </p>
                                            <div>
                                                <Link 
                                                    href={`/${locale}/contact`}
                                                    className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--secondary)] transition-colors group"
                                                >
                                                    En savoir plus
                                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-[var(--primary)]">
                    <Container>
                        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-6" staggerDelay={0.1}>
                            {t.services.stats.map((stat, index) => (
                                <StaggerItem key={index} direction="scale">
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-black text-[var(--secondary)] mb-2">{stat.number}</div>
                                        <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </Container>
                </section>

                {/* Rejoignez-nous Section */}
                <section className="relative py-32 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image 
                            src="/images/Whisk_48cad00aca33977a38c4b336d234e7f3dr.jpeg"
                            alt="Formation en sécurité"
                            fill
                            className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-black/70"></div>
                    </div>

                    {/* Content */}
                    <Container className="relative z-10">
                        <AnimatedSection>
                            <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-block px-6 py-2 bg-[var(--secondary)] text-[var(--primary)] rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
                                {t.services.joinUs.badge}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                {t.services.joinUs.title}
                            </h2>
                            <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                {t.services.joinUs.fullDescription}
                            </p>
                            <ScaleAnimation delay={0.3}>
                                <Link 
                                    href={`/${locale}/training`}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[var(--primary)] transition-all duration-300 hover:scale-110 transform"
                                >
                                    {t.services.joinUs.button}
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

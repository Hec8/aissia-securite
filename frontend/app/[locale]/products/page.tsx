import { Header, Footer } from '@/components/layout';
import { PageHeader } from '@/components/sections';
import { AnimatedSection, ScaleAnimation, StaggerContainer } from '@/components/ui';
import { Container } from '@/components/ui';
import { ParticleNetwork } from '@/components/ui/ParticleNetwork';
import { translations } from '@/lib/translations';
import { Locale } from '@/lib/i18n';
import Link from 'next/link';
import Image from 'next/image';
import { QuoteButton } from '@/components/ui/QuoteModal';

export default async function ProductsPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const t = translations[locale];

    const securityServiceIcons = [
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>),
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm0 0c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3zm-3 3v4m6-4v4M5.5 21h13" /></svg>),
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>),
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    ];
    const securityServices = t.products.securityServices.map((s, i) => ({ ...s, icon: securityServiceIcons[i] }));

    const additionalServiceIcons = [
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>),
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>),
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
        (<svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11v1a7 7 0 01-14 0v-1" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17v4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21h8" /></svg>),
    ];
    const additionalServices = t.products.additionalServices.map((s, i) => ({ ...s, icon: additionalServiceIcons[i] }));

    const strategicServiceIcons = [
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>),
        (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>),
    ];
    const strategicServices = t.products.strategicServices.map((s, i) => ({ ...s, icon: strategicServiceIcons[i] }));

    const annexServices = t.products.annexServices.map(s => ({
        ...s,
        image: '/images/Whisk_935eee3760f5b579dc6493b3f649dd4cdr.jpeg',
        icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
        features: [] as string[],
    }));

    return (
        <>
            <Header />
            <ParticleNetwork />
            <main>
                <AnimatedSection>
                <PageHeader
                    title={t.products.title}
                    subtitle={t.products.subtitle}
                    image="/images/Whisk_b3295edd22f0c9aaef84b8a0cb61a288dr.jpeg"
                    breadcrumbs={[
                        { name: t.nav.home, href: `/${locale}` },
                        { name: t.nav.products },
                    ]}
                />
                </AnimatedSection>

                {/* Sécurité et surveillance — Image 1 layout: sidebar + 2×2 grid */}
                <section className="py-20 bg-gray-50">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                            {/* Left sidebar */}
                            <AnimatedSection className="lg:col-span-1 lg:self-center">
                                <span className="inline-block px-4 py-1.5 bg-[var(--secondary)] text-[var(--primary)] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                    {t.products.badgeLabel}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6 leading-tight">
                                    {t.products.security.sectionTitle}
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    {t.products.security.description}
                                </p>
                                <QuoteButton
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg"
                                >
                                    {t.products.quoteArrow}
                                </QuoteButton>
                            </AnimatedSection>

                            {/* Right 2×2 grid */}
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {securityServices.map((service, index) => (
                                    <ScaleAnimation key={index} delay={index * 0.1}>
                                        <div 
                                            className={`relative rounded-2xl p-6 h-full transition-all duration-300 shadow-xl group ${
                                                index === 0 || index === 3
                                                    ? 'bg-[var(--primary)] text-white shadow-2xl'
                                                    : 'bg-white border border-[var(--secondary)]'
                                            }`}
                                        >
                                            {/* Arrow top-right */}
                                            <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                                                index === 0 || index === 3 ? 'bg-white/20' : 'bg-gray-100'
                                            }`}>
                                                <span className={`text-lg ${index === 0 || index === 3 ? 'text-white' : 'text-[var(--primary)]'}`}>↗</span>
                                            </div>

                                            {/* Badge */}
                                            {service.badge && (
                                                <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 ${
                                                    index === 0 || index === 3 ? 'bg-[var(--secondary)] text-[var(--primary)]' : 'bg-red-100 text-red-600'
                                                }`}>
                                                    {service.badge}
                                                </span>
                                            )}

                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                                                index === 0 || index === 3 ? 'bg-white/20 text-white' : 'bg-[var(--secondary)]/20 text-[var(--secondary)]'
                                            }`}>
                                                {service.icon}
                                            </div>

                                            {/* Title */}
                                            <h3 className={`text-lg font-bold mb-3 ${
                                                index === 0 || index === 3 ? 'text-white' : 'text-[var(--primary)]'
                                            }`}>
                                                {service.title}
                                            </h3>

                                            {/* Features */}
                                            <ul className="space-y-2">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className={`text-sm ${
                                                        index === 0 || index === 3 ? 'text-white/80' : 'text-gray-600'
                                                    }`}>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </ScaleAnimation>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Prestations supplémentaires — Image 2 layout: centered header + 3 icon cards */}
                <section className="py-20 bg-white">
                    <Container>
                        {/* Centered header */}
                        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4">
                                {t.products.additional.sectionTitle}
                            </h2>
                            <div className="w-12 h-1 bg-[var(--secondary)] mx-auto mb-4" />
                            <p className="text-gray-500">
                                {t.products.additional.description}
                            </p>
                        </AnimatedSection>

                        {/* 3 cards row */}
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            {additionalServices.map((service, index) => (
                                <ScaleAnimation key={index} delay={index * 0.15}>
                                    <div className="text-center group bg-white rounded-2xl p-8 border-2 border-[var(--secondary)] shadow-xl transition-all duration-300 flex flex-col justify-between h-full md:min-h-[360px]">
                                        {/* Circular icon */}
                                        <div className="w-24 h-24 bg-[var(--primary)] text-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            {service.icon}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-[var(--primary)] mb-3">
                                            {service.title}
                                        </h3>

                                        {/* Features as description */}
                                        <div className="text-gray-500 text-sm space-y-1 mb-5">
                                            {service.features.map((feature, idx) => (
                                                <p key={idx}>{feature}</p>
                                            ))}
                                        </div>

                                        {/* Read More link */}
                                        <QuoteButton
                                            className="inline-flex items-center gap-1 text-[var(--secondary)] font-semibold text-sm hover:gap-2 transition-all"
                                        >
                                            Demander un devis <span>→</span>
                                        </QuoteButton>
                                    </div>
                                </ScaleAnimation>
                            ))}
                        </StaggerContainer>
                    </Container>
                </section>

                {/* Analyses & Notes Stratégiques — sidebar + cards */}
                <section className="py-20 bg-[var(--primary)]">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                            {/* Left sidebar */}
                            <AnimatedSection className="lg:col-span-1">
                                <span className="inline-block px-4 py-1.5 bg-[var(--secondary)] text-[var(--primary)] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                    {t.products.strategic.badge}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    {t.products.strategic.sectionTitle}
                                </h2>
                                <p className="text-white/70 mb-8 leading-relaxed">
                                    {t.products.strategic.description}
                                </p>
                                <QuoteButton
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--secondary)] text-[var(--primary)] font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg"
                                >
                                    {t.products.quote}
                                </QuoteButton>
                            </AnimatedSection>

                            {/* Right cards */}
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {strategicServices.map((service, index) => (
                                    <ScaleAnimation key={index} delay={index * 0.1}>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                                            <div className="w-14 h-14 bg-[var(--secondary)]/20 text-[var(--secondary)] rounded-xl flex items-center justify-center mb-4">
                                                {service.icon}
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-3">
                                                {service.title}
                                            </h3>
                                            <ul className="space-y-2">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="text-white/70 text-sm">
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </ScaleAnimation>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Prestations annexes — minimal centered card */}
                <section className="py-20 bg-gray-50">
                    <Container>
                        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
                            <span className="inline-block px-4 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                {t.products.annex.badge}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4">
                                {t.products.annex.sectionTitle}
                            </h2>
                            <div className="w-12 h-1 bg-[var(--secondary)] mx-auto" />
                        </AnimatedSection>

                        <div className="max-w-4xl mx-auto">
                            {annexServices.map((service, index) => (
                                <ScaleAnimation key={index} delay={0.2}>
                                    <div className="bg-white rounded-2xl border-2 border-[var(--secondary)] hover:shadow-xl transition-all duration-300">
                                        <div className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-6">
                                            <div className="w-full sm:w-56 h-60 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image src={service.image ?? '/images/Whisk_b3295edd22f0c9aaef84b8a0cb61a288dr.jpeg'} alt={service.title} width={400} height={280} className="object-cover w-full h-full" />
                                            </div>
                                            <div className="flex-1 px-0 sm:px-4 py-2">
                                                <h3 className="text-xl font-bold text-[var(--primary)] md:mt-10">{service.title}</h3>
                                                <p className="text-gray-700 mt-6">{service.description || ''}</p>
                                                <div>
                                                    <QuoteButton className="inline-flex items-center gap-1 bg-[var(--secondary)] p-3 mt-2 rounded-lg text-[var(--primary)] hover:scale-105 font-semibold text-sm hover:gap-2 transition-all">
                                                    {t.products.quoteArrow}
                                                </QuoteButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScaleAnimation>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* CTA Section */}
                <section className="relative py-32 overflow-hidden w-full">
                    {/* Background image */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/Whisk_b3295edd22f0c9aaef84b8a0cb61a288dr.jpeg"
                            alt=""
                            fill
                            className="object-cover object-[center_20%]"
                        />
                        <div className="absolute inset-0 bg-black/70"></div>
                    </div>
                    
                    <div className="relative z-10 w-full">
                        <AnimatedSection delay={0.2}>
                        <div className="max-w-3xl mx-auto text-center px-4">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                {t.products.cta.title}
                            </h2>
                            <p className="text-lg mb-8 text-white/90">
                                {t.products.cta.description}
                            </p>
                            <ScaleAnimation delay={0.3}>
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-block px-12 py-4 bg-[var(--secondary)] text-[var(--primary)] font-bold text-lg rounded-lg hover:scale-105 hover:opacity-90 transition-all shadow-lg"
                            >
                                {t.products.cta.button}
                            </Link>
                            </ScaleAnimation>
                        </div>
                        </AnimatedSection>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

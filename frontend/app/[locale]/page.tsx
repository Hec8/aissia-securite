import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { Button, Container } from '@/components/ui';
import { QuoteButton } from '@/components/ui/QuoteModal';
import { ParticleNetwork } from '@/components/ui/ParticleNetwork';
import { translations } from '@/lib/translations';
import { Locale } from '@/lib/i18n';
import { AnimatedSection, ScaleAnimation, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection';
import HomeContactForm from '@/components/sections/HomeContactForm';

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const t = translations[locale] ?? translations['fr'];

    return (
        <>
            <Header />
            <ParticleNetwork />
            <main className="overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative bg-[var(--primary)] text-white overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center pt-20 md:pt-0">
                    {/* Vidéo de fond avec opacité réduite */}
                    <div className="absolute inset-0 z-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover object-center"
                        >
                            <source src="/video-hero.mp4" type="video/mp4" />
                            {/* Fallback image si la vidéo ne charge pas */}
                            <Image 
                                src="/images/Whisk_01d70897174239db91a4cbdb45a0eb4bdr.jpeg"
                                alt="Hero background"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </video>
                        <div className="absolute inset-0 bg-[#061525]/75"></div>
                    </div>

                    <Container>
                        <div className="relative z-10 flex flex-col items-center justify-center text-center py-8 md:py-10 lg:py-16">
                            {/* Contenu texte centré */}
                            <div className="space-y-6 w-full">
                                <ScaleAnimation delay={0.2} scale={0.8}>
                                    <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-bold mb-4 text-white">
                                        {t.home.hero.subtitle || "Bienvenue chez AISSIA"}
                                    </div>
                                </ScaleAnimation>
                                <AnimatedSection direction="up" delay={0.4}>
                                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-tight text-[var(--secondary)] lg:whitespace-nowrap">
                                        {t.home.hero.title || "Gardiennage professionnel & sécurité"}
                                    </h1>
                                </AnimatedSection>
                                <AnimatedSection direction="up" delay={0.6}>
                                    <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed">
                                        {t.home.hero.description || "Solutions de sécurité complètes et sur mesure pour protéger vos biens et vos personnes."}
                                    </p>
                                </AnimatedSection>
                                <AnimatedSection direction="up" delay={0.8}>
                                    <div className="flex flex-wrap gap-4 pt-4 justify-center">
                                        <QuoteButton className="inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 active:scale-95 px-8 py-4 text-lg bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary)] border-none">
                                            {t.home.hero.ctaPrimary}
                                        </QuoteButton>
                                        <Link href={`/${locale}/services`}>
                                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--primary)]">
                                                {t.home.hero.ctaSecondary}
                                            </Button>
                                        </Link>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Services Cards - Ligne blanche comme dans la maquette */}
                <section className="py-6 bg-white/[0.95] border-b">
                    <Container>
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
                            <StaggerItem direction="up">
                                <div className="flex items-center space-x-4 p-4 rounded-lg hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-8 h-8 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[var(--text-primary)]">{t.home.serviceCards.card1.title}</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">{t.home.serviceCards.card1.subtitle}</p>
                                    </div>
                                </div>
                            </StaggerItem>

                            <StaggerItem direction="up">
                                <div className="flex items-center space-x-4 p-4 rounded-lg hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-8 h-8 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[var(--text-primary)]">{t.home.serviceCards.card2.title}</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">{t.home.serviceCards.card2.subtitle}</p>
                                    </div>
                                </div>
                            </StaggerItem>

                            <StaggerItem direction="up">
                                <div className="flex items-center space-x-4 p-4 rounded-lg hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-8 h-8 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[var(--text-primary)]">{t.home.serviceCards.card3.title}</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">{t.home.serviceCards.card3.subtitle}</p>
                                    </div>
                                </div>
                            </StaggerItem>
                        </StaggerContainer>
                    </Container>
                </section>

                {/* Section Culture/Valeurs - Inspiré de la maquette */}
                <section className="py-20 bg-white/[0.95]">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Texte */}
                            <AnimatedSection direction="left">
                                <div className="space-y-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                                        {t.home.team.title}
                                    </h2>
                                    <p className="text-lg text-[var(--text-secondary)]">
                                        {t.home.team.description}
                                    </p>
                                    
                                    <div className=" gap-6 pt-4">
                                        <ScaleAnimation delay={0.3}>
                                            <div className="text-center p-6 bg-[var(--accent)] rounded-lg">
                                                <div className="text-4xl font-bold text-[var(--secondary)] mb-2">4.7+</div>
                                                <div className="flex justify-center mb-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className="w-5 h-5 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <div className="text-sm text-[var(--text-secondary)]">{t.home.team.satisfaction}</div>
                                            </div>
                                        </ScaleAnimation>

                                        {/*<ScaleAnimation delay={0.5}>
                                            <div className="text-center p-6 bg-[var(--accent)] rounded-lg">
                                                <div className="text-4xl font-bold text-[var(--secondary)] mb-2">B+</div>
                                                <div className="flex justify-center mb-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className="w-5 h-5 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <div className="text-sm text-[var(--text-secondary)]">{t.home.team.servicesPro}</div>
                                            </div>
                                        </ScaleAnimation>*/}
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* Image placeholder - Espace pour vos photos */}
                            <AnimatedSection direction="right" delay={0.2}>
                                <div className="relative">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative group">
                                        <Image src="/team.jpeg" alt="Équipe AISSIA Sécurité" fill className="object-cover object-top" />
                                        {/* Badge 15+ ans */}
                                        {/*<ScaleAnimation delay={0.7} scale={0.7}>
                                            <div className="absolute bottom-6 right-6 bg-[var(--secondary)] text-white px-6 py-3 rounded-lg shadow-lg z-10">
                                                <div className="text-3xl font-bold">15+</div>
                                                <div className="text-sm">{t.home.team.yearsExp}</div>
                                            </div>
                                        </ScaleAnimation>*/}
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </Container>
                </section>

                {/* Section Services détaillés */}
                <section className="py-20 bg-white/[0.95]">
                    <Container>
                        {/* En-tête section */}
                        <AnimatedSection direction="up">
                            <div className="text-center mb-16">
                                <div className="inline-block px-5 py-1.5 border-2 border-[var(--primary)] rounded-full text-sm font-semibold text-[var(--primary)] mb-6">
                                    {t.home.servicesDetail.label}
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight lg:whitespace-nowrap">
                                    {t.home.servicesDetail.title}
                                </h2>
                                <p className="text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                                    {t.home.servicesDetail.subtitle}
                                </p>
                            </div>
                        </AnimatedSection>

                        {/* Grille de services - 3 colonnes, 2 lignes */}
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" staggerDelay={0.1}>
                            {/* Service 1 - Surveillance */}
                            <StaggerItem direction="up">
                                <div className="bg-white rounded-2xl p-6 shadow-xl border border-[var(--secondary)] hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t.home.servicesDetail.surveillance.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{t.home.servicesDetail.surveillance.description}</p>
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mt-auto">
                                        <Image src="/images/Whisk_5b6a220cce09155b41b4433c57706c64dr.jpeg" alt={t.home.servicesDetail.surveillance.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Link href={`/${locale}/services`} className="w-10 h-10 rounded-full border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </StaggerItem>

                            {/* Service 2 - Audit (carte mise en avant) */}
                            <StaggerItem direction="up">
                                <div className="bg-[var(--primary)] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                                    <h3 className="text-lg font-bold text-white mb-2">{t.home.servicesDetail.audit.title}</h3>
                                    <p className="text-sm text-white/80 mb-4 leading-relaxed">{t.home.servicesDetail.audit.description}</p>
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mt-auto">
                                        <Image src="/images/Whisk_6e32ef6726784ffaef04ff7fe96685e3dr.jpeg" alt={t.home.servicesDetail.audit.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Link href={`/${locale}/services`} className="w-10 h-10 rounded-full border-2 border-[var(--secondary)] bg-[var(--secondary)] flex items-center justify-center text-[var(--primary)] hover:opacity-90 transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </StaggerItem>

                            {/* Service 3 - Gestion des risques */}
                            <StaggerItem direction="up">
                                <div className="bg-white rounded-2xl p-6 shadow-xl border border-[var(--secondary)] hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t.home.servicesDetail.risk.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{t.home.servicesDetail.risk.description}</p>
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mt-auto">
                                        <Image src="/images/Whisk_935eee3760f5b579dc6493b3f649dd4cdr.jpeg" alt={t.home.servicesDetail.risk.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Link href={`/${locale}/services`} className="w-10 h-10 rounded-full border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </StaggerItem>

                            {/* Service 4 - Protection rapprochée */}
                            <StaggerItem direction="up">
                                <div className="bg-white rounded-2xl p-6 shadow-xl border border-[var(--secondary)] hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t.home.servicesDetail.protection.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{t.home.servicesDetail.protection.description}</p>
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mt-auto">
                                        <Image src="/images/Whisk_b3295edd22f0c9aaef84b8a0cb61a288dr.jpeg" alt={t.home.servicesDetail.protection.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Link href={`/${locale}/services`} className="w-10 h-10 rounded-full border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </StaggerItem>

                            {/* Service 5 - Formation (carte mise en avant) */}
                            <StaggerItem direction="up">
                                <div className="bg-[var(--primary)] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                                    <h3 className="text-lg font-bold text-white mb-2">{t.home.servicesDetail.formation.title}</h3>
                                    <p className="text-sm text-white/80 mb-4 leading-relaxed">{t.home.servicesDetail.formation.description}</p>
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mt-auto">
                                        <Image src="/images/Whisk_935eee3760f5b579dc6493b3f649dd4cdr.jpeg" alt={t.home.servicesDetail.formation.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Link href={`/${locale}/training`} className="w-10 h-10 rounded-full border-2 border-[var(--secondary)] bg-[var(--secondary)] flex items-center justify-center text-[var(--primary)] hover:opacity-90 transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </StaggerItem>

                            {/* Service 6 - Escorte sécurisée */}
                            <StaggerItem direction="up">
                                <div className="bg-white rounded-2xl p-6 shadow-xl border border-[var(--secondary)] hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t.home.servicesDetail.escorte.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{t.home.servicesDetail.escorte.description}</p>
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mt-auto">
                                        <Image src="/images/Whisk_b3295edd22f0c9aaef84b8a0cb61a288dr.jpeg" alt={t.home.servicesDetail.escorte.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Link href={`/${locale}/products`} className="w-10 h-10 rounded-full border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </StaggerItem>
                        </StaggerContainer>
                    </Container>
                </section>

                {/* Section bleue (grise) - Impact/Mission */}
                <section className="py-20 bg-[var(--primary)] text-white">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Texte à gauche */}
                            <AnimatedSection direction="left">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--secondary)]">
                                        {t.home.solutions.title}
                                    </h2>
                                    <p className="text-lg text-white/95 mb-8 leading-relaxed">
                                        {t.home.solutions.description}
                                    </p>
                                    <Link href={`/${locale}/contact`}>
                                        <Button
                                            size="lg"
                                            className="bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] !text-[var(--primary)] hover:text-[var(--primary-dark)] border-none shadow-lg font-bold">
                                            {t.home.solutions.cta}
                                        </Button>
                                    </Link>
                                </div>
                            </AnimatedSection>

                            {/* Image à droite */}
                            <ScaleAnimation delay={0.3}>
                                <div className="relative">
                                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative">
                                        <Image src="/images/Whisk_16ddc33bdfa1e1186704be1a6413cf96dr.jpeg" alt="Solutions de sécurité AISSIA" fill className="object-cover object-top" />
                                    </div>
                                </div>
                            </ScaleAnimation>
                        </div>
                    </Container>
                </section>

                {/* Section Nos Partenaires */}
                

                {/* Section Qu'est-ce qui nous distingue */}
                <section className="py-20 bg-[var(--primary)] text-white">
                    <Container>
                        <div>
                            <AnimatedSection direction="up">
                                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
                                    {t.home.distinctions.title}
                                </h2>
                            </AnimatedSection>

                            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
                                {/* 1. Professionnalisme */}
                                <StaggerItem direction="scale">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{t.home.distinctions.professionalism.title}</h3>
                                        <p className="text-white/90 text-sm leading-relaxed">
                                            {t.home.distinctions.professionalism.description}
                                        </p>
                                    </div>
                                </StaggerItem>

                                {/* 2. Communication 24/7 */}
                                <StaggerItem direction="scale">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{t.home.distinctions.communication.title}</h3>
                                        <p className="text-white/90 text-sm leading-relaxed">
                                            {t.home.distinctions.communication.description}
                                        </p>
                                    </div>
                                </StaggerItem>

                                {/* 3. Notre flotte de véhicules */}
                                <StaggerItem direction="scale">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{t.home.distinctions.fleet.title}</h3>
                                        <p className="text-white/90 text-sm leading-relaxed">
                                            {t.home.distinctions.fleet.description}
                                        </p>
                                    </div>
                                </StaggerItem>

                                {/* 4. Agents agréés */}
                                <StaggerItem direction="scale">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{t.home.distinctions.agents.title}</h3>
                                        <p className="text-white/90 text-sm leading-relaxed">
                                            {t.home.distinctions.agents.description}
                                        </p>
                                    </div>
                                </StaggerItem>

                                {/* 5. Technologie avancée */}
                                <StaggerItem direction="scale">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{t.home.distinctions.technology.title}</h3>
                                        <p className="text-white/90 text-sm leading-relaxed">
                                            {t.home.distinctions.technology.description}
                                        </p>
                                    </div>
                                </StaggerItem>

                                {/* 6. Aide d'urgence */}
                                <StaggerItem direction="scale">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{t.home.distinctions.emergency.title}</h3>
                                        <p className="text-white/90 text-sm leading-relaxed">
                                            {t.home.distinctions.emergency.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            </StaggerContainer>
                        </div>
                    </Container>
                </section>

                {/* Section Cases/Témoignages avec photos */}
               
                {/* Section expertise avec stats */}
                <section className="py-20 bg-white/[0.95]">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Gauche - Image */}
                            <AnimatedSection direction="left">
                                <div className="relative">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative">
                                        <Image src="/images/Whisk_4c173eda2ddccc68af54a6bd0f0abda5dr.jpeg" alt="Expertise AISSIA Sécurité" fill className="object-cover object-top" />
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* Droite - Texte et Stats */}
                            <AnimatedSection direction="right" delay={0.2}>
                                <div>
                                    <div className="inline-block bg-[var(--primary)] text-white text-sm font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-4">
                                        {t.home.expertise.label}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                                        {t.home.expertise.title}
                                    </h2>
                                    <div className="w-12 h-1 bg-[var(--primary)] rounded-full mb-6"></div>
                                    <p className="text-lg text-[var(--text-secondary)] mb-8">
                                        {t.home.expertise.description}
                                    </p>

                                    {/* Progress bars / Stats */}
                                    <div className="space-y-6">
                                        <AnimatedSection direction="right" delay={0.4}>
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-semibold text-[var(--text-primary)]">{t.home.expertise.surveillance}</span>
                                                    <span className="font-bold text-[var(--secondary)]">93%</span>
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[var(--secondary)] rounded-full" style={{width: '93%'}}></div>
                                                </div>
                                            </div>
                                        </AnimatedSection>

                                        <AnimatedSection direction="right" delay={0.6}>
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-semibold text-[var(--text-primary)]">{t.home.expertise.risk}</span>
                                                    <span className="font-bold text-[var(--secondary)]">80%</span>
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[var(--secondary)] rounded-full" style={{width: '80%'}}></div>
                                                </div>
                                            </div>
                                        </AnimatedSection>

                                        <AnimatedSection direction="right" delay={0.8}>
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-semibold text-[var(--text-primary)]">{t.home.expertise.protection}</span>
                                                    <span className="font-bold text-[var(--secondary)]">95%</span>
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[var(--secondary)] rounded-full" style={{width: '95%'}}></div>
                                                </div>
                                            </div>
                                        </AnimatedSection>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </Container>
                </section>

                {/* Section Contact - Fond bleu (gris) */}
                <section className="py-20 bg-[var(--primary)] text-white">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Gauche - Infos de contact */}
                            <AnimatedSection direction="left">
                                <div>
                                    <ScaleAnimation delay={0.2} scale={0.8}>
                                        <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 text-white">
                                            {t.home.contactSection.badge}
                                        </div>
                                    </ScaleAnimation>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                        {t.home.contactSection.title}
                                    </h2>
                                    <p className="text-lg text-white/95 mb-8 leading-relaxed">
                                        {t.home.contactSection.description}
                                    </p>

                                    <StaggerContainer className="space-y-4" staggerDelay={0.15}>
                                        <StaggerItem direction="left">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-white/80">{t.home.contactSection.addressLabel}</div>
                                                    <div className="font-semibold text-white">{t.home.contactSection.address}</div>
                                                </div>
                                            </div>
                                        </StaggerItem>

                                        <StaggerItem direction="left">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h1.5a1 1 0 01.97.757l.35 1.4a1 1 0 01-.27.93L6.4 8.4a11.05 11.05 0 005.2 5.2l1.3-.19a1 1 0 01.85.25l1.8 1.8a1 1 0 01.28.95V20a2 2 0 01-2 2h-1C9.716 22 3 15.284 3 7V5z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-white/80">{t.home.contactSection.phoneLabel}</div>
                                                    {t.home.contactSection.directorsPhones && (
                                                        <ul className="mt-2 text-sm font-semibold text-white/90 space-y-1">
                                                            {t.home.contactSection.directorsPhones.map((num, i) => (
                                                                <li key={i} className="flex items-center gap-2">
                                                                    <span className="inline-block w-2 h-2 bg-white rounded-full" />
                                                                    <span>{num}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </StaggerItem>
                                    </StaggerContainer>

                                    <ScaleAnimation delay={0.6}>
                                        <button className="mt-8 bg-[var(--secondary)] text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--secondary-dark)] transition-colors shadow-lg">
                                            {t.home.contactSection.cta}
                                        </button>
                                    </ScaleAnimation>
                                </div>
                            </AnimatedSection>

                            {/* Droite - Formulaire */}
                            <ScaleAnimation delay={0.3}>
                                <div className="bg-white rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                                        {t.home.contactSection.formTitle}
                                    </h3>
                                    <HomeContactForm t={t} />
                                </div>
                            </ScaleAnimation>
                        </div>
                    </Container>
                </section>

               
            </main>
            <Footer />
        </>
    );
}
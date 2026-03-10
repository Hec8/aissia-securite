'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import Image from 'next/image';
import { PageHeader } from '@/components/sections';
import { Container, AnimatedSection, ScaleAnimation } from '@/components/ui';
import { ParticleNetwork } from '@/components/ui/ParticleNetwork';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { NewsletterForm } from './NewsletterForm';
import { api } from '@/lib/api';

export default function ContactPage() {
    const { t, locale } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await api.sendContactForm(formData);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <ParticleNetwork />
            <main>
                <AnimatedSection>
                <PageHeader
                    title={t.contact.title}
                    subtitle={t.contact.subtitle}
                    image="/images/Whisk_6e32ef6726784ffaef04ff7fe96685e3dr.jpeg"
                    breadcrumbs={[
                        { name: t.nav.home, href: `/${locale}` },
                        { name: t.nav.contact },
                    ]}
                />
                </AnimatedSection>

                <section className="py-20 bg-gray-50">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            {/* Contact Form - Left side (3 cols) */}
                            <AnimatedSection delay={0.1} className="lg:col-span-3">
                                <div className="bg-[var(--primary)] rounded-2xl p-8 h-full">
                                    <h2 className="text-2xl font-bold text-white mb-8">
                                        {t.contact.sendMessage}
                                    </h2>

                                    {submitStatus === 'success' && (
                                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                                            {t.contact.form.success}
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                            {t.contact.form.error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder={t.contact.form.name}
                                            className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-white placeholder-white/50"
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder={t.contact.form.email}
                                                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-white placeholder-white/50"
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder={t.contact.form.phone}
                                                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-white placeholder-white/50"
                                            />
                                        </div>
                                        
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder={t.contact.form.message}
                                            className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-white placeholder-white/50 resize-none"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-8 py-4 bg-[var(--secondary)] text-[var(--primary)] font-semibold rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                        >
                                            {isSubmitting ? t.common.loading : t.contact.form.submit}
                                        </button>
                                    </form>
                                </div>
                            </AnimatedSection>

                            {/* Newsletter - Right side (2 cols) */}
                            <AnimatedSection delay={0.3} className="lg:col-span-2">
                                <div className="bg-white rounded-2xl border-2 border-gray-200 w-full h-full overflow-hidden">
                                    <div className="relative h-64 md:h-80 w-full">
                                        <Image
                                            src="/images/Whisk_b3295edd22f0c9aaef84b8a0cb61a288dr.jpeg"
                                            alt={t.home.newsletter.title}
                                            fill
                                            className="object-cover object-center"
                                        />
                                        <div className="absolute inset-0 bg-[var(--secondary)]/10" />
                                    </div>

                                    <div className="p-6 flex flex-col gap-4">
                                        <h3 className="text-xl font-bold mb-0 text-[var(--primary)]">{t.home.newsletter.title}</h3>
                                        <p className="text-gray-600 text-xs leading-relaxed mb-0">
                                            {t.home.newsletter.description}
                                        </p>
                                        <div className="mt-2 w-full max-w-none">
                                            <NewsletterForm t={t} />
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </Container>
                </section>

                {/* Info Cards Section */}
                <section className="py-16 bg-[var(--primary)]">
                    <Container>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Phone */}
                            <ScaleAnimation delay={0.1}>
                                <div className="text-center group">
                                    <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-5 transform transition-transform duration-300 hover:scale-110 shadow-md">
                                        <svg className="w-7 h-7 text-[var(--primary)] transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-white">+225 2722261328</h3>
                                    <h3 className="text-lg font-medium text-white">+225 0717512692</h3>
                                    <h3 className="text-lg font-medium text-white">+225 0717508264</h3>
                                    <h3 className="text-lg font-medium text-white mb-2">+225 0717509044</h3>
                                </div>
                            </ScaleAnimation>

                            {/* Email */}
                            <ScaleAnimation delay={0.2}>
                                <div className="text-center group">
                                    <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-5 transform transition-transform duration-300 hover:scale-110 shadow-md">
                                        <svg className="w-7 h-7 text-[var(--primary)] transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <a className="text-lg font-bold text-white mb-2" href={`mailto:${t.contact.emailSecondary}`}>{t.contact.emailSecondary}</a>
                                </div>
                            </ScaleAnimation>

                            {/* Address */}
                            <ScaleAnimation delay={0.3}>
                                <div className="text-center group">
                                    <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-5 transform transition-transform duration-300 hover:scale-110 shadow-md">
                                        <svg className="w-7 h-7 text-[var(--primary)] transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{t.contact.info.address}</h3>
                                    <p className="text-sm text-white/70 leading-relaxed max-w-xs mx-auto">
                                        {t.contact.addressFull}
                                    </p>
                                </div>
                            </ScaleAnimation>
                        </div>
                    </Container>
                </section>

                {/* Map Section */}
                <section className="py-16 bg-gray-50">
                    <Container>
                        <AnimatedSection>
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
                                {t.contact.location}
                            </h2>
                        </AnimatedSection>
                        <ScaleAnimation delay={0.2}>
                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <iframe
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(t.contact.addressFull)}&output=embed`}
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Carte de localisation AISSIA Sécurité"
                                    className="w-full"
                                ></iframe>
                            </div>

                            <div className="mt-3 text-sm">
                                <a
                                    href="https://maps.app.goo.gl/qFSwme5te5Ntkgsf9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--primary)] font-semibold hover:underline"
                                >
                                    {t.contact.openInMaps}
                                </a>
                            </div>
                        </ScaleAnimation>
                    </Container>
                </section>
            </main>
            <Footer />
        </>
    );
}

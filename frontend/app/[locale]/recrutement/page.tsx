'use client';

import React, { useEffect, useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { Container, AnimatedSection } from '@/components/ui';
import { ParticleNetwork } from '@/components/ui/ParticleNetwork';
import { PageHeader } from '@/components/sections';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { api, JobOffer } from '@/lib/api';
import ApplyModal from '@/components/ui/ApplyModal';

function escapeHtml(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function normalizeToHtmlList(src?: string | null) {
    if (!src) return '';
    if (/<ul|<li/i.test(src)) return src; // already HTML
    // split lines and/or items starting with -
    const lines = src.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return '';
    const items = lines.length === 1 && lines[0].includes('-') ?
        lines[0].split(/\s*-\s*/).map(s => s.trim()).filter(Boolean) : lines;
    const lis = items.map(i => `<li>${escapeHtml(i.replace(/^-\s*/, ''))}</li>`).join('');
    return `<ul class="list-disc ml-6">${lis}</ul>`;
}

export default function RecruitmentPage() {
    type Offer = {
        id: string | number;
        title?: string;
        location?: string | null;
        description?: string | null;
        profiles?: string;
        conditions?: string;
    };

    const { t, locale } = useTranslation();
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [applyOpen, setApplyOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

    useEffect(() => {
        let mounted = true;

            api.getJobs()
            .then((res) => {
                if (!mounted) return;
                const formattedOffers: Offer[] = (res.data || []).map((job: JobOffer) => ({
                    ...job,
                    profiles: job.profiles ?? undefined,
                    conditions: job.conditions ?? undefined,
                }));
                setOffers(formattedOffers);
            })
            .catch(() => {
                if (mounted) setOffers([]);
            })
            .finally(() => mounted && setLoading(false));

        return () => { mounted = false };
    }, []);

    return (
        <>
            <Header />
            <ParticleNetwork />
            <main>
                <AnimatedSection>
                    <PageHeader
                        title={t.recruitment.title}
                        subtitle={t.recruitment.subtitle}
                        image="/images/Whisk_6e32ef6726784ffaef04ff7fe96685e3dr.jpeg"
                        breadcrumbs={[
                            { name: t.nav.home, href: `/${locale}` },
                            { name: t.nav.recruitment },
                        ]}
                    />
                </AnimatedSection>

                <section className="py-12 md:py-20 bg-gray-50">
                    <Container>
                        <AnimatedSection>
                            <div className="mb-8">
                                <div className="mb-6 justify-center text-center">
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] leading-tight">{t.recruitment.pieces.title}</h3>
                                    <div className="mt-3 mb-4 w-36 h-1 rounded-full bg-[var(--secondary)] mx-auto" />
                                    <p className="text-sm text-[var(--text-secondary)]">{t.recruitment.pieces.subtitle}</p>
                                </div>

                                <div>
                                    <div className="bg-[#071826] rounded-3xl p-6 md:p-8 border border-[#12313b] shadow-inner">
                                        <div className="max-h-56 md:max-h-48 overflow-y-auto">
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-white/90">
                                                {t.recruitment.pieces.items.map((it, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <span className="flex-none w-4 h-4 rounded-full bg-[var(--secondary)]/90 text-[var(--secondary)] flex items-center justify-center mt-1"> 
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <circle cx="12" cy="12" r="3" fill="currentColor" />
                                                            </svg>
                                                        </span>
                                                        <span className="text-sm leading-relaxed break-words">{it}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {loading ? (
                                <p>{t.common.loading}</p>
                            ) : offers.length === 0 ? (
                                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                                    <h3 className="text-lg font-semibold mb-2">{t.recruitment.noOffers}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t.recruitment.noOffersDesc}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {offers.map((offer) => (
                                        <article key={offer.id} className="group bg-white rounded-2xl p-6 border border-[var(--secondary)] shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1">
                                            <div className="flex">
                                                <div className="hidden md:block w-1 rounded-l-2xl bg-[var(--secondary)] mr-4" />
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{offer.title}</h3>
                                                            {offer.location && <span className="inline-block text-lg text-[var(--secondary)] bg-[var(--primary)] px-2 py-0.5 rounded-full">{offer.location}</span>}
                                                        </div>
                                                    </div>

                                                    {offer.description && <div className="prose prose-sm text-gray-700 mt-3 mb-4" dangerouslySetInnerHTML={{ __html: offer.description }} />}

                                                    {offer.profiles && (
                                                        <div className="mb-3">
                                                            <h4 className="font-semibold text-[var(--text-primary)]">{t.recruitment.profilesLabel}</h4>
                                                            <div className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: normalizeToHtmlList(offer.profiles) }} />
                                                        </div>
                                                    )}

                                                    {offer.conditions && (
                                                        <div>
                                                            <h4 className="font-semibold text-[var(--text-primary)]">{t.recruitment.conditionsLabel}</h4>
                                                            <div className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: normalizeToHtmlList(offer.conditions) }} />
                                                        </div>
                                                    )}

                                                    <div className="mt-4 flex items-center gap-3">
                                                        <button onClick={() => { setSelectedOffer(offer); setApplyOpen(true); }} className="px-4 py-2 bg-[var(--primary)] text-white rounded-xl shadow-sm hover:opacity-95 hover:scale-105 transition">{t.recruitment.applyButton}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </AnimatedSection>
                    </Container>
                </section>
            </main>
            <Footer />
            <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} offer={selectedOffer ? { id: selectedOffer.id, title: selectedOffer.title } : null} />
        </>
    );
}
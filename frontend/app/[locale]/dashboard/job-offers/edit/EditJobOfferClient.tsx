"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { ApiError } from '@/lib/api';
import { useTranslation } from '@/lib/hooks/useTranslation';

const JobOfferForm = dynamic(() => import('@/components/admin/JobOfferForm'), { ssr: false });

export default function EditJobOfferPage() {
    const { locale } = useTranslation();
    type JobOffer = Record<string, unknown>;
    const [initial, setInitial] = useState<JobOffer | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');

    useEffect(() => {
        let mounted = true;
        if (!id) return;
        (async () => {
            try {
                const res = await api.admin.getJobOffer(Number(id));
                if (!mounted) return;
                setInitial(res.data as unknown as Record<string, unknown>);
            } catch (err: unknown) {
                if (err instanceof ApiError && err.status === 401) {
                    // not authorized -> redirect to login
                    if (typeof window !== 'undefined') window.location.href = `/${locale}/login`;
                    return;
                }
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false };
    }, [id, locale]);

    if (loading) return <div className="p-6">Chargement...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Modifier offre</h1>
                <button onClick={() => router.back()} className="px-4 py-2 border rounded">Retour</button>
            </div>

            <div className="bg-white p-6 rounded">
                <JobOfferForm initial={initial ? (initial as Partial<JobOffer>) : undefined} onSuccess={() => { window.location.href = `/${locale}/dashboard/job-offers`; }} />
            </div>
        </div>
    );
}

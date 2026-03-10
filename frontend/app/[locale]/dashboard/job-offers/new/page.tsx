"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslation } from '@/lib/hooks/useTranslation';

const JobOfferForm = dynamic(() => import('@/components/admin/JobOfferForm'), { ssr: false });

export default function NewJobOfferPage() {
    const { locale } = useTranslation();
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Nouvelle offre</h1>
                <Link href={`/${locale}/dashboard/job-offers`} className="px-4 py-2 border rounded">Retour</Link>
            </div>

            <div className="bg-white p-6 rounded">
                <JobOfferForm onSuccess={() => { window.location.href = `/${locale}/dashboard/job-offers`; }} />
            </div>
        </div>
    );
}

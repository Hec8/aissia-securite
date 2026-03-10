"use client";

import React, { useEffect, useState } from 'react';
import { api, JobOffer } from '@/lib/api';
import Link from 'next/link';
import { useTranslation } from '@/lib/hooks/useTranslation';

export default function DashboardJobOffersPage() {
    const { locale } = useTranslation();
    const [offers, setOffers] = useState<JobOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const fetchOffers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.admin.getJobOffers();
            setOffers(res.data || []);
        } catch (err: unknown) {
            setError((err as Error)?.message || 'Erreur');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOffers(); }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Supprimer cette offre ?')) return;
        try {
            const prev = offers;
            setOffers(offers.filter(o => o.id !== id));
            const res = await api.admin.deleteJobOffer(id);
            if (!res.success) setOffers(prev);
        } catch (err: unknown) {
            console.error(err);
            alert((err as Error)?.message ?? 'Erreur');
            fetchOffers();
        }
    };

    const total = offers.length;
    const activeCount = offers.filter(o => (o as any).is_active).length;
    const inactiveCount = total - activeCount;

    const filtered = offers
        .filter(o => filter === 'all' || (filter === 'active' ? (o as any).is_active : !(o as any).is_active))
        .filter(o => o.title.toLowerCase().includes(search.toLowerCase()) || (o.location || '').toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gérer les offres</h1>
                    <p className="text-gray-500 text-sm mt-1">Liste et gestion des offres d'emploi</p>
                </div>
                <Link
                    href={`/${locale}/dashboard/job-offers/new`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--secondary)] text-[var(--primary)] rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                >
                    Nouvelle offre
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{total}</div>
                    <div className="text-sm text-gray-500">Total offres</div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="text-2xl font-bold text-green-600">{activeCount}</div>
                    <div className="text-sm text-gray-500">Actives</div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="text-2xl font-bold text-orange-500">{inactiveCount}</div>
                    <div className="text-sm text-gray-500">Inactives</div>
                </div>
            </div>

            {/* Search & filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Rechercher par titre ou lieu..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent outline-none"
                    />
                </div>
                <div className="flex gap-2">
                    {(['all', 'active', 'inactive'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                filter === f
                                    ? 'bg-[var(--primary)] text-white'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            {f === 'all' ? 'Tous' : f === 'active' ? 'Actives' : 'Inactives'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Titre</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lieu</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="text-right px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((o) => (
                                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <div className="text-sm font-medium text-gray-900">{o.title}</div>
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-gray-500">{o.location}</td>
                                    <td className="px-6 py-3.5">
                                        {(o as any).is_active ? (
                                            <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Active</span>
                                        ) : (
                                            <span className="inline-block px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">Inactive</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-3.5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/${locale}/dashboard/job-offers/edit?id=${o.id}`} className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">Modifier</Link>
                                            <button onClick={() => handleDelete(o.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">Supprimer</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-sm">Aucune offre trouvée</p>
                    </div>
                )}
            </div>
        </div>
    );
}

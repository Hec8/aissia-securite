"use client";

import { useEffect, useState } from 'react';
import { api, Quote as ApiQuote } from '@/lib/api';

export default function DashboardQuotesPage() {
    const [quotes, setQuotes] = useState<ApiQuote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedQuote, setSelectedQuote] = useState<ApiQuote | null>(null);
    const [filter, setFilter] = useState<'all' | string>('all');

    useEffect(() => {
        api.admin.getQuotes()
            .then(res => {
                if (res.success) setQuotes(res.data || []);
                else setError(res.message || 'Erreur de chargement');
            })
            .catch(() => setError('Erreur de chargement'))
            .finally(() => setLoading(false));
    }, []);

    const filteredQuotes = filter === 'all' ? quotes : quotes.filter(q => q.status === filter);

    const updateStatus = async (id: number, status: ApiQuote['status']) => {
        // Optimistic update
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
        if (selectedQuote?.id === id) setSelectedQuote({ ...selectedQuote, status });
        try {
            await api.admin.updateQuote(id, { status });
        } catch {
            // ignore errors for now
        }
    };

    const openQuote = (quote: ApiQuote) => {
        setSelectedQuote(quote);
        if (quote.status === 'pending') {
            updateStatus(quote.id, 'contacted');
        }
    };

    const statusLabels: Record<string, { label: string; color: string }> = {
        pending: { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
        contacted: { label: 'Contacté', color: 'bg-indigo-100 text-indigo-700' },
        in_progress: { label: 'En cours', color: 'bg-yellow-100 text-yellow-700' },
        quoted: { label: 'Devis envoyé', color: 'bg-green-100 text-green-700' },
        accepted: { label: 'Accepté', color: 'bg-teal-100 text-teal-700' },
        rejected: { label: 'Rejeté', color: 'bg-orange-100 text-orange-700' },
    };

    const statuses = ['pending', 'contacted', 'in_progress', 'quoted', 'accepted', 'rejected'];

    const counts = {
        all: quotes.length,
        ...Object.fromEntries(statuses.map(s => [s, quotes.filter(q => q.status === s).length]))
    } as Record<string, number>;

    if (loading) return <div className="p-6 text-center text-gray-500">Chargement des devis...</div>;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Demandes de devis</h1>
                <p className="text-gray-500 text-sm mt-1">Consultez et gérez les demandes de devis reçues</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {(['all', ...statuses] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            filter === f
                                ? 'bg-[var(--primary)] text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {f === 'all' ? 'Tous' : (statusLabels[f as string]?.label ?? f)}
                        <span className="ml-1.5 text-xs opacity-70">({counts[f as string] ?? 0})</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                        {filteredQuotes.map((quote) => (
                            <button
                                key={quote.id}
                                onClick={() => openQuote(quote)}
                                className={`w-full text-left px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                                    selectedQuote?.id === quote.id ? 'bg-blue-50 border-l-2 border-l-[var(--secondary)]' : ''
                                }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-sm font-medium ${quote.status === 'pending' ? 'text-gray-900' : 'text-gray-600'}`}>
                                        {quote.contact_name ?? quote.email}
                                    </span>
                                    {quote.status === 'pending' && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                                </div>
                                <div className="text-xs text-gray-500 truncate">{quote.service_type}</div>
                                <div className="text-[11px] text-gray-400 mt-0.5">{quote.created_at ? new Date(quote.created_at).toLocaleString('fr-FR') : ''}</div>
                            </button>
                        ))}
                        {filteredQuotes.length === 0 && (
                            <div className="text-center py-8 text-gray-400 text-sm">Aucun devis</div>
                        )}
                    </div>
                </div>

                {/* Detail */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    {selectedQuote ? (
                        <div className="space-y-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">{selectedQuote.contact_name ?? selectedQuote.email}</h2>
                                    <p className="text-sm text-gray-500">{selectedQuote.company_name || 'Particulier'}</p>
                                </div>
                                {(() => {
                                    const st = selectedQuote?.status ?? 'pending';
                                    const info = statusLabels[st] ?? { label: st, color: 'bg-gray-100 text-gray-700' };
                                    return (
                                        <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${info.color}`}>
                                            {info.label}
                                        </span>
                                    );
                                })()}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Email</div>
                                    <a href={`mailto:${selectedQuote.email}`} className="text-sm text-blue-600 hover:underline">{selectedQuote.email}</a>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Téléphone</div>
                                    <a href={`tel:${selectedQuote.phone}`} className="text-sm text-blue-600 hover:underline">{selectedQuote.phone}</a>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Service demandé</div>
                                    <div className="text-sm text-gray-700 font-medium">{selectedQuote.service_type}</div>
                                </div>
                            </div>

                            <div>
                                <div className="text-[11px] text-gray-400 uppercase font-semibold mb-2">Message</div>
                                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                                    {selectedQuote.description}
                                </div>
                            </div>

                            <div className="text-xs text-gray-400">Reçu le {selectedQuote.created_at ? new Date(selectedQuote.created_at).toLocaleString('fr-FR') : ''}</div>

                            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                                <button
                                    onClick={() => updateStatus(selectedQuote.id, 'quoted')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                                >
                                    Marquer comme répondu
                                </button>
                                <button
                                    onClick={() => updateStatus(selectedQuote.id, 'rejected')}
                                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Archiver
                                </button>
                                <a
                                    href={`mailto:${selectedQuote.email}`}
                                    className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                                >
                                    Répondre par email
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-sm">Sélectionnez un devis pour voir les détails</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

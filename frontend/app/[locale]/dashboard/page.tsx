'use client';


"use client";
import Link from 'next/link';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, DashboardStats, Quote, ContactMessage } from '@/lib/api';

export default function DashboardPage() {
    const { locale } = useTranslation();
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
    const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
    const [applicationsCount, setApplicationsCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                router.replace('/login');
                return;
            }
        }
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [statsRes, quotesRes, messagesRes] = await Promise.all([
                    api.getDashboardStats(),
                    api.admin.getQuotes(),
                    api.admin.getMessages(),
                ]);
                setStats(statsRes.data);
                setRecentQuotes((quotesRes.data || []).slice(0, 3));
                setRecentMessages((messagesRes.data || []).slice(0, 3));
                // Count contact messages that include an attachment => candidatures
                try {
                    const apps = (messagesRes.data || []).filter((m: any) => !!m.attachment_path);
                    setApplicationsCount(apps.length);
                } catch (e) {
                    setApplicationsCount(null);
                }
            } catch (err: unknown) {
                setError('Erreur de chargement des données');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [router]);

    if (loading) {
        return <div className="p-10 text-center text-gray-500">Chargement du tableau de bord...</div>;
    }
    if (error) {
        return <div className="p-10 text-center text-red-500">{error}</div>;
    }
    return (
        <div className="space-y-8">
            {/* Page title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                <p className="text-gray-500 text-sm mt-1">Vue d&apos;ensemble de l&apos;activité</p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/*<Link href={`/${locale}/dashboard/services`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                            
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.services ?? '-'}</div>
                    <div className="text-sm text-gray-500 mt-0.5">Services actifs</div>
                </Link>
                <Link href={`/${locale}/dashboard/training`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                            
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.formations ?? '-'}</div>
                    <div className="text-sm text-gray-500 mt-0.5">Modules de formation</div>
                </Link>*/}
                <Link href={`/${locale}/dashboard/quotes`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                            {/* Quote icon */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.quotes ?? '-'}</div>
                    <div className="text-sm text-gray-500 mt-0.5">Demandes de devis</div>
                    <div className="text-xs text-orange-600 font-medium mt-1">{stats?.pending_quotes ?? 0} en attente</div>
                </Link>
                <Link href={`/${locale}/dashboard/messages`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                            {/* Message icon */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.messages ?? '-'}</div>
                    <div className="text-sm text-gray-500 mt-0.5">Messages</div>
                    <div className="text-xs text-purple-600 font-medium mt-1">{stats?.unread_messages ?? 0} non lus</div>
                </Link>
                <Link href={`/${locale}/dashboard/newsletter`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white">
                            {/* Newsletter icon */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats?.newsletter_subscribers ?? '-'}</div>
                    <div className="text-sm text-gray-500 mt-0.5">Abonnés newsletter</div>
                </Link>
                <Link href={`/${locale}/dashboard/applications`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
                            </svg>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{applicationsCount ?? '-'}</div>
                    <div className="text-sm text-gray-500 mt-0.5">Candidatures reçues</div>
                </Link>
                <Link href={`/${locale}/dashboard/job-offers`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
                            <svg className="w-4 h-4 text-white group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="4" y="6" width="18" height="16" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 10h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{typeof stats?.job_offers === 'number' ? stats.job_offers : '-'}</div>
                    <div className="text-sm text-gray-500 mt-0.5">Offres d emploi</div>
                </Link>
            </div>

            {/* Recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent quotes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Derniers devis reçus</h3>
                        <Link href={`/${locale}/dashboard/quotes`} className="text-sm text-[var(--secondary)] hover:underline font-medium">
                            Voir tout
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentQuotes.length === 0 && (
                            <div className="px-6 py-4 text-gray-400 text-sm">Aucun devis récent</div>
                        )}
                        {recentQuotes.map((quote) => (
                            <div key={quote.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                                        {quote.contact_name?.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium text-gray-900 truncate">{quote.contact_name}</div>
                                        <div className="text-xs text-gray-500 truncate">{quote.service_type}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-xs text-gray-400">{quote.created_at ? new Date(quote.created_at).toLocaleDateString() : ''}</span>
                                    {quote.status === 'pending' && (
                                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent messages */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Derniers messages</h3>
                        <Link href={`/${locale}/dashboard/messages`} className="text-sm text-[var(--secondary)] hover:underline font-medium">
                            Voir tout
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentMessages.length === 0 && (
                            <div className="px-6 py-4 text-gray-400 text-sm">Aucun message récent</div>
                        )}
                        {recentMessages.map((msg) => (
                            <div key={msg.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                                        {msg.name?.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium text-gray-900 truncate">{msg.name}</div>
                                        <div className="text-xs text-gray-500 truncate">{msg.subject}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-xs text-gray-400">{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}</span>
                                    {!msg.is_read && (
                                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

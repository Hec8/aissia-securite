"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { api, ContactMessage } from '@/lib/api';

export default function AdminApplicationsPage() {
    const { locale } = useTranslation();
    const router = useRouter();
    const [applications, setApplications] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                router.replace('/login');
                return;
            }
        }

        const fetchApps = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.admin.getApplications();
                setApplications(res.data || []);
            } catch (err) {
                setError('Impossible de charger les candidatures');
            } finally {
                setLoading(false);
            }
        };

        fetchApps();
    }, [router]);

    const downloadAttachment = async (id: number, fallbackName?: string) => {
        setDownloadingId(id);
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
            const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiBase}/admin/contact-messages/${id}/attachment`, {
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    Accept: 'application/zip, application/octet-stream, */*',
                },
            });
            if (!res.ok) throw new Error('Téléchargement impossible');
            const blob = await res.blob();

            let filename = fallbackName || 'attachment.zip';
            const disposition = res.headers.get('content-disposition') || res.headers.get('Content-Disposition');
            if (disposition) {
                const match = /filename\*=UTF-8''([^;\n]+)|filename="?([^";\n]+)"?/.exec(disposition);
                if (match) filename = decodeURIComponent(match[1] || match[2]);
            }

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError('Erreur lors du téléchargement');
        } finally {
            setDownloadingId(null);
        }
    };

    if (loading) return <div className="p-8 text-gray-500">Chargement des candidatures...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Candidatures</h1>
                <p className="text-sm text-gray-500 mt-1">Liste des candidatures reçues avec pièces jointes</p>
            </div>

            {applications.length === 0 ? (
                <div className="p-6 bg-white rounded-xl border border-gray-100 text-gray-500">Aucune candidature trouvée</div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                    {applications.map((app) => (
                        <div key={app.id} className="px-6 py-4 flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-900">{app.name} <span className="text-xs text-gray-400">{app.email}</span></div>
                                <div className="text-xs text-gray-500">{app.subject || 'Candidature'} — {app.created_at ? new Date(app.created_at).toLocaleString() : ''}</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    className="px-3 py-1.5 bg-[var(--secondary)] text-white rounded-md text-sm hover:opacity-95"
                                    onClick={() => downloadAttachment(app.id)}
                                    disabled={downloadingId === app.id}
                                >
                                    {downloadingId === app.id ? 'Téléchargement...' : 'Télécharger ZIP'}
                                </button>
                                <button
                                    className="px-3 py-1.5 text-sm border rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    onClick={() => router.push(`/${locale}/dashboard/messages?id=${app.id}`)}
                                >
                                    Voir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

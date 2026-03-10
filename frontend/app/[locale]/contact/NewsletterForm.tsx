"use client";
import { useState } from 'react';
import { api } from '@/lib/api';

export function NewsletterForm({ t }: { t: any }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        setError(null);
        try {
            await api.subscribeNewsletter({ email });
            setStatus('success');
            setEmail('');
        } catch (err: unknown) {
            setStatus('error');
            if (err && typeof err === 'object' && 'message' in err) {
                setError((err as { message?: string }).message || 'Erreur');
            } else {
                setError('Erreur');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-2" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder={t.home.newsletter.placeholder}
                className="w-full px-4 py-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
            />
            <button
                className="w-full py-2.5 text-sm bg-[var(--primary)] text-white font-bold rounded-lg hover:opacity-90 transition-all"
                disabled={loading}
            >
                {loading ? t.common.loading : t.home.newsletter.subscribe}
            </button>
            {status === 'success' && (
                <div className="text-green-600 text-xs">{t.footer?.success || 'Inscription réussie !'}</div>
            )}
            {status === 'error' && (
                <div className="text-red-600 text-xs">{error || t.footer?.error || 'Erreur'}</div>
            )}
        </form>
    );
}
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
        <form className="space-y-3" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
            />
            <button
                className="w-full bg-[var(--secondary)] text-[var(--primary)] font-semibold text-sm py-2.5 px-4 rounded-lg hover:opacity-90 transition-all"
                disabled={loading}
            >
                {loading ? t.common.loading : t.footer.subscribe}
            </button>
            {status === 'success' && (
                <div className="text-green-400 text-xs">{t.footer.success || 'Inscription réussie !'}</div>
            )}
            {status === 'error' && (
                <div className="text-red-400 text-xs">{error || t.footer.error || 'Erreur'}</div>
            )}
        </form>
    );
}
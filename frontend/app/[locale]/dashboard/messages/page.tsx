'use client';

import { useState, useEffect } from 'react';
import { api, ContactMessage } from '@/lib/api';

type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

export default function DashboardMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [filter, setFilter] = useState<'all' | MessageStatus>('all');
    // local status map to track UI-only statuses (backend ContactMessage doesn't include `status`)
    const [statusMap, setStatusMap] = useState<Record<number, MessageStatus>>({});

    useEffect(() => {
        setLoading(true);
        api.admin.getMessages()
            .then(res => {
                if (res.success) {
                    setMessages(res.data);
                    // initialize status map from backend `is_read` flag
                    const map: Record<number, MessageStatus> = {};
                    (res.data || []).forEach((m: any) => {
                        map[m.id] = m.is_read ? 'read' : 'new';
                    });
                    setStatusMap(map);

                    // if URL contains ?id=..., open that message
                    if (typeof window !== 'undefined') {
                        const params = new URLSearchParams(window.location.search);
                        const idParam = params.get('id');
                        if (idParam) {
                            const id = parseInt(idParam, 10);
                            const found = (res.data || []).find((x: any) => x.id === id);
                            if (found) {
                                setSelectedMessage(found);
                                // mark as read in UI
                                setStatusMap(prev => ({ ...prev, [found.id]: 'read' }));
                                setMessages(prev => (prev || []).map((m: any) => m.id === found.id ? { ...m, is_read: true } : m));
                            }
                        }
                    }
                }
                else setError(res.message || 'Erreur de chargement');
            })
            .catch(() => setError('Erreur de chargement'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-10 text-center text-gray-500">Chargement des messages...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    const getStatusForMessage = (m: ContactMessage) => {
        const isRead = !!m.is_read;
        return statusMap[m.id] ?? (isRead ? 'read' : 'new');
    };

    const filteredMessages = filter === 'all'
        ? messages
        : messages.filter(m => getStatusForMessage(m) === filter);

    const updateStatus = (id: number, status: MessageStatus) => {
        setStatusMap(prev => ({ ...prev, [id]: status }));
        // mark as read flag on backend-like object for consistency
        setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: status === 'read' || status === 'replied' } : m));
        if (selectedMessage?.id === id) {
            setSelectedMessage(prev => prev ? { ...prev, is_read: status === 'read' || status === 'replied' } : prev);
        }
    };

    const openMessage = (msg: ContactMessage) => {
        setSelectedMessage(msg);
        const current = getStatusForMessage(msg);
        if (current === 'new') {
            updateStatus(msg.id, 'read');
        }
        // update URL to include ?id=... so deep links work
        if (typeof window !== 'undefined') {
            try {
                const url = new URL(window.location.href);
                url.searchParams.set('id', String(msg.id));
                window.history.replaceState({}, '', url.toString());
            } catch (e) {
                // ignore
            }
        }
    };

    const deleteMessage = async (id: number) => {
        const prev = messages;
        setMessages(messages.filter(m => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
        try {
            const res = await api.admin.deleteMessage(id);
            if (!res.success) {
                setError(res.message || 'Erreur lors de la suppression');
                setMessages(prev);
            }
        } catch (e) {
            setError('Erreur réseau lors de la suppression');
            setMessages(prev);
        }
    };

    const statusLabels = {
        new: { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
        read: { label: 'Lu', color: 'bg-gray-100 text-gray-600' },
        replied: { label: 'Répondu', color: 'bg-green-100 text-green-700' },
        archived: { label: 'Archivé', color: 'bg-orange-100 text-orange-700' },
    };

    const counts = {
        all: messages.length,
        new: messages.filter(m => getStatusForMessage(m) === 'new').length,
        read: messages.filter(m => getStatusForMessage(m) === 'read').length,
        replied: messages.filter(m => getStatusForMessage(m) === 'replied').length,
        archived: messages.filter(m => getStatusForMessage(m) === 'archived').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Messages de contact</h1>
                <p className="text-gray-500 text-sm mt-1">Consultez les messages envoyés via le formulaire de contact</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {(['all', 'new', 'read', 'replied', 'archived'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            filter === f
                                ? 'bg-[var(--primary)] text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {f === 'all' ? 'Tous' : statusLabels[f].label}
                        <span className="ml-1.5 text-xs opacity-70">({counts[f]})</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                        {filteredMessages.map((msg) => (
                            <button
                                key={msg.id}
                                onClick={() => openMessage(msg)}
                                className={`w-full text-left px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                                    selectedMessage?.id === msg.id ? 'bg-blue-50 border-l-2 border-l-[var(--secondary)]' : ''
                                }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-sm font-medium ${getStatusForMessage(msg) === 'new' ? 'text-gray-900' : 'text-gray-600'}`}>
                                        {msg.name}
                                    </span>
                                    {getStatusForMessage(msg) === 'new' && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                                </div>
                                <div className="text-xs text-gray-700 font-medium truncate">{msg.subject}</div>
                                <div className="text-[11px] text-gray-400 mt-0.5">{msg.created_at ? new Date(msg.created_at).toLocaleString('fr-FR') : ''}</div>
                            </button>
                        ))}
                        {filteredMessages.length === 0 && (
                            <div className="text-center py-8 text-gray-400 text-sm">Aucun message</div>
                        )}
                    </div>
                </div>

                {/* Detail */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    {selectedMessage ? (
                        <div className="space-y-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">{selectedMessage.subject}</h2>
                                    <p className="text-sm text-gray-500 mt-0.5">De : {selectedMessage.name}</p>
                                </div>
                                {(() => {
                                    const st = getStatusForMessage(selectedMessage as ContactMessage);
                                    return (
                                        <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${statusLabels[st].color}`}>
                                            {statusLabels[st].label}
                                        </span>
                                    );
                                })()}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Email</div>
                                    <a href={`mailto:${selectedMessage.email}`} className="text-sm text-blue-600 hover:underline">{selectedMessage.email}</a>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Date</div>
                                    <div className="text-sm text-gray-700">{selectedMessage.created_at ? new Date(selectedMessage.created_at).toLocaleString('fr-FR') : ''}</div>
                                </div>
                            </div>

                            <div>
                                <div className="text-[11px] text-gray-400 uppercase font-semibold mb-2">Message</div>
                                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                                    {selectedMessage.message}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                                >
                                    Répondre par email
                                </a>
                                <button
                                    onClick={() => updateStatus(selectedMessage.id, 'replied')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                                >
                                    Marquer répondu
                                </button>
                                <button
                                    onClick={() => updateStatus(selectedMessage.id, 'archived')}
                                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Archiver
                                </button>
                                <button
                                    onClick={() => deleteMessage(selectedMessage.id)}
                                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm">Sélectionnez un message pour voir les détails</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

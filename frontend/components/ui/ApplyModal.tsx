"use client";

import React, { useState } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
    open: boolean;
    onClose: () => void;
    offer?: { id?: number | string; title?: string } | null;
};

export default function ApplyModal({ open, onClose, offer }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            const subject = `Candidature: ${offer?.title || 'Offre'}`;
            const body = `Candidature pour l'offre ${offer?.title || ''} (id: ${offer?.id || ''})\n\nMessage:\n${message}`;

            // If a file is attached, send as multipart/form-data
            if (file) {
                const form = new FormData();
                form.append('name', name);
                form.append('email', email);
                if (phone) form.append('phone', phone);
                form.append('company', '');
                form.append('subject', subject);
                form.append('message', body);
                form.append('attachment', file, file.name);
                await api.sendContactFormMultipart(form);
            } else {
                await api.sendContactForm({ name, email, phone, company: '', subject, message: body });
            }
            setSent(true);
            // optionally close after a short delay
            setTimeout(() => { setSending(false); onClose(); setSent(false); setName(''); setEmail(''); setPhone(''); setMessage(''); }, 1200);
        } catch (err) {
            alert('Erreur lors de l\'envoi');
            setSending(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="sticky top-0 bg-[var(--primary)] text-white px-6 py-5 rounded-t-2xl flex justify-between items-start z-10">
                            <div>
                                <h2 className="text-xl font-bold text-[var(--secondary)]">Postuler</h2>
                                <p className="text-white/80 text-sm mt-1">{offer?.title ? `Offre : ${offer.title}` : 'Envoyer votre candidature'}</p>
                            </div>
                            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-1 -mr-1 -mt-1" aria-label="Fermer">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
                            {sent ? (
                                <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-semibold text-[var(--text-primary)]">Candidature envoyée — merci.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                        <input required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (optionnel)</label>
                                        <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Message / CV (lien ou texte)</label>
                                        <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900 resize-none" rows={4} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pièces justificatives (ZIP)</label>
                                        <div className="flex items-center gap-3">
                                            <label className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg cursor-pointer text-sm text-gray-700">
                                                <input
                                                    type="file"
                                                    accept=".zip,application/zip"
                                                    onChange={e => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                                                    className="sr-only"
                                                />
                                                Parcourir
                                            </label>

                                            <div className="text-sm text-gray-600 truncate max-w-xs">
                                                {file ? file.name : 'Aucun fichier sélectionné'}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">Si vous avez plusieurs documents (CV, pièces d&apos;identité, diplômes), regroupez-les dans un dossier et compressez-le au format <strong>.zip</strong>.</p>
                                    </div>

                                    <div className="flex items-center justify-end gap-3">
                                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Annuler</button>
                                        <button type="submit" disabled={sending} className={`bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg ${sending ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]'}`}>
                                            {sending ? 'Envoi...' : 'Envoyer la candidature'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

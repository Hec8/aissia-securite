'use client';

import { useState, useEffect, useCallback } from 'react';
import { api, type SubmitQuotePayload } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteModalProps {
    translations: {
        title: string;
        subtitle: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        company: string;
        service: string;
        serviceOptions: {
            surveillance: string;
            audit: string;
            risk: string;
            protection: string;
            formation: string;
            escorte: string;
            other: string;
        };
        message: string;
        submit: string;
        success: string;
        close: string;
    };
}

export function QuoteModal({ translations: t }: QuoteModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [preselectedService, setPreselectedService] = useState('');

    // form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [service, setService] = useState('');
    const [message, setMessage] = useState('');
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'personne_physique' | 'personne_morale'>('personne_physique');
    const [ncc, setNcc] = useState<string>('');
    const [rccm, setRccm] = useState<string>('');

    const MIN_DESCRIPTION_LENGTH = 20;

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = e.target.value as 'personne_physique' | 'personne_morale';
        setStatus(selectedStatus);
        if (selectedStatus === 'personne_physique') {
            setNcc('');
            setRccm('');
        }
    };
    const handleOpen = useCallback((e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail?.service) {
            setPreselectedService(customEvent.detail.service);
        }
        setIsOpen(true);
        setIsSubmitted(false);
    }, []);

    useEffect(() => {
        window.addEventListener('open-quote-modal', handleOpen);
        return () => window.removeEventListener('open-quote-modal', handleOpen);
    }, [handleOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const validateForm = () => {
        const missing: string[] = [];
        if (!firstName.trim()) missing.push(t.firstName || 'Prénom');
        if (!lastName.trim()) missing.push(t.lastName || 'Nom');
        if (!email.trim()) missing.push(t.email || 'Email');
        if (!phone.trim()) missing.push(t.phone || 'Téléphone');
        if (!company.trim()) missing.push(t.company || 'Société');
        const serviceValue = service || preselectedService;
        if (!serviceValue.trim()) missing.push(t.service || 'Service');
        if (!message.trim()) missing.push(t.message || 'Message');
        if (!status) missing.push('Statut');
        if (status === 'personne_morale') {
            if (!ncc.trim()) missing.push('NCC');
            if (!rccm.trim()) missing.push('RCCM');
        }
        return missing;
    };

    const isFormValid = () => validateForm().length === 0 && (message || '').trim().length >= MIN_DESCRIPTION_LENGTH;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);
        // client-side validation
        const missing = validateForm();
        if (missing.length > 0) {
            setSubmitError(`Veuillez remplir : ${missing.join(', ')}.`);
            setIsSubmitting(false);
            return;
        }

        if ((message || '').trim().length < MIN_DESCRIPTION_LENGTH) {
            setSubmitError(`Le message doit contenir au moins ${MIN_DESCRIPTION_LENGTH} caractères.`);
            setIsSubmitting(false);
            return;
        }

        try {
            await api.submitQuote({
                company_name: company,
                contact_name: `${firstName} ${lastName}`.trim(),
                email,
                phone: phone || undefined,
                service_type: service || preselectedService || '',
                description: message,
                ncc: status === 'personne_morale' ? ncc : undefined,
                rccm: status === 'personne_morale' ? rccm : undefined,
            } as SubmitQuotePayload);
            setIsSubmitted(true);
            // reset form and close after short delay
            setTimeout(() => {
                setIsOpen(false);
                setIsSubmitted(false);
                setPreselectedService('');
                setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setCompany(''); setService(''); setMessage('');
            }, 2000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.3, type: 'spring', damping: 25 }}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-[var(--primary)] text-white px-6 py-5 rounded-t-2xl flex justify-between items-start z-10">
                            <div>
                                <h2 className="text-xl font-bold text-[var(--secondary)]">{t.title}</h2>
                                <p className="text-white/80 text-sm mt-1">{t.subtitle}</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors p-1 -mr-1 -mt-1"
                                aria-label={t.close}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {isSubmitted ? (
                                <motion.div
                                    className="text-center py-12"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-semibold text-[var(--text-primary)]">{t.success}</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.firstName}</label>
                                            <input
                                                type="text"
                                                required
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.lastName}</label>
                                            <input
                                                type="text"
                                                required
                                                value={lastName}
                                                onChange={e => setLastName(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.company}</label>
                                        <input
                                            type="text"
                                            required
                                            value={company}
                                            onChange={e => setCompany(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.service}</label>
                                        <select
                                            value={service || preselectedService}
                                            onChange={e => setService(e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900 bg-white"
                                        >
                                            <option value="">{t.service}</option>
                                            <option value="surveillance">{t.serviceOptions.surveillance}</option>
                                            <option value="audit">{t.serviceOptions.audit}</option>
                                            <option value="risk">{t.serviceOptions.risk}</option>
                                            <option value="protection">{t.serviceOptions.protection}</option>
                                            <option value="formation">{t.serviceOptions.formation}</option>
                                            <option value="escorte">{t.serviceOptions.escorte}</option>
                                            <option value="other">{t.serviceOptions.other}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                                        <select
                                            value={status}
                                            onChange={handleStatusChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900 bg-white"
                                        >
                                            <option value="personne_physique">Personne Physique</option>
                                            <option value="personne_morale">Personne Morale</option>
                                        </select>
                                    </div>

                                    {status === 'personne_morale' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Compte Contribuable (NCC)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={ncc}
                                                    onChange={e => setNcc(e.target.value)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Régistre de Commerce (RCCM)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={rccm}
                                                    onChange={e => setRccm(e.target.value)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900"
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
                                        <textarea
                                            rows={3}
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent text-gray-900 resize-none"
                                        ></textarea>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className={`text-xs font-medium ${ (message || '').trim().length < MIN_DESCRIPTION_LENGTH ? 'text-red-600' : 'text-green-600' }`}>
                                                {(message || '').trim().length} / {MIN_DESCRIPTION_LENGTH} caractères
                                            </div>
                                            {submitError && (
                                                <div className="text-xs text-red-600">{submitError}</div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !isFormValid()}
                                        className={`w-full bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg ${isSubmitting || !isFormValid() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]'}`}
                                    >
                                        {isSubmitting ? 'Envoi...' : t.submit}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Helper client component - bouton qui ouvre le modal
export function QuoteButton({
    children,
    className = '',
    service = '',
}: {
    children: React.ReactNode;
    className?: string;
    service?: string;
}) {
    const handleClick = () => {
        window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: { service } }));
    };

    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    );
}


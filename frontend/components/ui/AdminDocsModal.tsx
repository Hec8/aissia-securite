'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminDocsModal({ title, items, triggerElement }: { title: string; items: string[]; triggerElement?: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            {triggerElement ? (
                <div onClick={() => setIsOpen(true)} className="inline-block">
                    {triggerElement}
                </div>
            ) : (
                <button
                    type="button"
                    aria-label={`Ouvrir ${title}`}
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-3 w-full text-left bg-transparent"
                >
                    <span className="flex-none w-7 h-7 rounded-full bg-white/10 text-[var(--secondary)] flex items-center justify-center"> 
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                    <span className="text-sm font-medium leading-tight block" style={{ color: '#ffffff' }}>{title}</span>
                </button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="sticky top-0 bg-[var(--primary)] text-white px-6 py-4 rounded-t-2xl flex justify-between items-start z-10">
                                <div>
                                    <h3 className="text-lg font-bold text-[var(--secondary)]">{title}</h3>
                                    <p className="text-white/80 text-sm mt-1">Pièces à fournir</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1" aria-label="Fermer">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="max-h-[60vh] overflow-y-auto">
                                    <ul className="space-y-3">
                                        {items.map((it, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <span className="flex-none w-7 h-7 rounded-full bg-[var(--primary)] text-[var(--secondary)] flex items-center justify-center"> 
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </span>
                                                <span className="text-sm text-[var(--text-primary)] leading-relaxed flex-1 min-w-0">{it}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-6 text-right">
                                    <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90">
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

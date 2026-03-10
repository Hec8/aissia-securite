"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

type ProfilesInputProps = {
    value?: string | null;
    onChange?: (html: string) => void;
};

function stripHtmlToItems(src?: string | null): string[] {
    if (!src) return [];
    // if it's HTML list, extract li contents
    if (/<li[\s>]/i.test(src)) {
        const matches = Array.from(src.matchAll(/<li[^>]*>(.*?)<\/li>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim());
        return matches.filter(Boolean);
    }
    // split on newlines or lines starting with -
    const lines = src.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length > 1) return lines.map(l => l.replace(/^-\s*/, '').trim());
    // fallback: comma separated
    if (src.indexOf(',') !== -1) return src.split(',').map(s => s.trim()).filter(Boolean);
    return [src.trim()];
}

function escapeHtml(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function toHtmlList(items: string[]) {
    if (!items || items.length === 0) return '';
    const lis = items.map(i => `<li>${escapeHtml(i)}</li>`).join('');
    return `<ul class="list-disc ml-6">${lis}</ul>`;
}

function ProfilesInput({ value, onChange }: ProfilesInputProps) {
    const [items, setItems] = useState<string[]>(() => stripHtmlToItems(value));
    const [input, setInput] = useState('');

    // update internal items only when incoming value actually differs
    useEffect(() => {
        const newItems = stripHtmlToItems(value);
        const same = newItems.length === items.length && newItems.every((v, i) => v === items[i]);
        if (!same) setItems(newItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const add = () => {
        const v = input.trim();
        if (!v) return;
        const next = [...items, v];
        setItems(next);
        onChange && onChange(toHtmlList(next));
        setInput('');
    };

    return (
        <div>
            <div className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} placeholder="Ajouter une ligne et appuyer sur Entrée" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] outline-none" />
                <button type="button" onClick={add} className="px-3 py-2 bg-[var(--secondary)] text-[var(--primary)] rounded-lg">Ajouter</button>
            </div>

            <div className="mt-3 space-y-2">
                {items.length === 0 ? (
                    <div className="text-sm text-gray-500">Aucun élément. Vous pouvez coller plusieurs lignes ou ajouter une par une.</div>
                ) : (
                    <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
                        {items.map((it, idx) => (
                            <li key={idx} className="flex items-center justify-between">
                                <span className="flex-1">{it}</span>
                                <button type="button" onClick={() => {
                                    const next = items.filter((_, i) => i !== idx);
                                    setItems(next);
                                    onChange && onChange(toHtmlList(next));
                                }} className="text-sm text-red-500 hover:underline ml-4">Supprimer</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

type JobOffer = {
    id?: number | string;
    title: string;
    slug?: string;
    description?: string;
    profiles?: string;
    conditions?: string;
    location?: string;
    is_active: boolean;
};

type Props = {
    initial?: Partial<JobOffer>;
    onSuccess?: (data?: JobOffer) => void;
};

export default function JobOfferForm({ initial, onSuccess }: Props) {
    const [form, setForm] = useState<JobOffer>({ id: undefined, title: '', slug: '', description: '', profiles: '', conditions: '', location: '', is_active: true });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!initial) return;
        const src = initial as Partial<JobOffer>;
        setForm(() => ({
            id: src.id ?? undefined,
            title: typeof src.title === 'string' ? src.title : '',
            slug: typeof src.slug === 'string' ? src.slug : '',
            description: typeof src.description === 'string' ? src.description : '',
            profiles: typeof src.profiles === 'string' ? src.profiles : '',
            conditions: typeof src.conditions === 'string' ? src.conditions : '',
            location: typeof src.location === 'string' ? src.location : '',
            is_active: typeof src.is_active === 'boolean' ? src.is_active : Boolean((src as any).is_active),
        }));
    }, [initial]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            const payload: Partial<Omit<JobOffer, 'id'>> & { id?: number } = {
                title: form.title,
                slug: form.slug ? form.slug : undefined,
                description: form.description && form.description !== '' ? form.description : undefined,
                profiles: form.profiles && form.profiles !== '' ? form.profiles : undefined,
                conditions: form.conditions && form.conditions !== '' ? form.conditions : undefined,
                location: form.location && form.location !== '' ? form.location : undefined,
                is_active: form.is_active,
                id: typeof form.id === 'string' ? Number(form.id) : form.id as number | undefined,
            };
            if (initial && initial.id) {
                await api.admin.updateJobOffer(Number(initial.id), payload);
            } else {
                await api.admin.createJobOffer(payload);
            }
            if (onSuccess) {
                onSuccess({ ...form, id: payload.id } as JobOffer);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message || 'Erreur');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Titre du poste" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] outline-none" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (optionnel)</label>
                    <input name="slug" value={form.slug} onChange={handleChange} placeholder="slug (optionnel)" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                    <input name="location" value={form.location} onChange={handleChange} placeholder="Lieu" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] outline-none" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[var(--secondary)] outline-none" rows={6} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profils recherchés</label>
                <ProfilesInput
                    value={form.profiles}
                    onChange={(val) => setForm((p) => ({ ...p, profiles: val }))}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conditions</label>
                <ProfilesInput
                    value={form.conditions}
                    onChange={(val) => setForm((p) => ({ ...p, conditions: val }))}
                />
            </div>

            <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-3">
                    <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="h-4 w-4 rounded text-[var(--secondary)]" />
                    <span className="text-sm">Actif</span>
                </label>
                <div>
                    <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--secondary)] text-[var(--primary)] rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
                        {saving ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                </div>
            </div>
        </form>
    );
}

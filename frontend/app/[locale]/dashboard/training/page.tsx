"use client";

import { useState, useEffect } from 'react';
import { api, Formation } from '@/lib/api';

interface TrainingModule {
    id: number;
    title: string;
    description: string;
    duration: string;
    isDefault?: boolean;
    createdAt: string;
}

export default function DashboardTrainingPage() {
    const [modules, setModules] = useState<TrainingModule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        api.admin.getFormations()
            .then(res => {
                if (res.success) {
                    const mapped: TrainingModule[] = (res.data || []).map((f: Formation) => ({
                        id: f.id,
                        title: f.title,
                        description: f.description ?? '',
                        duration: f.duration_weeks ? `${f.duration_weeks} semaines` : '',
                        isDefault: f.is_active,
                        createdAt: f.created_at,
                    }));
                    setModules(mapped);
                } else {
                    setError(res.message || 'Erreur de chargement');
                }
            })
            .catch(() => setError('Erreur de chargement'))
            .finally(() => setLoading(false));
    }, []);

    const [showForm, setShowForm] = useState(false);
    const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);
    const [form, setForm] = useState({ title: '', description: '', duration: '' });

    const resetForm = () => {
        setForm({ title: '', description: '', duration: '' });
        setEditingModule(null);
        setShowForm(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingModule) {
            setModules(modules.map(m =>
                m.id === editingModule.id
                    ? { ...m, title: form.title, description: form.description, duration: form.duration }
                    : m
            ));
        } else {
            const newModule: TrainingModule = {
                id: Date.now(),
                title: form.title,
                description: form.description,
                duration: form.duration,
                isDefault: false,
                createdAt: new Date().toLocaleDateString('fr-FR'),
            };
            setModules([...modules, newModule]);
        }
        resetForm();
    };

    const handleEdit = (mod: TrainingModule) => {
        setForm({ title: mod.title, description: mod.description, duration: mod.duration });
        setEditingModule(mod);
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        setModules(modules.filter(m => m.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Modules de formation</h1>
                    <p className="text-gray-500 text-sm mt-1">Gérez les modules de formation proposés</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Ajouter un module
                </button>
            </div>

            {/* Form modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => resetForm()}>
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingModule ? 'Modifier le module' : 'Nouveau module de formation'}
                            </h2>
                            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titre du module</label>
                                <input
                                    type="text"
                                    required
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent outline-none text-sm"
                                    placeholder="Ex: Sécurité Incendie"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent outline-none text-sm resize-none"
                                    placeholder="Description du module..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
                                <input
                                    type="text"
                                    required
                                    value={form.duration}
                                    onChange={e => setForm({ ...form, duration: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent outline-none text-sm"
                                    placeholder="Ex: 3 semaines"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                                >
                                    {editingModule ? 'Enregistrer' : 'Créer le module'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modules grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {modules.map((mod) => (
                    <div key={mod.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                {mod.isDefault ? (
                                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-semibold uppercase rounded-full">
                                        Par défaut
                                    </span>
                                ) : (
                                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold uppercase rounded-full">
                                        Personnalisé
                                    </span>
                                )}
                                <span className="text-xs text-gray-400">{mod.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleEdit(mod)}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                {!mod.isDefault && (
                                    <button
                                        onClick={() => handleDelete(mod.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{mod.title}</h3>
                        <p className="text-gray-500 text-xs line-clamp-2">{mod.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";
import { useEffect, useState } from "react";
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/hooks/useTranslation';

export default function AdminProfilePage() {
  useTranslation();
  const router = useRouter();
  // admin state removed (not used)
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (!token) {
        router.replace('/login');
        return;
      }
      try {
        const res = await api.getMe();
        if (res.success && res.data) {
          setForm(f => ({ ...f, name: res.data.name, email: res.data.email }));
        }
      } catch {
        setError('Erreur de chargement du profil');
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await api.admin.updateAdminProfile({
        name: form.name,
        email: form.email,
        ...(form.password ? { password: form.password, password_confirmation: form.password_confirmation } : {})
      });
      if (res.success) {
        setSuccess(true);
        // admin state removed
        setForm(f => ({ ...f, password: '', password_confirmation: '' }));
      } else {
        setError(res.message || 'Erreur lors de la sauvegarde');
      }
    } catch {
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Chargement du profil...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Mon profil administrateur</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow border">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" autoComplete="new-password" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
          <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" autoComplete="new-password" />
        </div>
        {success && <div className="text-green-600 text-sm">Profil mis à jour !</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full py-3 bg-[var(--secondary)] text-white font-semibold rounded-lg hover:opacity-90 transition-all" disabled={saving}>
          {saving ? 'Sauvegarde...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}

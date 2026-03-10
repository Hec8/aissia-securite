"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Admin {
  id: number;
  name: string;
  email: string;
}

export function DashboardUserMenu({ locale }: { locale: string }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) {
      // Simuler récupération admin (à adapter si API réelle)
      setAdmin({ id: 1, name: "Administrator", email: "info@aissia-securite.com" });
    }
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.replace("/login");
  };

  if (!admin) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--secondary)] transition"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--secondary)] text-white font-bold">
          {admin.name[0]}
        </span>
        <span className="hidden sm:inline font-semibold">{admin.name}</span>
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 min-w-[180px]">
          <button
            onClick={() => { setOpen(false); router.push(`/${locale}/dashboard/profile`); }}
            className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            Mon profil
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 border-t border-gray-100"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
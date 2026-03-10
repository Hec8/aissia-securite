'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/hooks/useTranslation';

// Composants de drapeaux en SVG (déclarés hors du composant pour éviter les re-créations)
const FlagFR = () => (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="600" fill="#ED2939" />
        <rect width="600" height="600" fill="#fff" />
        <rect width="300" height="600" fill="#002395" />
    </svg>
);

const FlagGB = () => (
    <svg className="w-5 h-4 rounded-sm" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="s"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
        <clipPath id="t"><path d="M30,15 h30 v15 z v-15 h-30 z h-30 v15 z v-15 h30 z" /></clipPath>
        <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
    </svg>
);

export const Header = () => {
    const { t, locale } = useTranslation();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [admin, setAdmin] = useState<{ id: number; name: string; email: string } | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    // Récupérer l'admin connecté
    useEffect(() => {
        const fetchAdmin = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
            if (token) {
                try {
                    const res = await api.getMe();
                    if (res.success && res.data) setAdmin(res.data);
                } catch {}
            }
        };
        fetchAdmin();
    }, []);


    // Détection du scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fermer les dropdowns quand on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangDropdownOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Déconnexion
    const handleLogout = async () => {
        await api.logout();
        localStorage.removeItem('auth_token');
        setAdmin(null);
        router.replace('/login');
    };

    const navigation = [
        { name: t.nav.about, href: `/${locale}/about` },
        { name: t.nav.services, href: `/${locale}/services` },
        { name: t.nav.training, href: `/${locale}/training` },
        { name: t.nav.products, href: `/${locale}/products` },
        { name: t.nav.technologies, href: `/${locale}/technologies` },
        { name: t.nav.contact, href: `/${locale}/contact` },
    ];

    const isActive = (href: string) => {
        if (href === `/${locale}`) {
            return pathname === `/${locale}` || pathname === '/';
        }
        return pathname?.startsWith(href);
    };

    const languages = [
        { code: 'fr', label: 'Français', shortLabel: 'FR', flag: <FlagFR /> },
        { code: 'en', label: 'English', shortLabel: 'EN', flag: <FlagGB /> },
    ];

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    const switchLanguage = (newLocale: string) => {
        const newPath = pathname?.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
        setIsLangDropdownOpen(false);
        window.location.assign(newPath);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-[var(--primary)]'}`}>
            <div className="max-w-[85rem] mx-auto px-4 sm:px-10 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center group">
                        <div className="relative h-12 w-32 sm:h-14 sm:w-40">
                            <Image 
                                src={isScrolled ? "/logo/Variantes logo-02.png" : "/logo/Variantes logo-03.png"}
                                alt="AISSIA SÉCURITÉ"
                                fill
                                className="object-contain transition-all duration-300"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    isActive(item.href)
                                        ? isScrolled 
                                            ? 'bg-[var(--primary)] text-white' 
                                            : 'bg-white/20 text-white'
                                        : isScrolled
                                            ? 'text-[var(--text-primary)] hover:bg-[var(--accent)]'
                                            : 'text-white hover:bg-white/10'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Language Switcher, User Menu & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        {/* Lang */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className={`flex items-center space-x-2 px-3 py-2 border rounded-lg text-sm font-medium transition-all duration-300 ${
                                    isScrolled
                                        ? 'border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--accent)]'
                                        : 'border-white/30 text-white hover:bg-white/10'
                                }`}
                            >
                                <span className="flex items-center">{currentLanguage.flag}</span>
                                <span className="font-semibold">{currentLanguage.shortLabel}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-[var(--border)] overflow-hidden z-50">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => switchLanguage(lang.code)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-smooth ${locale === lang.code
                                                ? 'bg-[var(--primary)] text-white'
                                                : 'text-[var(--text-primary)] hover:bg-[var(--accent)]'
                                                }`}
                                        >
                                            <span className="flex items-center">{lang.flag}</span>
                                            <span>{lang.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* User/Admin menu */}
                        {/* ...admin menu supprimé, il ne s'affiche plus sur le site public... */}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                                isScrolled
                                    ? 'text-[var(--text-primary)] hover:bg-[var(--accent)]'
                                    : 'text-white hover:bg-white/10'
                            }`}
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav 
                            initial={{ opacity: 0, height: 0, y: -20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className={`lg:hidden overflow-hidden border-t ${isScrolled ? 'border-[var(--border)]' : 'border-white/20'}`}
                        >
                            <motion.div 
                                className="py-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                {navigation.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ 
                                            delay: index * 0.08,
                                            duration: 0.4,
                                            ease: [0.04, 0.62, 0.23, 0.98]
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                isActive(item.href)
                                                    ? isScrolled 
                                                        ? 'bg-[var(--primary)] text-white' 
                                                        : 'bg-white/20 text-white'
                                                    : isScrolled
                                                        ? 'text-[var(--text-primary)] hover:bg-[var(--accent)]'
                                                        : 'text-white hover:bg-white/10'
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

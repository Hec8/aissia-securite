'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { QuoteModal } from '../ui/QuoteModal';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { NewsletterForm } from './NewsletterForm';

export const Footer = () => {
    const { t, locale } = useTranslation();
    const currentYear = new Date().getFullYear();

    const servicesLinks = [
        { name: t.footer.servicesLinks.surveillance, href: `/${locale}/services` },
        { name: t.footer.servicesLinks.audit, href: `/${locale}/services` },
        { name: t.footer.servicesLinks.risk, href: `/${locale}/services` },
        { name: t.footer.servicesLinks.protection, href: `/${locale}/services` },
        { name: t.footer.servicesLinks.formation, href: `/${locale}/training` },
    ];

    const companyLinksObj = t.footer.companyLinks as {
        about: string;
        services: string;
        products: string;
        technologies: string;
        training: string;
        recrutement?: string;
        job?: string;
        contact: string;
        [key: string]: string | undefined;
    };

    const companyLinks = [
        { name: companyLinksObj.about, href: `/${locale}/about` },
        { name: companyLinksObj.services, href: `/${locale}/services` },
        { name: companyLinksObj.products, href: `/${locale}/products` },
        { name: companyLinksObj.technologies, href: `/${locale}/technologies` },
        { name: companyLinksObj.training, href: `/${locale}/training` },
        { name: companyLinksObj.recrutement ?? companyLinksObj.job ?? '', href: `/${locale}/recrutement` },
        { name: companyLinksObj.contact, href: `/${locale}/contact` },
    ];

    return (
        <>
        <footer className="bg-[#0a1929] text-white mt-auto">
            <Container>
                <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Col 1 - Logo + Description + Socials */}
                    <div>
                        <div className="relative h-16 w-44 mb-4">
                            <Image 
                                src="/logo/Variantes logo-03.png"
                                alt="AISSIA SÉCURITÉ"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed mb-6">
                            {t.footer.description}
                        </p>
                        <div className="flex space-x-3">
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/profile.php?id=61585512675004"
                                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                                aria-label="Facebook"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/aissia_securite"
                                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.33 3.608 1.304.975.975 1.242 2.242 1.304 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.33 2.633-1.304 3.608-.975.975-2.242 1.242-3.608 1.304-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.33-3.608-1.304-.975-.975-1.242-2.242-1.304-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.33-2.633 1.304-3.608C4.512 2.493 5.779 2.226 7.145 2.163 8.411 2.105 8.791 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.775.127 4.631.442 3.68 1.392c-.95.951-1.265 2.095-1.322 3.372C2.012 6.668 2 7.077 2 12s.012 5.332.07 6.608c.057 1.277.372 2.421 1.322 3.372.951.95 2.095 1.265 3.372 1.322 1.277.058 1.686.07 6.608.07s5.332-.012 6.608-.07c1.277-.057 2.421-.372 3.372-1.322.95-.951 1.265-2.095 1.322-3.372.058-1.277.07-1.686.07-6.608s-.012-5.332-.07-6.608c-.057-1.277-.372-2.421-1.322-3.372-.951-.95-2.095-1.265-3.372-1.322C17.332.012 16.923 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0-2.881 1.44 1.44 0 0 0 0 2.881z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/company/aissia-securit%C3%A9/"
                                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                                aria-label="LinkedIn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>

                            {/* TikTok - CORRIGÉ */}
                            <a
                                href="https://www.tiktok.com/@aissia.securit6"
                                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                                aria-label="TikTok"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.321 5.562a5.124 5.124 0 0 1-1.262-.176 4.934 4.934 0 0 1-3.403-3.403 5.124 5.124 0 0 1-.176-1.262h-3.184v12.528c-.003 1.441-1.17 2.609-2.611 2.609-.682 0-1.298-.26-1.764-.681-.546-.493-.886-1.198-.886-1.992 0-1.514 1.23-2.744 2.744-2.744.282 0 .552.047.808.126V8.399c-2.427.244-4.361 2.268-4.361 4.748 0 1.618.801 3.041 2.02 3.948a5.744 5.744 0 0 0 3.533 1.206c3.176 0 5.756-2.58 5.756-5.756V7.296a8.326 8.326 0 0 0 4.352 1.262V5.562z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Col 2 - Services */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{t.footer.services}</h3>
                        <ul className="space-y-3">
                            {servicesLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 - Company */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{t.footer.company}</h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 - Stay Updated / Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{t.footer.stayUpdated}</h3>
                        <p className="text-sm text-white/60 leading-relaxed mb-4">
                            {t.footer.newsletterText}
                        </p>
                        <NewsletterForm t={t} />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-white/50">
                        © {currentYear} AISSIA SÉCURITÉ. {t.footer.rights}.
                    </p>
                    <div className="flex space-x-6">
                        <Link href={`/${locale}/legal/privacy`} className="text-xs text-white/50 hover:text-white transition-colors">
                            {t.footer.privacy}
                        </Link>
                        <Link href={`/${locale}/legal/terms`} className="text-xs text-white/50 hover:text-white transition-colors">
                            {t.footer.terms}
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
            <QuoteModal translations={t.quoteModal} />
        </>
    );
};

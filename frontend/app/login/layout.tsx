import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
    locale: 'fr',
    path: '/login',
    title: 'Connexion administration - AISSIA SÉCURITÉ',
    description: 'Page de connexion de l’espace d’administration AISSIA SÉCURITÉ.',
    keywords: ['connexion admin', 'espace administration', 'AISSIA dashboard'],
    noIndex: true,
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}

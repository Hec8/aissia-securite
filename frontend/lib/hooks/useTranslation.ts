'use client';

import { useParams } from 'next/navigation';
import { translations } from '../translations';
import { Locale, defaultLocale } from '../i18n';

export function useTranslation() {
    const params = useParams();
    const locale = (params?.locale as Locale) || defaultLocale;

    const t = translations[locale] || translations[defaultLocale];

    return { t, locale };
}

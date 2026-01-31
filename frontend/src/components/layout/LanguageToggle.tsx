'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@/icons';
import type { Locale } from '@/i18n/settings';
import { useAppDispatch } from '@/store/hooks';
import { setLanguage } from '@/store/slices/languageSlice';

interface LanguageToggleProps {
  lng: Locale;
}

export default function LanguageToggle({ lng }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const toggleLanguage = () => {
    const newLng: Locale = lng === 'en' ? 'ar' : 'en';
    dispatch(setLanguage(newLng));

    // Replace the locale segment in the current path
    const segments = pathname.split('/');
    segments[1] = newLng;
    const newPath = segments.join('/');

    // Set cookie for middleware detection
    document.cookie = `i18next=${newLng};path=/;max-age=31536000`;
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-white text-sm hover:text-brand-brown-100 transition flex items-center gap-1"
    >
      {lng === 'en' ? 'En' : 'عربي'}
      <ChevronDownIcon className="w-3 h-3" />
    </button>
  );
}

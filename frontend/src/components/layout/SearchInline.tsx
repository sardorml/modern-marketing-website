'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';

interface SearchInlineProps {
  lng: Locale;
  variant?: 'icon' | 'fullwidth';
  initialQuery?: string;
}

export default function SearchInline({ lng, variant = 'icon', initialQuery = '' }: SearchInlineProps) {
  const { t } = useTranslation(lng);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(variant === 'fullwidth');
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${lng}/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  if (variant === 'fullwidth') {
    return (
      <form onSubmit={handleSubmit} className="flex-1 max-w-xl">
        <div className="flex items-center border border-white/50 bg-white/10 backdrop-blur-sm">
          <svg className="w-5 h-5 text-white ms-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full bg-transparent text-white placeholder-white/60 px-3 py-2 text-sm outline-none"
          />
        </div>
      </form>
    );
  }

  return (
    <div className="relative flex items-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-white hover:text-brand-brown-100 transition"
          aria-label={t('nav.search')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => { if (!query) setIsOpen(false); }}
            placeholder={t('nav.searchPlaceholder')}
            className="bg-white/20 text-white placeholder-white/60 px-3 py-1 text-sm outline-none border border-white/30 w-40"
          />
        </form>
      )}
    </div>
  );
}

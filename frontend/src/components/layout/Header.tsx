'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/settings';
import type { Service } from '@/lib/api/services';
import type { SiteSettings } from '@/lib/api/siteSettings';
import { getStrapiMediaUrl } from '@/lib/api/strapi';
import { useTranslation } from '@/i18n/client';
import ServicesDropdown from './ServicesDropdown';
import SearchInline from './SearchInline';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  lng: Locale;
  services: Service[];
  siteSettings: SiteSettings | null;
  variant?: 'default' | 'search';
  searchQuery?: string;
}

export default function Header({ lng, services, siteSettings, variant = 'default', searchQuery }: HeaderProps) {
  const { t } = useTranslation(lng);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const logoUrl = siteSettings?.logo ? getStrapiMediaUrl(siteSettings.logo) : null;
  const bookUrl = siteSettings?.bookAppointmentUrl || '#';
  const bookLabel = siteSettings?.bookAppointmentLabel || t('nav.bookAppointment');

  if (variant === 'search') {
    return (
      <header className="relative">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-brand-brown-500 relative">
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
        <div className="relative z-10 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <SearchInline lng={lng} variant="fullwidth" initialQuery={searchQuery} />
            <a
              href={bookUrl}
              className="shrink-0 border border-white text-white px-4 py-2 text-sm hover:bg-white/10 transition rounded-[8px]"
            >
              {bookLabel}
            </a>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-0">
          {/* Logo */}
          <Link href={`/${lng}`} className="shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-12 w-auto" />
            ) : (
              <span className="text-white font-serif text-xl font-bold">Marketing</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href={`/${lng}`} className="text-white text-sm hover:text-brand-brown-100 transition">
              {t('nav.home')}
            </Link>
            <Link href="#" className="text-white text-sm hover:text-brand-brown-100 transition">
              {t('nav.about')}
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="text-white text-sm hover:text-brand-brown-100 transition flex items-center gap-1">
                {t('nav.services')}
                <svg className={`w-3 h-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <ServicesDropdown services={services} lng={lng} />
              )}
            </div>
            <Link href="#" className="text-white text-sm hover:text-brand-brown-100 transition">
              {t('nav.blog')}
            </Link>
            <Link href={`/${lng}#team`} className="text-white text-sm hover:text-brand-brown-100 transition">
              {t('nav.team')}
            </Link>
            <Link href="#" className="text-white text-sm hover:text-brand-brown-100 transition">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <SearchInline lng={lng} />
            <LanguageToggle lng={lng} />
            <a
              href={bookUrl}
              className="hidden sm:block border border-white text-white px-4 py-2 text-sm hover:bg-white/10 transition rounded-[8px]"
            >
              {bookLabel}
            </a>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-brown-500/95 backdrop-blur-sm pb-4 px-4">
            <div className="flex flex-col gap-3">
              <Link href={`/${lng}`} className="text-white text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.home')}
              </Link>
              <Link href="#" className="text-white text-sm py-2">
                {t('nav.about')}
              </Link>
              <button
                className="text-white text-sm py-2 text-start"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                {t('nav.services')}
              </button>
              {servicesOpen && (
                <div className="ps-4 flex flex-col gap-2">
                  {services.map((s) => (
                    <Link
                      key={s.documentId}
                      href={`/${lng}/services/${s.slug}`}
                      className="text-white/80 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
              <Link href="#" className="text-white text-sm py-2">
                {t('nav.blog')}
              </Link>
              <Link href={`/${lng}#team`} className="text-white text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.team')}
              </Link>
              <Link href="#" className="text-white text-sm py-2">
                {t('nav.contact')}
              </Link>
              <a href={bookUrl} className="text-white text-sm py-2 border border-white px-4 text-center mt-2 rounded-[12px]">
                {bookLabel}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

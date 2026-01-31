'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n/settings';
import type { SiteSettings } from '@/lib/api/siteSettings';
import { useTranslation } from '@/i18n/client';
import SubscriptionForm from '../forms/SubscriptionForm';

interface FooterProps {
  lng: Locale;
  siteSettings: SiteSettings | null;
}

export default function Footer({ lng, siteSettings }: FooterProps) {
  const { t } = useTranslation(lng);

  const footerLinks = siteSettings?.footerLinks || [];
  const copyright = siteSettings?.copyrightText || t('footer.copyright');

  return (
    <footer className="bg-brand-brown-500 text-white">
      {/* Top section: subscription + social */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <SubscriptionForm lng={lng} />
          <div className="flex items-center gap-4">
            <span className="text-sm">{t('footer.contacts')}</span>
            <div className="flex items-center gap-3">
              {siteSettings?.twitterUrl && (
                <a href={siteSettings.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown-100 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              )}
              {siteSettings?.facebookUrl && (
                <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown-100 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {siteSettings?.googleplusUrl && (
                <a href={siteSettings.googleplusUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown-100 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section: links + copyright */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="text-white/80 text-sm hover:text-white transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-white/60 text-sm">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

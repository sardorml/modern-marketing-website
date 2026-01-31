'use client';

import type { Locale } from '@/i18n/settings';
import { TwitterIcon, FacebookIcon, GooglePlusIcon } from '@/icons';
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
    <footer className="border-t border-white/20 bg-brand-brown-500 text-white">
      {/* Top section: subscription + social — centered on mobile, right-aligned on sm+ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-3">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-6 sm:gap-8">
          <SubscriptionForm lng={lng} />
          <div className="flex items-center gap-4 mb-5">
            <span className="text-sm text-white/90">{t('footer.contacts')}</span>
            <div className="flex items-center gap-3">
              {siteSettings?.twitterUrl && (
                <a href={siteSettings.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown-100 transition">
                  <TwitterIcon className="w-5 h-5" />
                </a>
              )}
              {siteSettings?.facebookUrl && (
                <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown-100 transition">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              )}
              {siteSettings?.googleplusUrl && (
                <a href={siteSettings.googleplusUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown-100 transition">
                  <GooglePlusIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section: links + copyright — centered on mobile */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
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

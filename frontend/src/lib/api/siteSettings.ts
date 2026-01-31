import { strapiGet } from './strapi';

export interface FooterLink {
  id: number;
  label: string;
  url: string;
}

export interface SiteSettings {
  id: number;
  documentId: string;
  logo: { url: string; alternativeText?: string } | null;
  bookAppointmentUrl: string | null;
  bookAppointmentLabel: string | null;
  twitterUrl: string | null;
  facebookUrl: string | null;
  googleplusUrl: string | null;
  footerLinks: FooterLink[];
  copyrightText: string | null;
  teamSectionHeading: string | null;
  teamSectionDescription: string | null;
  testimonialSectionHeading: string | null;
  testimonialSectionDescription: string | null;
}

export async function getSiteSettings(locale: string): Promise<SiteSettings | null> {
  try {
    const res = await strapiGet<SiteSettings>('site-setting', {
      locale,
      populate: ['logo', 'footerLinks'],
    });
    return res.data;
  } catch {
    return null;
  }
}

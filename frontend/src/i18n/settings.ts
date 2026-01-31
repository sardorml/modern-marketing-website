export const fallbackLng = 'en';
export const languages = ['en', 'ar'] as const;
export type Locale = (typeof languages)[number];
export const defaultNS = 'common';
export const cookieName = 'i18next';

export function getOptions(lng: string = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

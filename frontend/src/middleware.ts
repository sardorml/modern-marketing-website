import { NextRequest, NextResponse } from 'next/server';
import { fallbackLng, languages, cookieName } from './i18n/settings';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if locale is already in the path
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Detect locale from cookie or Accept-Language header
  let lng = fallbackLng;
  const cookieValue = request.cookies.get(cookieName)?.value;
  if (cookieValue && languages.includes(cookieValue as typeof languages[number])) {
    lng = cookieValue;
  } else {
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
      const preferred = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase();
      if (preferred && languages.includes(preferred as typeof languages[number])) {
        lng = preferred;
      }
    }
  }

  return NextResponse.redirect(new URL(`/${lng}${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico).*)'],
};

import { dir } from 'i18next';
import { languages, type Locale } from '@/i18n/settings';
import StoreProvider from '@/store/provider';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function LngLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng: lngParam } = await params;
  const lng = lngParam as Locale;

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className="antialiased">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

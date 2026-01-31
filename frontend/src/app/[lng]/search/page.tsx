import type { Locale } from '@/i18n/settings';
import { getSiteSettings } from '@/lib/api/siteSettings';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchPageClient from '@/components/search/SearchPageClient';
import { getServices } from '@/lib/api/services';

interface SearchPageProps {
  params: Promise<{ lng: Locale }>;
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { lng } = await params;
  const { q } = await searchParams;
  const query = q || '';

  const [siteSettings, services] = await Promise.all([
    getSiteSettings(lng),
    getServices(lng),
  ]);

  return (
    <>
      <Header lng={lng} services={services?.data || []} siteSettings={siteSettings} variant="search" searchQuery={query} />
      <main className="min-h-[60vh]">
        <SearchPageClient lng={lng} initialQuery={query} />
      </main>
      <Footer lng={lng} siteSettings={siteSettings} />
    </>
  );
}

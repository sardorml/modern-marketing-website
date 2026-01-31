'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setQuery, setActiveTab, setCurrentPage, fetchSearchResults } from '@/store/slices/searchSlice';
import BackButton from '@/components/service/BackButton';
import Pagination from './Pagination';

interface SearchPageClientProps {
  lng: Locale;
  initialQuery: string;
}

export default function SearchPageClient({ lng, initialQuery }: SearchPageClientProps) {
  const { t } = useTranslation(lng);
  const dispatch = useAppDispatch();
  const { query, activeTab, currentPage, pageSize, results, totalResults, pageCount, isLoading } = useAppSelector((state) => state.search);

  // Initialize query from URL on mount
  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      dispatch(setQuery(initialQuery));
    }
  }, [initialQuery]);

  // Fetch results when query, tab, or page changes
  useEffect(() => {
    const searchQuery = query || initialQuery;
    if (searchQuery) {
      dispatch(fetchSearchResults({
        query: searchQuery,
        tab: activeTab,
        page: currentPage,
        pageSize,
        locale: lng,
      }));
    }
  }, [query, activeTab, currentPage, lng, dispatch, pageSize, initialQuery]);

  const handleTabChange = (tab: 'services' | 'team') => {
    dispatch(setActiveTab(tab));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton lng={lng} label={t('common.back')} />

      <div className="mt-6 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-48 shrink-0">
          <div className="border border-gray-200">
            <button
              onClick={() => handleTabChange('team')}
              className={`block w-full text-start px-4 py-3 text-sm transition ${
                activeTab === 'team'
                  ? 'bg-brand-brown-500 text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('search.team')}
            </button>
            <button
              onClick={() => handleTabChange('services')}
              className={`block w-full text-start px-4 py-3 text-sm transition ${
                activeTab === 'services'
                  ? 'bg-brand-brown-500 text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('search.services')}
            </button>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {isLoading ? (
            <div className="text-gray-500 text-sm">{t('common.loading')}</div>
          ) : results.length === 0 ? (
            <div className="text-gray-500 text-sm">{t('common.noResults')}</div>
          ) : (
            <div className="space-y-0">
              {results.map((result) => (
                <div key={`${result.type}-${result.id}`} className="border-b border-gray-200 py-4">
                  <p className="text-gray-700 text-sm mb-1">
                    {result.description || result.name}
                  </p>
                  {result.type === 'service' && result.slug ? (
                    <Link
                      href={`/${lng}/services/${result.slug}`}
                      className="text-brand-brown-500 text-sm underline hover:text-brand-brown-400"
                    >
                      {t('common.readMore')}
                    </Link>
                  ) : (
                    <span className="text-brand-brown-500 text-sm">{result.name} — {result.role}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

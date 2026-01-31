'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, pageCount, onPageChange }: PaginationProps) {
  const getPageNumbers = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
      return pages;
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Pages around current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(pageCount - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < pageCount - 2) {
      pages.push('...');
    }

    // Always show last page
    pages.push(pageCount);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-end gap-1 mt-8">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 text-sm text-gray-500 hover:text-brand-brown-500 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="w-4 h-4 rtl:rotate-180" />
      </button>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 py-1 text-sm text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 text-sm transition ${
              page === currentPage
                ? 'text-brand-brown-500 font-bold underline'
                : 'text-gray-500 hover:text-brand-brown-500'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className="px-2 py-1 text-sm text-gray-500 hover:text-brand-brown-500 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRightIcon className="w-4 h-4 rtl:rotate-180" />
      </button>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  label: string;
  lng?: string;
}

export default function BackButton({ label }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-brand-brown-500 hover:text-brand-brown-400 transition text-sm"
    >
      <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
}

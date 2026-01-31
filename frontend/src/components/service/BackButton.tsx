'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@/icons';

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
      <ChevronLeftIcon className="w-4 h-4 rtl:rotate-180" />
      {label}
    </button>
  );
}

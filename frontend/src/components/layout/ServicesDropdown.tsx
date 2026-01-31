'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n/settings';
import type { Service } from '@/lib/api/services';

interface ServicesDropdownProps {
  services: Service[];
  lng: Locale;
}

export default function ServicesDropdown({ services, lng }: ServicesDropdownProps) {
  return (
    <div className="absolute top-full start-1/2 -translate-x-1/2 w-[80vw] max-w-5xl bg-brand-brown-500 shadow-xl rounded-[12px] p-8 z-50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
        {services.map((service) => (
          <Link
            key={service.documentId}
            href={`/${lng}/services/${service.slug}`}
            className="text-white text-sm hover:text-brand-brown-100 transition"
          >
            {service.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

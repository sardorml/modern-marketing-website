import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/settings';
import { useTranslation } from '@/i18n/server';
import { getServiceBySlug, getServices } from '@/lib/api/services';
import { getSiteSettings } from '@/lib/api/siteSettings';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlocksRenderer from '@/components/service/BlocksRenderer';
import BackButton from '@/components/service/BackButton';
import { getStrapiMediaUrl } from '@/lib/api/strapi';

interface ServicePageProps {
  params: Promise<{ lng: Locale; slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { lng, slug } = await params;
  const service = await getServiceBySlug(slug, lng);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.name,
    description: service.description || undefined,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { lng, slug } = await params;
  const { t } = await useTranslation(lng);

  const [service, siteSettings, allServices] = await Promise.all([
    getServiceBySlug(slug, lng),
    getSiteSettings(lng),
    getServices(lng),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header lng={lng} services={allServices?.data || []} siteSettings={siteSettings} />

      {/* Hero Image */}
      <section className="relative h-[50vh]">
        {service.image ? (
          <img
            src={getStrapiMediaUrl(service.image)}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-brown-500" />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton lng={lng} label={t('common.back')} />

        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown-500 mt-6 mb-8">
          {service.name}
        </h1>

        {service.description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            {service.description}
          </p>
        )}

        {service.content && (
          <BlocksRenderer content={service.content} />
        )}
      </main>

      <Footer lng={lng} siteSettings={siteSettings} />
    </>
  );
}

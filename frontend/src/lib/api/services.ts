import { strapiGet, type StrapiResponse } from './strapi';

export interface Service {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  content: unknown[];
  image: { url: string; alternativeText?: string } | null;
  ctaLabel: string | null;
  ctaLink: string | null;
}

export async function getServices(locale: string): Promise<StrapiResponse<Service[]>> {
  return strapiGet<Service[]>('services', {
    locale,
    populate: 'image',
    sort: 'name:asc',
  });
}

export async function getServiceBySlug(
  slug: string,
  locale: string
): Promise<Service | null> {
  const res = await strapiGet<Service[]>('services', {
    locale,
    populate: 'image',
    filters: { slug: { $eq: slug } },
  });
  return res.data?.[0] || null;
}

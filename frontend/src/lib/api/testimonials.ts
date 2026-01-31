import { strapiGet, type StrapiResponse } from './strapi';

export interface Testimonial {
  id: number;
  documentId: string;
  clientName: string;
  clientTitle: string | null;
  company: string | null;
  quote: string;
  image: { url: string; alternativeText?: string } | null;
}

export async function getTestimonials(locale: string): Promise<StrapiResponse<Testimonial[]>> {
  const result = await strapiGet<Testimonial[]>('testimonials', {
    locale,
    populate: 'image',
  });

  // In RTL/non-default locale, Strapi may not return image (or any data); fallback to default locale
  if (locale !== 'en') {
    const fallback = await strapiGet<Testimonial[]>('testimonials', {
      locale: 'en',
      populate: 'image',
    });
    if (!result.data?.length && fallback.data?.length) {
      return fallback;
    }
    if (result.data?.length && fallback.data?.length) {
      const needsImages = result.data.some((item) => !item?.image);
      if (needsImages) {
        result.data = result.data.map((item, index) => ({
          ...item,
          image: item.image || (fallback.data[index]?.image ?? null),
        }));
      }
    }
  }

  return result;
}

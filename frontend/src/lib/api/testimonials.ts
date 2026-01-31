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
  return strapiGet<Testimonial[]>('testimonials', {
    locale,
    populate: 'image',
  });
}

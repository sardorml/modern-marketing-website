import { strapiGet, type StrapiResponse } from './strapi';

export interface HeroSlide {
  id: number;
  documentId: string;
  heading: string;
  description: string | null;
  mediaType: 'image' | 'video';
  image: { url: string; alternativeText?: string } | null;
  video: { url: string } | null;
  ctaLabel: string | null;
  ctaLink: string | null;
  order: number;
}

export async function getHeroSlides(locale: string): Promise<StrapiResponse<HeroSlide[]>> {
  return strapiGet<HeroSlide[]>('hero-slides', {
    locale,
    populate: ['image', 'video'],
    sort: 'order:asc',
  });
}

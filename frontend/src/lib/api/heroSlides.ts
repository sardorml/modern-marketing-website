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
  sideImage: { url: string; alternativeText?: string } | null;
  order: number;
}

export async function getHeroSlides(locale: string): Promise<StrapiResponse<HeroSlide[]>> {
  // Fetch with the requested locale
  const result = await strapiGet<HeroSlide[]>('hero-slides', {
    locale,
    populate: ['image', 'video', 'sideImage'],
    sort: 'order:asc',
  });

  // If no data or data has no images, try fallback to English
  if (locale !== 'en' && (!result.data || result.data.length === 0 || !result.data[0]?.image)) {
    const fallbackResult = await strapiGet<HeroSlide[]>('hero-slides', {
      locale: 'en',
      populate: ['image', 'video', 'sideImage'],
      sort: 'order:asc',
    });
    
    // If we have original data with text but no images, merge with fallback images
    if (result.data && result.data.length > 0 && fallbackResult.data) {
      result.data = result.data.map((slide, index) => {
        const fallbackSlide = fallbackResult.data[index];
        return {
          ...slide,
          image: slide.image || fallbackSlide?.image || null,
          video: slide.video || fallbackSlide?.video || null,
          sideImage: slide.sideImage || fallbackSlide?.sideImage || null,
        };
      });
    } else if (fallbackResult.data && fallbackResult.data.length > 0) {
      // Use fallback data entirely if no localized data
      return fallbackResult;
    }
  }

  return result;
}

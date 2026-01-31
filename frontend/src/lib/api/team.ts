import { strapiGet, type StrapiResponse } from './strapi';

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  image: { url: string; alternativeText?: string } | null;
  whatsapp: string | null;
  phone: string | null;
  email: string | null;
  order: number;
}

export async function getTeamMembers(locale: string): Promise<StrapiResponse<TeamMember[]>> {
  const result = await strapiGet<TeamMember[]>('team-members', {
    locale,
    populate: 'image',
    sort: 'order:asc',
  });

  // In RTL/non-default locale, Strapi may not return image (or any data); fallback to default locale
  if (locale !== 'en') {
    const fallback = await strapiGet<TeamMember[]>('team-members', {
      locale: 'en',
      populate: 'image',
      sort: 'order:asc',
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

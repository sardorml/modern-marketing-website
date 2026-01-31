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
  return strapiGet<TeamMember[]>('team-members', {
    locale,
    populate: 'image',
    sort: 'order:asc',
  });
}

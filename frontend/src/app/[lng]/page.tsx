import type { Locale } from '@/i18n/settings';
import { useTranslation } from '@/i18n/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/home/HeroSlider';
import TeamSection from '@/components/home/TeamSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import { getHeroSlides } from '@/lib/api/heroSlides';
import { getTeamMembers } from '@/lib/api/team';
import { getTestimonials } from '@/lib/api/testimonials';
import { getSiteSettings } from '@/lib/api/siteSettings';
import { getServices } from '@/lib/api/services';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lng: Locale }>;
}) {
  const { lng } = await params;
  const { t } = await useTranslation(lng);

  let heroSlides, teamMembers, testimonials, siteSettings, services;

  try {
    [heroSlides, teamMembers, testimonials, siteSettings, services] = await Promise.all([
      getHeroSlides(lng),
      getTeamMembers(lng),
      getTestimonials(lng),
      getSiteSettings(lng),
      getServices(lng),
    ]);
  } catch {
    heroSlides = { data: [], meta: {} };
    teamMembers = { data: [], meta: {} };
    testimonials = { data: [], meta: {} };
    siteSettings = null;
    services = { data: [], meta: {} };
  }

  return (
    <>
      <Header lng={lng} services={services?.data || []} siteSettings={siteSettings} />
      <main>
        <HeroSlider slides={heroSlides?.data || []} lng={lng} />
        <TeamSection
          members={teamMembers?.data || []}
          lng={lng}
          heading={siteSettings?.teamSectionHeading || t('team.heading')}
          description={siteSettings?.teamSectionDescription || t('team.description')}
        />
        <TestimonialSection
          testimonials={testimonials?.data || []}
          lng={lng}
          heading={siteSettings?.testimonialSectionHeading || t('testimonials.heading')}
          description={siteSettings?.testimonialSectionDescription || t('testimonials.description')}
        />
      </main>
      <Footer lng={lng} siteSettings={siteSettings} />
    </>
  );
}

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { TeamMember } from '@/lib/api/team';
import type { Locale } from '@/i18n/settings';
import TeamCard from './TeamCard';

interface TeamSectionProps {
  members: TeamMember[];
  lng: Locale;
  heading: string;
  description: string;
}

export default function TeamSection({ members, lng, heading, description }: TeamSectionProps) {
  if (members.length === 0) return null;

  return (
    <section id="team" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown-500 mb-4">
            {heading}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            dir={lng === 'ar' ? 'rtl' : 'ltr'}
            className="!px-8"
          >
            {members.map((member) => (
              <SwiperSlide key={member.documentId}>
                <TeamCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

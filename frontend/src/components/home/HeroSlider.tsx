'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import type { HeroSlide } from '@/lib/api/heroSlides';
import type { Locale } from '@/i18n/settings';
import { getStrapiMediaUrl } from '@/lib/api/strapi';
import { useTranslation } from '@/i18n/client';

interface HeroSliderProps {
  slides: HeroSlide[];
  lng: Locale;
}

export default function HeroSlider({ slides, lng }: HeroSliderProps) {
  const { t } = useTranslation(lng);

  if (slides.length === 0) {
    return (
      <section className="relative h-[80vh] bg-brand-brown-500 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white text-center">
          <h1 className="text-4xl font-serif font-bold">{t('common.loading')}</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[80vh]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}" style="display:block;margin:8px 0;"></span>`,
          el: '.hero-pagination',
          type: 'bullets',
        }}
        loop
        className="h-full w-full"
        dir={lng === 'ar' ? 'rtl' : 'ltr'}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.documentId}>
            <div className="relative h-full w-full">
              {/* Background */}
              {slide.mediaType === 'video' && slide.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={getStrapiMediaUrl(slide.video)} type="video/mp4" />
                </video>
              ) : slide.image ? (
                <Image
                  src={getStrapiMediaUrl(slide.image)}
                  alt={slide.heading}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-brand-brown-500" />
              )}

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-xl">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                      {slide.heading}
                    </h1>
                    {slide.description && (
                      <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed">
                        {slide.description}
                      </p>
                    )}
                    {slide.ctaLabel && slide.ctaLink && (
                      <a
                        href={slide.ctaLink}
                        className="inline-block bg-white text-brand-brown-500 px-6 py-3 text-sm font-medium hover:bg-brand-brown-50 transition"
                      >
                        {slide.ctaLabel}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Vertical dots on left side */}
      <div className="hero-pagination absolute start-6 top-1/2 -translate-y-1/2 z-20 flex flex-col" />
    </section>
  );
}

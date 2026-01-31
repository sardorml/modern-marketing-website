'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { HeroSlide } from '@/lib/api/heroSlides';
import type { Locale } from '@/i18n/settings';
import { getStrapiMediaUrl } from '@/lib/api/strapi';
import { useTranslation } from '@/i18n/client';

interface HeroSliderProps {
  slides: HeroSlide[];
  lng: Locale;
}

function HeroSlideBackground({ slide }: { slide: HeroSlide }) {
  if (slide.mediaType === 'video' && slide.video) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={getStrapiMediaUrl(slide.video)} type="video/mp4" />
      </video>
    );
  }
  if (slide.image) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={getStrapiMediaUrl(slide.image)}
        alt={slide.heading}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  return <div className="absolute inset-0 bg-brand-brown-500" />;
}

export default function HeroSlider({ slides, lng }: HeroSliderProps) {
  const { t } = useTranslation(lng);

  if (slides.length === 0) {
    return (
      <section className="relative min-h-screen h-screen bg-brand-brown-500 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white text-center">
          <h1 className="text-4xl font-serif font-bold">{t('common.loading')}</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen h-screen">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{
          clickable: true,
        }}
        loop
        className="hero-swiper h-full w-full"
        dir={lng === 'ar' ? 'rtl' : 'ltr'}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.documentId}>
            <div className="relative h-full w-full">
              <HeroSlideBackground slide={slide} />

              {/* Dark overlay - linear gradient per design: #4B2615 28% → 68% opacity */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, rgba(75, 38, 21, 0.28), rgba(75, 38, 21, 0.68))',
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="flex items-start justify-between gap-8">
                    {/* Text content */}
                    <div className="max-w-xl mt-12">
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
                          className="inline-block bg-white text-brand-brown-500 px-6 py-3 text-sm font-medium hover:bg-brand-brown-50 transition rounded-[12px]"
                        >
                          {slide.ctaLabel}
                        </a>
                      )}
                    </div>

                    {/* Side image */}
                    {slide.sideImage && (
                      <div className="hidden lg:block shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={getStrapiMediaUrl(slide.sideImage)}
                            alt={slide.sideImage.alternativeText || slide.heading}
                            className="relative w-[370px] h-[370px] object-cover"
                          />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}

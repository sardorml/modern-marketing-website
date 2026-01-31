'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import type { Testimonial } from '@/lib/api/testimonials';
import type { Locale } from '@/i18n/settings';
import { getStrapiMediaUrl } from '@/lib/api/strapi';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  lng: Locale;
  heading: string;
  description: string;
}

export default function TestimonialSection({ testimonials, lng, heading, description }: TestimonialSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-brand-brown-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            {heading}
          </h2>
          <p className="text-white/70 max-w-2xl text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateNavState(swiper);
            }}
            onSlideChange={(swiper) => updateNavState(swiper)}
            spaceBetween={24}
            slidesPerView={1}
            dir={lng === 'ar' ? 'rtl' : 'ltr'}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.documentId}>
                <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 pb-16">
                  {/* Client Image with offset frame */}
                  {testimonial.image && (
                      <img
                        src={getStrapiMediaUrl(testimonial.image)}
                        alt={testimonial.clientName}
                        className="relative w-[370px] h-[370px] object-cover shrink-0"
                      />
                  )}

                  {/* Quote - stretches to image height, name/title at bottom */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <blockquote className="text-white/70 text-lg lg:text-xl leading-relaxed mb-8">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="mt-auto">
                      <p className="font-bold text-white text-lg">{testimonial.clientName}</p>
                      {(testimonial.clientTitle || testimonial.company) && (
                        <p className="text-white/70 text-sm">
                          {testimonial.clientTitle}
                          {testimonial.clientTitle && testimonial.company && '/'}
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows - filled when scrollable, outline when at start/end */}
          <div className="flex items-center justify-end gap-5 mt-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                !isBeginning
                  ? 'bg-white text-brand-brown-500 hover:bg-brand-brown-50'
                  : 'bg-brand-brown-400 text-white'
              }`}
              aria-label="Previous testimonial"
              disabled={isBeginning}
            >
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12 L5 12 M5 12 L12 5 M5 12 L12 19" />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                !isEnd
                  ? 'bg-white text-brand-brown-500 hover:bg-brand-brown-50'
                  : 'bg-brand-brown-400 text-white'
              }`}
              aria-label="Next testimonial"
              disabled={isEnd}
            >
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-7-7m7 7l-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

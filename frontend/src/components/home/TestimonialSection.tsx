'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import TestimonialNavButton from './TestimonialNavButton';
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
                  <div className="flex-1 flex flex-col min-h-0 max-w-xl">
                    <blockquote className="text-white/70 text-lg lg:text-xl leading-loose mb-8">
                      {testimonial.quote}
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
            <TestimonialNavButton
              direction="prev"
              disabled={isBeginning}
              onClick={() => swiperRef.current?.slidePrev()}
              ariaLabel="Previous testimonial"
            />
            <TestimonialNavButton
              direction="next"
              disabled={isEnd}
              onClick={() => swiperRef.current?.slideNext()}
              ariaLabel="Next testimonial"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
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
  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown-500 mb-4">
            {heading}
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          slidesPerView={1}
          dir={lng === 'ar' ? 'rtl' : 'ltr'}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.documentId}>
              <div className="flex flex-col md:flex-row items-start gap-8 pb-8">
                {/* Client Image */}
                {testimonial.image && (
                  <div className="shrink-0 w-48 h-48 relative overflow-hidden">
                    <Image
                      src={getStrapiMediaUrl(testimonial.image)}
                      alt={testimonial.clientName}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                )}

                {/* Quote */}
                <div className="flex-1">
                  <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <p className="font-bold text-brand-brown-500">{testimonial.clientName}</p>
                  {(testimonial.clientTitle || testimonial.company) && (
                    <p className="text-gray-500 text-sm">
                      {testimonial.clientTitle}
                      {testimonial.clientTitle && testimonial.company && '/'}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

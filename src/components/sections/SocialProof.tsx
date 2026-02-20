'use client'

import React from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Quote } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Joerg Jørgensen',
    role: '',
    content: 'I’ve worked with Marianne on a number of international clients expanding into the U.S. market, including companies that transition from private to public. She has a strong understanding of cross-border insurance considerations and brings a practical, steady approach to navigating complexity as clients establish and grow their U.S. presence.',
    rating: 5,
  },
  {
    name: 'Scott Chesky',
    role: 'Managing Partner, Chesky Partners',
    content: 'Marianne is a trusted advisor to our firm and our clients during M&A transactions. Her expertise in tail D&O and Rep & Warranty insurance brings clarity and confidence to sellers navigating complex exits. She is responsive, strategic, and a true partner in getting deals done.',
    rating: 5,
  },
  {
    name: 'Andre A. Hakkak',
    role: 'Founder, Managing Partner & CEO, White Oak Global Advisors',
    content: 'Marianne has been a trusted partner to us at White Oak Global Advisors for our business insurance needs and beyond. She brings a practical, thoughtful approach to lender diligence and has been especially helpful in working through complex D&O situations where coverage can be difficult to obtain. Marianne understands the realities of the market and knows how to navigate them in a way that actually gets results.',
    rating: 5,
  },
]


const companyLogos = [
  '/cheskey_logo.jpg','/Founders_Logo.png','/GCP_logo.png','/CSP_logo.png','/white-oak.webp',
]

export const SocialProof: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()
  const { ref: logosRef, isVisible: logosVisible } = useScrollAnimation()

  return (
    <Section gradient id="testimonials" className="bg-gold-50 overflow-hidden">
      <div
        ref={headerRef}
        className={`text-center mb-16 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-normal text-navy-900 mb-6">
          What our Clients Say
        </h2>
        <p className="text-xl text-navy-600 max-w-3xl mx-auto font-light">
          Trusted voices from leaders we&apos;ve had the privilege to advise and support
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            className={`scroll-animate ${cardsVisible ? `visible animate-fade-in-up stagger-${index + 1}` : ''}`}
          >
            <Card gradient className="relative h-full flex flex-col">
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-navy-600" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <svg key={`${testimonial.name}-star-${i}`} className="w-5 h-5 text-gold-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-navy-700 leading-relaxed mb-8 relative z-10 flex-grow">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-navy-100 pt-4 mt-auto">
                <p className="font-semibold text-navy-900">{testimonial.name}</p>
                {testimonial.role && (
                  <p className="text-sm text-navy-600">{testimonial.role}</p>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Logo wall infinite loop */}
      <div
        ref={logosRef}
        className={`text-center scroll-animate ${logosVisible ? 'visible animate-fade-in' : ''}`}
      >
        <p className="text-sm text-navy-500 mb-10 uppercase tracking-wider font-semibold">
          Respected advisors who entrust us to support the clients they serve.
        </p>

        <div className="relative w-full overflow-hidden">
          <div className="flex items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
            {companyLogos.map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 w-32 h-16 relative  opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={logo}
                  alt={`Client Logo ${(index % companyLogos.length) + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Gradient overlays to smooth edges */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gold-50 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gold-50 to-transparent z-10"></div>
        </div>
      </div>
    </Section>
  )
}

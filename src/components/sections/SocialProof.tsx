'use client'

import React from 'react'
import { Section } from '@/components/ui/Section'
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'

const testimonials = [
  {
    author: {
      name: 'Joerg Jørgensen',
      handle: 'International Insurance Advisor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      
    },
    text: 'I\u2019ve worked with Marianne on a number of international clients expanding into the U.S. market, including companies that transition from private to public. She has a strong understanding of cross-border insurance considerations and brings a practical, steady approach to navigating complexity as clients establish and grow their U.S. presence.',
  },
  {
    author: {
      name: 'Scott Chesky',
      handle: 'Managing Partner, Chesky Partners',
      avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQEvTvNqDe5Gog/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1675650950653?e=1774483200&v=beta&t=XVALJtzh6rA7pkgdnY-GD7WLd5d0DL4xAG6IxJq3F0w',
     
    },
    text: 'Marianne is a trusted advisor to our firm and our clients during M&A transactions. Her expertise in tail D&O and Rep & Warranty insurance brings clarity and confidence to sellers navigating complex exits. She is responsive, strategic, and a true partner in getting deals done.',
  },
  {
    author: {
      name: 'Andre A. Hakkak',
      handle: 'Founder & CEO, White Oak Global Advisors',
      avatar: 'https://whiteoaksf.com/wp-content/uploads/2017/05/Andre-Hakkak.jpg',
      
    },
    text: 'Marianne has been a trusted partner to us at White Oak Global Advisors for our business insurance needs and beyond. She brings a practical, thoughtful approach to lender diligence and has been especially helpful in working through complex D&O situations where coverage can be difficult to obtain.',
  },
]

const companyLogos = [
  '/cheskey_logo.jpg',
  '/Founders_Logo.png',
  '/GCP_logo.png',
  '/CSP_logo.png',
  '/white-oak.webp',
]

export const SocialProof: React.FC = () => {
  const { ref: logosRef, isVisible: logosVisible } = useScrollAnimation()

  return (
    <Section gradient id="testimonials" className="bg-gold-50 overflow-hidden">
      <TestimonialsSection
        title="What Our Clients Say"
        description="Trusted voices from leaders we've had the privilege to advise and support"
        testimonials={testimonials}
        className="!py-0 [&_h2]:font-serif [&_h2]:font-normal [&_h2]:text-navy-900 [&_p]:text-navy-600"
      />

      {/* Logo wall */}
      <div
        ref={logosRef}
        className={`text-center mt-20 scroll-animate ${logosVisible ? 'visible animate-fade-in' : ''}`}
      >
        <p className="text-md text-navy-700 mb-10  tracking-wider font-semibold">
          Respected advisors who entrust us to support the clients they serve.
        </p>

        <div className="relative w-full overflow-hidden">
          <div className="flex items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused] [--duration:30s] [--gap:3rem] [gap:var(--gap)]">
            {Array.from({ length: 3 }).map((_, setIdx) =>
              companyLogos.map((logo, index) => (
                <div
                  key={`${setIdx}-logo-${index}`}
                  className="flex-shrink-0 w-32 h-16 relative opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={logo}
                    alt={`Client Logo ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))
            )}
          </div>

          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gold-50 to-transparent z-10" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gold-50 to-transparent z-10" />
        </div>
      </div>
    </Section>
  )
}

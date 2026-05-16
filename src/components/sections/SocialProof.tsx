'use client'

import React from 'react'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface Testimonial {
  name: string
  role: string
  avatar: string
  quote: string
}

const testimonials: ReadonlyArray<Testimonial> = [
  {
    name: 'Scott Chesky',
    role: 'Managing Partner, Chesky Partners',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E03AQEvTvNqDe5Gog/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1675650950653?e=1774483200&v=beta&t=XVALJtzh6rA7pkgdnY-GD7WLd5d0DL4xAG6IxJq3F0w',
    quote:
      'Marianne is a trusted advisor to our firm and our clients during M&A transactions. Her expertise in tail D&O and Rep & Warranty insurance brings clarity and confidence to sellers navigating complex exits. She is responsive, strategic and a true partner in getting deals done.',
  },
  {
    name: 'Andre A. Hakkak',
    role: 'Founder & CEO, White Oak Global Advisors',
    avatar: 'https://whiteoaksf.com/wp-content/uploads/2017/05/Andre-Hakkak.jpg',
    quote:
      'Marianne has been a trusted partner to us at White Oak Global Advisors for our business insurance needs and beyond. She brings a practical, thoughtful approach to lender diligence and has been especially helpful in working through complex D&O situations where coverage can be difficult to obtain.',
  },
  {
    name: 'Joerg Joergensen',
    role: 'International CFO Consultant',
    avatar:
      'https://media.licdn.com/dms/image/v2/C4E03AQGiBBFMfdMSxA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516240277304?e=1775692800&v=beta&t=eF5oBcYmOIwBIY--78XRnrVpC7W26W4KepMVu0ZED6M',
    quote:
      "I've worked with Marianne on a number of international clients expanding into the U.S. market, including companies that transition from private to public. She has a strong understanding of cross-border insurance considerations and brings a practical, steady approach to navigating complexity as clients establish and grow their U.S. presence.",
  },
  {
    name: 'Selig D. Sacks',
    role: 'President, SDS Advisory, Inc.',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E03AQH0e7g8tD9rJg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1717684230080?e=1775692800&v=beta&t=placeholder',
    quote:
      "Marianne brings deep insight and judgment to every engagement. Her thoughtful, steady approach has helped our clients navigate complex insurance challenges with confidence — across both routine and highly bespoke placements.",
  },
]

const companyLogos = [
  '/cheskey_logo.png',
  '/Founders_Logo.png',
  '/GCP_logo.png',
  '/CSP_logo.png',
  '/white-oak.png',
]

export const SocialProof: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: logosRef, isVisible: logosVisible } = useScrollAnimation()

  // Duplicate the list so the -50% translate gives us a seamless loop
  const looped = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white py-24">
      {/* Header */}
      <div
        ref={headerRef}
        className={`mx-auto mb-14 flex max-w-[870px] flex-col items-center px-4 text-center scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-[14px]">
          <span className="block h-px w-10 bg-gradient-to-r from-transparent to-[#AE9059]" />
          <span className="text-[16px] font-semibold uppercase tracking-[3.2px] text-[#C9A96E]">
            What Clients Say
          </span>
          <span className="block h-px w-10 bg-gradient-to-l from-transparent to-[#AE9059]" />
        </div>

        <h2 className="text-[32px] font-bold leading-[1.2] text-[#0F2238] md:text-[40px]">
          <span className="text-[#2C4E6E]">Voices</span> from the leaders
          <br />
          who <span className="text-[#2C4E6E]">trust us</span> to deliver
          <br />
          exceptional results
        </h2>
      </div>

      {/* Marquee testimonials */}
      <div className="group relative w-full overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-max animate-marquee gap-6 px-6 [--duration:40s] [--gap:1.5rem] group-hover:[animation-play-state:paused]">
          {looped.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Logo wall */}
      <div
        ref={logosRef}
        className={`mt-20 px-4 text-center scroll-animate ${logosVisible ? 'visible animate-fade-in' : ''}`}
      >
        <p className="mb-2 text-[18px] font-semibold tracking-wider text-[#0F2238]">
          Respected advisors who entrust us to support the clients they serve.
        </p>
        <p className="mx-auto mb-10 max-w-2xl text-sm font-light leading-relaxed text-[#4A4A4A] md:text-base">
          We partner with leaders, investors, and lenders to navigate complex risk across M&amp;A,
          restructuring, and growth through modern tools, trusted relationships, and strategic
          market access.
        </p>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee items-center whitespace-nowrap [--duration:30s] [--gap:3rem] [gap:var(--gap)] hover:[animation-play-state:paused]">
            {Array.from({ length: 3 }).map((_, setIdx) =>
              companyLogos.map((logo, index) => (
                <div
                  key={`${setIdx}-logo-${index}`}
                  className="relative h-16 w-32 flex-shrink-0 opacity-50 transition-opacity duration-300 hover:opacity-100"
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

          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ── Testimonial card ──────────────────────────────────────────── */

interface TestimonialCardProps {
  testimonial: Testimonial
}

function TestimonialCard({ testimonial }: Readonly<TestimonialCardProps>) {
  return (
    <article className="flex w-[385px] flex-shrink-0 flex-col gap-8 rounded-xl border border-[#C9A96E] bg-[#F4F4F4] p-8">
      <div className="flex items-center gap-6">
        <div className="relative h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#C9A96E] ring-offset-2 ring-offset-[#F4F4F4]">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="60px"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="bg-[linear-gradient(-39deg,#1C3E57_4%,#24445C_96%)] bg-clip-text text-[20px] font-bold leading-[1.2] text-transparent">
            {testimonial.name}
          </p>
          <p className="text-[14px] leading-[1.2] text-[#767879]">{testimonial.role}</p>
        </div>
      </div>

      <p className="text-[15px] leading-[1.6] text-[#676767] whitespace-normal">
        {testimonial.quote}
      </p>
    </article>
  )
}

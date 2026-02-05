'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const testimonials = [
  {
    name: 'Selig Sachs',
    role: 'Asset Management Executive',
    content: 'I have known and worked with Marianne for over 10 years. While at AON, Marianne designed and implemented the D&O and Umbrella insurance for our asset management company and portfolio companies. Since then and with now forming her own insurance brokerage platform, Marianne demonstrates the same commitment to outstanding client service and pricing. I look forward to continuing to work with her. She is a very valued resource and terrific person.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    content: 'Strategi Builder secured our D&O and EPLI coverage during our Series A when other brokers said it was impossible. Their market relationships and creative structuring were invaluable.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Founder, GreenLeaf Solutions',
    content: 'They helped us navigate a complex acquisition with seamless R&W insurance placement and post-transaction coverage. Their advocacy and market knowledge were exceptional.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'COO, HealthTech Partners',
    content: 'Working with Strategi Builder during our Chapter 11 restructuring was a game-changer. They secured coverage when we needed it most and guided us through every step.',
    rating: 5,
  },
]

const companyLogos = [
  { name: 'Goldman Sachs', logo: 'Goldman Sachs' },
  { name: 'Morgan Stanley', logo: 'Morgan Stanley' },
  { name: 'BlackRock', logo: 'BlackRock' },
  { name: 'JPMorgan', logo: 'JPMorgan' },
  { name: 'Fidelity', logo: 'Fidelity' },
  { name: 'Vanguard', logo: 'Vanguard' },
  { name: 'State Street', logo: 'State Street' },
  { name: 'Citadel', logo: 'Citadel' },
]

export const SocialProof: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()
  const { ref: logosRef, isVisible: logosVisible } = useScrollAnimation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      return () => container.removeEventListener('scroll', checkScrollButtons)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Section gradient id="testimonials" className="bg-gold-50">
      <div 
        ref={headerRef}
        className={`text-center mb-16 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-normal text-navy-900 mb-6">
          What our Clients Say
        </h2>
        <p className="text-xl text-navy-600 max-w-3xl mx-auto font-light">
          Join hundreds of successful companies that have transformed their vision into reality
        </p>
      </div>

      {/* Testimonial Carousel */}
      <div ref={cardsRef} className="relative mb-16">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gold-50 hover:scale-110 -ml-4 md:-ml-6 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-navy-700" />
        </button>
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gold-50 hover:scale-110 -mr-4 md:-mr-6 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-navy-700" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`flex-shrink-0 w-[350px] md:w-[400px] scroll-animate ${cardsVisible ? `visible animate-fade-in-up stagger-${index + 1}` : ''}`}
              style={{ scrollSnapAlign: 'start' }}
            >
              <Card gradient className="relative h-full">
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
                <p className="text-navy-700 leading-relaxed mb-6 relative z-10">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-navy-100 pt-4">
                  <p className="font-semibold text-navy-900">{testimonial.name}</p>
                  <p className="text-sm text-navy-600">{testimonial.role}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 rounded-full bg-navy-300 hover:bg-gold-500 transition-colors duration-300"
              onClick={() => {
                if (scrollContainerRef.current) {
                  const cardWidth = 416 // 400px + 16px gap
                  scrollContainerRef.current.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                  })
                }
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Infinite Scrolling Logo Marquee */}
      <div 
        ref={logosRef}
        className={`text-center scroll-animate ${logosVisible ? 'visible animate-fade-in' : ''}`}
      >
        <p className="text-sm text-navy-500 mb-8 uppercase tracking-wider font-semibold">
          Trusted by Companies Across Industries
        </p>
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gold-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gold-50 to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="flex animate-marquee">
            {/* First set of logos */}
            <div className="flex items-center gap-12 px-6">
              {companyLogos.map((company, index) => (
                <div
                  key={`logo-1-${index}`}
                  className="flex-shrink-0 w-36 h-14 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-navy-600 text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-300 border border-navy-100"
                >
                  {company.logo}
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center gap-12 px-6">
              {companyLogos.map((company, index) => (
                <div
                  key={`logo-2-${index}`}
                  className="flex-shrink-0 w-36 h-14 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-navy-600 text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-300 border border-navy-100"
                >
                  {company.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

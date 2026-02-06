'use client'

import React from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Quote } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const testimonials = [
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

export const SocialProof: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()
  const { ref: logosRef, isVisible: logosVisible } = useScrollAnimation()

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

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            className={`scroll-animate ${cardsVisible ? `visible animate-fade-in-up stagger-${index + 1}` : ''}`}
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

      {/* Logo wall placeholder */}
      <div 
        ref={logosRef}
        className={`text-center scroll-animate ${logosVisible ? 'visible animate-fade-in' : ''}`}
      >
        <p className="text-sm text-navy-500 mb-8 uppercase tracking-wider font-semibold">
          Trusted by Companies Across Industries
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40 grayscale">
          {/* Placeholder for client logos - replace with actual logos */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-32 h-12 bg-navy-200 rounded-lg flex items-center justify-center text-navy-600 text-xs font-semibold">
              Client {i}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

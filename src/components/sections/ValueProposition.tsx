'use client'

import React from 'react'
import { Section } from '@/components/ui/Section'
import { Target, Shield, Lightbulb } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const values = [
  {
    icon: Target,
    title: 'Intention',
    description: 'We approach our work with intention because the decisions we support carry real weight. They affect people, businesses, and futures built over time. We begin by listening and taking the time to understand the full context behind each situation, including the pressures leaders are facing. This allows us to offer guidance that is thoughtful, steady, and centered on protecting what truly matters.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Integrity is where our work begins. It shapes how we show up, how we advise, and how we advocate. We are guided by honesty, accountability, and respect for the responsibility entrusted to us. Our commitment is to do what is right for our clients and to build relationships that endure because they are rooted in trust.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Lightbulb,
    title: 'Intelligence',
    description: 'We are innovative and modern in how we work, using AI and emerging tools to support an evolving risk landscape. We continue to explore new technologies and approaches that create clarity, efficiency, and better outcomes for our clients. Innovation is used in the service of people, not in place of them. Human judgment, real connection, and trusted relationships remain central as we adapt and grow alongside the businesses we support.',
    gradient: 'from-amber-500 to-orange-500',
  },
]

export const ValueProposition: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()

  return (
    <Section className="relative bg-gradient-to-b from-[#0D1B2A] via-[#1B365D] to-navy-800">
      <div 
        ref={headerRef}
        className={`text-center mb-16 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-normal text-white mb-6">
          Built on Three Core Principles
        </h2>
        <p className="text-xl text-teal-200 max-w-2xl mx-auto font-light">
          Our approach combines strategic thinking with practical execution
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => {
          const Icon = value.icon
          const animatedClasses = cardsVisible ? 'visible animate-scale-in stagger-' + (index + 1) : ''
          return (
            <div
              key={value.title}
              className={`group relative bg-navy-800/30 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-teal-200/20 hover:border-gold-500/60 hover-lift overflow-hidden scroll-animate ${animatedClasses}`}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500`} />
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 animate-glow-pulse`}>
                  <Icon className="w-8 h-8 text-white group-hover:animate-bounce-slow" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

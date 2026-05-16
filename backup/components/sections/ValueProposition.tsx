'use client'

import React from 'react'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Target, Shield, Lightbulb } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const values = [
  {
    icon: Target,
    title: 'Intention',
    description: 'We approach our work with intention because the decisions we support carry real weight. They affect people, businesses, and futures built over time. We begin by listening and taking the time to understand the full context behind each situation, including the pressures leaders are facing. This allows us to offer guidance that is thoughtful, steady, and centered on protecting what truly matters.',
    gradient: 'from-blue-500 to-cyan-500',
    accent: 'bg-blue-500',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Integrity is where our work begins. It shapes how we show up, how we advise, and how we advocate. We are guided by honesty, accountability, and respect for the responsibility entrusted to us. Our commitment is to do what is right for our clients and to build relationships that endure because they are rooted in trust.',
    gradient: 'from-emerald-500 to-teal-500',
    accent: 'bg-emerald-500',
  },
  {
    icon: Lightbulb,
    title: 'Intelligence',
    description: 'We are innovative and modern in how we work, using AI and emerging tools to support an evolving risk landscape. We continue to explore new technologies and approaches that create clarity, efficiency, and better outcomes for our clients. Innovation is used in the service of people, not in place of them. Human judgment, real connection, and trusted relationships remain central as we adapt and grow alongside the businesses we support.',
    gradient: 'from-amber-500 to-orange-500',
    accent: 'bg-amber-500',
  },
]

const ValueRow: React.FC<{
  value: typeof values[0]
  index: number
  isReversed: boolean
}> = ({ value, index, isReversed }) => {
  const { ref, isVisible } = useScrollAnimation()
  const Icon = value.icon
  const animClass = isReversed ? 'animate-slide-in-right' : 'animate-slide-in-left'
  const visibleClass = isVisible ? 'visible ' + animClass : ''

  return (
    <div
      ref={ref}
      className={`scroll-animate ${visibleClass}`}
    >
      <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}>
        {/* Visual side */}
        <div className="lg:w-5/12 flex justify-center">
          <div className="relative">
            {/* Decorative ring */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${value.gradient} opacity-10 blur-2xl scale-150`} />
            <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-2xl`}>
              <Icon className="w-14 h-14 md:w-16 md:h-16 text-white" />
            </div>
            {/* Step number */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-navy-900 font-bold text-lg shadow-lg">
              {index + 1}
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className="lg:w-7/12 text-center lg:text-left">
          <div className={`inline-block w-12 h-1 ${value.accent} rounded-full mb-4`} />
          <h3 className="text-3xl md:text-4xl font-serif font-normal text-white mb-5">
            {value.title}
          </h3>
          <p className="text-gray-300 leading-relaxed text-lg font-light max-w-xl">
            {value.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export const ValueProposition: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

  return (
    <Section className="relative overflow-hidden bg-[#1B365D]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#1B365D]/60" />
      </div>

      <div
        ref={headerRef}
        className={`relative z-10 text-center mb-20 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-normal text-white mb-6">
          Built on Three Core Principles
        </h2>
        <p className="text-xl text-teal-200 max-w-2xl mx-auto font-light">
          Our approach combines strategic thinking with practical execution
        </p>
      </div>

      <div className="relative z-10 space-y-20 lg:space-y-28">
        {values.map((value, index) => (
          <ValueRow
            key={value.title}
            value={value}
            index={index}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </Section>
  )
}

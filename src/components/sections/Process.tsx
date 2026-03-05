'use client'

import React from 'react'
import { Section } from '@/components/ui/Section'
import { Search, FileText, MessageSquare, Scale, CheckCircle, Handshake } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const steps = [
  {
    icon: Search,
    title: 'Deep Understanding',
    description: 'We begin by spending time getting to know the client, the business, and the context behind the risk. This includes understanding leadership priorities, financial dynamics, transaction timing, and any constraints affecting insurance placement. The goal is clarity before going to market.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileText,
    title: 'Positioning & Preparation',
    description: 'We help shape how the risk is presented to the insurance markets. This may include reviewing or supporting elements of the pitch deck, financials, and narrative so the business is positioned accurately and thoughtfully. Strong preparation is critical to successful outcomes.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: MessageSquare,
    title: 'Market Engagement',
    description: 'We engage the insurance markets on behalf of the client, presenting the risk directly and thoughtfully. Our role is to guide the conversation, manage feedback, and ensure the client\'s story is clearly understood by underwriters.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Scale,
    title: 'Advocacy & Negotiation',
    description: 'We negotiate with the markets on behalf of the client—terms, structure, pricing, and conditions—using experience, judgment, and long-standing market relationships. Advocacy is central to how we work.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: CheckCircle,
    title: 'Solution Structuring',
    description: 'We evaluate available options and structure the best solution for the client, balancing coverage, cost, flexibility, and long-term sustainability. The focus is not just on placement, but on protection that holds.',
    color: 'from-rose-500 to-red-500',
  },
  {
    icon: Handshake,
    title: 'Binding & Ongoing Support',
    description: 'Once coverage is bound, we coordinate a "meet the market" conversation between the client and the underwriter. This step is intentional and designed to build direct, long-standing relationships with the markets, supporting transparency and continuity over time.',
    color: 'from-indigo-500 to-purple-500',
  },
]

const TimelineStep: React.FC<{
  step: typeof steps[0]
  index: number
  isLast: boolean
}> = ({ step, index, isLast }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const Icon = step.icon
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className={`scroll-animate ${isVisible ? 'visible animate-fade-in-up' : ''}`}>
      {/* Desktop: alternating sides */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 items-start">
        {/* Left content (even steps) */}
        <div className={`${isEven ? 'text-right' : ''}`}>
          {isEven ? (
            <div className="pr-4">
              <h3 className="text-2xl font-serif font-normal text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ) : (
            <div />
          )}
        </div>

        {/* Center: timeline node */}
        <div className="flex flex-col items-center">
          <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-${step.color.split(' ')[0].replace('from-', '')}/20 ring-4 ring-navy-900`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          
          {!isLast && (
            <div className="w-0.5 h-24 bg-gradient-to-b from-gold-500/60 to-gold-500/10 mt-2" />
          )}
        </div>

        {/* Right content (odd steps) */}
        <div>
          {isEven ? (
            <div />
          ) : (
            <div className="pl-4">
              <h3 className="text-2xl font-serif font-normal text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile / Tablet: left-aligned timeline */}
      <div className="lg:hidden flex gap-6">
        {/* Timeline node */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ring-4 ring-navy-900`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {!isLast && (
            <div className="w-0.5 flex-1 bg-gradient-to-b from-gold-500/60 to-gold-500/10 mt-2 min-h-[2rem]" />
          )}
        </div>

        {/* Content */}
        <div className="pb-10">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
            Step {index + 1}
          </span>
          <h3 className="text-xl font-serif font-normal text-white mb-2 mt-1">
            {step.title}
          </h3>
          <p className="text-gray-400 leading-relaxed font-light text-sm">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export const Process: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

  return (
    <Section className="bg-navy-900 text-white" id="process">
      <div
        ref={headerRef}
        className={`text-center mb-20 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-normal text-white mb-6">
          Our Proven Process
        </h2>
        <p className="text-xl text-teal-200 max-w-3xl mx-auto font-light">
          A systematic approach built on deep expertise, thoughtful positioning, and long-standing market relationships
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <TimelineStep
            key={step.title}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </Section>
  )
}

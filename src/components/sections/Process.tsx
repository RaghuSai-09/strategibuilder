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

export const Process: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation()

  return (
    <Section className="bg-navy-900 text-white" id="process">
      <div 
        ref={headerRef}
        className={`text-center mb-16 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-normal text-white mb-6">
          Our Proven Process
        </h2>
        <p className="text-xl text-teal-200 max-w-3xl mx-auto font-light">
          A systematic approach built on deep expertise, thoughtful positioning, and long-standing market relationships
        </p>
      </div>

      <div className="relative" ref={stepsRef}>
        {/* Connection line - hidden on mobile */}
        <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 to-gold-300 opacity-30" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div 
                key={step.title} 
                className={`relative scroll-animate ${stepsVisible ? `visible animate-fade-in-up stagger-${index + 1}` : ''}`}
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-navy-900 font-bold text-sm z-10">
                  {index + 1}
                </div>

                <div className="bg-navy-800/50 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/20 hover:border-gold-500/50 transition-all duration-500 hover:transform hover:scale-110 hover:-translate-y-2 h-full group glass-effect hover-lift">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 animate-glow-pulse`}>
                    <Icon className="w-8 h-8 text-white group-hover:animate-bounce-slow" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

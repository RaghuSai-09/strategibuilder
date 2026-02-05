'use client'

import React from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Rocket, Building2, TrendingUp, GitBranch, Handshake, ArrowRightLeft } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const segments = [
  {
    icon: Rocket,
    title: 'Early-Stage & Startups',
    headline: 'Build the Right Foundation',
    description: 'We help early-stage companies establish the right insurance foundation as they begin to grow. This includes structuring management liability and core protections in a way that supports fundraising, board formation, and early governance—without overbuilding or misaligning coverage.',
    features: [
      'Management Liability Structuring',
      'Core Protection Framework',
      'Fundraising Support',
      'Board Formation Coverage',
      'Early Governance Solutions'
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Building2,
    title: 'Growing & Scaling Businesses',
    headline: 'Evolve with Your Risk',
    description: 'As businesses grow, risks evolve. We work with companies navigating expansion, new markets, increased headcount, or operational complexity. The focus is on adjusting coverage, strengthening protection, and ensuring insurance keeps pace with the business.',
    features: [
      'Coverage Adjustment',
      'Market Expansion Protection',
      'Headcount Growth Management',
      'Operational Risk Coverage',
      'Scalable Insurance Solutions'
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Established Businesses',
    headline: 'Optimize & Strengthen',
    description: 'For mature companies, we support ongoing risk management, coverage optimization, and market engagement. This includes evaluating existing programs, managing renewals, and ensuring insurance remains aligned with leadership priorities, financial performance, and stakeholder expectations.',
    features: [
      'Risk Management Programs',
      'Coverage Optimization',
      'Renewal Management',
      'Market Engagement',
      'Stakeholder Alignment'
    ],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: GitBranch,
    title: 'Restructuring & Chapter 11',
    headline: 'Navigate Complex Transitions',
    description: 'We support businesses navigating restructuring, financial stress, or Chapter 11 environments, where insurance access can be limited and market scrutiny is heightened. Our role is to engage deeply with the markets, advocate effectively, and structure solutions that allow coverage to remain in place or be secured during transition.',
    features: [
      'Restructuring Support',
      'Chapter 11 Coverage',
      'Market Advocacy',
      'Transition Solutions',
      'Coverage Continuity'
    ],
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Handshake,
    title: 'M&A & Transactional Events',
    headline: 'Secure Deal Integrity',
    description: 'We support buyers, sellers, and advisors through transactions by structuring insurance solutions around deal timing and risk transfer. This includes transaction-related coverage, tail D&O for exiting management, and coordination with legal and financial advisors to ensure insurance supports the transaction process.',
    features: [
      'Transaction Coverage',
      'Tail D&O Solutions',
      'Risk Transfer Structuring',
      'Advisor Coordination',
      'Deal Timing Optimization'
    ],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: ArrowRightLeft,
    title: 'Post-Transaction & Transition',
    headline: 'Ensure Continuity',
    description: 'After a transaction closes, we help businesses transition coverage, maintain continuity, and build direct relationships with the insurance markets. The focus is on stability, clarity, and long-term protection as the business enters its next phase.',
    features: [
      'Coverage Transition',
      'Market Relationship Building',
      'Continuity Management',
      'Stability Planning',
      'Long-Term Protection'
    ],
    color: 'from-rose-500 to-pink-500',
  },
]

export const TargetMarket: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()

  return (
    <Section id="solutions" className="bg-gold-100">
      <div 
        ref={headerRef}
        className={`text-center mb-16 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-normal text-navy-900 mb-6">
          Solutions for Every Stage
        </h2>
        <p className="text-xl text-navy-600 max-w-3xl mx-auto font-light">
          Tailored insurance solutions designed for your unique risk profile and business stage
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {segments.map((segment, index) => {
          const Icon = segment.icon
          const containerClass = ['scroll-animate', cardsVisible ? `visible animate-slide-in-left stagger-${index + 1}` : ''].filter(Boolean).join(' ')
          return (
            <div
              key={segment.title}
              className={containerClass}
            >
              <Card hover className="flex flex-col h-full">
              {/* Icon and title */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${segment.color} flex items-center justify-center mb-6`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              <div className="text-sm font-semibold text-gold-600 mb-2 uppercase tracking-wider">
                {segment.title}
              </div>

              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                {segment.headline}
              </h3>

              <p className="text-navy-600 leading-relaxed mb-6">
                {segment.description}
              </p>

              {/* Features list */}
              <div className="mt-auto space-y-2">
                {segment.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-navy-700">
                    <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </Card>
          </div>
          )
        })}
      </div>
    </Section>
  )
}

'use client'

import React, { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Shield, Briefcase, FileCheck, AlertTriangle, Puzzle, Lightbulb, HeadphonesIcon, Network } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const services = [
  {
    icon: Shield,
    title: 'Management & Professional Liability',
    description: 'Advising on and placing management liability programs, including D&O, EPLI, Fiduciary Liability, and E&O.',
    fullDescription: 'Advising on and placing management liability programs, including D&O, EPLI, Fiduciary Liability, and E&O. This work often involves heightened scrutiny, lender or investor requirements, or evolving risk profiles that require careful market coordination.',
    keyPoints: [
      'Directors & Officers (D&O) Insurance',
      'Employment Practices Liability (EPLI)',
      'Fiduciary Liability Coverage',
      'Errors & Omissions (E&O) Protection',
      'Lender and Investor Requirement Compliance',
      'Evolving Risk Profile Management'
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Briefcase,
    title: 'Transactional & Deal-Related Insurance',
    description: 'Supporting insurance needs around transactions, including R&W, Tail D&O for sellers and exiting management.',
    fullDescription: 'Supporting insurance needs around transactions, including R&W, Tail D&O for sellers and exiting management, and transactional risk assessments. We work closely with deal teams, legal advisors, and markets to ensure coverage aligns with transaction dynamics.',
    keyPoints: [
      'Representations & Warranties (R&W) Insurance',
      'Tail D&O for Sellers and Exiting Management',
      'Transactional Risk Assessments',
      'Deal Timing Coordination',
      'Legal and Financial Advisor Collaboration',
      'Transaction-Aligned Coverage Structuring'
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: AlertTriangle,
    title: 'Restructuring & Distressed Situations',
    description: 'Placing and maintaining coverage for companies navigating restructuring, financial stress, or Chapter 11 environments.',
    fullDescription: 'Placing and maintaining coverage for companies navigating restructuring, financial stress, or Chapter 11 environments, where access to insurance can be limited and market engagement is critical.',
    keyPoints: [
      'Chapter 11 Coverage Placement',
      'Financial Stress Insurance Solutions',
      'Restructuring Support',
      'Limited Market Access Navigation',
      'Critical Market Engagement',
      'Coverage Continuity During Transition'
    ],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Puzzle,
    title: 'Complex & Non-Standard Risk Placement',
    description: 'Helping businesses operating outside standard underwriting frameworks obtain protection through creative structuring.',
    fullDescription: 'Helping businesses operating outside standard underwriting frameworks obtain protection through creative structuring, persistence, and deep market relationships.',
    keyPoints: [
      'Non-Standard Risk Analysis',
      'Creative Coverage Structuring',
      'Specialized Market Access',
      'Persistent Advocacy',
      'Alternative Placement Solutions',
      'Deep Market Relationship Leverage'
    ],
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Lightbulb,
    title: 'Risk Strategy & Advisory Support',
    description: 'Providing ongoing guidance around coverage structure and limits, market positioning and timing.',
    fullDescription: 'Providing ongoing guidance around coverage structure and limits, market positioning and timing, lender and investor insurance requirements, and changes in risk profile as businesses evolve.',
    keyPoints: [
      'Coverage Structure Optimization',
      'Policy Limit Recommendations',
      'Market Positioning Strategy',
      'Timing Optimization',
      'Lender & Investor Requirement Management',
      'Risk Profile Evolution Monitoring'
    ],
    color: 'from-rose-500 to-red-500',
  },
  {
    icon: HeadphonesIcon,
    title: 'Claims Advocacy & Ongoing Support',
    description: 'Remaining engaged beyond placement to support clients through claims, renewals, and changing circumstances.',
    fullDescription: 'Remaining engaged beyond placement to support clients through claims, renewals, and changing circumstances. Advocacy continues when coverage is tested and support matters most.',
    keyPoints: [
      'Claims Process Support',
      'Renewal Management',
      'Ongoing Risk Monitoring',
      'Policy Change Coordination',
      'Circumstance-Based Adjustments',
      'Continuous Client Advocacy'
    ],
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Network,
    title: 'Market & Relationship Access',
    description: 'Leveraging long-standing relationships with wholesale brokers, insurance carriers, and specialty markets.',
    fullDescription: 'Leveraging long-standing relationships with wholesale brokers, insurance carriers, and specialty markets to create access, flexibility, and solutions that are not always visible through standard channels.',
    keyPoints: [
      'Wholesale Broker Networks',
      'Direct Carrier Relationships',
      'Specialty Market Access',
      'Non-Standard Channel Solutions',
      'Enhanced Flexibility Options',
      'Exclusive Market Opportunities'
    ],
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: FileCheck,
    title: 'Insurance Brokerage & Market Placement',
    description: 'We work across the insurance markets to structure and place coverage in situations where insurance is complex or difficult to obtain.',
    fullDescription: 'We work across the insurance markets to structure and place coverage in situations where insurance is complex, constrained, or difficult to obtain. Our role is to access the right markets, engage them thoughtfully, and advocate on behalf of our clients to secure workable protection.',
    keyPoints: [
      'Complex Coverage Structuring',
      'Constrained Market Navigation',
      'Strategic Market Selection',
      'Thoughtful Market Engagement',
      'Client Advocacy',
      'Workable Protection Solutions'
    ],
    color: 'from-violet-500 to-purple-500',
  },
]

export const Services: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1 })
  const [activeIndex, setActiveIndex] = useState(0)

  const active = services[activeIndex]
  const ActiveIcon = active.icon

  return (
    <Section gradient id="services" className="bg-gold-50">
      <div
        ref={headerRef}
        className={`text-center mb-16 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-normal text-navy-900 mb-6">
          Services
        </h2>
        <p className="text-xl text-navy-600 max-w-3xl mx-auto font-light">
          Comprehensive insurance solutions and market access for complex, constrained, and evolving risk profiles
        </p>
      </div>

      <div
        ref={contentRef}
        className={`scroll-animate ${contentVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        {/* Tab pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            const isActive = index === activeIndex
            return (
              <button
                key={service.title}
                onClick={() => setActiveIndex(index)}
                className={`
                  inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium
                  transition-all duration-300 border
                  ${isActive
                    ? 'bg-navy-900 text-white border-navy-900 shadow-lg shadow-navy-900/20 scale-105'
                    : 'bg-white text-navy-700 border-gold-200 hover:border-gold-400 hover:bg-gold-50 hover:shadow-md'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-navy-400'}`} />
                <span className="hidden sm:inline">{service.title}</span>
                <span className="sm:hidden">{service.title.split(' ')[0]}</span>
              </button>
            )
          })}
        </div>

        {/* Active service detail panel */}
        <div
          key={activeIndex}
          className="relative bg-white rounded-3xl border border-gold-200 overflow-hidden shadow-sm animate-fade-in-up"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left: description */}
            <div className="lg:col-span-3 p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center flex-shrink-0`}>
                  <ActiveIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-normal text-navy-900">
                  {active.title}
                </h3>
              </div>

              <p className="text-navy-600 leading-relaxed text-lg mb-8 font-light">
                {active.fullDescription}
              </p>

              <button
                onClick={() => {
                  const el = document.getElementById('contact')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 text-navy-900 font-medium group"
              >
                Get in touch
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </button>
            </div>

            {/* Right: key points */}
            <div className="lg:col-span-2 bg-navy-900 p-8 md:p-12 flex flex-col justify-center">
              <h4 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-6">
                Key Solutions
              </h4>
              <div className="space-y-4">
                {active.keyPoints.map((point, i) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom navigation dots */}
          <div className="flex justify-center gap-2 py-4 bg-gold-50/50 border-t border-gold-100">
            {services.map((svc, index) => (
              <button
                key={svc.title}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to service ${index + 1}`}
                className={`
                  rounded-full transition-all duration-300
                  ${index === activeIndex
                    ? 'w-8 h-2 bg-navy-900'
                    : 'w-2 h-2 bg-navy-300 hover:bg-navy-500'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

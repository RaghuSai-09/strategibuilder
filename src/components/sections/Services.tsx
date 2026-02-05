'use client'

import React, { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Shield, Briefcase, FileCheck, AlertTriangle, Puzzle, Lightbulb, HeadphonesIcon, Network, X } from 'lucide-react'
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
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.1 })
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

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

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <div
              key={service.title}
              className={`scroll-animate ${cardsVisible ? `visible animate-fade-in-up stagger-${(index % 6) + 1}` : ''}`}
            >
              <Card hover gradient className="group perspective-1000 h-full bg-gold-50/80 border-gold-200 hover:shadow-2xl hover:border-gold-400">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-2xl font-serif font-normal text-navy-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-navy-600 leading-relaxed mb-6 font-light line-clamp-2">
                {service.description}
              </p>
              
              <button 
                onClick={() => setSelectedService(service)}
                className="text-navy-900 font-medium transition-colors inline-flex items-center group relative mt-auto"
              >
                Learn more
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </Card>
          </div>
          )
        })}
      </div>

      {/* Modal */}
      {selectedService && (
        <button 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in border-0 cursor-default"
          onClick={() => setSelectedService(null)}
          onKeyDown={(e) => e.key === 'Escape' && setSelectedService(null)}
          aria-label="Close modal overlay"
        >
          <dialog 
            open
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in border-0 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-navy-100 p-6 flex items-start justify-between rounded-t-2xl z-10">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedService.color} flex items-center justify-center flex-shrink-0`}>
                  {React.createElement(selectedService.icon, { className: "w-7 h-7 text-white" })}
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-normal text-navy-900">
                    {selectedService.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-navy-400 hover:text-navy-600 transition-colors p-2 hover:bg-navy-50 rounded-lg"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <p className="text-navy-600 leading-relaxed text-lg">
                {selectedService.fullDescription}
              </p>

              <div>
                <h4 className="text-xl font-bold text-navy-900 mb-4">Key Solutions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.keyPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3 bg-navy-50 p-3 rounded-lg">
                      <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-navy-700 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-navy-100 p-6 bg-navy-50 rounded-b-2xl">
              <button
                onClick={() => setSelectedService(null)}
                className="w-full bg-navy-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-900 transition-colors"
              >
                Close
              </button>
            </div>
          </dialog>
        </button>
      )}
    </Section>
  )
}

'use client'

import React, { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { ChevronDown } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const faqs = [
  {
    question: 'What types of insurance do you specialize in?',
    answer: 'We specialize in management and professional liability insurance including D&O, EPLI, E&O, Fiduciary Liability, transactional insurance (R&W, Tail D&O), and coverage for restructuring and distressed situations. Our expertise lies in complex, hard-to-place risks.',
  },
  {
    question: 'How long does the insurance placement process take?',
    answer: 'The timeline varies based on complexity and market conditions. Standard placements typically take 2-4 weeks, while complex or transactional placements can range from 3-6 weeks. We work efficiently while ensuring thorough market engagement and optimal coverage terms.',
  },
  {
    question: 'What support do you provide during the process?',
    answer: 'We provide comprehensive support including risk assessment, positioning strategy, market engagement, negotiation with carriers, policy structuring, and ongoing claims advocacy. We also facilitate direct "meet the market" conversations between clients and underwriters to build long-term relationships.',
  },
  {
    question: 'Do you offer ongoing support after placement?',
    answer: 'Absolutely! We remain engaged beyond placement to support clients through renewals, claims, policy changes, and evolving risk profiles. Advocacy continues when coverage is tested and support matters most.',
  },
  {
    question: 'How do you ensure confidentiality?',
    answer: 'We take confidentiality seriously. All clients sign comprehensive NDAs before we begin, and we maintain strict data security protocols. Your sensitive business information is never shared without explicit consent.',
  },
  {
    question: 'What makes your brokerage different from others?',
    answer: 'We combine deep carrier and wholesale relationships with modern AI-powered tools for efficiency. Our boutique approach means personalized advocacy, creative structuring for difficult placements, and a focus on long-term partnerships rather than transactional relationships.',
  },
]

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: faqsRef, isVisible: faqsVisible } = useScrollAnimation()

  return (
    <Section gradient id="faq" className="bg-gold-50">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
        >
          <h2 className="text-5xl md:text-6xl font-serif font-normal text-navy-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-navy-600 font-light">
            Everything you need to know about our services
          </p>
        </div>

        <div ref={faqsRef} className="space-y-4">
          {faqs.map((faq, index) => {
            const staggerClass = `stagger-${(index % 6) + 1}`
            return (
              <div
                key={faq.question}
                className={`bg-gold-50/90 rounded-xl border border-gold-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow scroll-animate ${faqsVisible ? 'visible animate-slide-in-right ' + staggerClass : ''}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-navy-50/50 transition-colors"
                >
                  <span className="font-semibold text-navy-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-navy-500 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-navy-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-navy-600 mb-4">
            Still have questions?
          </p>
          <button className="text-gold-600 font-semibold hover:text-gold-700 transition-colors">
            Contact our team →
          </button>
        </div>
      </div>
    </Section>
  )
}

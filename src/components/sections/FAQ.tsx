'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const faqs = [
  {
    question: 'What types of insurance do you specialize in?',
    answer:
      'We specialize in management and professional liability insurance including D&O, EPLI, E&O, Fiduciary Liability, transactional insurance (R&W, Tail D&O), and coverage for restructuring and distressed situations. Our expertise lies in complex, hard-to-place risks.',
  },
  {
    question: 'How long does the insurance placement process take?',
    answer:
      'The timeline varies based on complexity and market conditions. Standard placements typically take 2-4 weeks, while complex or transactional placements can range from 3-6 weeks. We work efficiently while ensuring thorough market engagement and optimal coverage terms.',
  },
  {
    question: 'What support do you provide during the process?',
    answer:
      'We provide comprehensive support including risk assessment, positioning strategy, market engagement, negotiation with carriers, policy structuring, and ongoing claims advocacy. We also facilitate direct "meet the market" conversations between clients and underwriters to build long-term relationships.',
  },
  {
    question: 'Do you offer ongoing support after placement?',
    answer:
      'Absolutely. We remain engaged beyond placement to support clients through renewals, claims, policy changes, and evolving risk profiles. Advocacy continues when coverage is tested and support matters most.',
  },
  {
    question: 'How do you ensure confidentiality?',
    answer:
      'We take confidentiality seriously. All clients sign comprehensive NDAs before we begin, and we maintain strict data security protocols. Your sensitive business information is never shared without explicit consent.',
  },
  {
    question: 'What makes your brokerage different from others?',
    answer:
      'We combine deep carrier and wholesale relationships with modern AI-powered tools for efficiency. Our boutique approach means personalized advocacy, creative structuring for difficult placements, and a focus on long-term partnerships rather than transactional relationships.',
  },
]

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: faqsRef, isVisible: faqsVisible } = useScrollAnimation()

  return (
    <section
      id="faq"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-[72px]"
      style={{
        background: 'linear-gradient(-80deg, #092539 4%, #0D2C44 96%)',
      }}
    >
      <div className="mx-auto max-w-[1043px]">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 flex flex-col items-center text-center scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
        >
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-[14px]">
            <span className="block h-px w-10 bg-gradient-to-r from-transparent to-[#AE9059]" />
            <span className="text-[16px] font-semibold uppercase tracking-[3.2px] text-[#C9A96E]">
              Frequently Asked Questions
            </span>
            <span className="block h-px w-10 bg-gradient-to-l from-transparent to-[#AE9059]" />
          </div>

          {/* Title with light-blue → white gradient */}
          <h2 className="bg-[linear-gradient(78.5deg,#9CD0F5_0.7%,#FFFFFF_82%)] bg-clip-text text-[36px] font-bold leading-[1.3] text-transparent md:text-[42px]">
            Everything you need to know
            <br />
            about our services
          </h2>
        </div>

        {/* Accordion */}
        <div ref={faqsRef} className={`flex flex-col gap-4 scroll-animate ${faqsVisible ? 'visible animate-fade-in-up' : ''}`}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-lg bg-[#FFF8EC] shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[18px] font-semibold leading-[30px] text-[#836C41] md:text-[20px]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-7 w-7 flex-shrink-0 text-[#836C41] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    strokeWidth={2}
                  />
                </button>

                <div
                  className={`grid transition-all duration-400 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-black/10 px-6 py-4 text-[15px] leading-[1.6] text-[#836C41]/85">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-14 flex flex-col items-center text-center">
          <p className="text-[20px] leading-[30px] text-[#FFF8EC]">Still have questions?</p>
          <Link
            href="#contact"
            className="mt-2 inline-flex items-center gap-2 px-8 py-3 text-[16px] font-semibold uppercase tracking-wide text-[#C9A96E] transition-opacity hover:opacity-80"
          >
            Start a Conversation
            <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  )
}

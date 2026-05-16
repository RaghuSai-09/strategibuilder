'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const steps = [
  {
    icon: '/process/step1.png',
    title: 'Deep Understanding',
    description:
      'We begin by spending time getting to know the client, the business, and the context behind the risk, including leadership priorities, financial dynamics & transaction timing.',
  },
  {
    icon: '/process/step2.png',
    title: 'Positioning & Preparation',
    description:
      'We help shape how the risk is presented to insurance markets, reviewing pitch decks, financials, and narrative so the business is positioned accurately & compellingly.',
  },
  {
    icon: '/process/step3.png',
    title: 'Market Engagement',
    description:
      'We engage directly with underwriters on behalf of the client presenting the risk thoughtfully, controlling the process, and managing all market dialogue.',
  },
  {
    icon: '/process/step4.png',
    title: 'Advocacy & Negotiation',
    description:
      'We negotiate terms, structure, pricing, and conditions leveraging decades of experience and established carrier relationships to advocate for the best possible outcome.',
  },
  {
    icon: '/process/step5.png',
    title: 'Solution Structuring',
    description:
      'We evaluate all available options and structure the optimal solution, balancing coverage, cost, flexibility, and long-term strategy.',
  },
  {
    icon: '/process/step6.png',
    title: 'Meet the Market',
    description:
      'Following placement, we facilitate a direct introduction between client and underwriter, building long-term relationships and ensuring transparency beyond the transaction.',
  },
]

export const Process: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <Section className="bg-white" id="process">
      {/* Header */}
      <div
        ref={headerRef}
        className={`mx-auto flex max-w-[870px] flex-col items-center text-center scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-[14px]">
          <span className="block h-px w-10 bg-gradient-to-r from-transparent to-[#AE9059]" />
          <span className="text-[16px] font-semibold uppercase tracking-[3.2px] text-[#C9A96E]">
            Our Approach
          </span>
          <span className="block h-px w-10 bg-gradient-to-l from-transparent to-[#AE9059]" />
        </div>

        {/* Title */}
        <h2 className="mb-4 text-[40px] font-bold leading-[1.3] text-[#0F2238] lg:text-[42px]">
          A proven approach to structuring{' '}
          <span className="text-[#2C4E6E]">complex</span>{' '}
          <span className="text-[#2C4E6E]">risk & delivering results</span>
        </h2>

        {/* Description */}
        <p className="mb-6 max-w-[644px] text-[15px] leading-[26.25px] text-[#4A4A4A]">
          We shape how the risk is presented to the market, refining financials, pitch materials,
          and narrative so the business is positioned clearly, credibly, and strategically.
        </p>

        {/* CTA Button */}
        <Link href="#contact">
          <Button variant="primary">Start a Conversation</Button>
        </Link>
      </div>

      {/* Steps flow */}
      <div
        ref={stepsRef}
        className={`mt-16 scroll-animate ${stepsVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        {/* Desktop: horizontal flow with hover-to-expand */}
        <div className="hidden lg:flex lg:items-stretch lg:justify-center lg:gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={step.title}>
              <StepCard step={step} expandOnHover />
              {i < steps.length - 1 && (
                <div className="flex flex-shrink-0 items-center px-1.5">
                  <ChevronRight className="h-6 w-6 text-[#1C3E57]/50" strokeWidth={2.5} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Tablet: 3-col grid */}
        <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4 lg:hidden">
          {steps.map((step) => (
            <StepCard key={step.title} step={step} alwaysShowDescription />
          ))}
        </div>

        {/* Mobile: stacked */}
        <div className="flex flex-col gap-4 sm:hidden">
          {steps.map((step) => (
            <StepCard key={step.title} step={step} alwaysShowDescription />
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ── Step card ─────────────────────────────────────────────────────── */

interface StepCardProps {
  step: (typeof steps)[number]
  /** Always render description (tablet / mobile layouts). */
  alwaysShowDescription?: boolean
  /** Reveal description on hover (desktop horizontal layout). */
  expandOnHover?: boolean
}

function StepCard({
  step,
  alwaysShowDescription,
  expandOnHover,
}: Readonly<StepCardProps>) {
  return (
    <div
      className={[
        'group relative flex items-start gap-2.5 overflow-hidden rounded-lg border border-[rgba(24,58,85,0.4)] bg-[#F0F3F6] px-4 py-2.5 shadow-[-2.5px_0.6px_7.5px_0px_rgba(24,58,85,0.2)] transition-all duration-500 ease-out hover:shadow-xl',
        expandOnHover &&
          'w-[210px] hover:w-[360px] hover:border-transparent hover:bg-[linear-gradient(135deg,#1C3E57_0%,#0D2C44_100%)]',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Icon — dark line-art on the light card, inverts to light on the dark hover state */}
      <div
        className={[
          'relative h-[46px] w-[46px] flex-shrink-0 mix-blend-multiply transition-[filter,mix-blend-mode] duration-500 ease-out',
          expandOnHover && 'group-hover:mix-blend-normal group-hover:[filter:invert(1)_brightness(2)]',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Image src={step.icon} alt="" fill sizes="46px" className="object-cover" />
      </div>

      {/* Text */}
      <div className="flex min-w-0 flex-col">
        <span
          className={[
            'bg-[linear-gradient(-68deg,#1C3E57_4%,#24445C_96%)] bg-clip-text text-[15px] font-semibold leading-tight text-transparent transition-colors duration-300',
            expandOnHover && 'group-hover:bg-none group-hover:text-white',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {step.title}
        </span>

        {alwaysShowDescription && (
          <span className="mt-1 text-[11px] leading-[1.4] text-[#4A4A4A]">
            {step.description}
          </span>
        )}

        {expandOnHover && (
          // grid-rows trick gives a smooth height transition without measuring DOM
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-2 text-[11px] leading-[1.45] text-[#B8D2E5]">
                {step.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

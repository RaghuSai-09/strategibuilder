'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown } from 'lucide-react'

type Stage = {
  number: string
  shortLabel: string
  title: string
  description: string
  features: [string, string, string, string]
}

const stages: Stage[] = [
  {
    number: '01',
    shortLabel: 'Early-Stage & Venture-Backed',
    title: 'Build the right foundation from day one',
    description:
      'We help early-stage companies establish the right insurance foundation as they begin to grow. This includes structuring management liability and core protections in a way that supports fundraising, board formation, and early governance without overbuilding or misaligning coverage.',
    features: [
      'Management liability structuring',
      'Fundraising-ready coverage',
      'Board formation support',
      'Early governance solutions',
    ],
  },
  {
    number: '02',
    shortLabel: 'Growth & Scaling Companies',
    title: "Protect the momentum you've built",
    description:
      'As your company scales, so does your risk exposure. We help growing businesses strengthen their coverage programs to meet increasing investor requirements, expanding headcount, and evolving operational complexity without disrupting the pace of growth.',
    features: [
      'Scaled D&O programs',
      'Investor requirement compliance',
      'EPLI as headcount grows',
      'Multi-jurisdiction exposure',
    ],
  },
  {
    number: '03',
    shortLabel: 'Established & Complex Organizations',
    title: 'Maintain protection that matches your scale',
    description:
      'Established businesses face their own complexity \u2014 board scrutiny, regulatory exposure, litigation risk, and lender oversight. We manage comprehensive programs that evolve with your business and stay ahead of emerging risk profiles.',
    features: [
      'Comprehensive liability programs',
      'Lender & investor oversight',
      'Litigation risk management',
      'Renewal strategy & negotiation',
    ],
  },
  {
    number: '04',
    shortLabel: 'Restructuring & Special Situations',
    title: 'Navigate distress with coverage intact',
    description:
      "Restructuring situations require specialized market access and experience. We place D&O coverage for companies in Chapter 11, distressed sale processes, and creditor-controlled situations \u2014 where standard markets won't go and relationships matter most.",
    features: [
      'Chapter 11 D&O placement',
      'Creditor-controlled coverage',
      'Distressed market access',
      'Post-emergence transition',
    ],
  },
  {
    number: '05',
    shortLabel: 'M&A & Transactional Risk',
    title: 'Protect the deal at every stage',
    description:
      'M&A transactions require precise, time-sensitive insurance execution. We place Rep & Warranty, Tail D&O, tax liability, and other deal-related coverage \u2014 working directly with deal teams, legal counsel, and lenders to meet transaction requirements and timelines.',
    features: [
      'Representations & Warranties',
      'Tail D&O for sellers',
      'Tax liability insurance',
      'Deal timeline coordination',
    ],
  },
  {
    number: '06',
    shortLabel: 'Post-Transaction',
    title: 'Carry the right coverage into the next chapter',
    description:
      "The period after a transaction closes carries its own risk. We help clients establish new programs, manage run-off exposure, and build the right foundation for the next phase \u2014 whether that's continued operations, integration, or a fresh start.",
    features: [
      'Run-off & tail management',
      'New entity program setup',
      'Integration risk coverage',
      'Ongoing advisory support',
    ],
  },
]

type StagePanelProps = Readonly<{ stage: Stage }>

function StagePanel({ stage }: StagePanelProps) {
  return (
    <div className="flex flex-col gap-[19.1px] px-6 sm:px-10 lg:px-[56px] py-[36px] lg:py-[51px]">
      <h3 className="font-['Poppins',sans-serif] text-[22px] sm:text-[26px] lg:text-[32px] leading-[1.15] text-[#F5F0E8]">
        {stage.title}
      </h3>

      <p className="max-w-[700px] font-['Montserrat',sans-serif] font-light text-[15px] sm:text-[17px] lg:text-[20px] leading-[1.5] text-[#B8D2E5]">
        {stage.description}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 py-[16.9px]">
        {stage.features.map((feat) => (
          <li key={feat} className="flex items-center gap-[10px]">
            <span
              aria-hidden
              className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#C9A96E] shadow-[0_0_0_1px_rgba(201,169,110,0.25)]"
            >
              <Check className="h-[10px] w-[10px] text-[#0D2C44]" strokeWidth={3.5} />
            </span>
            <span className="font-['Montserrat',sans-serif] text-[13px] font-medium leading-[20.8px] text-[#B8D2E5]">
              {feat}
            </span>
          </li>
        ))}
      </ul>

      <div>
        <Link
          href="#contact"
          className="group relative inline-flex w-fit items-center justify-center bg-[#A38850] px-[30.4px] py-[11.94px] outline outline-[1.09px] outline-offset-[-1.09px] outline-[#F2AE40] transition-opacity hover:opacity-90"
        >
          <span className="relative z-[2] font-['Montserrat',sans-serif] text-[15.59px] font-semibold uppercase text-[#C9A96E]">
            Discover Your Situation
          </span>
          <span className="pointer-events-none absolute left-[2.8px] top-[1.12px] z-[1] flex h-full w-full items-center justify-center bg-[#A38850] opacity-50 mix-blend-lighten outline outline-[1.09px] outline-offset-[-1.09px] outline-[#F2AE40] blur-[7.85px]" />
        </Link>
      </div>
    </div>
  )
}

export const SolutionsByStage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = stages[activeIndex]

  return (
    <section
      id="solutions"
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(-78.73deg, #092539 4.04%, #0D2C44 95.96%)',
      }}
    >
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-[72px] pb-[80px] sm:pt-[88px] sm:pb-[100px] lg:pt-[106px] lg:pb-[120px]">
        <div className="flex flex-col items-center gap-[18px]">
          <div className="flex w-full flex-col items-center gap-[15px]">
            <div className="flex items-center justify-center gap-[14px]">
              <span className="block h-px w-8 sm:w-10 bg-gradient-to-r from-[rgba(201,169,110,0)] to-[#AE9059]" />
              <p className="text-center font-['Montserrat',sans-serif] text-[12px] sm:text-[14px] lg:text-[16px] font-semibold uppercase tracking-[2.4px] sm:tracking-[3.2px] text-[#C9A96E]">
                Solutions by Stage
              </p>
              <span className="block h-px w-8 sm:w-10 bg-gradient-to-r from-[#AE9059] to-[rgba(201,169,110,0)]" />
            </div>

            <h2
              className="text-center font-['Poppins',sans-serif] font-bold leading-[1.1] text-[clamp(28px,7vw,58px)]"
              style={{
                background: 'linear-gradient(83deg, #9CD0F5 0.7%, #FFFFFF 82%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Tailored for where
              <br />
              you are right now.
            </h2>
          </div>

          <p className="max-w-[804px] text-center font-['Montserrat',sans-serif] text-[14px] sm:text-[16px] lg:text-[18px] font-medium leading-[1.6] text-[#B8D2E5]">
            Every business presents a different risk profile. We structure solutions that fit your stage, your
            constraints, and your goals not a template.
          </p>
        </div>

        {/* Desktop layout: tabs (left) + active panel (right) */}
        <div className="mt-10 hidden border border-[rgba(211,234,251,0.10)] lg:mt-[60px] lg:grid lg:grid-cols-[388px_minmax(0,1fr)]">
          <ul aria-label="Solutions by stage" className="flex flex-col border-r border-[rgba(211,234,251,0.10)]">
            {stages.map((stage, i) => {
              const isActive = i === activeIndex
              return (
                <li key={stage.shortLabel}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-current={isActive ? 'true' : undefined}
                    aria-controls="solutions-panel"
                    className={[
                      'flex w-full items-center gap-[14px] px-[28px] py-[24px] text-left',
                      'border-b last:border-b-0 transition-colors duration-200',
                      isActive
                        ? 'bg-[rgba(211,234,251,0.15)] border-[rgba(201,169,110,0.30)]'
                        : 'bg-[rgba(211,234,251,0.04)] border-[rgba(211,234,251,0.15)] hover:bg-[rgba(211,234,251,0.08)]',
                    ].join(' ')}
                  >
                    <span className="min-w-6 font-['Poppins',sans-serif] text-[22px] font-semibold leading-none text-[rgba(184,210,229,0.5)]">
                      {stage.number}
                    </span>
                    <span
                      className={[
                        'font-["Poppins",sans-serif] text-[18px] xl:text-[20px] font-semibold uppercase tracking-[1.2px] leading-tight',
                        isActive ? 'text-[#F5F0E8]' : 'text-[#D3EAFB]',
                      ].join(' ')}
                    >
                      {stage.shortLabel}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div id="solutions-panel" key={`desktop-${activeIndex}`} className="animate-fade-in">
            <StagePanel stage={active} />
          </div>
        </div>

        {/* Mobile / tablet layout: accordion (single-open) */}
        <div className="mt-8 border border-[rgba(211,234,251,0.10)] lg:hidden">
          {stages.map((stage, i) => {
            const isOpen = i === activeIndex
            return (
              <div key={stage.shortLabel} className="border-b last:border-b-0 border-[rgba(211,234,251,0.15)]">
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-expanded={isOpen}
                  aria-controls={`solutions-mobile-panel-${i}`}
                  className={[
                    'flex w-full items-center gap-3 px-5 py-4 sm:px-7 sm:py-5 text-left transition-colors duration-200',
                    isOpen
                      ? 'bg-[rgba(211,234,251,0.15)]'
                      : 'bg-[rgba(211,234,251,0.04)] hover:bg-[rgba(211,234,251,0.08)]',
                  ].join(' ')}
                >
                  <span className="min-w-6 font-['Poppins',sans-serif] text-[18px] sm:text-[20px] font-semibold leading-none text-[rgba(184,210,229,0.5)]">
                    {stage.number}
                  </span>
                  <span
                    className={[
                      'flex-1 font-["Poppins",sans-serif] text-[14px] sm:text-[16px] font-semibold uppercase tracking-[1.2px] leading-tight',
                      isOpen ? 'text-[#F5F0E8]' : 'text-[#D3EAFB]',
                    ].join(' ')}
                  >
                    {stage.shortLabel}
                  </span>
                  <ChevronDown
                    className={[
                      'h-5 w-5 shrink-0 transition-transform duration-300',
                      isOpen ? 'rotate-180 text-[#C9A96E]' : 'text-[#B8D2E5]/60',
                    ].join(' ')}
                    strokeWidth={2}
                  />
                </button>

                <div
                  id={`solutions-mobile-panel-${i}`}
                  className={[
                    'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  ].join(' ')}
                >
                  <div className="min-h-0">{isOpen && <StagePanel stage={stage} />}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

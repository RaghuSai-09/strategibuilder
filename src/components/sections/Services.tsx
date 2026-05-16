'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const services = [
  {
    number: '01',
    image: '/services/1_service.png',
    title: 'D&O & Management Liability',
    keyPoints: [
      'Directors & Officers (D&O) insurance for leadership.',
      'Employment Practices Liability (EPLI) coverage.',
      'Fiduciary Liability and E&O protection.',
      'Lender and investor requirement compliance.',
    ],
  },
  {
    number: '02',
    image: '/services/2_service.png',
    title: 'Transactional & Deal-Related Insurance',
    keyPoints: [
      'Representations & Warranties (R&W) Insurance.',
      'Tail D&O for sellers and exiting management.',
      'Transactional risk assessments.',
      'Transaction-aligned coverage structuring.',
    ],
  },
  {
    number: '03',
    image: '/services/3_service.png',
    title: 'Restructuring & Distressed Situations',
    keyPoints: [
      'D&O and liability for companies in transition.',
      'Aligned with restructuring advisors and lenders.',
      'Runoff, wind-down, and newco structuring.',
      'Protecting leadership through uncertainty.',
    ],
  },
  {
    number: '04',
    image: '/services/4_service.png',
    title: 'Complex & Non-Standard Risk',
    keyPoints: [
      'Non-standard risk analysis and advocacy.',
      'Creative coverage structuring.',
      'Specialized and alternative market access.',
      'Deep market relationship leverage.',
    ],
  },
  {
    number: '05',
    image: '/services/5_service.png',
    title: 'Risk Strategy & Advisory Support',
    keyPoints: [
      'Coverage structure and limit optimization.',
      'Market positioning and timing strategy.',
      'Lender & investor requirement management.',
      'Risk profile evolution monitoring.',
    ],
  },
  {
    number: '06',
    image: '/services/6_service.png',
    title: 'Claims Advocacy & Ongoing Support',
    keyPoints: [
      'Active support through the claims process.',
      'Renewal management and renegotiation.',
      'Ongoing risk and policy change monitoring.',
      'Continuous client-side advocacy.',
    ],
  },
]

const GAP_PX = 20
const PEEK_PCT = 6

function useCardCount() {
  const [count, setCount] = useState(3)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setCount(1)
      else if (w < 1024) setCount(2)
      else setCount(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return count
}

export const Services: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1 })

  const cardCount = useCardCount()
  const [offset, setOffset] = useState(0)
  const [sliding, setSliding] = useState(false)

  const maxOffset = Math.max(0, services.length - cardCount)
  const canPrev = offset > 0
  const canNext = offset < maxOffset

  useEffect(() => {
    setOffset(prev => Math.min(prev, maxOffset))
  }, [maxOffset])

  const CARD_W = `calc((100% - ${PEEK_PCT}% - ${GAP_PX * cardCount}px) / ${cardCount})`
  const STEP = `calc(${CARD_W} + ${GAP_PX}px)`

  const slide = useCallback(
    (dir: 'left' | 'right') => {
      if (sliding) return
      if (dir === 'left' && !canPrev) return
      if (dir === 'right' && !canNext) return
      setSliding(true)
      setOffset(prev => (dir === 'right' ? prev + 1 : prev - 1))
      setTimeout(() => setSliding(false), 520)
    },
    [sliding, canPrev, canNext]
  )

  return (
    <Section gradient id="services" className="bg-white overflow-hidden">

      {/* Header */}
      <div
        ref={headerRef}
        className={`text-center mb-14 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="block h-px w-10 bg-[#B8975A]" />
          <span className="text-[#B8975A] text-xs font-semibold tracking-[0.2em] uppercase">
            What We Do
          </span>
          <span className="block h-px w-10 bg-[#B8975A]" />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
          <span className="text-[#4A7FA5] font-light">Six Areas of Focus</span>
          <br />
          <span className="text-[#0F2545] font-semibold">One Strategic Advisor</span>
        </h2>

        <p className="text-[#4A5568] text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
          Accessing specialized markets and structuring solutions across D&O, transactional risk,
          and complex placements; optimizing coverage, pricing, and execution.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={contentRef}
        className={`scroll-animate ${contentVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <div className="overflow-hidden" style={{ paddingRight: `${PEEK_PCT}%` }}>
          <div
            className="flex"
            style={{
              gap: `${GAP_PX}px`,
              transform: offset === 0 ? 'none' : `translateX(calc(${offset} * -1 * (${STEP})))`,
              transition: sliding ? 'transform 480ms cubic-bezier(0.77, 0, 0.175, 1)' : 'none',
              willChange: 'transform',
            }}
          >
            {services.map((service) => (
              <ServiceCard
                key={service.number}
                service={service}
                cardWidth={CARD_W}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => slide('left')}
            disabled={!canPrev || sliding}
            aria-label="Previous"
            className={[
              'w-11 h-11 rounded-full border flex items-center justify-center transition-colors duration-200',
              canPrev && !sliding
                ? 'border-[#0F2545]/30 text-[#0F2545] hover:bg-[#0F2545] hover:text-white hover:border-[#0F2545] active:scale-95'
                : 'border-gray-200 text-gray-300 cursor-not-allowed',
            ].join(' ')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => slide('right')}
            disabled={!canNext || sliding}
            aria-label="Next"
            className={[
              'w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200',
              canNext && !sliding
                ? 'bg-[#0F2545] text-white hover:bg-[#1a3a6b] active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed',
            ].join(' ')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Section>
  )
}

/* ── Card sub-component ─────────────────────────────────────────── */

interface CardProps {
  service: typeof services[number]
  cardWidth: string
}

// Pre-declared so Tailwind picks them up at build time (arbitrary delay values
// must appear as literal strings somewhere in source for the JIT to emit them).
const BULLET_DELAYS = ['delay-[80ms]', 'delay-[150ms]', 'delay-[220ms]', 'delay-[290ms]'] as const

const EASE_OUT_QUART = 'ease-[cubic-bezier(0.33,1,0.68,1)]'

function ServiceCard({ service, cardWidth }: Readonly<CardProps>) {
  return (
    <div
      className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-[#091830]"
      style={{ width: cardWidth, height: '420px' }}
    >
      {/* Image — fills upper ~65% of the card, fades into the navy base */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[65%]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent_0%,#091830_100%)]" />
      </div>

      {/* DEFAULT face — number + title */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-7">
        <span className="select-none text-6xl font-bold leading-none text-white/[0.18]">
          {service.number}
        </span>
        <h3 className="text-lg font-semibold leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {service.title}
        </h3>
      </div>

      {/* HOVER face — slides up from below on hover */}
      <div
        className={[
          'absolute inset-0 z-20 flex translate-y-full flex-col rounded-[inherit] p-7 pt-6 opacity-0',
          'bg-[linear-gradient(160deg,#1c3d6e_0%,#0e2244_55%,#091830_100%)]',
          'shadow-[inset_0_0_0_2px_rgba(120,80,220,0.8)]',
          'transition-all duration-[380ms]',
          EASE_OUT_QUART,
          'group-hover:translate-y-0 group-hover:opacity-100',
        ].join(' ')}
      >
        {/* Faint image wash on the hover face */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-20">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover object-center"
          />
        </div>

        <span className="relative z-10 mb-2 select-none text-5xl font-bold leading-none text-white/[0.18]">
          {service.number}
        </span>

        <h3 className="relative z-10 mb-5 text-xl font-bold leading-snug text-white">
          {service.title}
        </h3>

        <ul className="relative z-10 space-y-3">
          {service.keyPoints.map((point, pi) => (
            <li
              key={point}
              className={[
                'flex translate-y-2.5 items-start gap-2.5 opacity-0',
                'transition-all duration-300',
                EASE_OUT_QUART,
                BULLET_DELAYS[pi] ?? BULLET_DELAYS.at(-1),
                'group-hover:translate-y-0 group-hover:opacity-100',
              ].join(' ')}
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#8C5AF0]/95"
                strokeWidth={2}
              />
              <span className="text-sm leading-relaxed text-white/75">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
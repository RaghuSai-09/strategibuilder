'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

const POPUPS = {
  intention: {
    label: 'Intention',
    content:
      'We approach our work with intention because the decisions we support carry real weight. They affect people, businesses, and futures built over time. We begin by listening and taking the time to understand the full context behind each situation, including the pressures leaders are facing. This allows us to offer guidance that is thoughtful, steady, and centered on protecting what truly matters.',
  },
  integrity: {
    label: 'Integrity',
    content:
      'Integrity is where our work begins. It shapes how we show up, how we advise, and how we advocate. We are guided by honesty, accountability, and respect for the responsibility entrusted to us. Our commitment is to do what is right for our clients and to build relationships that endure because they are rooted in trust.',
  },
  intelligence: {
    label: 'Intelligence',
    content:
      'We are innovative and modern in how we work, using AI and emerging tools to support an evolving risk landscape. We continue to explore new technologies that create clarity, efficiency, and better outcomes. Innovation is used in the service of people, not in place of them. Human judgment, real connection, and trusted relationships remain central as we adapt and grow.',
  },
} as const

type PopupKey = keyof typeof POPUPS

const POPUP_WIDTH = 360
const POPUP_GAP = 14

type PopupPosition = { top: number; left: number; arrowLeft: number } | null

const FloatingPopup: React.FC<{
  popupKey: PopupKey | null
  position: PopupPosition
}> = ({ popupKey, position }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || !popupKey || !position) return null

  const popup = POPUPS[popupKey]

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        top: position.top,
        left: position.left,
        width: POPUP_WIDTH,
        zIndex: 9999,
        animation: 'popupIn 0.25s cubic-bezier(0.22,1,0.36,1) both',
      }}
    >
      <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-[0_24px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(201,169,98,0.08)]"
        style={{
          background: 'linear-gradient(160deg, rgba(13,27,42,0.97) 0%, rgba(20,36,58,0.96) 100%)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

        <div className="p-5">
          {/* Label badge */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-gold-300 bg-gold-500/10 border border-gold-500/25">
              <span className="w-1 h-1 rounded-full bg-gold-400" />
              {popup.label}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-gold-500/30 via-gold-500/10 to-transparent mb-4" />

          {/* Body text */}
          <p className="text-[13px] leading-[1.75] text-gray-300/90 font-light">
            {popup.content}
          </p>
        </div>
      </div>

      {/* Arrow */}
      <div
        className="absolute -bottom-[7px] overflow-hidden"
        style={{
          left: Math.max(16, Math.min(position.arrowLeft - 8, POPUP_WIDTH - 32)),
          width: 16,
          height: 8,
        }}
      >
        <div
          className="w-4 h-4 border border-gold-500/30 -mt-[7px]"
          style={{
            background: 'rgba(20,36,58,0.97)',
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
          }}
        />
      </div>
    </div>
  )
}

const InWord: React.FC<{
  word: string
  popupKey: PopupKey
  isActive: boolean
  onEnter: (key: PopupKey, rect: DOMRect) => void
  onLeave: () => void
}> = ({ word, popupKey, isActive, onEnter, onLeave }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const rest = word.slice(2)

  const handleEnter = useCallback(() => {
    if (ref.current) onEnter(popupKey, ref.current.getBoundingClientRect())
  }, [popupKey, onEnter])

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onMouseEnter={handleEnter}
      onMouseLeave={onLeave}
      onFocus={handleEnter}
      onBlur={onLeave}
      className="relative inline cursor-pointer outline-none border-0 bg-transparent p-0 m-0 font-inherit text-inherit text-[length:inherit] leading-inherit"
    >
      <span
        className="font-semibold transition-all duration-200 italic"
        style={{
          background: 'linear-gradient(135deg, #C9A962 0%, #E8C97A 55%, #B8843A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: isActive ? 'drop-shadow(0 0 12px rgba(201,169,98,0.8))' : 'none',
        }}
      >
        In 
      </span>
      <span className="text-inherit">{rest}</span>

      <span
        className="absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300 ease-out"
        style={{
          width: isActive ? '100%' : '0%',
          background: 'linear-gradient(90deg, #C9A962, #E8C97A)',
        }}
      />
    </button>
  )
}

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)
  const [activePopup, setActivePopup] = useState<PopupKey | null>(null)
  const [popupPosition, setPopupPosition] = useState<PopupPosition>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleEnter = useCallback((key: PopupKey, rect: DOMRect) => {
    let left = rect.left + rect.width / 2 - POPUP_WIDTH / 2
    left = Math.max(12, Math.min(left, window.innerWidth - POPUP_WIDTH - 12))
    const top = Math.max(12, rect.top - 240 - POPUP_GAP)
    const arrowLeft = rect.left + rect.width / 2 - left

    setActivePopup(key)
    setPopupPosition({ top, left, arrowLeft })
  }, [])

  const handleLeave = useCallback(() => {
    setActivePopup(null)
    setPopupPosition(null)
  }, [])

  return (
    <>
      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>

      <FloatingPopup popupKey={activePopup} position={popupPosition} />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D1B2A]">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            top: '-8%',
            bottom: '-8%',
            transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
            willChange: 'transform',
          }}
        >
          <Image
            src="/hero_bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden="true"
          />
        </div>

        {/* Overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(8,16,30,0.55) 0%, rgba(8,16,30,0.30) 50%, rgba(8,16,30,0.75) 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 5% 95%, rgba(184,132,56,0.25) 0%, transparent 60%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 95% 5%, rgba(80,170,190,0.15) 0%, transparent 55%)' }}
        />

        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-16 right-16 w-72 h-72 rounded-full blur-3xl"
            style={{ background: 'rgba(184,132,56,0.10)', transform: `translateY(${scrollY * 0.45}px)` }}
          />
          <div
            className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'rgba(80,170,190,0.08)', transform: `translateY(${scrollY * 0.6}px)` }}
          />
        </div>

        {/* Content */}
        <div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40"
          style={{ transform: `translateY(${scrollY * -0.12}px)`, willChange: 'transform' }}
        >
          <div className="text-center space-y-6">
            {/* Headline */}
            <h1
              className="text-5xl md:text-6xl font-serif font-normal tracking-tight leading-tight text-white"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 6px 40px rgba(0,0,0,0.3)' }}
            >
              Boutique <span className="text-gold-500 italic">In </span>surance Brokerage
              <br />
              <span className="text-white/75 font-light">
                &amp; Strategic Risk Advisory
              </span>
            </h1>

            {/* Tagline with interactive IN words */}
            <p
              className="text-lg md:text-xl font-light tracking-wide text-white/70 leading-relaxed"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
            >
              Guided with{' '}
              <InWord word="INtention" popupKey="intention" isActive={activePopup === 'intention'} onEnter={handleEnter} onLeave={handleLeave} />
              .{'  '}Built on{' '}
              <InWord word="INtegrity" popupKey="integrity" isActive={activePopup === 'integrity'} onEnter={handleEnter} onLeave={handleLeave} />
              .{'  '}Driven by{' '}
              <InWord word="INtelligence" popupKey="intelligence" isActive={activePopup === 'intelligence'} onEnter={handleEnter} onLeave={handleLeave} />
              .
            </p>

            {/* Body */}
            <p
              className="max-w-2xl mx-auto text-sm md:text-base font-light text-white/60 leading-relaxed"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
            >
              We partner with leaders, investors, and lenders to navigate complex risk across M&amp;A,
              restructuring, and growth through modern tools, trusted relationships, and strategic
              market access.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" variant="primary" className="shadow-xl shadow-gold-900/30">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="!bg-white/5 !backdrop-blur-sm !border-white/15 !text-white hover:!bg-white/10 hover:!border-gold-400/40 shadow-lg"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0D1B2A, transparent)' }}
        />
      </section>
    </>
  )
}

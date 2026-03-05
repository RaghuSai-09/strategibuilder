'use client'

import React, { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Rocket, Building2, TrendingUp, GitBranch, Handshake, ArrowRightLeft } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const segments = [
  {
    icon: Rocket,
    title: 'Early-Stage\n& Startups',
    shortTitle: 'Early-Stage',
    headline: 'Build the Right Foundation',
    description:
      'We help early-stage companies establish the right insurance foundation as they begin to grow. This includes structuring management liability and core protections in a way that supports fundraising, board formation, and early governance—without overbuilding or misaligning coverage.',
    features: [
      'Management Liability Structuring',
      'Core Protection Framework',
      'Fundraising Support',
      'Board Formation Coverage',
      'Early Governance Solutions',
    ],
    color: 'from-blue-500 to-cyan-500',
    accent: '#38bdf8',
  },
  {
    icon: Building2,
    title: 'Growing\n& Scaling',
    shortTitle: 'Growing',
    headline: 'Evolve with Your Risk',
    description:
      'As businesses grow, risks evolve. We work with companies navigating expansion, new markets, increased headcount, or operational complexity. The focus is on adjusting coverage, strengthening protection, and ensuring insurance keeps pace with the business.',
    features: [
      'Coverage Adjustment',
      'Market Expansion Protection',
      'Headcount Growth Management',
      'Operational Risk Coverage',
      'Scalable Insurance Solutions',
    ],
    color: 'from-purple-500 to-pink-500',
    accent: '#e879f9',
  },
  {
    icon: TrendingUp,
    title: 'Established\nBusinesses',
    shortTitle: 'Established',
    headline: 'Optimize & Strengthen',
    description:
      'For mature companies, we support ongoing risk management, coverage optimization, and market engagement. This includes evaluating existing programs, managing renewals, and ensuring insurance remains aligned with leadership priorities, financial performance, and stakeholder expectations.',
    features: [
      'Risk Management Programs',
      'Coverage Optimization',
      'Renewal Management',
      'Market Engagement',
      'Stakeholder Alignment',
    ],
    color: 'from-emerald-500 to-teal-500',
    accent: '#2dd4bf',
  },
  {
    icon: GitBranch,
    title: 'Restructuring\n& Chapter 11',
    shortTitle: 'Restructuring',
    headline: 'Navigate Complex Transitions',
    description:
      'We support businesses navigating restructuring, financial stress, or Chapter 11 environments, where insurance access can be limited and market scrutiny is heightened. Our role is to engage deeply with the markets, advocate effectively, and structure solutions that allow coverage to remain in place or be secured during transition.',
    features: [
      'Restructuring Support',
      'Chapter 11 Coverage',
      'Market Advocacy',
      'Transition Solutions',
      'Coverage Continuity',
    ],
    color: 'from-amber-500 to-orange-500',
    accent: '#fb923c',
  },
  {
    icon: Handshake,
    title: 'M&A &\nTransactions',
    shortTitle: 'M&A',
    headline: 'Secure Deal Integrity',
    description:
      'We support buyers, sellers, and advisors through transactions by structuring insurance solutions around deal timing and risk transfer. This includes transaction-related coverage, tail D&O for exiting management, and coordination with legal and financial advisors to ensure insurance supports the transaction process.',
    features: [
      'Transaction Coverage',
      'Tail D&O Solutions',
      'Risk Transfer Structuring',
      'Advisor Coordination',
      'Deal Timing Optimization',
    ],
    color: 'from-indigo-500 to-purple-500',
    accent: '#818cf8',
  },
  {
    icon: ArrowRightLeft,
    title: 'Post-Transaction\n& Transition',
    shortTitle: 'Post-Transaction',
    headline: 'Ensure Continuity',
    description:
      'After a transaction closes, we help businesses transition coverage, maintain continuity, and build direct relationships with the insurance markets. The focus is on stability, clarity, and long-term protection as the business enters its next phase.',
    features: [
      'Coverage Transition',
      'Market Relationship Building',
      'Continuity Management',
      'Stability Planning',
      'Long-Term Protection',
    ],
    color: 'from-rose-500 to-pink-500',
    accent: '#fb7185',
  },
]

export const TargetMarket: React.FC = () => {
  const [active, setActive] = useState(0)
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: selectorRef, isVisible: selectorVisible } = useScrollAnimation()

  const seg = segments[active]
  const Icon = seg.icon

  return (
    <Section id="solutions" className="bg-gradient-to-b from-navy-800 via-[#1B365D] to-[#0D1B2A]">
      {/* Header */}
      <div
        ref={headerRef}
        className={`text-center mb-14 scroll-animate ${headerVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-normal text-white mb-6">
          Solutions for Every Stage
        </h2>
        <p className="text-xl text-teal-200 max-w-3xl mx-auto font-light">
          Tailored insurance solutions designed for your unique risk profile and business stage
        </p>
      </div>

      {/* Selector + Panel */}
      <div
        ref={selectorRef}
        className={`scroll-animate ${selectorVisible ? 'visible animate-fade-in-up' : ''}`}
      >
        {/* ── Lifecycle Bar ── */}
        <div className="relative mb-0">
          {/* Connecting line behind segments */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-teal-200/10 -translate-y-1/2 hidden lg:block pointer-events-none" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-teal-200/10 rounded-t-2xl overflow-hidden border border-teal-200/10 border-b-0">
            {segments.map((s, i) => {
              const SIcon = s.icon
              const isActive = i === active
              return (
                <button
                  key={s.shortTitle}
                  onClick={() => setActive(i)}
                  className={`
                    relative flex flex-col items-center gap-2 px-3 py-5 text-center transition-all duration-300 group
                    ${isActive
                      ? 'bg-navy-800/80 text-white'
                      : 'bg-navy-900/60 text-gray-400 hover:bg-navy-800/50 hover:text-gray-200'}
                  `}
                  style={isActive ? { boxShadow: `inset 0 -3px 0 ${s.accent}` } : {}}
                >
                  {/* Step number */}
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase mb-0.5 transition-colors duration-300
                      ${isActive ? 'text-gold-400' : 'text-gray-600 group-hover:text-gray-400'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Icon bubble */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-br ${s.color}
                      ${isActive ? 'opacity-100 scale-110' : 'opacity-40 scale-95 group-hover:opacity-70 group-hover:scale-100'}`}
                  >
                    <SIcon className="w-5 h-5 text-white" />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-semibold leading-tight whitespace-pre-line transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}
                  >
                    {s.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Detail Panel ── */}
        <div
          key={active}
          className="rounded-b-2xl border border-teal-200/10 border-t-0 bg-navy-800/40 backdrop-blur-md overflow-hidden"
          style={{
            animation: 'panelReveal 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        >
          {/* Accent bar at top */}
          <div
            className={`h-1 w-full bg-gradient-to-r ${seg.color}`}
          />

          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: headline + description */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${seg.color} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-0.5">
                    {seg.shortTitle}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {seg.headline}
                  </h3>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                {seg.description}
              </p>
            </div>

            {/* Right: features */}
            <div className="lg:pl-8 lg:border-l border-teal-200/10">
              <p className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-5">
                What We Cover
              </p>
              <ul className="space-y-3">
                {seg.features.map((feature, fi) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-gray-200"
                    style={{ animationDelay: `${fi * 60}ms` }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${seg.accent}22`, border: `1px solid ${seg.accent}55` }}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        style={{ color: seg.accent }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stage navigation hints */}
          <div className="px-8 md:px-12 pb-7 flex items-center justify-between">
            <button
              onClick={() => setActive((active - 1 + segments.length) % segments.length)}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-teal-300 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous Stage
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {segments.map((seg, i) => (
                <button
                  key={seg.title || i}
                  onClick={() => setActive(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? '20px' : '6px',
                    height: '6px',
                    background: i === active ? seg.accent : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActive((active + 1) % segments.length)}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-teal-300 transition-colors duration-200"
            >
              Next Stage
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe for panel reveal */}
      <style>{`
        @keyframes panelReveal {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Section>
  )
}
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, ArrowDown } from 'lucide-react'

type Credential = Readonly<{ lead: string; body: string }>

const credentials: ReadonlyArray<Credential> = [
  {
    lead: 'Deep carrier relationships',
    body: 'across management liability, transactional, and wholesale markets.',
  },
  {
    lead: 'Specialist in complex and hard-to-place risk',
    body: 'across transactions and restructuring.',
  },
  {
    lead: '"Meet the market" approach',
    body: '; direct alignment between clients and underwriters.',
  },
  {
    lead: 'Operating across Miami & New York',
    body: '; serving clients nationwide across private equity, institutional lending, M&A advisory, and emerging companies.',
  },
  {
    lead: 'Recognized by The M&A Advisor and International M&A Awards',
    body: 'for excellence in complex risk and transaction-related solutions.',
  },
  {
    lead: 'Trusted by executives, investors, and deal teams',
    body: 'navigating complex situations.',
  },
]

type Partner = Readonly<{
  id: string
  name: string
  role: string
  image: string
  linkedin: string
}>

// NOTE: Partner photos use temporary Figma asset URLs (expire in ~7 days).
// Swap these out for local /public/partners/*.png assets when available.
const partners: ReadonlyArray<Partner> = [
  {
    id: 'rommel-mayuga-distressed',
    name: 'Rommel Mayuga',
    role: 'Management Liability \u2013 Distressed & Special Situations',
    image: 'https://www.figma.com/api/mcp/asset/911a2ec9-75ea-48c3-80f4-9305bc9a9080',
    linkedin: '#',
  },
  {
    id: 'thomas-anselmo',
    name: 'Thomas Anselmo',
    role: 'Management Liability Middle Market & Complex Risks',
    image: 'https://www.figma.com/api/mcp/asset/93d3536a-c4b7-40b6-bbc4-6970ac8f0da6',
    linkedin: '#',
  },
  {
    id: 'daniel-mazzei',
    name: 'Daniel Mazzei',
    role: 'Management Liability Middle Market & Complex Risks',
    image: 'https://www.figma.com/api/mcp/asset/7fd05520-9822-4fbe-a826-7b26ada137a7',
    linkedin: '#',
  },
  {
    id: 'rommel-mayuga-spacs',
    name: 'Rommel Mayuga',
    role: 'Capital Markets & SPACs',
    image: 'https://www.figma.com/api/mcp/asset/9f3aa9c7-b556-434c-99b2-82b4554355f1',
    linkedin: '#',
  },
]

const SeeMoreButton: React.FC = () => {
  const handleClick = () => {
    if (globalThis.window === undefined) return
    const next = globalThis.document.getElementById('process')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="mt-12 flex flex-col items-center gap-2">
      <p className="text-[18px] sm:text-[20px] text-white">see more</p>
      <button
        type="button"
        aria-label="Scroll to next section"
        onClick={handleClick}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:translate-y-1 cursor-pointer"
      >
        <ArrowDown className="h-7 w-7 text-white" strokeWidth={1.5} />
      </button>
    </div>
  )
}

export const Team: React.FC = () => {
  return (
    <section
      id="team"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#0D2C44_0%,#183A55_100%)]"
    >
      {/* Decorative background image */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/team_bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Bottom fade so the next section blends in */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,rgba(13,44,68,0)_0%,#0D2C44_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-24 lg:pb-32">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-[14px] mb-10 lg:mb-14">
          <span
            aria-hidden
            className="block h-px w-8 sm:w-10 bg-gradient-to-r from-[rgba(201,169,110,0)] to-[#AE9059]"
          />
          <p className="text-center text-[13px] sm:text-[15px] lg:text-[16px] font-semibold uppercase tracking-[2.4px] sm:tracking-[3.2px] text-[#C9A96E]">
            Meet our team
          </p>
          <span
            aria-hidden
            className="block h-px w-8 sm:w-10 bg-gradient-to-r from-[#AE9059] to-[rgba(201,169,110,0)]"
          />
        </div>

        {/* Advisor block */}
        <div className="grid items-start gap-10 lg:grid-cols-[499px_minmax(0,1fr)] lg:gap-[40px]">
          {/* Photo + name plate */}
          <div className="relative mx-auto w-full max-w-[499px] drop-shadow-[-30px_31px_19.3px_rgba(0,0,0,0.25)] lg:mx-0">
            <div className="relative aspect-[499/782] w-full overflow-hidden border border-[rgba(201,169,110,0.15)]">
              <Image
                src="/Founder.png"
                alt="Marianne Halvorsen"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 499px"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute right-0 -bottom-4 bg-[#C9A96E] px-6 py-4 sm:px-7 sm:py-5 drop-shadow-[-4px_4px_5.25px_rgba(0,0,0,0.25)]">
              <p className="text-[20px] sm:text-[22px] font-medium leading-tight text-[#0A1624]">
                Marianne Halvorsen
              </p>
              <p className="mt-1 text-[9px] font-medium uppercase tracking-[1.44px] leading-tight text-[#0D1B2E]/65">
                Founder &amp; Principal &middot; Strategi Builder LLC
              </p>
            </div>
          </div>

          {/* Right content */}
          <div className="flex flex-col gap-6">
            <h2 className="font-bold uppercase leading-[1] text-[clamp(34px,5.5vw,54.7px)] bg-clip-text text-transparent bg-[linear-gradient(-26deg,#FFFFFF_17.7%,#9CD0F5_72.3%)]">
              The advisor
              <br />
              behind
              <br />
              the strategy
            </h2>

            <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.4] text-[#B8D2E5] max-w-[560px]">
              With over <span className="font-medium text-white">20 years</span> navigating insurance markets across
              management liability, M&amp;A transactions, and distressed situations,{' '}
              <span className="font-medium text-white">Marianne</span> is the advisor executives turn to when
              placements are complex and the stakes are high.
            </p>

            <ul className="flex flex-col">
              {credentials.map((credential, index) => (
                <li
                  key={credential.lead}
                  className={[
                    'flex items-start gap-[14px] py-4',
                    index < credentials.length - 1 ? 'border-b border-[rgba(201,169,110,0.18)]' : '',
                  ].join(' ')}
                >
                  <span
                    aria-hidden
                    className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-[3px] bg-[#C9A96E]/50"
                  />
                  <p className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.4] text-[#B8D2E5]">
                    <span className="font-medium text-white">{credential.lead}</span> {credential.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strategic Wholesale Partners */}
        <div className="mt-24 lg:mt-32 flex flex-col items-center gap-10 lg:gap-14">
          <div className="flex max-w-[720px] flex-col items-center gap-5 text-center">
            <h3 className="font-bold uppercase leading-tight text-[24px] sm:text-[28px] lg:text-[32px] bg-clip-text text-transparent bg-[linear-gradient(-4deg,#FFFFFF_17.7%,#9CD0F5_72.3%)]">
              Strategic Wholesale Partners
            </h3>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.4] text-[#D3EAFB]">
              We collaborate with specialized wholesale partners who bring deep expertise across disciplines such as
              D&amp;O, cyber, and complex liability&mdash;allowing us to structure solutions aligned with each
              client&apos;s unique situation.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <article
                key={partner.id}
                className="flex flex-col items-center overflow-hidden rounded-[24px] bg-white pb-8 sm:pb-10 transition-shadow hover:shadow-2xl"
              >
                <div className="relative aspect-[327/375] w-full overflow-hidden">
                  {/* External Figma asset URL — using <img> so we don't need a Next.js
                      remote image domain configured. Swap to <Image /> once assets
                      live in /public/partners/. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_38%,rgba(255,255,255,1)_98%)]"
                  />
                  <Link
                    href={partner.linkedin}
                    aria-label={`${partner.name} on LinkedIn`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-3 inline-flex h-12 w-12 items-center justify-center rounded-md bg-[#C9A96E] text-white transition-colors hover:bg-[#B89455]"
                  >
                    <Linkedin className="h-6 w-6" strokeWidth={1.5} />
                  </Link>
                </div>
                <div className="mt-6 flex flex-col items-center gap-2 px-4 text-center">
                  <p className="text-[20px] sm:text-[24px] font-semibold leading-tight text-[#183A55]">
                    {partner.name}
                  </p>
                  <p className="text-[14px] sm:text-[16px] lg:text-[17.4px] font-light leading-tight text-[#6C6C6C]">
                    {partner.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <SeeMoreButton />
      </div>
    </section>
  )
}

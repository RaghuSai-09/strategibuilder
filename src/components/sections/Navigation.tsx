'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About',        href: '/who-we-are' },
  { label: 'Team',         href: '/#team' },
  { label: 'Services',     href: '/#services' },
  { label: 'Our Approach', href: '/#process' },
  { label: 'Solutions',    href: '/#solutions' },
  { label: 'Testimonial',  href: '/#testimonials' },
  { label: 'FAQ',          href: '/#faq' },
]

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled]       = useState(false)
  const [isMobileMenuOpen, setMobileMenu] = useState(false)
  const pathname = usePathname()
  const isSolid  = isScrolled || pathname !== '/'

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        border-b backdrop-blur-xl
        transition-all duration-500
        ${isSolid
          ? 'bg-navy-800/80 border-white/10 shadow-2xl'
          : 'bg-navy-800/60 border-white/5'
        }
      `}
    >
      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex-shrink-0 group" aria-label="Home">
            <div className="relative w-20 h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo1.png"
                alt="Strategi Builder"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="
                    relative
                    text-[10.5px] font-semibold tracking-[0.17em] uppercase
                    text-slate-300/75 hover:text-white
                    transition-colors duration-200
                    after:absolute after:left-0 after:-bottom-0.5
                    after:h-px after:w-0
                    after:bg-gold-400
                    after:transition-[width] after:duration-300
                    hover:after:w-full
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Contact CTA ── */}
          <div className="hidden lg:block">
            <Link
              href="/#contact"
              className="
                inline-flex items-center justify-center
                px-6 py-2.5
                text-[10.5px] font-bold tracking-[0.2em] uppercase
                text-gold-400
                border border-gold-500/60
                hover:bg-gold-500/10 hover:border-gold-400
                transition-all duration-200
              "
            >
              Contact
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileMenu(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen
              ? <X className="w-6 h-6" />
              : <Menu className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* ── Mobile menu — animated height ── */}
      <div
        className={`
          lg:hidden
          border-t border-white/10
          bg-navy-950/95 backdrop-blur-xl
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-6 py-6 space-y-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenu(false)}
              className="
                block
                text-[10.5px] font-semibold tracking-[0.17em] uppercase
                text-slate-300/75 hover:text-white
                transition-colors duration-200
              "
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-5 border-t border-white/10">
            <Link
              href="/#contact"
              onClick={() => setMobileMenu(false)}
              className="
                flex items-center justify-center w-full py-3
                text-[10.5px] font-bold tracking-[0.2em] uppercase
                text-gold-400
                border border-gold-500/60
                hover:bg-gold-500/10 hover:border-gold-400
                transition-all duration-200
              "
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
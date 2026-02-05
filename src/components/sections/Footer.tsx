'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, X, Mail } from 'lucide-react'
import { FaFacebook } from 'react-icons/fa'

const footerLinks = {
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Process', href: '#process' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Blog', href: '#blog' },
  ],
  services: [
    { label: 'Management Liability', href: '#services' },
    { label: 'Transactional Insurance', href: '#services' },
    { label: 'Risk Advisory', href: '#services' },
    { label: 'Claims Advocacy', href: '#services' },
  ],
  resources: [
    { label: 'Free Resources', href: '#resources' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/strategi-builder', label: 'LinkedIn' },
  { icon: X, href: 'https://twitter.com', label: 'X (Twitter)' },
  { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Mail, href: 'mailto:marianne@strategibuilder.com', label: 'Email' },
]

export const Footer: React.FC = () => {
  return (
    <footer className="text-navy-100 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-60 h-20">
                <Image
                  src="/logo1.png"
                  alt="Strategi Builder Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-navy-200 mb-6 leading-relaxed">
              Boutique insurance brokerage specializing in complex placements through deep market relationships, expertise, and innovative solutions driven by intention, integrity, and intelligence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-navy-800 text-navy-200 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-navy-200 hover:text-gold-400 transition-colors group relative">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-navy-200 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-navy-200 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-navy-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-navy-300">
              © {new Date().getFullYear()} Strategi Builder LLC. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#privacy" className="text-navy-300 hover:text-gold-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#terms" className="text-navy-300 hover:text-gold-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#cookies" className="text-navy-300 hover:text-gold-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

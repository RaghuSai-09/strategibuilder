'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin, CheckCircle2, Loader2 } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

const labelGradient =
  'bg-[linear-gradient(-17deg,#1C3E57_4%,#24445C_96%)] bg-clip-text text-transparent'

const inputClass =
  'w-full rounded-lg border-[0.6px] border-[#C9A96E] bg-white px-4 py-3 text-[16px] leading-[1.4] text-[#1C3E57] placeholder:text-[#7E7D79] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/40'

export const Cta: React.FC = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const subject = encodeURIComponent(`New Inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
    )

    globalThis.location.href = `mailto:marianne@strategibuilder.com?subject=${subject}&body=${body}`

    setSubmitStatus('success')
    setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          ref={contentRef}
          className={`mx-auto mb-12 flex max-w-[870px] flex-col items-center text-center scroll-animate ${contentVisible ? 'visible animate-fade-in-up' : ''}`}
        >
          {/* Eyebrow */}
          <div className="mb-4 flex items-center gap-[14px]">
            <span className="block h-px w-10 bg-gradient-to-r from-transparent to-[#AE9059]" />
            <span className="text-[16px] font-semibold uppercase tracking-[3.2px] text-[#C9A96E]">
              Contact Us
            </span>
            <span className="block h-px w-10 bg-gradient-to-l from-transparent to-[#AE9059]" />
          </div>

          <h2 className="mb-4 text-[40px] font-bold leading-[1.2] lg:text-[42px]">
            <span className="text-[#2C4E6E]">Let&apos;s Discuss </span>
            <span className="bg-[linear-gradient(-20deg,#092539_4%,#0D2C44_96%)] bg-clip-text text-transparent">
              Your Coverage Needs
            </span>
          </h2>

          <p className="max-w-[536px] text-[15px] leading-[26.25px] text-[#4A4A4A]">
            Get in touch with us and discover how we can help protect your business with tailored
            insurance solutions
          </p>
        </div>

        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[666px_minmax(0,1fr)] lg:items-start">
          {/* ── Form ─────────────────────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-black/10 bg-[#FFF8EC] p-8 shadow-[0_4px_13.95px_rgba(0,0,0,0.05)]"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className={`mb-1.5 block text-[20px] font-medium ${labelGradient}`}>
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="John Doe"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className={`mb-1.5 block text-[20px] font-medium ${labelGradient}`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`mb-1.5 block text-[20px] font-medium ${labelGradient}`}>
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className={`mb-1.5 block text-[20px] font-medium ${labelGradient}`}>
                  Company Name*
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="message" className={`mb-1.5 block text-[20px] font-medium ${labelGradient}`}>
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your project and how we can help..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Your email client will open to send the message.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-red-700">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded bg-[linear-gradient(-36deg,#1C3E57_4%,#24445C_96%)] px-6 py-4 text-[24px] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>

          {/* ── Image + contact info ─────────────────────────────── */}
          <div className="flex flex-col gap-8">
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/image.png"
                alt="Business strategy consultation"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(13,44,68,0.85)_100%)]" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-[22px] font-semibold leading-tight">
                  Expert Insurance Solutions
                </p>
                <p className="mt-1 text-[14px] text-white/85">
                  Navigating complex risk through trusted partnerships
                </p>
              </div>
            </div>

            {/* Contact rows */}
            <div className="flex flex-col gap-4">
              <ContactRow
                icon={<Phone className="h-5 w-5" strokeWidth={2.5} />}
                text="(917) 943-5509"
                href="tel:+19179435509"
              />
              <ContactRow
                icon={<Mail className="h-5 w-5" strokeWidth={2.5} />}
                text="marianne@strategibuilder.com"
                href="mailto:marianne@strategibuilder.com"
              />
              <ContactRow
                icon={<MapPin className="h-5 w-5" strokeWidth={2.5} />}
                text="2004 SW 13th Street, Miami, FL 33145"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ContactRowProps {
  icon: React.ReactNode
  text: string
  href?: string
}

function ContactRow({ icon, text, href }: Readonly<ContactRowProps>) {
  const content = (
    <>
      <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-md bg-[linear-gradient(-31deg,#092539_4%,#0D2C44_96%)] text-white">
        {icon}
      </div>
      <span className="bg-[linear-gradient(-31deg,#092539_4%,#0D2C44_96%)] bg-clip-text text-[20px] text-transparent">
        {text}
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} className="flex items-center gap-4 transition-opacity hover:opacity-75">
        {content}
      </a>
    )
  }
  return <div className="flex items-center gap-4">{content}</div>
}

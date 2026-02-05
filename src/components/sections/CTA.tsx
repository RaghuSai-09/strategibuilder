'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Mail, Phone, MapPin, CheckCircle2, Loader2 } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Create mailto link with form data
    const subject = encodeURIComponent(`New Inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
    )
    
    // Open email client
    globalThis.location.href = `mailto:marianne@strategibuilder.com?subject=${subject}&body=${body}`
    
    setSubmitStatus('success')
    setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gold-50 border-b-4 border-gold-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={contentRef}
          className={`text-center mb-16 scroll-animate ${contentVisible ? 'visible animate-fade-in-up' : ''}`}
        >
          <h2 className="text-5xl md:text-6xl font-serif font-normal text-navy-900 mb-6">
            Let&apos;s Discuss Your Coverage Needs
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto font-light">
            Get in touch with us and discover how we can help protect your business with tailored insurance solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Image & Info */}
          <div className="space-y-8">
            {/* Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/image.png"
                alt="Business strategy consultation"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-serif font-normal mb-2">Expert Insurance Solutions</h3>
                <p className="text-white/90">Navigating complex risk through trusted partnerships</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-navy-900 mb-6">Contact Information</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Email</p>
                  <a href="mailto:marianne@strategibuilder.com" className="text-navy-600 hover:text-gold-600 transition-colors">
                    marianne@strategibuilder.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Phone</p>
                  <a href="tel:+19179435509" className="text-navy-600 hover:text-gold-600 transition-colors">
                    (917) 943-5509
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Location</p>
                  <p className="text-navy-600">2004 SW 13th Street | Miami, FL 33145 | USA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-gold-50/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gold-200">
            <h3 className="text-2xl font-serif text-navy-900 mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-navy-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-navy-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-navy-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-navy-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 transition-colors bg-white resize-none"
                  placeholder="Tell us about your project and how we can help..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-3 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Your email client will open to send the message!</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-red-700 bg-red-50 px-4 py-3 rounded-lg">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
                showArrow={!isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

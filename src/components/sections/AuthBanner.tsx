'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, UserPlus} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export const AuthBanner: React.FC = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gold-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-navy-300 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div 
          ref={contentRef}
          className={`text-center scroll-animate ${contentVisible ? 'visible animate-fade-in-up' : ''}`}
        >
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 border border-gold-300/50 text-sm font-semibold text-gold-900">
              Start Your Journey Today
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-normal text-navy-900 mb-6">
            Ready to Protect Your Business?
          </h2>
          
          <p className="text-lg md:text-xl text-navy-600 max-w-3xl mx-auto mb-10 font-light">
            Create your account today and get access to  
            personalized dashboards, and expert resources to accelerate your success.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/auth">
              <Button size="lg" className="group shadow-xl min-w-[200px]">
                <UserPlus className="mr-2 w-5 h-5" />
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              { title: 'Free to Start', description: 'Sign in to access' },
              { title: 'Instant Access', description: 'Get started in minutes' },
              { title: 'Expert Support', description: '24/7 customer assistance' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-gold-50/80 backdrop-blur-sm rounded-xl p-6 border border-gold-200 hover:border-gold-400 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-navy-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

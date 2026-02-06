'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'


export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)
  
  const [stats, setStats] = useState({
    strategies: 0,
    success: 0,
    industries: 0,
  })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  // Stats counter animation
  useEffect(() => {
    if (hasAnimated) return
    
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    
    const targets = { strategies: 500, success: 95, industries: 50 }
    let currentStep = 0
    
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      
      setStats({
        strategies: Math.floor(targets.strategies * progress),
        success: Math.floor(targets.success * progress),
        industries: Math.floor(targets.industries * progress),
      })
      
      if (currentStep >= steps) {
        setStats(targets)
        setHasAnimated(true)
        clearInterval(timer)
      }
    }, stepDuration)
    
    return () => clearInterval(timer)
  }, [hasAnimated])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#0D1B2A] to-[#1B365D]">
      
      {/* Parallax background layers */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ 
          transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
          willChange: 'transform'
        }}
      >
        {/* Subtle background gradient with parallax */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-200/20 via-transparent to-transparent"
            style={{ 
              transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
              willChange: 'transform'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-gold-500/20 via-transparent to-transparent"
            style={{ 
              transform: `translate3d(0, ${scrollY * 0.4}px, 0)`,
              willChange: 'transform'
            }}
          />
        </div>
        
        {/* Decorative circles with parallax - teal/blue accents */}
        <div 
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl" 
          style={{ 
            background: 'rgba(184, 212, 212, 0.15)',
            transform: `translate3d(0, ${scrollY * 0.6}px, 0)`,
            willChange: 'transform'
          }} 
        />
        <div 
          className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ 
            background: 'rgba(201, 169, 98, 0.12)',
            transform: `translate3d(0, ${scrollY * 0.7}px, 0)`,
            willChange: 'transform'
          }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-2xl"
          style={{ 
            background: 'rgba(165, 197, 197, 0.18)',
            transform: `translate3d(-50%, calc(-50% + ${scrollY * 0.8}px), 0)`,
            willChange: 'transform'
          }} 
        />
      </div>

      {/* Content */}
      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        style={{ 
          transform: `translate3d(0, ${scrollY * -0.15}px, 0)`,
          willChange: 'transform'
        }}
      >
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-tight">
            Boutique Insurance Brokerage & Strategic Risk Advisory
          </h1>

          <h3 className="text-lg md:text-xl text-teal-200 max-w-3xl mx-auto leading-relaxed font-light">
            Guided with intention. Built on integrity. Driven by intelligence.
          </h3>

          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            We partner with leaders, investors, and lenders to navigate complex risk across M&A, restructuring, and growth through modern tools, trusted relationships, and strategic market access.
          </p>
        
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/">
              <Button size="lg" variant="secondary" className="shadow-xl">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#services">
              <Button size="lg" variant="outline" className="!bg-transparent !backdrop-blur-sm !border-teal-200/40 !text-white hover:!bg-teal-200/10 hover:!border-teal-200 shadow-lg">
                View Services
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            {[
              { value: stats.strategies, label: 'Strategies Delivered', suffix: '+' },
              { value: stats.success, label: 'Success Rate', suffix: '%' },
              { value: stats.industries, label: 'Industries', suffix: '+' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-teal-200/20 hover:border-gold-500/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="text-4xl md:text-5xl font-serif font-normal text-white mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-teal-200 text-sm font-light tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 pt-8">
            <span className="text-gray-400 text-sm font-light">Trusted by 120+ businesses worldwide</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1B365D]/80 to-transparent pointer-events-none" />
    </section>
  )
}

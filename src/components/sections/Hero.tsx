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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gold-50 via-gold-50/70 to-gold-100">
      {/* Background Image Layer with Parallax */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
          willChange: 'transform',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'none\'/%3E%3Cpath d=\'M50 10L90 90H10z\' fill=\'%23C9A962\' opacity=\'0.1\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'20\' fill=\'%231B365D\' opacity=\'0.1\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />
      
      {/* Overlay Pattern with Different Speed */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          transform: `translate3d(0, ${scrollY * -0.2}px, 0)`,
          willChange: 'transform',
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201, 169, 98, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(27, 54, 93, 0.3) 0%, transparent 50%)',
        }}
      />
      
      {/* Parallax background layers */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ 
          transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
          willChange: 'transform'
        }}
      >
        {/* Subtle background gradient with parallax */}
        <div className="absolute inset-0 opacity-40">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-navy-100/50 via-transparent to-transparent"
            style={{ 
              transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
              willChange: 'transform'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-gold-300/50 via-transparent to-transparent"
            style={{ 
              transform: `translate3d(0, ${scrollY * 0.4}px, 0)`,
              willChange: 'transform'
            }}
          />
        </div>
        
        {/* Decorative circles with parallax */}
        <div 
          className="absolute top-20 right-20 w-96 h-96 bg-navy-300/20 rounded-full blur-3xl" 
          style={{ 
            transform: `translate3d(0, ${scrollY * 0.6}px, 0)`,
            willChange: 'transform'
          }} 
        />
        <div 
          className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gold-300/20 rounded-full blur-3xl"
          style={{ 
            transform: `translate3d(0, ${scrollY * 0.7}px, 0)`,
            willChange: 'transform'
          }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-navy-200/20 rounded-full blur-2xl"
          style={{ 
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-navy-900 tracking-tight leading-tight">
            Boutique Insurance Brokerage & Strategic Risk Advisory
          </h1>

          <h3 className="text-lg md:text-xl text-navy-700 max-w-3xl mx-auto leading-relaxed font-light">
            Guided with intention. Built on integrity. Driven by intelligence.
          </h3>

          <p className="text-sm md:text-base text-navy-600 max-w-2xl mx-auto leading-relaxed font-light">
            We partner with leaders, investors, and lenders to navigate complex risk across M&A, restructuring, and growth through modern tools, trusted relationships, and strategic market access.
          </p>
        
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/">
              <Button size="lg" className="group shadow-xl">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#services">
              <Button size="lg" variant="outline" className="bg-white/80 backdrop-blur-sm border-navy-300 text-navy-900 hover:bg-navy-50 shadow-lg">
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
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-navy-100 hover:border-gold-400/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="text-4xl md:text-5xl font-serif font-normal text-navy-900 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-navy-600 text-sm font-light tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 pt-8">
            <span className="text-navy-600 text-sm font-light">Trusted by 120+ businesses worldwide</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t to-transparent pointer-events-none" style={{ backgroundImage: 'linear-gradient(to top, rgba(255, 255, 255, 0.8), transparent)' }} />
    </section>
  )
}

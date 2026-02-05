import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  gradient?: boolean
  id?: string
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className,
  gradient = false,
  id 
}) => {
  return (
    <section
      id={id}
      className={cn(
        'py-20 px-4 sm:px-6 lg:px-8',
        gradient && 'bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}

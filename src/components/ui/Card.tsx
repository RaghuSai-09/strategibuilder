import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  gradient = false 
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl p-8 transition-all duration-300 relative overflow-hidden',
        'bg-gold-50 border border-gold-200',
        hover && 'hover:shadow-xl hover:scale-[1.02] hover:border-gold-400 hover:-translate-y-1 cursor-pointer',
        className
      )}
    >
      {hover && <div className="absolute inset-0 bg-gradient-to-br from-gold-50/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
      {children}
    </div>
  )
}

import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  showArrow?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'
    
    const variants = {
      primary: 'bg-gradient-to-r from-navy-800 to-navy-900 text-white focus:ring-navy-500 shadow-lg hover:shadow-xl group',
      secondary: 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 focus:ring-gold-500 shadow-lg hover:shadow-xl group',
      outline: 'border-2 border-navy-800 text-navy-800 focus:ring-navy-400 shadow-md group bg-white/50 backdrop-blur-sm',
      ghost: 'text-navy-700 hover:bg-navy-50 focus:ring-navy-300',
    }
    
    const sizes = {
      sm: 'px-6 py-2.5 text-sm',
      md: 'px-8 py-3 text-base',
      lg: 'px-10 py-4 text-lg',
    }
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Bottom to top fill animation */}
        {(variant === 'primary' || variant === 'secondary' || variant === 'outline') && (
          <span className="absolute inset-0 bg-gold-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
        )}
        
        <span className={cn(
          "relative z-10 flex items-center gap-2 transition-colors duration-300",
          variant !== 'ghost' && "group-hover:text-navy-900"
        )}>
          {children}
          
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

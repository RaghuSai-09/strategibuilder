import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-[#A38850] border border-[#F2AE40] text-[#F2C97E] [text-shadow:0_0_8px_rgba(242,174,64,0.9),0_0_20px_rgba(242,174,64,0.55),0_0_40px_rgba(242,174,64,0.3)] hover:opacity-85 focus-visible:ring-[#F2AE40]',
      secondary:
        'bg-transparent border border-[#B8D2E5] text-[#B8D2E5] hover:bg-[rgba(184,210,229,0.08)] focus-visible:ring-[#B8D2E5]',
      outline:
        'bg-transparent border border-[#1C3E57]/30 text-[#1C3E57] hover:bg-[#1C3E57] hover:text-white hover:border-[#1C3E57] focus-visible:ring-[#1C3E57]',
      ghost:
        'text-[#1C3E57] hover:bg-[#1C3E57]/5 focus-visible:ring-[#1C3E57]',
    }

    const sizes = {
      sm: 'px-5 py-2 text-[13px]',
      md: 'px-[30px] py-[12px] text-[15.59px]',
      lg: 'px-[36px] py-[14px] text-[16px]',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

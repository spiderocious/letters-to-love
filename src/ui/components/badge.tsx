import { ReactNode } from 'react'

type BadgeVariant = 'yellow' | 'pink' | 'rose' | 'green' | 'gray'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  yellow: 'bg-brand-yellow/20 text-brand-yellow-dark border-brand-yellow/30',
  pink: 'bg-romantic-blush/30 text-romantic-brown border-romantic-blush/40',
  rose: 'bg-romantic-rose/20 text-romantic-rose-dark border-romantic-rose/30',
  green: 'bg-green-100 text-green-700 border-green-200',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
}

export function Badge({ variant = 'pink', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

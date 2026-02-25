import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hoverable?: boolean
}

export function Card({ children, hoverable = false, className = '', ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`bg-white rounded-3xl shadow-card border border-romantic-cream-dark
        dark:bg-dark-surface dark:border-dark-border
        ${hoverable ? 'transition-shadow duration-200 hover:shadow-card-hover cursor-pointer' : ''}
        ${className}`}
    >
      {children}
    </div>
  )
}

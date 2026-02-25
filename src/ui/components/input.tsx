import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
}

export function Input({ label, error, icon, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-romantic-brown">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-romantic-brown-muted">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          {...props}
          className={`w-full rounded-2xl border px-4 py-2.5 text-sm text-romantic-brown placeholder:text-romantic-brown-muted bg-white
            border-romantic-cream-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow
            disabled:bg-romantic-cream-dark disabled:opacity-60 transition-all
            dark:bg-dark-surface dark:border-dark-border dark:text-dark-text
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-400 focus:ring-red-200' : ''}
            ${className}`}
        />
      </div>
      {error && <p className="text-xs text-red-600 flex items-center gap-1">{error}</p>}
    </div>
  )
}

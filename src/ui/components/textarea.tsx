import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-romantic-brown">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        {...props}
        className={`w-full rounded-2xl border px-4 py-3 text-sm text-romantic-brown placeholder:text-romantic-brown-muted bg-white
          border-romantic-cream-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow
          disabled:bg-romantic-cream-dark disabled:opacity-60 transition-all resize-none
          dark:bg-dark-surface dark:border-dark-border dark:text-dark-text
          ${error ? 'border-red-400 focus:ring-red-200' : ''}
          ${className}`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

import { SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export function Select({ label, error, options, placeholder, className = '', id, ...props }: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-romantic-brown">
          {label}
        </label>
      )}
      <select
        id={inputId}
        {...props}
        className={`w-full rounded-2xl border px-4 py-2.5 text-sm text-romantic-brown bg-white
          border-romantic-cream-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow
          disabled:bg-romantic-cream-dark disabled:opacity-60 transition-all
          dark:bg-dark-surface dark:border-dark-border dark:text-dark-text
          ${error ? 'border-red-400 focus:ring-red-200' : ''}
          ${className}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

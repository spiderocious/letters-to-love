import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center gap-4">
      {icon && <div className="text-romantic-rose/60">{icon}</div>}
      <div>
        <p className="text-lg font-semibold text-romantic-brown dark:text-dark-text">{title}</p>
        {description && (
          <p className="text-sm text-romantic-brown-muted dark:text-dark-muted mt-1">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}

import { Heart } from '@ui/icons'

export function TodayHeader() {
  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-1">
        <Heart size={16} className="text-romantic-rose fill-romantic-rose/40" />
        <span className="text-sm text-romantic-brown-muted dark:text-dark-muted">{dayOfWeek}</span>
      </div>
      <h1 className="text-3xl font-bold text-romantic-brown dark:text-dark-text">{dateStr}</h1>
      <p className="text-sm text-romantic-brown-muted dark:text-dark-muted mt-1">
        A letter written just for you
      </p>
    </div>
  )
}

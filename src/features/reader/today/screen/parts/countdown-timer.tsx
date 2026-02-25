import { useCountdown } from '@shared/utils'
import { Clock, Heart } from '@ui/icons'

export function CountdownTimer() {
  const { hours, minutes, seconds, expired } = useCountdown()

  if (expired) {
    return (
      <div className="flex flex-col items-center gap-3 py-12">
        <Heart size={40} className="text-romantic-rose animate-pulse-soft fill-romantic-rose/30" />
        <p className="text-lg font-semibold text-romantic-brown dark:text-dark-text">
          Today's letter is on its way…
        </p>
        <p className="text-sm text-romantic-brown-muted dark:text-dark-muted">
          Check back in a moment
        </p>
      </div>
    )
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      {/* Decorative */}
      <div className="flex flex-col items-center gap-2">
        <Clock size={28} className="text-romantic-rose/70" />
        <p className="text-sm font-medium text-romantic-brown-muted dark:text-dark-muted">
          Today's letter arrives in
        </p>
      </div>

      {/* Timer */}
      <div className="flex items-end gap-3">
        {[
          { value: hours, label: 'hours' },
          { value: minutes, label: 'minutes' },
          { value: seconds, label: 'seconds' },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-end gap-1">
            {i > 0 && (
              <span className="text-3xl font-light text-romantic-brown-muted dark:text-dark-muted mb-3">:</span>
            )}
            <div className="flex flex-col items-center gap-1">
              <div className="w-20 h-20 bg-white dark:bg-dark-surface rounded-2xl shadow-romantic flex items-center justify-center border border-romantic-blush/30 dark:border-dark-border">
                <span className="text-3xl font-bold text-romantic-brown dark:text-dark-text tabular-nums">
                  {pad(value)}
                </span>
              </div>
              <span className="text-xs text-romantic-brown-muted dark:text-dark-muted">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-romantic-brown-muted dark:text-dark-muted text-center max-w-sm leading-relaxed">
        Something is being written just for you. A little patience, a lot of love. 💛
      </p>
    </div>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import { useCountdown } from '@shared/utils'
import { Clock, Heart } from '@ui/icons'

function FlipDigit({ value }: { value: string }) {
  return (
    <div className="flip-digit-wrapper relative">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="block text-3xl font-bold text-romantic-brown dark:text-dark-text tabular-nums"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export function CountdownTimer() {
  const { hours, minutes, seconds, expired } = useCountdown()

  if (expired) {
    return (
      <div className="flex flex-col items-center gap-3 py-12">
        <Heart size={40} className="text-romantic-rose animate-heartbeat fill-romantic-rose/30" />
        <p className="font-display italic text-2xl text-romantic-brown dark:text-dark-text">
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
    <div className="flex flex-col items-center gap-8 py-12 relative">
      {/* Floating hearts background */}
      <span className="floating-heart text-romantic-rose/10 text-4xl animate-float" style={{ top: '10%', left: '15%', animationDelay: '0s' }}>♥</span>
      <span className="floating-heart text-brand-yellow/10 text-3xl animate-float-slow" style={{ top: '20%', right: '12%', animationDelay: '1.5s' }}>♥</span>

      {/* Decorative */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-2"
      >
        <Clock size={28} className="text-romantic-rose/70" />
        <p className="font-display italic text-lg text-romantic-brown-muted dark:text-dark-muted">
          Today's letter arrives in
        </p>
      </motion.div>

      {/* Split-flap Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 200, damping: 20 }}
        className="flex items-end gap-3"
      >
        {[
          { value: hours, label: 'hours' },
          { value: minutes, label: 'minutes' },
          { value: seconds, label: 'seconds' },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-end gap-1">
            {i > 0 && (
              <span className="text-3xl font-light text-romantic-brown-muted dark:text-dark-muted mb-[18px]">:</span>
            )}
            <div className="flex flex-col items-center gap-1">
              <div className="w-20 h-20 bg-white dark:bg-dark-surface rounded-2xl shadow-romantic flex items-center justify-center border border-romantic-blush/30 dark:border-dark-border overflow-hidden">
                <FlipDigit value={pad(value)} />
              </div>
              <span className="text-xs text-romantic-brown-muted dark:text-dark-muted">{label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="font-display italic text-lg text-romantic-brown-muted dark:text-dark-muted text-center max-w-sm leading-relaxed"
      >
        Something is being written just for you. A little patience, a lot of love. 💛
      </motion.p>
    </div>
  )
}

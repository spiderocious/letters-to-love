import { motion } from 'framer-motion'
import { Heart } from '@ui/icons'

export function TodayHeader() {
  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="mb-10 relative overflow-hidden">
      {/* Floating decorative hearts */}
      <span className="floating-heart text-romantic-rose/15 text-5xl animate-float top-2 right-8" style={{ animationDelay: '0s' }}>♥</span>
      <span className="floating-heart text-romantic-blush/20 text-3xl animate-float-slow top-8 right-24" style={{ animationDelay: '2s' }}>♥</span>
      <span className="floating-heart text-brand-yellow/20 text-2xl animate-float-fast top-0 right-40" style={{ animationDelay: '1s' }}>♥</span>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-2 mb-2"
      >
        <Heart size={14} className="text-romantic-rose fill-romantic-rose/60" />
        <span className="font-display italic text-base text-romantic-brown-muted dark:text-dark-muted tracking-wide">
          {dayOfWeek}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-display text-5xl md:text-7xl font-bold italic text-romantic-brown dark:text-dark-text leading-tight"
      >
        {dateStr}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-display italic text-xl text-romantic-rose/80 dark:text-romantic-rose/60 mt-2"
      >
        A letter written just for you
      </motion.p>
    </div>
  )
}

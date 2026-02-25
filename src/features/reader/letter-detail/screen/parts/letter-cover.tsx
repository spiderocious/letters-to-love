import { motion } from 'framer-motion'
import { Trophy } from '@ui/icons'
import { Badge } from '@ui/components'
import { formatDate } from '@shared/helpers'
import type { Letter } from '@shared/types'

interface LetterCoverProps {
  letter: Letter
}

const moodColors: Record<string, 'yellow' | 'pink' | 'rose' | 'green' | 'gray'> = {
  playful: 'yellow',
  'missing-you': 'rose',
  'proud-of-you': 'green',
  romantic: 'pink',
  grateful: 'yellow',
  encouraging: 'green',
  nostalgic: 'pink',
  silly: 'yellow',
}

export function LetterCover({ letter }: LetterCoverProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative bg-gradient-to-br from-romantic-blush/30 via-white to-brand-yellow/10 dark:from-dark-surface dark:via-dark-surface dark:to-dark-border rounded-3xl p-8 mb-8 border border-romantic-blush/20 dark:border-dark-border overflow-hidden"
    >
      {/* Subtle paper texture lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #3D1F1F 0px, #3D1F1F 1px, transparent 1px, transparent 28px)',
        }}
      />

      {/* Floating decorative hearts */}
      <span className="floating-heart text-romantic-rose/15 text-7xl animate-float" style={{ top: '-8px', right: '16px', animationDelay: '0s' }}>♥</span>
      <span className="floating-heart text-brand-yellow/10 text-4xl animate-float-slow" style={{ top: '40px', right: '80px', animationDelay: '1s' }}>♥</span>
      <span className="floating-heart text-romantic-blush/20 text-2xl animate-float-fast" style={{ bottom: '16px', right: '40px', animationDelay: '0.5s' }}>♥</span>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-2 flex-wrap mb-5 relative z-10"
      >
        {letter.is_milestone && (
          <Badge variant="yellow">
            <Trophy size={11} className="mr-1" /> Milestone Letter
          </Badge>
        )}
        {letter.mood && (
          <Badge variant={moodColors[letter.mood] ?? 'pink'}>{letter.mood}</Badge>
        )}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="font-display text-4xl md:text-5xl font-bold italic text-romantic-brown dark:text-dark-text leading-tight mb-3 relative z-10"
      >
        {letter.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="text-sm text-romantic-brown-muted dark:text-dark-muted relative z-10"
      >
        {formatDate(letter.publish_at)}
      </motion.p>
    </motion.div>
  )
}

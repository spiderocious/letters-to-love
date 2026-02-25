import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReactions, useAddReaction } from '../../api/use-reactions'
import type { ReactionEmoji } from '@shared/types'

const EMOJI_MAP: Record<ReactionEmoji, string> = {
  heart: '❤️',
  teary: '🥹',
  laughing: '😂',
  star: '⭐',
  blush: '🥰',
}

interface ReactionsBarProps {
  letterId: string
}

interface Particle {
  id: number
  x: number
  y: number
  rotate: number
}

function ReactionButton({ emoji, count, onReact, disabled }: {
  emoji: ReactionEmoji
  count: number | undefined
  onReact: () => void
  disabled: boolean
}) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [bursting, setBursting] = useState(false)

  function handleClick() {
    onReact()
    setBursting(true)
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: -(Math.random() * 40 + 20),
      rotate: (Math.random() - 0.5) * 60,
    }))
    setParticles(newParticles)
    setTimeout(() => {
      setParticles([])
      setBursting(false)
    }, 600)
  }

  return (
    <div className="relative">
      {/* Burst particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, scale: 0.6, x: 0, y: 0, rotate: 0 }}
            animate={{ opacity: 0, scale: 1.4, x: p.x, y: p.y, rotate: p.rotate }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-sm z-10"
          >
            {EMOJI_MAP[emoji]}
          </motion.span>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        disabled={disabled}
        animate={bursting ? { scale: [1, 1.35, 1] } : {}}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-romantic-cream-dark dark:bg-dark-border hover:bg-romantic-blush/30 dark:hover:bg-dark-border/80 transition-colors disabled:opacity-50 border border-transparent hover:border-romantic-blush/30"
        title={emoji}
      >
        <span className="text-base">{EMOJI_MAP[emoji]}</span>
        <AnimatePresence mode="popLayout">
          {count ? (
            <motion.span
              key={count}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-medium text-romantic-brown dark:text-dark-text"
            >
              {count}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export function ReactionsBar({ letterId }: ReactionsBarProps) {
  const { data: reactions } = useReactions(letterId)
  const addReaction = useAddReaction()

  function handleReact(emojiType: ReactionEmoji) {
    addReaction.mutate({ letterId, emojiType })
  }

  const countMap = Object.fromEntries((reactions ?? []).map((r) => [r.emoji_type, r.count]))

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {(Object.keys(EMOJI_MAP) as ReactionEmoji[]).map((emoji) => (
        <ReactionButton
          key={emoji}
          emoji={emoji}
          count={countMap[emoji]}
          onReact={() => handleReact(emoji)}
          disabled={addReaction.isPending}
        />
      ))}
    </div>
  )
}

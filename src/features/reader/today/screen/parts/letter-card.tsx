import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Heart, Trophy, ChevronRight } from '@ui/icons'
import { Badge } from '@ui/components'
import { formatDate, isToday } from '@shared/helpers'
import { letterPath } from '@shared/constants'
import type { LetterSummary } from '@shared/types'

interface LetterCardProps {
  letter: LetterSummary
  index?: number
}

const moodColors: Record<string, string> = {
  playful: 'yellow',
  'missing-you': 'rose',
  'proud-of-you': 'green',
  romantic: 'pink',
  grateful: 'yellow',
  encouraging: 'green',
  nostalgic: 'pink',
  silly: 'yellow',
}

export function LetterCard({ letter, index = 0 }: LetterCardProps) {
  const isNew = isToday(letter.publish_at)
  const navigate = useNavigate()
  const cardRef = useRef<HTMLAnchorElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  const initialRotate = index === 1 ? 1 : index === 2 ? -1 : 0

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div style={{ perspective: 1000 }}>
      <motion.a
        ref={cardRef}
        href={letterPath(letter.id)}
        onClick={(e) => {
          e.preventDefault()
          window.location.href = letterPath(letter.id)
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, rotate: initialRotate }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="group block bg-white dark:bg-dark-surface rounded-3xl shadow-card hover:shadow-romantic-lg border border-romantic-cream-dark dark:border-dark-border p-6 cursor-pointer"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {isNew && (
              <span className="animate-glow-pulse">
                <Badge variant="rose">New today</Badge>
              </span>
            )}
            {letter.is_milestone && (
              <Badge variant="yellow">
                <Trophy size={11} className="mr-1" /> Milestone
              </Badge>
            )}
            {letter.mood && (
              <Badge variant={moodColors[letter.mood] as 'yellow' | 'pink' | 'rose' | 'green' | 'gray' ?? 'pink'}>
                {letter.mood}
              </Badge>
            )}
          </div>
          <motion.div whileHover={{ scale: 1.3 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Heart size={18} className="text-romantic-rose/40 group-hover:text-romantic-rose group-hover:fill-romantic-rose/20 transition-all shrink-0" />
          </motion.div>
        </div>

        {/* Title */}
        <h2 className={`leading-snug mb-2 group-hover:text-romantic-rose-dark transition-colors ${letter.is_milestone ? 'font-display text-2xl font-semibold italic text-romantic-brown dark:text-dark-text' : 'text-xl font-semibold text-romantic-brown dark:text-dark-text'}`}>
          {letter.title}
        </h2>

        {/* Date */}
        <p className="text-xs text-romantic-brown-muted dark:text-dark-muted">
          {formatDate(letter.publish_at)}
        </p>

        {/* Read more */}
        <div className="flex items-center gap-1 text-sm text-romantic-rose mt-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Read letter <ChevronRight size={15} />
        </div>
      </motion.a>
    </div>
  )
}

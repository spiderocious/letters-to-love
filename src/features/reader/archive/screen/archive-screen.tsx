import { useState } from 'react'
import { motion } from 'framer-motion'
import { Archive, Flame } from '@ui/icons'
import { PageSpinner, EmptyState, Badge } from '@ui/components'
import { isSameDay } from '@shared/helpers'
import { letterPath } from '@shared/constants'
import type { LetterMood, LetterSummary } from '@shared/types'
import { useAllLetters } from '../api/use-all-letters'
import { ArchiveFilters } from './parts/archive-filters'
import { Link } from 'react-router-dom'
import { Trophy, Heart } from '@ui/icons'
import { formatDate } from '@shared/helpers'

interface TimelineGroupProps {
  date: string
  letters: LetterSummary[]
  index: number
}

function TimelineGroup({ date, letters, index }: TimelineGroupProps) {
  return (
    <motion.div
      className="flex gap-4"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center pt-1.5">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: index * 0.06 + 0.1 }}
          className="w-3 h-3 rounded-full bg-romantic-rose shrink-0"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.06 + 0.2, ease: 'easeOut' }}
          className="w-px flex-1 bg-romantic-cream-dark dark:bg-dark-border mt-1"
          style={{ transformOrigin: 'top' }}
        />
      </div>

      <div className="flex-1 pb-6">
        <p className="text-xs font-medium text-romantic-brown-muted dark:text-dark-muted mb-3">
          {date}
        </p>
        <div className="flex flex-col gap-3">
          {letters.map((letter) => (
            <Link
              key={letter.id}
              to={letterPath(letter.id)}
              className="group bg-white dark:bg-dark-surface rounded-2xl border border-romantic-cream-dark dark:border-dark-border px-5 py-4 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {letter.is_milestone && <Trophy size={13} className="text-brand-yellow shrink-0" />}
                    <h3 className="font-semibold text-romantic-brown dark:text-dark-text text-sm truncate group-hover:text-romantic-rose transition-colors">
                      {letter.title}
                    </h3>
                  </div>
                  {letter.mood && (
                    <Badge variant="pink" className="text-xs">{letter.mood}</Badge>
                  )}
                </div>
                <Heart size={16} className="text-romantic-rose/30 group-hover:text-romantic-rose group-hover:fill-romantic-rose/20 transition-all shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function ArchiveScreen() {
  const [activeMood, setActiveMood] = useState<LetterMood | null>(null)
  const { data: letters, isLoading, error } = useAllLetters(activeMood)

  // Group letters by day
  const groups: { date: string; letters: LetterSummary[] }[] = []
  for (const letter of letters ?? []) {
    const dateStr = formatDate(letter.publish_at)
    const existing = groups.find((g) => isSameDay(g.letters[0]?.publish_at, letter.publish_at))
    if (existing) {
      existing.letters.push(letter)
    } else {
      groups.push({ date: dateStr, letters: [letter] })
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <Archive size={20} className="text-romantic-rose" />
          <h1 className="font-display italic text-3xl font-bold text-romantic-brown dark:text-dark-text">Archive</h1>
        </div>
        {letters && (
          <p className="text-sm text-romantic-brown-muted dark:text-dark-muted">
            {letters.length} letter{letters.length !== 1 ? 's' : ''} written
          </p>
        )}
      </motion.div>

      <div className="mb-6">
        <ArchiveFilters activeMood={activeMood} onMoodChange={setActiveMood} />
      </div>

      {isLoading && <PageSpinner />}
      {error && <p className="text-sm text-red-600">{error.message}</p>}

      {!isLoading && groups.length === 0 && (
        <EmptyState
          icon={<Flame size={40} />}
          title="No letters yet"
          description="Letters will appear here as they're published."
        />
      )}

      <div className="flex flex-col">
        {groups.map((group, i) => (
          <TimelineGroup key={group.date} date={group.date} letters={group.letters} index={i} />
        ))}
      </div>
    </div>
  )
}

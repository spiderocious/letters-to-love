import { Link } from 'react-router-dom'
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
  const offsetClass = index === 1 ? 'rotate-1' : index === 2 ? '-rotate-1' : ''
  const isNew = isToday(letter.publish_at)

  return (
    <Link
      to={letterPath(letter.id)}
      className={`group block bg-white dark:bg-dark-surface rounded-3xl shadow-card hover:shadow-romantic-lg border border-romantic-cream-dark dark:border-dark-border p-6 transition-all duration-200 hover:-translate-y-1 ${offsetClass}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {isNew && (
            <Badge variant="rose" className="animate-fade-in">New today</Badge>
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
        <Heart size={18} className="text-romantic-rose/40 group-hover:text-romantic-rose group-hover:fill-romantic-rose/20 transition-all shrink-0" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-romantic-brown dark:text-dark-text leading-snug mb-2 group-hover:text-romantic-rose-dark transition-colors">
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
    </Link>
  )
}

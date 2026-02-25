import { Trophy, Heart } from '@ui/icons'
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
    <div className="relative bg-gradient-to-br from-romantic-blush/30 via-white to-brand-yellow/10 dark:from-dark-surface dark:via-dark-surface dark:to-dark-border rounded-3xl p-8 mb-8 border border-romantic-blush/20 dark:border-dark-border overflow-hidden">
      {/* Decorative hearts */}
      <div className="absolute top-4 right-6 opacity-10">
        <Heart size={80} className="fill-romantic-rose text-romantic-rose" />
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-4">
        {letter.is_milestone && (
          <Badge variant="yellow">
            <Trophy size={11} className="mr-1" /> Milestone Letter
          </Badge>
        )}
        {letter.mood && (
          <Badge variant={moodColors[letter.mood] ?? 'pink'}>{letter.mood}</Badge>
        )}
      </div>

      <h1 className="text-3xl font-bold text-romantic-brown dark:text-dark-text leading-tight mb-3 relative z-10">
        {letter.title}
      </h1>

      <p className="text-sm text-romantic-brown-muted dark:text-dark-muted">
        {formatDate(letter.publish_at)}
      </p>
    </div>
  )
}

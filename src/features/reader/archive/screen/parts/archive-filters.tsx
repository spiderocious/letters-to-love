import { MOODS } from '@shared/constants'
import type { LetterMood } from '@shared/types'

interface ArchiveFiltersProps {
  activeMood: LetterMood | null
  onMoodChange: (mood: LetterMood | null) => void
}

export function ArchiveFilters({ activeMood, onMoodChange }: ArchiveFiltersProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onMoodChange(null)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
          !activeMood
            ? 'bg-romantic-brown text-white border-romantic-brown'
            : 'bg-white dark:bg-dark-surface text-romantic-brown-muted dark:text-dark-muted border-romantic-cream-dark dark:border-dark-border hover:border-romantic-blush'
        }`}
      >
        All
      </button>
      {MOODS.map((mood) => (
        <button
          key={mood.value}
          onClick={() => onMoodChange(activeMood === mood.value ? null : (mood.value as LetterMood))}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
            activeMood === mood.value
              ? 'bg-romantic-rose text-white border-romantic-rose'
              : 'bg-white dark:bg-dark-surface text-romantic-brown-muted dark:text-dark-muted border-romantic-cream-dark dark:border-dark-border hover:border-romantic-blush'
          }`}
        >
          {mood.label}
        </button>
      ))}
    </div>
  )
}

import { Calendar, Trophy } from '@ui/icons'
import { Select } from '@ui/components'
import { MOODS } from '@shared/constants'
import type { LetterMood, LetterStatus } from '@shared/types'

interface LetterSettingsPanelProps {
  publishAt: string
  status: LetterStatus
  mood: LetterMood | null
  isMilestone: boolean
  onPublishAtChange: (val: string) => void
  onStatusChange: (val: LetterStatus) => void
  onMoodChange: (val: LetterMood | null) => void
  onMilestoneChange: (val: boolean) => void
}

export function LetterSettingsPanel({
  publishAt,
  status,
  mood,
  isMilestone,
  onPublishAtChange,
  onStatusChange,
  onMoodChange,
  onMilestoneChange,
}: LetterSettingsPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium text-romantic-brown dark:text-dark-text mb-1.5">
          <Calendar size={14} />
          Publish at
        </label>
        <input
          type="datetime-local"
          value={publishAt}
          onChange={(e) => onPublishAtChange(e.target.value)}
          className="w-full rounded-2xl border border-romantic-cream-dark dark:border-dark-border bg-white dark:bg-dark-surface px-4 py-2.5 text-sm text-romantic-brown dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all"
        />
        <p className="text-xs text-romantic-brown-muted dark:text-dark-muted mt-1">
          Letter becomes visible after this date/time
        </p>
      </div>

      <Select
        label="Status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value as LetterStatus)}
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' },
        ]}
      />

      <Select
        label="Mood / Theme"
        value={mood ?? ''}
        onChange={(e) => onMoodChange((e.target.value as LetterMood) || null)}
        placeholder="— No mood —"
        options={MOODS.map((m) => ({ value: m.value, label: m.label }))}
      />

      <div>
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={isMilestone}
              onChange={(e) => onMilestoneChange(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full transition-colors ${isMilestone ? 'bg-brand-yellow' : 'bg-romantic-cream-dark dark:bg-dark-border'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isMilestone ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-romantic-brown dark:text-dark-text">
            <Trophy size={14} className={isMilestone ? 'text-brand-yellow' : 'text-romantic-brown-muted'} />
            Milestone letter
          </div>
        </label>
        {isMilestone && (
          <p className="text-xs text-romantic-brown-muted dark:text-dark-muted mt-1.5 ml-12">
            Shown with a special display
          </p>
        )}
      </div>
    </div>
  )
}

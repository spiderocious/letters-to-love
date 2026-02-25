import { useState } from 'react'
import { BookmarkPlus, BookmarkCheck, AlertCircle } from '@ui/icons'
import { useLetterBookmark, useToggleBookmark } from '../../api/use-bookmark'

interface BookmarkButtonProps {
  letterId: string
}

export function BookmarkButton({ letterId }: BookmarkButtonProps) {
  const [note, setNote] = useState('')
  const [showNote, setShowNote] = useState(false)
  const { data: bookmark } = useLetterBookmark(letterId)
  const toggleBookmark = useToggleBookmark()

  const isBookmarked = !!bookmark

  async function handleToggle() {
    if (isBookmarked) {
      toggleBookmark.mutate({ letterId, note: '', existing: bookmark })
    } else {
      setShowNote(true)
    }
  }

  async function handleSaveBookmark() {
    toggleBookmark.mutate({ letterId, note, existing: null })
    setShowNote(false)
    setNote('')
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleToggle}
        disabled={toggleBookmark.isPending}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          isBookmarked
            ? 'bg-brand-yellow/20 text-brand-yellow-dark border border-brand-yellow/30'
            : 'bg-romantic-cream-dark dark:bg-dark-border text-romantic-brown dark:text-dark-text hover:bg-romantic-blush/30'
        } disabled:opacity-50`}
      >
        {isBookmarked ? (
          <><BookmarkCheck size={16} /> Saved</>
        ) : (
          <><BookmarkPlus size={16} /> Save letter</>
        )}
      </button>

      {showNote && (
        <div className="flex flex-col gap-2 bg-white dark:bg-dark-surface border border-romantic-cream-dark dark:border-dark-border rounded-2xl p-3">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a personal note (optional)…"
            rows={2}
            className="text-sm text-romantic-brown dark:text-dark-text bg-transparent outline-none resize-none placeholder:text-romantic-brown-muted/60"
          />
          {toggleBookmark.error && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle size={12} /> {toggleBookmark.error.message}
            </p>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleSaveBookmark}
              disabled={toggleBookmark.isPending}
              className="px-3 py-1.5 text-xs font-medium bg-brand-yellow text-romantic-brown rounded-xl hover:bg-brand-yellow-dark transition-colors disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => setShowNote(false)}
              className="px-3 py-1.5 text-xs text-romantic-brown-muted rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

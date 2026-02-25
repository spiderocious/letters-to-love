import { Link } from 'react-router-dom'
import { Trophy, Heart, Trash2 } from '@ui/icons'
import { Badge } from '@ui/components'
import { formatShortDate } from '@shared/helpers'
import { letterPath } from '@shared/constants'
import { useToggleBookmark } from '@features/reader/letter-detail/api/use-bookmark'
import type { BookmarkWithLetter } from '@features/reader/bookmarks/api/use-bookmarks'

interface BookmarkCardProps {
  bookmark: BookmarkWithLetter
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const toggleBookmark = useToggleBookmark()

  return (
    <div className="group bg-white dark:bg-dark-surface rounded-2xl border border-romantic-cream-dark dark:border-dark-border p-5 shadow-card hover:shadow-card-hover transition-all">
      <div className="flex items-start justify-between gap-3">
        <Link to={letterPath(bookmark.letter.id)} className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            {bookmark.letter.is_milestone && <Trophy size={14} className="text-brand-yellow shrink-0" />}
            {bookmark.letter.mood && (
              <Badge variant="pink" className="text-xs">{bookmark.letter.mood}</Badge>
            )}
          </div>
          <h3 className="font-semibold text-romantic-brown dark:text-dark-text leading-snug mb-1 group-hover:text-romantic-rose transition-colors">
            {bookmark.letter.title}
          </h3>
          <p className="text-xs text-romantic-brown-muted dark:text-dark-muted">
            {formatShortDate(bookmark.letter.publish_at)}
          </p>
          {bookmark.note && (
            <p className="text-xs text-romantic-brown-muted/80 dark:text-dark-muted italic mt-2 bg-romantic-cream-dark/50 dark:bg-dark-border/50 rounded-xl px-3 py-2">
              "{bookmark.note}"
            </p>
          )}
        </Link>
        <div className="flex flex-col items-center gap-2 shrink-0">
          <Heart size={16} className="text-romantic-rose/30 group-hover:text-romantic-rose group-hover:fill-romantic-rose/20 transition-all" />
          <button
            onClick={() => toggleBookmark.mutate({ letterId: bookmark.letter_id, note: '', existing: bookmark })}
            disabled={toggleBookmark.isPending}
            className="p-1.5 text-romantic-brown-muted hover:text-red-600 hover:bg-red-50 dark:text-dark-muted dark:hover:text-red-400 rounded-xl transition-colors"
            title="Remove bookmark"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

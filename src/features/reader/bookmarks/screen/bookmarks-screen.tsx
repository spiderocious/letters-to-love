import { BookmarkCheck } from '@ui/icons'
import { PageSpinner, EmptyState } from '@ui/components'
import { useBookmarks } from '../api/use-bookmarks'
import { BookmarkCard } from './parts/bookmark-card'

export function BookmarksScreen() {
  const { data: bookmarks, isLoading, error } = useBookmarks()

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <BookmarkCheck size={20} className="text-romantic-rose" />
          <h1 className="text-2xl font-bold text-romantic-brown dark:text-dark-text">Saved Letters</h1>
        </div>
        {bookmarks && (
          <p className="text-sm text-romantic-brown-muted dark:text-dark-muted">
            {bookmarks.length} saved letter{bookmarks.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {isLoading && <PageSpinner />}
      {error && <p className="text-sm text-red-600">{error.message}</p>}

      {!isLoading && (bookmarks ?? []).length === 0 && (
        <EmptyState
          icon={<BookmarkCheck size={40} />}
          title="No saved letters yet"
          description="Tap the bookmark icon on any letter to save it here."
        />
      )}

      <div className="flex flex-col gap-4">
        {(bookmarks ?? []).map((b) => (
          <BookmarkCard key={b.id} bookmark={b} />
        ))}
      </div>
    </div>
  )
}

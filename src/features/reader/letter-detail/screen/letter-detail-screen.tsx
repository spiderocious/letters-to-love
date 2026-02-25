import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from '@ui/icons'
import { PageSpinner } from '@ui/components'

import { useLetter, useRandomLetterId, useTrackView } from '../api/use-letter'
import { LetterCover } from './parts/letter-cover'
import { RichContentRenderer } from './parts/rich-content-renderer'
import { ReactionsBar } from './parts/reactions-bar'
import { CommentsSection } from './parts/comments-section'
import { BookmarkButton } from './parts/bookmark-button'

export function LetterDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isRandom = id === 'random'

  const randomQuery = useRandomLetterId()
  const resolvedId = isRandom ? (randomQuery.data ?? undefined) : id

  const { data: letter, isLoading, error } = useLetter(resolvedId)
  const trackView = useTrackView()

  useEffect(() => {
    if (letter) trackView.mutate(letter.id)
  }, [letter?.id])

  if (isRandom && randomQuery.isLoading) return <PageSpinner />
  if (isRandom && !randomQuery.data) {
    return (
      <div className="py-20 text-center text-romantic-brown-muted dark:text-dark-muted">
        <p>No letters yet. Come back soon!</p>
      </div>
    )
  }

  if (isLoading) return <PageSpinner />

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-red-600">{error.message}</p>
      </div>
    )
  }

  if (!letter) return null

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-romantic-brown-muted hover:text-romantic-brown dark:text-dark-muted dark:hover:text-dark-text transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <LetterCover letter={letter} />

      {/* Letter content */}
      <div className="bg-white dark:bg-dark-surface rounded-3xl shadow-card border border-romantic-cream-dark dark:border-dark-border p-8 mb-6">
        <RichContentRenderer blocks={letter.content} />
      </div>

      {/* Actions row */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <ReactionsBar letterId={letter.id} />
          <BookmarkButton letterId={letter.id} />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-romantic-cream-dark dark:bg-dark-border mb-8" />

      {/* Comments */}
      <CommentsSection letterId={letter.id} />
    </div>
  )
}

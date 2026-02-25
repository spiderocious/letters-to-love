import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Trash2, Eye, Star, Trophy } from '@ui/icons'
import { Badge, Button, Modal } from '@ui/components'
import { formatShortDate } from '@shared/helpers'
import { letterEditPath } from '@shared/constants'
import type { LetterSummary } from '@shared/types'
import { useDeleteLetter } from '../../api/use-admin-letters'

interface LettersTableProps {
  letters: LetterSummary[]
}

export function LettersTable({ letters }: LettersTableProps) {
  const navigate = useNavigate()
  const deleteLetter = useDeleteLetter()
  const [deleteTarget, setDeleteTarget] = useState<LetterSummary | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleteError(null)
    try {
      await deleteLetter.mutateAsync(deleteTarget.id)
      setDeleteTarget(null)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  if (letters.length === 0) {
    return (
      <div className="text-center py-12 text-romantic-brown-muted dark:text-dark-muted text-sm">
        No letters yet. Write your first one!
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-romantic-cream-dark dark:border-dark-border">
              <th className="pb-3 pr-4 text-romantic-brown-muted dark:text-dark-muted font-medium">Title</th>
              <th className="pb-3 pr-4 text-romantic-brown-muted dark:text-dark-muted font-medium">Mood</th>
              <th className="pb-3 pr-4 text-romantic-brown-muted dark:text-dark-muted font-medium">Publishes</th>
              <th className="pb-3 pr-4 text-romantic-brown-muted dark:text-dark-muted font-medium">Status</th>
              <th className="pb-3 pr-4 text-romantic-brown-muted dark:text-dark-muted font-medium">Views</th>
              <th className="pb-3 text-romantic-brown-muted dark:text-dark-muted font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {letters.map((letter) => (
              <tr
                key={letter.id}
                className="border-b border-romantic-cream-dark/50 dark:border-dark-border/50 hover:bg-romantic-cream/50 dark:hover:bg-dark-border/30 transition-colors"
              >
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    {letter.is_milestone && <Trophy size={14} className="text-brand-yellow shrink-0" />}
                    <span className="font-medium text-romantic-brown dark:text-dark-text line-clamp-1 max-w-48">
                      {letter.title}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  {letter.mood ? (
                    <Badge variant="pink">{letter.mood}</Badge>
                  ) : (
                    <span className="text-romantic-brown-muted dark:text-dark-muted">—</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-romantic-brown-muted dark:text-dark-muted">
                  {formatShortDate(letter.publish_at)}
                </td>
                <td className="py-3 pr-4">
                  <Badge variant={letter.status === 'published' ? 'green' : 'gray'}>
                    {letter.status}
                  </Badge>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-1 text-romantic-brown-muted dark:text-dark-muted">
                    <Eye size={13} />
                    <span>{letter.view_count}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => navigate(letterEditPath(letter.id))}
                      className="p-1.5 rounded-xl text-romantic-brown-muted hover:text-romantic-brown hover:bg-romantic-cream-dark dark:text-dark-muted dark:hover:text-dark-text dark:hover:bg-dark-border transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(letter)}
                      className="p-1.5 rounded-xl text-romantic-brown-muted hover:text-red-600 hover:bg-red-50 dark:text-dark-muted dark:hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={!!deleteTarget}
        onClose={() => { setDeleteTarget(null); setDeleteError(null) }}
        title="Delete letter?"
        size="sm"
      >
        <p className="text-sm text-romantic-brown-muted dark:text-dark-muted mb-4">
          "{deleteTarget?.title}" will be permanently deleted. This cannot be undone.
        </p>
        {deleteError && (
          <p className="text-xs text-red-600 mb-3">{deleteError}</p>
        )}
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" size="sm" onClick={() => { setDeleteTarget(null); setDeleteError(null) }}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" loading={deleteLetter.isPending} onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  )
}

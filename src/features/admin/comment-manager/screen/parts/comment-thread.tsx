import { useState, FormEvent } from 'react'
import { Trash2, Send, AlertCircle, MessageCircle } from '@ui/icons'
import { formatDate } from '@shared/helpers'
import type { CommentWithLetter } from '../../api/use-admin-comments'
import { useReplyToComment, useDeleteComment } from '../../api/use-admin-comments'

interface CommentThreadProps {
  comment: CommentWithLetter
}

export function CommentThread({ comment }: CommentThreadProps) {
  const [replyText, setReplyText] = useState('')
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyError, setReplyError] = useState<string | null>(null)
  const replyMutation = useReplyToComment()
  const deleteMutation = useDeleteComment()

  async function handleReply(e: FormEvent) {
    e.preventDefault()
    if (!replyText.trim()) return
    setReplyError(null)

    try {
      await replyMutation.mutateAsync({
        letterId: comment.letter_id,
        parentId: comment.id,
        content: replyText.trim(),
      })
      setReplyText('')
      setReplyOpen(false)
    } catch (err) {
      setReplyError(err instanceof Error ? err.message : 'Failed to reply')
    }
  }

  async function handleDelete() {
    await deleteMutation.mutateAsync(comment.id)
  }

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-romantic-cream-dark dark:border-dark-border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-romantic-rose bg-romantic-blush/30 px-2 py-0.5 rounded-full">
              Her
            </span>
            <span className="text-xs text-romantic-brown-muted dark:text-dark-muted">
              on "{comment.letter_title}"
            </span>
          </div>
          <p className="text-sm text-romantic-brown dark:text-dark-text leading-relaxed">{comment.content}</p>
          <p className="text-xs text-romantic-brown-muted dark:text-dark-muted mt-1.5">{formatDate(comment.created_at)}</p>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="p-1.5 text-romantic-brown-muted hover:text-red-600 hover:bg-red-50 dark:text-dark-muted dark:hover:text-red-400 rounded-xl transition-colors shrink-0"
          title="Delete comment"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Existing replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 ml-4 pl-3 border-l-2 border-brand-yellow/40 flex flex-col gap-2">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="text-sm">
              <span className="text-xs font-medium text-brand-yellow-dark bg-brand-yellow/20 px-2 py-0.5 rounded-full mr-2">You</span>
              <span className="text-romantic-brown dark:text-dark-text">{reply.content}</span>
            </div>
          ))}
        </div>
      )}

      {/* Reply section */}
      {!replyOpen ? (
        <button
          onClick={() => setReplyOpen(true)}
          className="mt-3 flex items-center gap-1.5 text-xs text-romantic-brown-muted hover:text-romantic-brown dark:text-dark-muted dark:hover:text-dark-text transition-colors"
        >
          <MessageCircle size={13} /> Reply
        </button>
      ) : (
        <form onSubmit={handleReply} className="mt-3 flex flex-col gap-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply…"
            rows={2}
            className="w-full text-sm rounded-xl border border-romantic-cream-dark dark:border-dark-border bg-romantic-cream/50 dark:bg-dark-border/50 px-3 py-2 text-romantic-brown dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 resize-none"
          />
          {replyError && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle size={12} /> {replyError}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={replyMutation.isPending || !replyText.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-brand-yellow text-romantic-brown rounded-xl hover:bg-brand-yellow-dark transition-colors disabled:opacity-50"
            >
              <Send size={12} /> Send
            </button>
            <button
              type="button"
              onClick={() => { setReplyOpen(false); setReplyError(null) }}
              className="px-3 py-1.5 text-xs text-romantic-brown-muted hover:text-romantic-brown rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

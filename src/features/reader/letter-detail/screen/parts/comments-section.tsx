import { FormEvent, useState } from 'react'
import { Send, MessageCircle, AlertCircle } from '@ui/icons'
import { formatDate } from '@shared/helpers'
import { useComments, useAddComment } from '../../api/use-comments'
import type { Comment } from '@shared/types'

function CommentItem({ comment, replies }: { comment: Comment; replies: Comment[] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-romantic-cream-dark/60 dark:bg-dark-border/40 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-romantic-rose bg-romantic-blush/30 px-2 py-0.5 rounded-full">
            You
          </span>
          <span className="text-xs text-romantic-brown-muted dark:text-dark-muted">
            {formatDate(comment.created_at)}
          </span>
        </div>
        <p className="text-sm text-romantic-brown dark:text-dark-text leading-relaxed">{comment.content}</p>
      </div>

      {replies.length > 0 && (
        <div className="ml-6 flex flex-col gap-2">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-brand-yellow/10 dark:bg-brand-yellow/5 border border-brand-yellow/20 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-brand-yellow-dark bg-brand-yellow/20 px-2 py-0.5 rounded-full">
                  His reply
                </span>
                <span className="text-xs text-romantic-brown-muted dark:text-dark-muted">
                  {formatDate(reply.created_at)}
                </span>
              </div>
              <p className="text-sm text-romantic-brown dark:text-dark-text leading-relaxed">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface CommentsSectionProps {
  letterId: string
}

export function CommentsSection({ letterId }: CommentsSectionProps) {
  const [text, setText] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { data: comments } = useComments(letterId)
  const addComment = useAddComment()

  const rootComments = (comments ?? []).filter((c) => !c.parent_id)
  const replies = (comments ?? []).filter((c) => !!c.parent_id)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setSubmitError(null)

    try {
      await addComment.mutateAsync({ letterId, content: text.trim() })
      setText('')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to post comment')
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="flex items-center gap-2 text-base font-semibold text-romantic-brown dark:text-dark-text">
        <MessageCircle size={18} className="text-romantic-rose" />
        Comments
      </h2>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a comment…"
          rows={3}
          className="w-full rounded-2xl border border-romantic-cream-dark dark:border-dark-border bg-white dark:bg-dark-surface px-4 py-3 text-sm text-romantic-brown dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow resize-none transition-all"
        />
        {submitError && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle size={12} /> {submitError}
          </p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={addComment.isPending || !text.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-brand-yellow text-romantic-brown hover:bg-brand-yellow-dark transition-colors disabled:opacity-50 shadow-sm"
          >
            <Send size={14} /> Post
          </button>
        </div>
      </form>

      {/* Comments list */}
      {rootComments.length > 0 && (
        <div className="flex flex-col gap-4">
          {rootComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={replies.filter((r) => r.parent_id === comment.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

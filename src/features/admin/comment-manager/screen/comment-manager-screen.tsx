import { MessageCircle } from '@ui/icons'
import { PageSpinner, EmptyState } from '@ui/components'
import { useAdminComments } from '../api/use-admin-comments'
import { CommentThread } from './parts/comment-thread'

export function CommentManagerScreen() {
  const commentsQuery = useAdminComments()

  // Filter only root comments (not replies)
  const rootComments = (commentsQuery.data ?? []).filter((c) => !c.parent_id)

  // Attach replies to their parents
  const commentsWithReplies = rootComments.map((c) => ({
    ...c,
    replies: (commentsQuery.data ?? []).filter((r) => r.parent_id === c.id),
  }))

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-romantic-brown dark:text-dark-text">Comments</h1>
        <p className="text-sm text-romantic-brown-muted dark:text-dark-muted mt-1">
          Her comments on your letters
        </p>
      </div>

      {commentsQuery.isLoading && <PageSpinner />}

      {commentsQuery.error && (
        <p className="text-sm text-red-600">{commentsQuery.error.message}</p>
      )}

      {!commentsQuery.isLoading && commentsWithReplies.length === 0 && (
        <EmptyState
          icon={<MessageCircle size={40} />}
          title="No comments yet"
          description="When she comments on your letters, they'll appear here."
        />
      )}

      <div className="flex flex-col gap-4">
        {commentsWithReplies.map((comment) => (
          <CommentThread key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

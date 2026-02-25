export type CommentAuthor = 'reader' | 'admin'

export interface Comment {
  id: string
  letter_id: string
  content: string
  author: CommentAuthor
  parent_id: string | null
  created_at: string
  replies?: Comment[]
}

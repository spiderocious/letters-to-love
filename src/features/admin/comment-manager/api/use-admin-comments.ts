import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabaseAdmin } from '@shared/services'
import type { Comment } from '@shared/types'

export interface CommentWithLetter extends Comment {
  letter_title: string
}

export function useAdminComments() {
  return useQuery({
    queryKey: ['admin-comments'],
    queryFn: async (): Promise<CommentWithLetter[]> => {
      const { data, error } = await supabaseAdmin
        .from('comments')
        .select('*, letters(title)')
        .order('created_at', { ascending: false })

      if (error) throw new Error(error.message)

      return (data ?? []).map((c) => ({
        ...c,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        letter_title: (c as any).letters?.title ?? 'Unknown letter',
      })) as CommentWithLetter[]
    },
  })
}

export function useReplyToComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ letterId, parentId, content }: { letterId: string; parentId: string; content: string }) => {
      const { error } = await supabaseAdmin.from('comments').insert({
        letter_id: letterId,
        content,
        author: 'admin',
        parent_id: parentId,
      })
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] })
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })
}

export function useDeleteComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabaseAdmin.from('comments').delete().eq('id', id)
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] })
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })
}

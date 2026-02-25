import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@shared/services'
import type { Comment } from '@shared/types'

export function useComments(letterId: string) {
  return useQuery({
    queryKey: ['comments', letterId],
    queryFn: async (): Promise<Comment[]> => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('letter_id', letterId)
        .order('created_at', { ascending: true })

      if (error) throw new Error(error.message)
      return data as Comment[]
    },
  })
}

export function useAddComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ letterId, content }: { letterId: string; content: string }) => {
      const { error } = await supabase.from('comments').insert({
        letter_id: letterId,
        content,
        author: 'reader',
        parent_id: null,
      })
      if (error) throw new Error(error.message)
    },
    onSuccess: (_data, { letterId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', letterId] })
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] })
    },
  })
}

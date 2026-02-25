import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabaseAdmin } from '@shared/services'
import type { LetterSummary } from '@shared/types'

export function useAdminLetters() {
  return useQuery({
    queryKey: ['admin-letters'],
    queryFn: async (): Promise<LetterSummary[]> => {
      const { data, error } = await supabaseAdmin
        .from('letters')
        .select('id, title, mood, publish_at, status, is_milestone, view_count, created_at')
        .order('created_at', { ascending: false })

      if (error) throw new Error(error.message)
      return data as LetterSummary[]
    },
  })
}

export function useDeleteLetter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabaseAdmin.from('letters').delete().eq('id', id)
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-letters'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
    },
  })
}

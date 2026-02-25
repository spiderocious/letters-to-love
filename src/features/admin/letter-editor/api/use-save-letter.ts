import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabaseAdmin } from '@shared/services'
import type { Letter, LetterMood, LetterStatus, RichContentBlock } from '@shared/types'

export interface SaveLetterPayload {
  id?: string
  title: string
  content: RichContentBlock[]
  mood: LetterMood | null
  publish_at: string
  status: LetterStatus
  is_milestone: boolean
}

export function useSaveLetter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: SaveLetterPayload): Promise<Letter> => {
      if (payload.id) {
        const { id, ...rest } = payload
        const { data, error } = await supabaseAdmin
          .from('letters')
          .update({ ...rest, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single()
        if (error) throw new Error(error.message)
        return data as Letter
      } else {
        const { id: _id, ...rest } = payload
        const { data, error } = await supabaseAdmin
          .from('letters')
          .insert({ ...rest, view_count: 0 })
          .select()
          .single()
        if (error) throw new Error(error.message)
        return data as Letter
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-letters'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      queryClient.invalidateQueries({ queryKey: ['today-letters'] })
      queryClient.invalidateQueries({ queryKey: ['all-letters'] })
    },
  })
}

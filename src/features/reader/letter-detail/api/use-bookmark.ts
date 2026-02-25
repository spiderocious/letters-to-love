import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@shared/services'
import type { Bookmark } from '@shared/types'

export function useLetterBookmark(letterId: string) {
  return useQuery({
    queryKey: ['bookmark', letterId],
    queryFn: async (): Promise<Bookmark | null> => {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('letter_id', letterId)
        .maybeSingle()

      if (error) throw new Error(error.message)
      return data as Bookmark | null
    },
  })
}

export function useToggleBookmark() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ letterId, note, existing }: { letterId: string; note: string; existing: Bookmark | null }) => {
      if (existing) {
        const { error } = await supabase.from('bookmarks').delete().eq('id', existing.id)
        if (error) throw new Error(error.message)
      } else {
        const { error } = await supabase.from('bookmarks').insert({
          letter_id: letterId,
          note: note || null,
        })
        if (error) throw new Error(error.message)
      }
    },
    onSuccess: (_data, { letterId }) => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', letterId] })
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
    },
  })
}

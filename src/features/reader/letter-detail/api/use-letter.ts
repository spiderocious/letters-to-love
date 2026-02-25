import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '@shared/services'
import type { Letter } from '@shared/types'

export function useLetter(id: string | undefined) {
  return useQuery({
    queryKey: ['letter', id],
    enabled: !!id,
    queryFn: async (): Promise<Letter> => {
      const { data, error } = await supabase
        .from('letters')
        .select('*')
        .eq('id', id)
        .eq('status', 'published')
        .lte('publish_at', new Date().toISOString())
        .single()

      if (error) throw new Error(error.message)
      return data as Letter
    },
  })
}

export function useRandomLetterId() {
  return useQuery({
    queryKey: ['random-letter-id'],
    queryFn: async (): Promise<string | null> => {
      const { data, error } = await supabase
        .from('letters')
        .select('id')
        .eq('status', 'published')
        .lte('publish_at', new Date().toISOString())

      if (error || !data || data.length === 0) return null
      const random = data[Math.floor(Math.random() * data.length)]
      return random.id
    },
    staleTime: 0,
  })
}

export function useTrackView() {
  return useMutation({
    mutationFn: async (id: string) => {
      await supabase.rpc('increment_view_count', { letter_id: id })
    },
  })
}

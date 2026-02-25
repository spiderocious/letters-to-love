import { useQuery } from '@tanstack/react-query'
import { supabase } from '@shared/services'
import type { LetterSummary, LetterMood } from '@shared/types'

export function useAllLetters(mood?: LetterMood | null) {
  return useQuery({
    queryKey: ['all-letters', mood],
    queryFn: async (): Promise<LetterSummary[]> => {
      let query = supabase
        .from('letters')
        .select('id, title, mood, publish_at, status, is_milestone, view_count, created_at')
        .eq('status', 'published')
        .lte('publish_at', new Date().toISOString())
        .order('publish_at', { ascending: false })

      if (mood) {
        query = query.eq('mood', mood)
      }

      const { data, error } = await query
      if (error) throw new Error(error.message)
      return data as LetterSummary[]
    },
  })
}

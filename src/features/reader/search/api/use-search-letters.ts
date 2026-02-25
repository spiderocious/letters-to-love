import { useQuery } from '@tanstack/react-query'
import { supabase } from '@shared/services'
import type { LetterSummary } from '@shared/types'

export function useSearchLetters(query: string) {
  return useQuery({
    queryKey: ['search-letters', query],
    enabled: query.trim().length > 1,
    queryFn: async (): Promise<LetterSummary[]> => {
      const { data, error } = await supabase
        .from('letters')
        .select('id, title, mood, publish_at, status, is_milestone, view_count, created_at')
        .eq('status', 'published')
        .lte('publish_at', new Date().toISOString())
        .ilike('title', `%${query}%`)
        .order('publish_at', { ascending: false })

      if (error) throw new Error(error.message)
      return data as LetterSummary[]
    },
  })
}

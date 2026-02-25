import { useQuery } from '@tanstack/react-query'
import { supabase } from '@shared/services'
import type { LetterSummary } from '@shared/types'

export function useTodayLetters() {
  return useQuery({
    queryKey: ['today-letters'],
    queryFn: async (): Promise<LetterSummary[]> => {
      const now = new Date()
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
      const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString()

      const { data, error } = await supabase
        .from('letters')
        .select('id, title, mood, publish_at, status, is_milestone, view_count, created_at')
        .eq('status', 'published')
        .gte('publish_at', todayStart)
        .lt('publish_at', todayEnd)
        .lte('publish_at', now.toISOString())
        .order('publish_at', { ascending: false })

      if (error) throw new Error(error.message)
      return data as LetterSummary[]
    },
    refetchInterval: 60_000, // refetch every minute
  })
}

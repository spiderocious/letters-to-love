import { useQuery } from '@tanstack/react-query'
import { supabase } from '@shared/services'
import type { Bookmark } from '@shared/types'
import type { LetterSummary } from '@shared/types'

export interface BookmarkWithLetter extends Bookmark {
  letter: LetterSummary
}

export function useBookmarks() {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: async (): Promise<BookmarkWithLetter[]> => {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*, letters(id, title, mood, publish_at, status, is_milestone, view_count, created_at)')
        .order('created_at', { ascending: false })

      if (error) throw new Error(error.message)

      return (data ?? []).map((b) => ({
        ...b,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        letter: (b as any).letters as LetterSummary,
      })) as BookmarkWithLetter[]
    },
  })
}

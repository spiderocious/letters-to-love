import { useQuery } from '@tanstack/react-query'
import { supabaseAdmin } from '@shared/services'

export interface DashboardStats {
  totalLetters: number
  publishedLetters: number
  draftLetters: number
  totalComments: number
  totalBookmarks: number
  totalReactions: number
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const [letters, comments, bookmarks, reactions] = await Promise.all([
        supabaseAdmin.from('letters').select('status'),
        supabaseAdmin.from('comments').select('id', { count: 'exact', head: true }),
        supabaseAdmin.from('bookmarks').select('id', { count: 'exact', head: true }),
        supabaseAdmin.from('reactions').select('id', { count: 'exact', head: true }),
      ])

      const allLetters = letters.data ?? []
      return {
        totalLetters: allLetters.length,
        publishedLetters: allLetters.filter((l) => l.status === 'published').length,
        draftLetters: allLetters.filter((l) => l.status === 'draft').length,
        totalComments: comments.count ?? 0,
        totalBookmarks: bookmarks.count ?? 0,
        totalReactions: reactions.count ?? 0,
      }
    },
  })
}

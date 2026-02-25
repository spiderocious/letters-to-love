import { useQuery } from '@tanstack/react-query'
import { supabaseAdmin } from '@shared/services'
import type { Letter } from '@shared/types'

export function useLetterById(id: string | undefined) {
  return useQuery({
    queryKey: ['letter-admin', id],
    enabled: !!id,
    queryFn: async (): Promise<Letter> => {
      const { data, error } = await supabaseAdmin
        .from('letters')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw new Error(error.message)
      return data as Letter
    },
  })
}

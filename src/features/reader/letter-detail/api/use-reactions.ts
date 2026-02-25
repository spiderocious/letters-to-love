import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@shared/services'
import type { ReactionCount, ReactionEmoji } from '@shared/types'

export function useReactions(letterId: string) {
  return useQuery({
    queryKey: ['reactions', letterId],
    queryFn: async (): Promise<ReactionCount[]> => {
      const { data, error } = await supabase
        .from('reactions')
        .select('emoji_type')
        .eq('letter_id', letterId)

      if (error) throw new Error(error.message)

      const counts: Record<string, number> = {}
      for (const r of data ?? []) {
        counts[r.emoji_type] = (counts[r.emoji_type] ?? 0) + 1
      }

      return Object.entries(counts).map(([emoji_type, count]) => ({
        emoji_type: emoji_type as ReactionEmoji,
        count,
      }))
    },
  })
}

export function useAddReaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ letterId, emojiType }: { letterId: string; emojiType: ReactionEmoji }) => {
      const { error } = await supabase.from('reactions').insert({
        letter_id: letterId,
        emoji_type: emojiType,
      })
      if (error) throw new Error(error.message)
    },
    onSuccess: (_data, { letterId }) => {
      queryClient.invalidateQueries({ queryKey: ['reactions', letterId] })
    },
  })
}

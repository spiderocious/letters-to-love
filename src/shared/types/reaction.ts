export type ReactionEmoji = 'heart' | 'teary' | 'laughing' | 'star' | 'blush'

export interface Reaction {
  id: string
  letter_id: string
  emoji_type: ReactionEmoji
  created_at: string
}

export interface ReactionCount {
  emoji_type: ReactionEmoji
  count: number
}

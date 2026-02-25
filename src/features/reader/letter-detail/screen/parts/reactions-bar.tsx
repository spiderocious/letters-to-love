import { useReactions, useAddReaction } from '../../api/use-reactions'
import type { ReactionEmoji } from '@shared/types'

const EMOJI_MAP: Record<ReactionEmoji, string> = {
  heart: '❤️',
  teary: '🥹',
  laughing: '😂',
  star: '⭐',
  blush: '🥰',
}

interface ReactionsBarProps {
  letterId: string
}

export function ReactionsBar({ letterId }: ReactionsBarProps) {
  const { data: reactions } = useReactions(letterId)
  const addReaction = useAddReaction()

  function handleReact(emojiType: ReactionEmoji) {
    addReaction.mutate({ letterId, emojiType })
  }

  const countMap = Object.fromEntries((reactions ?? []).map((r) => [r.emoji_type, r.count]))

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {(Object.keys(EMOJI_MAP) as ReactionEmoji[]).map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleReact(emoji)}
          disabled={addReaction.isPending}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-romantic-cream-dark dark:bg-dark-border hover:bg-romantic-blush/30 dark:hover:bg-dark-border/80 transition-colors disabled:opacity-50 border border-transparent hover:border-romantic-blush/30"
          title={emoji}
        >
          <span className="text-base">{EMOJI_MAP[emoji]}</span>
          {countMap[emoji] ? (
            <span className="text-xs font-medium text-romantic-brown dark:text-dark-text">
              {countMap[emoji]}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  )
}

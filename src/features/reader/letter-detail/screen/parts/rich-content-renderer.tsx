import type { RichContentBlock } from '@shared/types'
import { Music, Video } from '@ui/icons'

interface RichContentRendererProps {
  blocks: RichContentBlock[]
}

function TextBlock({ block }: { block: RichContentBlock }) {
  return (
    <p className="text-base leading-8 text-romantic-brown dark:text-dark-text whitespace-pre-wrap">
      {block.content}
    </p>
  )
}

function QuoteBlock({ block }: { block: RichContentBlock }) {
  return (
    <blockquote className="flex gap-4 my-2">
      <div className="w-1 bg-brand-yellow rounded-full shrink-0" />
      <p className="text-lg italic text-romantic-brown-light dark:text-dark-muted leading-relaxed">
        {block.content}
      </p>
    </blockquote>
  )
}

function ImageBlock({ block }: { block: RichContentBlock }) {
  if (!block.url) return null
  return (
    <figure className="my-2 rounded-2xl overflow-hidden">
      <img
        src={block.url}
        alt={block.caption ?? ''}
        className="w-full max-h-96 object-cover"
      />
      {block.caption && (
        <figcaption className="text-xs text-romantic-brown-muted dark:text-dark-muted text-center py-2 italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
}

function VideoBlock({ block }: { block: RichContentBlock }) {
  if (!block.url) return null
  return (
    <figure className="my-2 rounded-2xl overflow-hidden border border-romantic-cream-dark dark:border-dark-border">
      <video src={block.url} controls className="w-full max-h-80" />
      {block.caption && (
        <figcaption className="text-xs text-romantic-brown-muted dark:text-dark-muted text-center py-2 italic px-3">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
}

function AudioBlock({ block }: { block: RichContentBlock }) {
  if (!block.url) return null
  return (
    <div className="flex items-center gap-3 p-4 bg-romantic-blush/10 dark:bg-dark-border/30 rounded-2xl border border-romantic-blush/20 dark:border-dark-border my-2">
      <Music size={20} className="text-romantic-rose shrink-0" />
      <audio src={block.url} controls className="flex-1 h-8" />
    </div>
  )
}

export function RichContentRenderer({ blocks }: RichContentRendererProps) {
  if (blocks.length === 0) {
    return (
      <p className="text-romantic-brown-muted dark:text-dark-muted italic">
        This letter has no content yet.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block) => {
        switch (block.type) {
          case 'text': return <TextBlock key={block.id} block={block} />
          case 'quote': return <QuoteBlock key={block.id} block={block} />
          case 'image': return <ImageBlock key={block.id} block={block} />
          case 'video': return <VideoBlock key={block.id} block={block} />
          case 'audio': return <AudioBlock key={block.id} block={block} />
          default: return null
        }
      })}
    </div>
  )
}

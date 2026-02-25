import { motion } from 'framer-motion'
import type { RichContentBlock } from '@shared/types'
import { Music } from '@ui/icons'

interface RichContentRendererProps {
  blocks: RichContentBlock[]
}

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

function TextBlock({ block, isFirst }: { block: RichContentBlock; isFirst: boolean }) {
  return (
    <p className={`text-lg leading-9 text-romantic-brown dark:text-dark-text whitespace-pre-wrap ${isFirst ? 'drop-cap' : ''}`}>
      {block.content}
    </p>
  )
}

function QuoteBlock({ block }: { block: RichContentBlock }) {
  return (
    <blockquote className="flex gap-4 my-2">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="w-1 bg-brand-yellow rounded-full shrink-0"
        style={{ transformOrigin: 'top' }}
      />
      <p className="font-display text-xl italic text-romantic-brown-light dark:text-dark-muted leading-relaxed">
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

  let textBlockIndex = 0

  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block) => {
        const isFirstText = block.type === 'text' && textBlockIndex === 0
        if (block.type === 'text') textBlockIndex++

        return (
          <motion.div
            key={block.id}
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {block.type === 'text' && <TextBlock block={block} isFirst={isFirstText} />}
            {block.type === 'quote' && <QuoteBlock block={block} />}
            {block.type === 'image' && <ImageBlock block={block} />}
            {block.type === 'video' && <VideoBlock block={block} />}
            {block.type === 'audio' && <AudioBlock block={block} />}
          </motion.div>
        )
      })}
    </div>
  )
}

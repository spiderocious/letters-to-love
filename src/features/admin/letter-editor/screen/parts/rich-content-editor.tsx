import { Trash2, Quote, GripVertical, Music } from '@ui/icons'
import type { RichContentBlock } from '@shared/types'
import { MediaUploader } from './media-uploader'
import { buildContentBlock } from '../../helpers/build-content-block'

interface RichContentEditorProps {
  blocks: RichContentBlock[]
  onChange: (blocks: RichContentBlock[]) => void
}

function BlockEditor({
  block,
  onUpdate,
  onRemove,
}: {
  block: RichContentBlock
  onUpdate: (updated: RichContentBlock) => void
  onRemove: () => void
}) {
  if (block.type === 'image') {
    return (
      <div className="relative group border border-romantic-cream-dark dark:border-dark-border rounded-2xl overflow-hidden">
        {block.url && (
          <img src={block.url} alt={block.caption ?? ''} className="w-full max-h-80 object-cover" />
        )}
        <div className="p-3 bg-romantic-cream-dark/50 dark:bg-dark-border/50">
          <input
            type="text"
            placeholder="Caption (optional)"
            value={block.caption ?? ''}
            onChange={(e) => onUpdate({ ...block, caption: e.target.value })}
            className="w-full text-xs bg-transparent outline-none text-romantic-brown-muted dark:text-dark-muted placeholder:text-romantic-brown-muted/60"
          />
        </div>
        <button onClick={onRemove} className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-dark-surface/90 rounded-xl text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
          <Trash2 size={13} />
        </button>
      </div>
    )
  }

  if (block.type === 'video') {
    return (
      <div className="relative group border border-romantic-cream-dark dark:border-dark-border rounded-2xl overflow-hidden">
        {block.url && (
          <video src={block.url} controls className="w-full max-h-72" />
        )}
        <div className="p-3 bg-romantic-cream-dark/50 dark:bg-dark-border/50">
          <input
            type="text"
            placeholder="Caption (optional)"
            value={block.caption ?? ''}
            onChange={(e) => onUpdate({ ...block, caption: e.target.value })}
            className="w-full text-xs bg-transparent outline-none text-romantic-brown-muted dark:text-dark-muted"
          />
        </div>
        <button onClick={onRemove} className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-dark-surface/90 rounded-xl text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <Trash2 size={13} />
        </button>
      </div>
    )
  }

  if (block.type === 'audio') {
    return (
      <div className="relative group flex items-center gap-3 p-4 border border-romantic-cream-dark dark:border-dark-border rounded-2xl bg-romantic-blush/10 dark:bg-dark-border/30">
        <Music size={18} className="text-romantic-rose shrink-0" />
        {block.url && <audio src={block.url} controls className="flex-1 h-8" />}
        <button onClick={onRemove} className="p-1.5 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
          <Trash2 size={13} />
        </button>
      </div>
    )
  }

  if (block.type === 'quote') {
    return (
      <div className="relative group flex gap-3">
        <div className="w-1 bg-brand-yellow rounded-full shrink-0" />
        <div className="flex-1">
          <textarea
            value={block.content}
            onChange={(e) => onUpdate({ ...block, content: e.target.value })}
            placeholder="A quote or verse…"
            rows={2}
            className="w-full text-base italic text-romantic-brown dark:text-dark-text bg-transparent outline-none resize-none placeholder:text-romantic-brown-muted/60 leading-relaxed"
          />
        </div>
        <button onClick={onRemove} className="p-1.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <Trash2 size={13} />
        </button>
      </div>
    )
  }

  // text block
  return (
    <div className="relative group flex gap-2 items-start">
      <GripVertical size={16} className="text-romantic-brown-muted/40 mt-2.5 shrink-0 cursor-grab" />
      <textarea
        value={block.content}
        onChange={(e) => onUpdate({ ...block, content: e.target.value })}
        placeholder="Write something beautiful…"
        rows={3}
        className="flex-1 text-base text-romantic-brown dark:text-dark-text bg-transparent outline-none resize-none placeholder:text-romantic-brown-muted/50 leading-relaxed"
      />
      <button onClick={onRemove} className="p-1.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">
        <Trash2 size={13} />
      </button>
    </div>
  )
}

export function RichContentEditor({ blocks, onChange }: RichContentEditorProps) {
  function updateBlock(id: string, updated: RichContentBlock) {
    onChange(blocks.map((b) => (b.id === id ? updated : b)))
  }

  function removeBlock(id: string) {
    onChange(blocks.filter((b) => b.id !== id))
  }

  function addTextBlock() {
    onChange([...blocks, buildContentBlock('text')])
  }

  function addQuoteBlock() {
    onChange([...blocks, buildContentBlock('quote')])
  }

  function handleMediaUploaded(block: RichContentBlock) {
    onChange([...blocks, block])
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap pb-3 border-b border-romantic-cream-dark dark:border-dark-border">
        <button
          type="button"
          onClick={addTextBlock}
          className="px-3 py-1.5 rounded-xl text-xs font-medium bg-romantic-cream-dark hover:bg-romantic-blush/30 text-romantic-brown transition-colors"
        >
          + Text
        </button>
        <button
          type="button"
          onClick={addQuoteBlock}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-romantic-cream-dark hover:bg-romantic-blush/30 text-romantic-brown transition-colors"
        >
          <Quote size={12} /> Quote
        </button>
        <MediaUploader onUploaded={handleMediaUploaded} />
      </div>

      {/* Blocks */}
      <div className="flex flex-col gap-4 min-h-32">
        {blocks.length === 0 && (
          <p className="text-sm text-romantic-brown-muted/60 dark:text-dark-muted/60 italic py-4 text-center">
            Start writing… click "+ Text" to add your first block
          </p>
        )}
        {blocks.map((block) => (
          <BlockEditor
            key={block.id}
            block={block}
            onUpdate={(updated) => updateBlock(block.id, updated)}
            onRemove={() => removeBlock(block.id)}
          />
        ))}
      </div>
    </div>
  )
}

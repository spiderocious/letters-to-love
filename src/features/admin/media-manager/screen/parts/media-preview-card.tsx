import { Trash2, Copy, Check, Music, Video, File } from '@ui/icons'
import { useState } from 'react'
import type { MediaFile } from '../../api/use-media-files'
import { useDeleteMedia } from '../../api/use-media-files'

interface MediaPreviewCardProps {
  file: MediaFile
}

export function MediaPreviewCard({ file }: MediaPreviewCardProps) {
  const deleteMedia = useDeleteMedia()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCopy() {
    await navigator.clipboard.writeText(file.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDelete() {
    setError(null)
    try {
      await deleteMedia.mutateAsync(file.name)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`
  }

  return (
    <div className="group bg-white dark:bg-dark-surface rounded-2xl border border-romantic-cream-dark dark:border-dark-border overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
      {/* Preview */}
      <div className="h-36 bg-romantic-cream-dark/30 dark:bg-dark-border/30 flex items-center justify-center overflow-hidden">
        {file.type === 'image' && (
          <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
        )}
        {file.type === 'video' && (
          <Video size={32} className="text-romantic-brown-muted dark:text-dark-muted" />
        )}
        {file.type === 'audio' && (
          <Music size={32} className="text-romantic-rose" />
        )}
        {file.type === 'other' && (
          <File size={32} className="text-romantic-brown-muted dark:text-dark-muted" />
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-medium text-romantic-brown dark:text-dark-text truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-xs text-romantic-brown-muted dark:text-dark-muted mt-0.5">{formatSize(file.size)}</p>
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-romantic-cream-dark hover:bg-romantic-blush/30 text-romantic-brown transition-colors"
          >
            {copied ? <Check size={11} className="text-green-600" /> : <Copy size={11} />}
            {copied ? 'Copied' : 'Copy URL'}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMedia.isPending}
            className="p-1 rounded-lg text-romantic-brown-muted hover:text-red-600 hover:bg-red-50 dark:text-dark-muted dark:hover:text-red-400 transition-colors"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

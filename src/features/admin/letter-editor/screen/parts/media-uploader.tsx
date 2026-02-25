import { ChangeEvent, useRef } from 'react'
import { Upload, Image, Video, Music, Loader2, AlertCircle } from '@ui/icons'
import { useUploadMedia } from '../../api/use-upload-media'
import { buildContentBlock } from '../../helpers/build-content-block'
import type { RichContentBlock } from '@shared/types'

interface MediaUploaderProps {
  onUploaded: (block: RichContentBlock) => void
}

export function MediaUploader({ onUploaded }: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadMedia = useUploadMedia()

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    try {
      const result = await uploadMedia.mutateAsync(file)
      const block = buildContentBlock(result.type, '', result.url)
      onUploaded(block)
    } catch {
      // error shown inline below
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploadMedia.isPending}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-romantic-cream-dark hover:bg-romantic-blush/30 text-romantic-brown transition-colors disabled:opacity-50"
        >
          {uploadMedia.isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Upload size={14} />
          )}
          {uploadMedia.isPending ? 'Uploading…' : 'Upload media'}
        </button>
        <span className="text-xs text-romantic-brown-muted flex items-center gap-1">
          <Image size={12} /> Image &middot;
          <Video size={12} /> Video &middot;
          <Music size={12} /> Audio
        </span>
      </div>
      {uploadMedia.error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle size={12} />
          {uploadMedia.error.message}
        </p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*,audio/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}

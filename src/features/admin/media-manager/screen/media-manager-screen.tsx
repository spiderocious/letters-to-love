import { ChangeEvent, useRef } from 'react'
import { Upload, Image } from '@ui/icons'
import { PageSpinner, EmptyState } from '@ui/components'
import { useMediaFiles } from '../api/use-media-files'
import { useUploadMedia } from '../../letter-editor/api/use-upload-media'
import { MediaPreviewCard } from './parts/media-preview-card'
import { useQueryClient } from '@tanstack/react-query'

export function MediaManagerScreen() {
  const mediaQuery = useMediaFiles()
  const uploadMedia = useUploadMedia()
  const queryClient = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    await uploadMedia.mutateAsync(file)
    queryClient.invalidateQueries({ queryKey: ['media-files'] })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-romantic-brown dark:text-dark-text">Media</h1>
          <p className="text-sm text-romantic-brown-muted dark:text-dark-muted mt-1">
            All uploaded images, videos, and audio
          </p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploadMedia.isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium bg-brand-yellow text-romantic-brown hover:bg-brand-yellow-dark shadow-sm transition-colors disabled:opacity-50"
        >
          <Upload size={15} />
          {uploadMedia.isPending ? 'Uploading…' : 'Upload'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*,audio/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {uploadMedia.error && (
        <p className="text-sm text-red-600 mb-4">{uploadMedia.error.message}</p>
      )}

      {mediaQuery.isLoading && <PageSpinner />}

      {!mediaQuery.isLoading && (mediaQuery.data ?? []).length === 0 && (
        <EmptyState
          icon={<Image size={40} />}
          title="No media yet"
          description="Upload images, videos, or audio to use in your letters."
        />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {(mediaQuery.data ?? []).map((file) => (
          <MediaPreviewCard key={file.name} file={file} />
        ))}
      </div>
    </div>
  )
}

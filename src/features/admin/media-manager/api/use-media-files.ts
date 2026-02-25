import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabaseAdmin } from '@shared/services'
import { STORAGE_BUCKET } from '@shared/constants'

export interface MediaFile {
  name: string
  url: string
  size: number
  created_at: string
  type: 'image' | 'video' | 'audio' | 'other'
}

function detectType(name: string): MediaFile['type'] {
  const ext = name.split('.').pop()?.toLowerCase() ?? ''
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(ext)) return 'image'
  if (['mp4', 'mov', 'webm', 'avi'].includes(ext)) return 'video'
  if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext)) return 'audio'
  return 'other'
}

export function useMediaFiles() {
  return useQuery({
    queryKey: ['media-files'],
    queryFn: async (): Promise<MediaFile[]> => {
      const { data, error } = await supabaseAdmin.storage.from(STORAGE_BUCKET).list('', {
        limit: 200,
        sortBy: { column: 'created_at', order: 'desc' },
      })
      if (error) throw new Error(error.message)

      return (data ?? []).map((file) => {
        const { data: urlData } = supabaseAdmin.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(file.name)
        return {
          name: file.name,
          url: urlData.publicUrl,
          size: file.metadata?.size ?? 0,
          created_at: file.created_at ?? '',
          type: detectType(file.name),
        }
      })
    },
  })
}

export function useDeleteMedia() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([name])
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-files'] })
    },
  })
}

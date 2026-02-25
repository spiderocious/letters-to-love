import { useMutation } from '@tanstack/react-query'
import { supabaseAdmin } from '@shared/services'
import { STORAGE_BUCKET } from '@shared/constants'

export interface UploadedMedia {
  url: string
  path: string
  type: 'image' | 'video' | 'audio'
}

function getMediaType(file: File): 'image' | 'video' | 'audio' {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('video/')) return 'video'
  if (file.type.startsWith('audio/')) return 'audio'
  return 'image'
}

export function useUploadMedia() {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadedMedia> => {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, { upsert: false })

      if (error) throw new Error(error.message)

      const { data: urlData } = supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(path)

      return {
        url: urlData.publicUrl,
        path,
        type: getMediaType(file),
      }
    },
  })
}

export type LetterStatus = 'draft' | 'published'

export type LetterMood =
  | 'playful'
  | 'missing-you'
  | 'proud-of-you'
  | 'romantic'
  | 'grateful'
  | 'encouraging'
  | 'nostalgic'
  | 'silly'

export type RichContentBlockType = 'text' | 'image' | 'video' | 'audio' | 'quote'

export interface RichContentBlock {
  id: string
  type: RichContentBlockType
  content: string
  caption?: string
  url?: string
}

export interface Letter {
  id: string
  title: string
  content: RichContentBlock[]
  mood: LetterMood | null
  publish_at: string
  status: LetterStatus
  is_milestone: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export interface LetterSummary {
  id: string
  title: string
  mood: LetterMood | null
  publish_at: string
  status: LetterStatus
  is_milestone: boolean
  view_count: number
  created_at: string
}

export * from './routes'

export const COUNTDOWN_HOUR = 21 // 9pm
export const STORAGE_BUCKET = 'letter-media'
export const MOODS = [
  { value: 'playful', label: 'Playful' },
  { value: 'missing-you', label: 'Missing You' },
  { value: 'proud-of-you', label: 'Proud of You' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'grateful', label: 'Grateful' },
  { value: 'encouraging', label: 'Encouraging' },
  { value: 'nostalgic', label: 'Nostalgic' },
  { value: 'silly', label: 'Silly' },
] as const

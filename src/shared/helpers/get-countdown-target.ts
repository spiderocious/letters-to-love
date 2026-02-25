import { COUNTDOWN_HOUR } from '@shared/constants'

export function getCountdownTarget(): Date {
  const now = new Date()
  const target = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    COUNTDOWN_HOUR,
    0,
    0,
    0,
  )
  return target
}

export function getSecondsUntilTarget(target: Date): number {
  const diff = target.getTime() - Date.now()
  return Math.max(0, Math.floor(diff / 1000))
}

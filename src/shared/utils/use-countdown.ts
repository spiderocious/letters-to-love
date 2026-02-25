import { useEffect, useState } from 'react'
import { getCountdownTarget, getSecondsUntilTarget } from '@shared/helpers'

export interface CountdownValue {
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

export function useCountdown(): CountdownValue {
  const target = getCountdownTarget()

  const [seconds, setSeconds] = useState(() => getSecondsUntilTarget(target))

  useEffect(() => {
    if (seconds <= 0) return
    const interval = setInterval(() => {
      setSeconds(getSecondsUntilTarget(target))
    }, 1000)
    return () => clearInterval(interval)
  }, [target, seconds])

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return { hours, minutes, seconds: secs, expired: seconds <= 0 }
}

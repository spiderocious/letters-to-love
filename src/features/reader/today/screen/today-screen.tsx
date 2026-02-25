import { PageSpinner } from '@ui/components'
import { useTodayLetters } from '../api/use-today-letters'
import { TodayHeader } from './parts/today-header'
import { LetterCard } from './parts/letter-card'
import { CountdownTimer } from './parts/countdown-timer'

export function TodayScreen() {
  const { data: letters, isLoading, error } = useTodayLetters()

  if (isLoading) return <PageSpinner />

  return (
    <div className="animate-fade-in">
      <TodayHeader />

      {error && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}

      {!error && letters && letters.length === 0 && (
        <CountdownTimer />
      )}

      {letters && letters.length > 0 && (
        <div className="flex flex-col gap-5">
          {letters.map((letter, i) => (
            <LetterCard key={letter.id} letter={letter} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

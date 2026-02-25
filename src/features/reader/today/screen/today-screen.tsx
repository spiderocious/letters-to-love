import { motion } from 'framer-motion'
import { PageSpinner } from '@ui/components'
import { useTodayLetters } from '../api/use-today-letters'
import { TodayHeader } from './parts/today-header'
import { LetterCard } from './parts/letter-card'
import { CountdownTimer } from './parts/countdown-timer'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
  },
}

export function TodayScreen() {
  const { data: letters, isLoading, error } = useTodayLetters()

  if (isLoading) return <PageSpinner />

  return (
    <div>
      <TodayHeader />

      {error && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}

      {!error && letters && letters.length === 0 && (
        <CountdownTimer />
      )}

      {letters && letters.length > 0 && (
        <motion.div
          className="flex flex-col gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {letters.map((letter, i) => (
            <motion.div key={letter.id} variants={cardVariants}>
              <LetterCard letter={letter} index={i} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

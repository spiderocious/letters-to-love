import { PageSpinner } from '@ui/components'
import { useDashboardStats } from '../api/use-dashboard-stats'
import { useAdminLetters } from '../api/use-admin-letters'
import { StatsOverview } from './parts/stats-overview'
import { LettersTable } from './parts/letters-table'

export function DashboardScreen() {
  const statsQuery = useDashboardStats()
  const lettersQuery = useAdminLetters()

  const loading = statsQuery.isLoading || lettersQuery.isLoading

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-romantic-brown dark:text-dark-text">Dashboard</h1>
        <p className="text-sm text-romantic-brown-muted dark:text-dark-muted mt-1">
          Your letter writing overview
        </p>
      </div>

      {loading ? (
        <PageSpinner />
      ) : (
        <>
          {statsQuery.data && (
            <div className="mb-8">
              <StatsOverview stats={statsQuery.data} />
            </div>
          )}

          <div className="bg-white dark:bg-dark-surface rounded-3xl border border-romantic-cream-dark dark:border-dark-border p-6 shadow-card">
            <h2 className="text-lg font-semibold text-romantic-brown dark:text-dark-text mb-5">
              All Letters
            </h2>
            {lettersQuery.error && (
              <p className="text-sm text-red-600">{lettersQuery.error.message}</p>
            )}
            {lettersQuery.data && <LettersTable letters={lettersQuery.data} />}
          </div>
        </>
      )}
    </div>
  )
}

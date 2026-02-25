import { Navigate } from 'react-router-dom'
import { Heart } from '@ui/icons'
import { Logo, PageSpinner } from '@ui/components'
import { useAdminAuth } from '@shared/utils'
import { ROUTES } from '@shared/constants'
import { LoginForm } from './parts/login-form'

export function LoginScreen() {
  const { isAuthenticated, loading } = useAdminAuth()

  if (loading) return <PageSpinner />
  if (isAuthenticated) return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />

  return (
    <div className="min-h-screen bg-romantic-cream dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Decorative top */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 bg-romantic-blush/30 rounded-full flex items-center justify-center">
            <Heart size={28} className="text-romantic-rose fill-romantic-rose/60" />
          </div>
          <Logo size="lg" linkTo={ROUTES.ADMIN.LOGIN} />
          <p className="text-sm text-romantic-brown-muted dark:text-dark-muted">
            Admin panel — for the one who writes
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white dark:bg-dark-surface rounded-3xl shadow-romantic p-8 border border-romantic-cream-dark dark:border-dark-border">
          <h1 className="text-xl font-semibold text-romantic-brown dark:text-dark-text mb-6">
            Welcome back
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

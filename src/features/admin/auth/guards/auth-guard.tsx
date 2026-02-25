import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@shared/constants'
import { useAdminAuth } from '@shared/utils'
import { PageSpinner } from '@ui/components'

export function AuthGuard() {
  const { isAuthenticated, loading } = useAdminAuth()

  if (loading) return <PageSpinner />
  if (!isAuthenticated) return <Navigate to={ROUTES.ADMIN.LOGIN} replace />

  return <Outlet />
}

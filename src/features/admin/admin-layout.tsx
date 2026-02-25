import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, MessageCircle, Image, LogOut, Plus } from '@ui/icons'
import { Logo, Button } from '@ui/components'
import { useAdminAuth } from '@shared/utils'
import { ROUTES } from '@shared/constants'

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
          isActive
            ? 'bg-brand-yellow text-romantic-brown shadow-sm'
            : 'text-romantic-brown-muted hover:bg-romantic-cream-dark dark:text-dark-muted dark:hover:bg-dark-border'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}

export function AdminLayout() {
  const { signOut } = useAdminAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate(ROUTES.ADMIN.LOGIN)
  }

  return (
    <div className="min-h-screen bg-romantic-cream dark:bg-dark-bg flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white dark:bg-dark-surface border-r border-romantic-cream-dark dark:border-dark-border flex flex-col p-4 gap-2">
        <div className="px-2 py-3 mb-2">
          <Logo size="sm" />
          <p className="text-xs text-romantic-brown-muted dark:text-dark-muted mt-1 pl-0.5">Admin Panel</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={15} />}
          onClick={() => navigate(ROUTES.ADMIN.LETTER_NEW)}
          className="w-full justify-center mb-3"
        >
          New Letter
        </Button>

        <nav className="flex flex-col gap-1 flex-1">
          <NavItem to={ROUTES.ADMIN.DASHBOARD} icon={<LayoutDashboard size={16} />} label="Dashboard" />
          <NavItem to={ROUTES.ADMIN.COMMENTS} icon={<MessageCircle size={16} />} label="Comments" />
          <NavItem to={ROUTES.ADMIN.MEDIA} icon={<Image size={16} />} label="Media" />
        </nav>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-romantic-brown-muted hover:text-romantic-brown hover:bg-romantic-cream-dark dark:text-dark-muted dark:hover:bg-dark-border rounded-2xl transition-all"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

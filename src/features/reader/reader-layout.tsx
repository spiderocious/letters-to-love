import { NavLink, Outlet } from 'react-router-dom'
import { Heart, BookmarkCheck, Archive, Search, Moon, Sun, Shuffle } from '@ui/icons'
import { Logo } from '@ui/components'
import { useTheme } from '@shared/utils'
import { ROUTES } from '@shared/constants'

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === ROUTES.HOME}
      className={({ isActive }) =>
        `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? 'text-romantic-rose bg-romantic-blush/20'
            : 'text-romantic-brown-muted hover:text-romantic-brown hover:bg-romantic-cream-dark dark:text-dark-muted dark:hover:text-dark-text dark:hover:bg-dark-border'
        }`
      }
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </NavLink>
  )
}

export function ReaderLayout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-romantic-cream dark:bg-dark-bg transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm border-b border-romantic-cream-dark dark:border-dark-border">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Logo size="sm" />

          <nav className="flex items-center gap-1">
            <NavItem to={ROUTES.HOME} icon={<Heart size={16} />} label="Today" />
            <NavItem to={ROUTES.ARCHIVE} icon={<Archive size={16} />} label="Archive" />
            <NavItem to={ROUTES.BOOKMARKS} icon={<BookmarkCheck size={16} />} label="Saved" />
            <NavItem to={ROUTES.SEARCH} icon={<Search size={16} />} label="Search" />
          </nav>

          <div className="flex items-center gap-2">
            <NavLink
              to={`/letter/random`}
              className="p-2 rounded-xl text-romantic-brown-muted hover:text-romantic-rose hover:bg-romantic-blush/20 dark:text-dark-muted dark:hover:text-romantic-rose transition-colors"
              title="Surprise me"
            >
              <Shuffle size={16} />
            </NavLink>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-romantic-brown-muted hover:text-romantic-brown hover:bg-romantic-cream-dark dark:text-dark-muted dark:hover:text-dark-text dark:hover:bg-dark-border transition-colors"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

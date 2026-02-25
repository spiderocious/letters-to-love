import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
        `relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
          isActive
            ? 'text-romantic-rose'
            : 'text-romantic-brown-muted hover:text-romantic-brown hover:bg-romantic-cream-dark dark:text-dark-muted dark:hover:text-dark-text dark:hover:bg-dark-border'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-romantic-blush/25 rounded-xl"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{icon}</span>
          <span className="hidden sm:inline relative z-10">{label}</span>
        </>
      )}
    </NavLink>
  )
}

export function ReaderLayout() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleToggleTheme() {
    if ('startViewTransition' in document) {
      const btn = toggleRef.current
      if (btn) {
        const rect = btn.getBoundingClientRect()
        document.documentElement.style.setProperty('--toggle-x', `${rect.left + rect.width / 2}px`)
        document.documentElement.style.setProperty('--toggle-y', `${rect.top + rect.height / 2}px`)
      }
      ;(document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(toggleTheme)
    } else {
      toggleTheme()
    }
  }

  return (
    <div className="min-h-screen bg-romantic-cream dark:bg-dark-bg transition-colors">
      {/* Header — morphs to floating pill on scroll */}
      <div className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'px-4 pt-3 pb-1' : ''}`}>
        <header
          className={`bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md border-romantic-cream-dark dark:border-dark-border transition-all duration-300 ${
            scrolled
              ? 'rounded-full shadow-romantic-lg border mx-auto max-w-fit'
              : 'border-b shadow-card'
          }`}
        >
          <div className={`flex items-center gap-4 h-14 transition-all duration-300 ${scrolled ? 'px-4' : 'max-w-4xl mx-auto px-4'}`}>
            <div className={`overflow-hidden transition-all duration-300 ${scrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              <Logo size="sm" />
            </div>

            <nav className="flex items-center gap-1">
              <NavItem to={ROUTES.HOME} icon={<Heart size={16} />} label="Today" />
              <NavItem to={ROUTES.ARCHIVE} icon={<Archive size={16} />} label="Archive" />
              <NavItem to={ROUTES.BOOKMARKS} icon={<BookmarkCheck size={16} />} label="Saved" />
              <NavItem to={ROUTES.SEARCH} icon={<Search size={16} />} label="Search" />
            </nav>

            <div className="flex items-center gap-2">
              <NavLink
                to="/letter/random"
                className="p-2 rounded-xl text-romantic-brown-muted hover:text-romantic-rose hover:bg-romantic-blush/20 dark:text-dark-muted dark:hover:text-romantic-rose transition-colors"
                title="Surprise me"
              >
                <Shuffle size={16} />
              </NavLink>
              <button
                ref={toggleRef}
                onClick={handleToggleTheme}
                className="p-2 rounded-xl text-romantic-brown-muted hover:text-romantic-brown hover:bg-romantic-cream-dark dark:text-dark-muted dark:hover:text-dark-text dark:hover:bg-dark-border transition-colors"
                title={theme === 'light' ? 'Dark mode' : 'Light mode'}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="page-transition"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

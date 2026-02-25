import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type FontPref = 'quicksand' | 'serif' | 'handwritten'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'light'
  })

  const [fontPref, setFontPref] = useState<FontPref>(() => {
    return (localStorage.getItem('fontPref') as FontPref) ?? 'quicksand'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('fontPref', fontPref)
  }, [fontPref])

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme, fontPref, setFontPref }
}

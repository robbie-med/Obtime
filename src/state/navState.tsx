import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

// Section navigation with deep links. The URL hash mirrors the view —
// "#timeline", "#index/nipt" — so a term or timeline item can be linked to,
// bookmarked, and reached with the browser's back button.

export const SECTIONS = [
  'home',
  'timeline',
  'compare',
  'checklist',
  'crossover',
  'nutrition',
  'exercise',
  'index',
  'cliniccard',
  'trackers',
  'resources',
  'data',
] as const
export type Section = (typeof SECTIONS)[number]

interface NavState {
  section: Section
  /** element id to scroll to after the section renders */
  anchor: string | null
  navigate: (section: Section, anchor?: string) => void
}

const NavContext = createContext<NavState | null>(null)

function parseHash(hash: string): { section: Section; anchor: string | null } {
  const [s, a] = hash.replace(/^#\/?/, '').split('/')
  const section = (SECTIONS as readonly string[]).includes(s) ? (s as Section) : 'home'
  return { section, anchor: a ? decodeURIComponent(a) : null }
}

export function NavProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(() =>
    typeof location === 'undefined' ? { section: 'home' as Section, anchor: null } : parseHash(location.hash),
  )

  useEffect(() => {
    const onHash = () => setState(parseHash(location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // After a section renders, bring the anchor (or the top) into view.
  useEffect(() => {
    const id = state.anchor
    const raf = requestAnimationFrame(() => {
      const el = id ? document.getElementById(id) : null
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else if (!id) window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(raf)
  }, [state])

  const navigate = useCallback((section: Section, anchor?: string) => {
    const hash = `#${section}${anchor ? `/${encodeURIComponent(anchor)}` : ''}`
    if (location.hash !== hash) history.pushState(null, '', hash)
    setState({ section, anchor: anchor ?? null })
  }, [])

  return <NavContext.Provider value={{ ...state, navigate }}>{children}</NavContext.Provider>
}

export function useNav(): NavState {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used within NavProvider')
  return ctx
}

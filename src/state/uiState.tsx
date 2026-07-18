import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Bilingual, Lang } from '../data/types'
import { UI, type UiKey } from '../i18n/ui'

export type Mode = 'mom' | 'clinician'
export type Theme = 'light' | 'dark'

interface UiState {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  mode: Mode
  setMode: (m: Mode) => void
  theme: Theme
  toggleTheme: () => void
  /** translate a UI chrome key */
  t: (key: UiKey) => string
  /** translate a content bilingual node */
  tc: (node: Bilingual) => string
}

const UiContext = createContext<UiState | null>(null)

const LANG_KEY = 'machung.lang'
const MODE_KEY = 'machung.mode'
const THEME_KEY = 'machung.theme'

function initialLang(): Lang {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(LANG_KEY) : null
  if (saved === 'en' || saved === 'ko') return saved
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'en'
  return nav.startsWith('ko') ? 'ko' : 'en'
}

function initialMode(): Mode {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(MODE_KEY) : null
  return saved === 'clinician' ? 'clinician' : 'mom'
}

function initialTheme(): Theme {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(THEME_KEY) : null
  if (saved === 'light' || saved === 'dark') return saved
  const prefersDark =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function UiProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [mode, setModeState] = useState<Mode>(initialMode)
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])
  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode)
  }, [mode])
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1e1922' : '#8a4d6a')
  }, [theme])

  const value: UiState = {
    lang,
    setLang: setLangState,
    toggleLang: () => setLangState((l) => (l === 'en' ? 'ko' : 'en')),
    mode,
    setMode: setModeState,
    theme,
    toggleTheme: () => setThemeState((tm) => (tm === 'light' ? 'dark' : 'light')),
    t: (key) => UI[key][lang],
    tc: (node) => node[lang],
  }

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export function useUi(): UiState {
  const ctx = useContext(UiContext)
  if (!ctx) throw new Error('useUi must be used within UiProvider')
  return ctx
}

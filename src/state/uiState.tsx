import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Bilingual, Lang } from '../data/types'
import { UI, type UiKey } from '../i18n/ui'

export type Mode = 'mom' | 'clinician'

interface UiState {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  mode: Mode
  setMode: (m: Mode) => void
  /** translate a UI chrome key */
  t: (key: UiKey) => string
  /** translate a content bilingual node */
  tc: (node: Bilingual) => string
}

const UiContext = createContext<UiState | null>(null)

const LANG_KEY = 'machung.lang'
const MODE_KEY = 'machung.mode'

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

export function UiProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [mode, setModeState] = useState<Mode>(initialMode)

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])
  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode)
  }, [mode])

  const value: UiState = {
    lang,
    setLang: setLangState,
    toggleLang: () => setLangState((l) => (l === 'en' ? 'ko' : 'en')),
    mode,
    setMode: setModeState,
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

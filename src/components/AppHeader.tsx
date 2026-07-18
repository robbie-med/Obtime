import { clsx } from 'clsx'
import { Globe, Stethoscope, Baby, Sun, Moon } from 'lucide-react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import type { UiKey } from '../i18n/ui'
import type { DeliveryPlan } from '../lib/persistence'

export interface NavItem {
  id: string
  label: UiKey
}

const PLAN_OPTIONS: { value: DeliveryPlan; label: UiKey }[] = [
  { value: 'us', label: 'planUS' },
  { value: 'kr', label: 'planKR' },
  { value: 'crossover', label: 'planCrossover' },
  { value: 'undecided', label: 'planUndecided' },
]

export function AppHeader({
  nav,
  active,
  onNavigate,
}: {
  nav: NavItem[]
  active: string
  onNavigate: (id: string) => void
}) {
  const { t, lang, toggleLang, mode, setMode, theme, toggleTheme } = useUi()
  const { profile, update } = useProfile()

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="text-left"
            aria-label="Home"
          >
            <div className="text-xl font-bold text-accentink">{t('appName')}</div>
            <div className="text-xs text-muted">{t('tagline')}</div>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex items-center justify-center rounded-lg border border-line bg-surface p-2 text-accentink hover:bg-surface2"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-accentink hover:bg-surface2"
            >
              <Globe size={15} />
              {lang === 'en' ? '한국어' : 'English'}
            </button>

            {/* Mode segmented control */}
            <div
              className="inline-flex overflow-hidden rounded-lg border border-line bg-surface text-sm"
              role="tablist"
              aria-label={t('mode')}
            >
              <button
                role="tab"
                aria-selected={mode === 'mom'}
                onClick={() => setMode('mom')}
                className={clsx(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 font-medium',
                  mode === 'mom' ? 'bg-primary text-white' : 'text-accentink hover:bg-surface2',
                )}
              >
                <Baby size={15} />
                {t('momMode')}
              </button>
              <button
                role="tab"
                aria-selected={mode === 'clinician'}
                onClick={() => setMode('clinician')}
                className={clsx(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 font-medium',
                  mode === 'clinician' ? 'bg-primary text-white' : 'text-accentink hover:bg-surface2',
                )}
              >
                <Stethoscope size={15} />
                {t('clinicianMode')}
              </button>
            </div>

            {/* Delivery plan */}
            <label className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2 py-1 text-sm">
              <span className="text-xs text-muted">{t('deliveryPlan')}</span>
              <select
                value={profile.deliveryPlan}
                onChange={(e) => update({ deliveryPlan: e.target.value as DeliveryPlan })}
                className="bg-transparent font-medium text-accentink focus:outline-none"
              >
                {PLAN_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {t(o.label)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Section nav */}
        <nav className="mt-3 flex gap-1 overflow-x-auto pb-1">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={clsx(
                'whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition',
                active === item.id
                  ? 'bg-primary text-white'
                  : 'text-accentink hover:bg-primarysoft',
              )}
            >
              {t(item.label)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

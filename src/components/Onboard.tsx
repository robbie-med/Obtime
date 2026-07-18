import { useState } from 'react'
import { CalendarHeart } from 'lucide-react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard } from './primitives'
import { eddFromLmp, parseDate, toIso, gaFromEdd } from '../lib/dating'

/**
 * Due-date onboarding. The mom enters EITHER her LMP or a known due date
 * (e.g. ultrasound-dated). We show a live GA preview and persist on save.
 */
export function Onboard({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useUi()
  const { profile, update, hasProfile, ga } = useProfile()
  const [lmp, setLmp] = useState(profile.lmp ?? '')
  const [edd, setEdd] = useState(profile.edd ?? '')

  // Live preview EDD from whichever field is filled (edd wins).
  const previewEdd =
    parseDate(edd) ?? (parseDate(lmp) ? eddFromLmp(parseDate(lmp)!) : null)
  const previewGa = previewEdd ? gaFromEdd(previewEdd) : null

  function save() {
    const patch: { lmp?: string; edd?: string; datingMethod?: 'lmp' | 'edd' } = {}
    if (edd) {
      patch.edd = edd
      patch.datingMethod = 'edd'
    } else if (lmp) {
      patch.lmp = lmp
      patch.edd = toIso(eddFromLmp(parseDate(lmp)!))
      patch.datingMethod = 'lmp'
    }
    update(patch)
  }

  return (
    <SectionCard
      title={
        <span className="inline-flex items-center gap-2">
          <CalendarHeart size={18} className="text-rose-accent" />
          {t('onboardTitle')}
        </span>
      }
      subtitle={t('onboardSub')}
      className={compact ? 'bg-surface' : ''}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-muted">{t('lmpLabel')}</span>
          <input
            type="date"
            value={lmp}
            onChange={(e) => {
              setLmp(e.target.value)
              setEdd('')
            }}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 focus:border-primary focus:outline-none"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-muted">{t('eddLabel')}</span>
          <input
            type="date"
            value={edd}
            onChange={(e) => {
              setEdd(e.target.value)
              setLmp('')
            }}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 focus:border-primary focus:outline-none"
          />
        </label>
      </div>

      {previewGa && previewEdd && (
        <p className="mt-3 rounded-lg bg-primarysoft px-3 py-2 text-sm text-accentink">
          {lang === 'en'
            ? `Due ${toIso(previewEdd)} · about ${previewGa.weeks}w ${previewGa.days}d today · trimester ${previewGa.trimester}`
            : `예정일 ${toIso(previewEdd)} · 현재 약 ${previewGa.weeks}주 ${previewGa.days}일 · ${previewGa.trimester}삼분기`}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={save}
          disabled={!lmp && !edd}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primaryhover disabled:opacity-40"
        >
          {hasProfile ? t('edit') : t('save')}
        </button>
        {hasProfile && ga && (
          <span className="text-sm text-muted">
            {t('youAreHere')}: {ga.weeks}
            {lang === 'en' ? 'w' : '주'} {ga.days}
            {lang === 'en' ? 'd' : '일'}
          </span>
        )}
      </div>
    </SectionCard>
  )
}

import { Sparkles } from 'lucide-react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard, StatusPill, CountryTag } from './primitives'
import { devForWeek } from '../data/development'
import { checklistFor, countriesForPlan, windowStatus, formatWindow } from '../lib/schedule'
import type { TimelineEvent } from '../data/types'

export function ThisWeek() {
  const { t, tc, lang } = useUi()
  const { ga, profile } = useProfile()
  if (!ga) return null

  const dev = devForWeek(ga.weeks)
  const countries = countriesForPlan(profile.deliveryPlan)

  // What's due right now across the relevant countries.
  const dueNow: { ev: TimelineEvent }[] = countries
    .flatMap((c) => checklistFor(c))
    .filter((ev) => windowStatus(ev.window, ga.weeks) === 'due')
    .map((ev) => ({ ev }))

  return (
    <SectionCard
      title={
        <span className="inline-flex items-center gap-2">
          <Sparkles size={18} className="text-rose-accent" />
          {lang === 'en' ? 'This week' : '이번 주'}
        </span>
      }
    >
      {/* Big GA readout */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <div className="text-4xl font-bold text-accentink">
          {ga.weeks}
          <span className="text-2xl font-semibold">
            {lang === 'en' ? 'w' : '주'}
          </span>{' '}
          {ga.days}
          <span className="text-2xl font-semibold">
            {lang === 'en' ? 'd' : '일'}
          </span>
        </div>
        <div className="text-sm text-muted">
          {lang === 'en'
            ? `${ga.trimester}${ordinal(ga.trimester)} trimester · ${Math.max(0, ga.daysUntilDue)} days to due date`
            : `${ga.trimester}삼분기 · 예정일까지 ${Math.max(0, ga.daysUntilDue)}일`}
        </div>
      </div>

      {/* Development */}
      {dev && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-primarysoft p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-accentink">
              {lang === 'en' ? 'Your baby' : '아기'}
            </div>
            <p className="mt-1 text-sm text-ink">{tc(dev.fetal)}</p>
          </div>
          <div className="rounded-xl bg-primarysoft p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-accentink">
              {lang === 'en' ? 'Your body' : '몸의 변화'}
            </div>
            <p className="mt-1 text-sm text-ink">{tc(dev.maternal)}</p>
            {dev.discomforts && dev.discomforts.length > 0 && (
              <ul className="mt-2 list-disc space-y-0.5 pl-4 text-sm text-muted">
                {dev.discomforts.map((d, i) => (
                  <li key={i}>{tc(d)}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Due now */}
      <div className="mt-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {t('dueNow')}
        </div>
        {dueNow.length === 0 ? (
          <p className="text-sm text-muted">
            {lang === 'en'
              ? 'Nothing time-sensitive right now — see your checklist for what’s ahead.'
              : '지금 급한 항목은 없어요 — 다가오는 일정은 체크리스트에서 확인하세요.'}
          </p>
        ) : (
          <ul className="space-y-2">
            {dueNow.map(({ ev }) => (
              <li
                key={ev.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <CountryTag country={ev.country} />
                  <span className="text-sm font-medium text-ink">{tc(ev.title)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-faint">{formatWindow(ev.window)}</span>
                  <StatusPill status="due">{t('dueNow')}</StatusPill>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionCard>
  )
}

function ordinal(n: number): string {
  return n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'
}

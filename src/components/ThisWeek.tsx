import { ArrowRight, Sparkles, Stethoscope } from 'lucide-react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard, StatusPill, CountryTag } from './primitives'
import { devForWeek } from '../data/development'
import {
  cadenceFor,
  checklistEntries,
  crossoverGa,
  nextVisitWeek,
  visitNote,
  formatWindow,
  isEntryDone,
  optionGroup,
  planEvents,
  windowStatus,
} from '../lib/schedule'
import { useNav } from '../state/navState'
import { dateAtGa } from '../lib/dating'
import { fmtRange } from '../lib/format'

export function ThisWeek() {
  const { t, tc, lang } = useUi()
  const { ga, edd, profile } = useProfile()
  const { navigate } = useNav()
  if (!ga) return null

  const dev = devForWeek(ga.weeks)
  const cross = crossoverGa(profile, edd)

  const nextVisit = nextVisitWeek(ga.totalDays, cadenceFor('us'))
  const nextNote = nextVisit != null ? visitNote(nextVisit) : undefined

  // What's due right now for this plan (and not yet ticked off).
  const dueNow = checklistEntries(planEvents(profile.deliveryPlan, cross?.weeks ?? null)).filter(
    (e) => windowStatus(e.window, ga.totalDays) === 'due' && !isEntryDone(e, profile.checklist),
  )

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

      {/* Next routine check-up: why it matters */}
      {nextVisit != null && nextNote && edd && (
        <button
          onClick={() => navigate('timeline', `visit-${nextVisit}`)}
          className="mt-4 block w-full rounded-xl border border-line bg-surface p-3 text-left hover:border-primary"
        >
          <div className="flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-wide text-accentink">
            <Stethoscope size={13} />
            {lang === 'en' ? 'Your next check-up' : '다음 정기 진료'}
            <span className="font-normal normal-case tracking-normal text-muted">
              · {lang === 'en' ? `week ${nextVisit}` : `${nextVisit}주`} ·{' '}
              {fmtRange(dateAtGa(edd, nextVisit), dateAtGa(edd, nextVisit, 6), lang)}
            </span>
          </div>
          <div className="mt-1 text-sm font-semibold text-ink">{tc(nextNote.focus)}</div>
          <p className="mt-0.5 text-sm text-muted">{tc(nextNote.why)}</p>
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accentink">
            {lang === 'en' ? 'What’s done & what to ask' : '무엇을 하고 무엇을 물을지'}
            <ArrowRight size={12} />
          </span>
        </button>
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
            {dueNow.map((entry) => (
              <li key={entry.key}>
                <button
                  onClick={() => navigate('timeline', entry.events[0].id)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2 text-left hover:bg-surface2"
                >
                <div className="flex items-center gap-2">
                  <CountryTag country={entry.country} />
                  <span className="text-sm font-medium text-ink">
                    {entry.group
                      ? `${lang === 'en' ? 'Choose one: ' : '택1: '}${tc(optionGroup(entry.group)!.title)}`
                      : tc(entry.events[0].title)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs tabular-nums text-faint">{formatWindow(entry.window, lang)}</span>
                  <StatusPill status="due">{t('dueNow')}</StatusPill>
                </div>
                </button>
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

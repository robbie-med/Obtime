import { clsx } from 'clsx'
import { ChevronDown, MessageCircleQuestion, Stethoscope } from 'lucide-react'
import type { Country, Lang, TimelineEvent } from '../../data/types'
import {
  cadenceAt,
  cadenceFor,
  checksAt,
  describeWindow,
  nextVisitWeek,
  openAtVisit,
  visitNote,
} from '../../lib/schedule'
import { useProfile } from '../../state/profileState'
import { useUi } from '../../state/uiState'
import { SourceBadges } from '../primitives'
import { COUNTRY_COLOR } from './meta'

/**
 * A routine check-up: why this visit exists at this point in pregnancy, what is
 * done at it (by week and country), what else could be done while you are there,
 * and what to bring up — so a quiet visit reads as the safety check it is.
 */
export function VisitCard({
  week,
  countries,
  events,
}: {
  week: number
  /** whose care this week shows (one country, or both side by side) */
  countries: Country[]
  /** events visible in the current view, for "also open at this visit" */
  events: TimelineEvent[]
}) {
  const { tc, lang, mode } = useUi()
  const { ga } = useProfile()
  const note = visitNote(week)
  const cadence = cadenceAt(week, cadenceFor('us'))
  const checks = checksAt(week, countries)
  const open = openAtVisit(week, events).filter((e) => countries.includes(e.country))
  const isNext = ga != null && nextVisitWeek(ga.totalDays, cadenceFor('us')) === week
  const both = countries.length > 1
  const other: Lang = lang === 'en' ? 'ko' : 'en'

  const tag = (c: Country | 'both') =>
    both && c !== 'both' ? (
      <span
        className="mr-1 rounded px-1 py-px text-[9px] font-bold uppercase text-white"
        style={{ backgroundColor: COUNTRY_COLOR[c] }}
      >
        {c}
      </span>
    ) : null

  const sources = [...new Set([...(note?.sourceIds ?? []), ...checks.flatMap((c) => c.sourceIds ?? [])])]

  return (
    <section
      id={`visit-${week}`}
      className={clsx(
        'scroll-mt-40 rounded-xl border p-3',
        isNext ? 'border-rose-accent/50 bg-rose-accent/5' : 'border-primary/25 bg-primarysoft/40',
      )}
      aria-label={lang === 'en' ? `Routine check-up, week ${week}` : `${week}주 정기 진료`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-wide text-accentink">
          <Stethoscope size={13} />
          {lang === 'en' ? 'Routine check-up' : '정기 진료'}
        </span>
        {cadence && <span className="text-muted">· {tc(cadence.every)}</span>}
        {isNext && (
          <span className="rounded-full bg-rose-accent px-2 py-0.5 text-[11px] font-semibold text-white">
            {lang === 'en' ? 'Your next check-up' : '다음 정기 진료'}
          </span>
        )}
      </div>

      {note && <h4 className="mt-1 text-[15px] font-semibold leading-snug text-ink">{tc(note.focus)}</h4>}

      {note && (
        <p className="mt-1.5 text-sm leading-relaxed text-ink">
          <span className="font-semibold text-accentink">{lang === 'en' ? 'Why this visit: ' : '왜 가나요: '}</span>
          {tc(note.why)}
        </p>
      )}

      <div className="mt-1.5 text-sm leading-relaxed text-ink">
        <span className="font-semibold text-accentink">{lang === 'en' ? 'What’s done: ' : '무엇을 하나요: '}</span>
        {(both ? checks.filter((c) => c.country === 'both') : checks).map((c, i) => (
          <span key={c.id}>
            {i > 0 && <span className="text-faint"> · </span>}
            {tc(c.label)}
          </span>
        ))}
        {both &&
          (['us', 'kr'] as const).map((country) => {
            const only = checks.filter((c) => c.country === country)
            if (only.length === 0) return null
            return (
              <span key={country} className="mt-0.5 block">
                <span className="text-xs font-semibold" style={{ color: COUNTRY_COLOR[country] }}>
                  {country === 'us'
                    ? lang === 'en' ? 'US only: ' : '미국만: '
                    : lang === 'en' ? 'Korea only: ' : '한국만: '}
                </span>
                {only.map((c, i) => (
                  <span key={c.id}>
                    {i > 0 && <span className="text-faint"> · </span>}
                    {tc(c.label)}
                  </span>
                ))}
              </span>
            )
          })}
      </div>

      {open.length > 0 && (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-muted">{lang === 'en' ? 'Can also be done at this visit:' : '이번 진료에서 함께 할 수 있는 것:'}</span>
          {open.map((e) => (
            <a
              key={e.id}
              href={`#timeline/${e.id}`}
              onClick={(ev) => {
                ev.preventDefault()
                document.getElementById(e.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="rounded-full bg-surface px-2 py-0.5 text-ink ring-1 ring-line hover:bg-primarysoft"
            >
              {both && (
                <span className="mr-1 font-bold uppercase" style={{ color: COUNTRY_COLOR[e.country] }}>
                  {e.country}
                </span>
              )}
              {tc(e.title)}
              <span className="text-faint"> · {describeWindow(e.window, lang)}</span>
            </a>
          ))}
        </div>
      )}

      <details className="group mt-2" open={mode === 'clinician' || isNext}>
        <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-accentink">
          <ChevronDown size={13} className="transition group-open:rotate-180" />
          {lang === 'en' ? 'Why each check matters · what to ask' : '검사별 이유 · 물어볼 것'}
        </summary>
        <ul className="mt-2 space-y-1.5 text-sm">
          {checks.map((c) => (
            <li key={c.id} className="leading-relaxed">
              <span className="font-medium text-ink">
                {tag(c.country)}
                {tc(c.label)}
              </span>
              <span className="text-muted"> — {tc(c.why)}</span>
            </li>
          ))}
        </ul>
        {note?.ask && note.ask.length > 0 && (
          <div className="mt-3">
            <div className="mb-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted">
              <MessageCircleQuestion size={13} />
              {lang === 'en' ? 'Ask or mention' : '물어보거나 말할 것'}
            </div>
            <ul className="space-y-1.5 text-sm">
              {note.ask.map((q, i) => (
                <li key={i} className="rounded-lg bg-surface px-2.5 py-1.5 ring-1 ring-line">
                  <span className="text-ink">{q[lang]}</span>
                  <span className="block text-xs text-muted" lang={other}>
                    {q[other]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {sources.length > 0 && (
          <div className="mt-2 text-right text-xs text-faint">
            {lang === 'en' ? 'Sources' : '출처'}
            <SourceBadges ids={sources} />
          </div>
        )}
      </details>
    </section>
  )
}

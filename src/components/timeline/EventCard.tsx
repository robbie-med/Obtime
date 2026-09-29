import { clsx } from 'clsx'
import { AlertTriangle, BookOpen, Check, ChevronDown } from 'lucide-react'
import type { TimelineEvent } from '../../data/types'
import { getIndexEntry } from '../../data/indexTerms'
import { dateAtGa } from '../../lib/dating'
import { fmtRange } from '../../lib/format'
import {
  describeWindow,
  formatWindow,
  isChecklistItem,
  optionGroup,
  weeksUntil,
  windowStatus,
  type EventStatus,
} from '../../lib/schedule'
import { useNav } from '../../state/navState'
import { useProfile } from '../../state/profileState'
import { useUi } from '../../state/uiState'
import { SourceBadges } from '../primitives'
import { COUNTRY_COLOR, COUNTRY_NAME, KIND_META, TIER_META } from './meta'

const STATUS_CLASS: Record<EventStatus | 'done', string> = {
  due: 'bg-rose-accent/15 text-rose-accent ring-rose-accent/30',
  upcoming: 'bg-primarysoft text-accentink ring-line',
  past: 'bg-surface2 text-faint ring-line',
  done: 'bg-primary text-onprimary ring-primary',
}

/**
 * One timeline item: title, exact window (+ calendar dates), who it is for,
 * status, the full plain-language summary, and — on demand or in clinician
 * mode — the clinical detail, sources and index links.
 */
export function EventCard({
  ev,
  showCountry,
  straddle,
  crossLabel,
}: {
  ev: TimelineEvent
  /** show a US/KR tag (mixed columns on small screens, path view) */
  showCountry?: boolean
  /** the item's window is still open on both sides of the move to Korea */
  straddle?: boolean
  crossLabel?: string
}) {
  const { tc, lang, mode } = useUi()
  const { ga, edd, profile, toggleChecklist } = useProfile()
  const { navigate } = useNav()

  const color = COUNTRY_COLOR[ev.country]
  const trackable = isChecklistItem(ev) || ev.tier === 'indicated'
  const done = trackable && !!profile.checklist[ev.id]
  const status = ga ? windowStatus(ev.window, ga.totalDays) : null
  const pill: EventStatus | 'done' | null = done ? 'done' : status
  const group = ev.optionGroup ? optionGroup(ev.optionGroup) : undefined
  const clinician = mode === 'clinician'

  const pillText =
    pill === 'done'
      ? lang === 'en' ? 'Done' : '완료'
      : pill === 'due'
        ? lang === 'en' ? 'Due now' : '지금 할 때'
        : pill === 'past'
          ? lang === 'en' ? 'Window passed' : '시기 지남'
          : pill === 'upcoming' && ga
            ? lang === 'en'
              ? `In ${weeksUntil(ev.window, ga.totalDays)} wk`
              : `${weeksUntil(ev.window, ga.totalDays)}주 후`
            : null

  const dates =
    edd && !ev.anytime
      ? fmtRange(
          dateAtGa(edd, ev.window.start, ev.window.startDay ?? 0),
          ev.window.end == null ? edd : dateAtGa(edd, ev.window.end, ev.window.endDay ?? 6),
          lang,
        )
      : null

  const windowText = ev.anytime
    ? lang === 'en' ? 'Any week' : '어느 주든'
    : clinician
      ? formatWindow(ev.window, lang, true)
      : describeWindow(ev.window, lang)

  return (
    <article
      id={ev.id}
      className={clsx(
        'scroll-mt-40 rounded-xl border border-l-4 p-3 shadow-sm transition',
        status === 'due' && !done ? 'border-rose-accent/50 bg-rose-accent/5' : 'border-line bg-surface',
        status === 'past' && !done && 'opacity-75',
      )}
      style={{ borderLeftColor: color }}
    >
      {/* Title row */}
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0" style={{ color }} title={tc(KIND_META[ev.kind].label)}>
          {KIND_META[ev.kind].icon(16)}
        </span>
        <h4 className="flex-1 text-[15px] font-semibold leading-snug text-ink">
          {showCountry && (
            <span
              className="mr-1.5 inline-block rounded px-1.5 py-px align-[1px] text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: color }}
              title={tc(COUNTRY_NAME[ev.country])}
            >
              {ev.country}
            </span>
          )}
          {tc(ev.title)}
        </h4>
        {pillText && (
          <span
            className={clsx(
              'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1',
              STATUS_CLASS[pill!],
            )}
          >
            {pill === 'done' && <Check size={11} className="-mt-px mr-0.5 inline" />}
            {pillText}
          </span>
        )}
      </div>

      {/* Timing */}
      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span className="font-semibold tabular-nums" style={{ color }}>
          {windowText}
        </span>
        {ev.ideal && (
          <span className="text-ink">
            · {lang === 'en' ? 'best' : '권장'} {formatWindow(ev.ideal, lang, clinician)}
          </span>
        )}
        {dates && <span className="tabular-nums text-muted">· {dates}</span>}
        {ev.timing && <span className="text-muted">· {tc(ev.timing)}</span>}
      </div>

      {/* Who it is for */}
      <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
        <span
          className={clsx('rounded-full px-2 py-0.5 font-medium ring-1', TIER_META[ev.tier].className)}
          title={tc(TIER_META[ev.tier].explain)}
        >
          {tc(TIER_META[ev.tier].label)}
          {ev.condition && `: ${tc(ev.condition)}`}
        </span>
        {group && (
          <span
            className="rounded-full bg-surface px-2 py-0.5 font-medium text-accentink ring-1 ring-primary/40"
            title={tc(group.note)}
          >
            {lang === 'en' ? 'Choose one' : '택1'} · {tc(group.title)}
          </span>
        )}
      </div>

      {straddle && (
        <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-rose-accent/10 px-2 py-1.5 text-xs text-ink">
          <AlertTriangle size={13} className="mt-0.5 shrink-0 text-rose-accent" />
          {lang === 'en'
            ? `This window is still open when you move (${crossLabel}). Do it before you fly, or ask your Korean clinic to do it.`
            : `이동 시점(${crossLabel})에도 아직 시행 가능한 시기입니다. 출국 전에 받거나 한국 병원에 요청하세요.`}
        </p>
      )}

      <p className="mt-2 text-sm leading-relaxed text-ink">{tc(ev.summary)}</p>

      {clinician && ev.clinicianDetail && (
        <p className="mt-2 rounded-lg bg-surface2/60 px-2.5 py-2 text-[13px] leading-relaxed text-ink">
          {tc(ev.clinicianDetail)}
        </p>
      )}

      {/* Footer: done toggle, details, index links, sources */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
        {trackable && (
          <button
            onClick={() => toggleChecklist(ev.id)}
            aria-pressed={done}
            className={clsx(
              'inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium ring-1 transition',
              done ? 'bg-primary text-onprimary ring-primary' : 'text-accentink ring-line hover:bg-primarysoft',
            )}
          >
            <Check size={12} />
            {done ? (lang === 'en' ? 'Done' : '완료함') : lang === 'en' ? 'Mark done' : '완료 표시'}
          </button>
        )}
        {!clinician && ev.clinicianDetail && (
          <details className="group w-full order-last">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1 font-medium text-accentink">
              <ChevronDown size={13} className="transition group-open:rotate-180" />
              {lang === 'en' ? 'Clinical detail' : '임상 세부'}
            </summary>
            <p className="mt-1.5 rounded-lg bg-surface2/60 px-2.5 py-2 text-[13px] leading-relaxed text-ink">
              {tc(ev.clinicianDetail)}
            </p>
          </details>
        )}
        {ev.indexIds?.map((id) => {
          const entry = getIndexEntry(id)
          if (!entry) return null
          return (
            <button
              key={id}
              onClick={() => navigate('index', `term-${id}`)}
              className="inline-flex items-center gap-1 text-accentink underline decoration-dotted underline-offset-2 hover:decoration-solid"
            >
              <BookOpen size={12} />
              {tc(entry.term)}
            </button>
          )
        })}
        {ev.sourceIds && ev.sourceIds.length > 0 && (
          <span className="ml-auto inline-flex items-center gap-1 text-faint">
            {lang === 'en' ? 'Sources' : '출처'}
            <SourceBadges ids={ev.sourceIds} />
          </span>
        )}
      </div>
    </article>
  )
}

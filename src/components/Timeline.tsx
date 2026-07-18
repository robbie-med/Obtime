import { clsx } from 'clsx'
import { CircleDot, FlaskConical, Scan, Syringe, Stethoscope, Flag } from 'lucide-react'
import type { ReactNode } from 'react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard } from './primitives'
import { timelineFor, windowStatus, formatWindow } from '../lib/schedule'
import type { Country, EventKind, TimelineEvent } from '../data/types'

// --- Proportional week axis -------------------------------------------------
const START_WEEK = 3
const END_WEEK = 41
const PX_PER_WEEK = 34
const PAD = 22
const CARD_H = 46
const GAP = 6
const HEIGHT = (END_WEEK - START_WEEK) * PX_PER_WEEK + PAD * 2

function weekToY(w: number): number {
  const c = Math.min(Math.max(w, START_WEEK), END_WEEK)
  return (c - START_WEEK) * PX_PER_WEEK + PAD
}

const GRID_WEEKS = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40]
const TRIMESTERS: { label: { en: string; ko: string }; from: number; to: number }[] = [
  { label: { en: '1st trimester', ko: '1삼분기' }, from: START_WEEK, to: 13 },
  { label: { en: '2nd trimester', ko: '2삼분기' }, from: 14, to: 27 },
  { label: { en: '3rd trimester', ko: '3삼분기' }, from: 28, to: END_WEEK },
]

const KIND_ICON: Record<EventKind, ReactNode> = {
  visit: <Stethoscope size={13} />,
  lab: <FlaskConical size={13} />,
  ultrasound: <Scan size={13} />,
  screening: <CircleDot size={13} />,
  vaccine: <Syringe size={13} />,
  milestone: <Flag size={13} />,
}

interface Placed {
  ev: TimelineEvent
  y: number
  dotY: number
}

/** Position events by week, nudging clustered ones down but never above their week. */
function layout(events: TimelineEvent[]): Placed[] {
  const sorted = [...events].sort((a, b) => a.window.start - b.window.start)
  let cursor = -Infinity
  return sorted.map((ev) => {
    const anchor = weekToY(ev.window.start)
    const y = Math.max(anchor, cursor + GAP)
    cursor = y + CARD_H
    return { ev, y, dotY: y + CARD_H / 2 }
  })
}

export function Timeline() {
  const { t, lang } = useUi()
  const { ga } = useProfile()
  const nowY = ga ? weekToY(ga.weeks) : null

  return (
    <SectionCard
      title={lang === 'en' ? 'Prenatal timeline' : '산전 관리 타임라인'}
      subtitle={
        lang === 'en'
          ? 'Anchored to weeks of pregnancy. Set your due date to see where you are.'
          : '임신 주수에 맞춰 배치됩니다. 예정일을 입력하면 현재 위치가 표시됩니다.'
      }
    >
      {/* Lane headers */}
      <div className="mb-2 flex items-center justify-between px-1 text-sm font-bold">
        <span style={{ color: 'var(--color-us)' }}>
          {lang === 'en' ? 'United States' : '미국'}
        </span>
        <span className="text-xs font-medium text-faint">{t('navTimeline')}</span>
        <span style={{ color: 'var(--color-kr)' }}>{lang === 'en' ? 'Korea' : '한국'}</span>
      </div>

      <div className="overflow-x-auto">
        <div className="relative mx-auto" style={{ height: HEIGHT, minWidth: 600 }}>
          {/* Trimester bands */}
          {TRIMESTERS.map((tr, i) => (
            <div
              key={tr.label.en}
              className={clsx('absolute inset-x-0', i % 2 === 1 && 'bg-surface2/50')}
              style={{ top: weekToY(tr.from) - PAD / 2, height: (tr.to - tr.from + 1) * PX_PER_WEEK }}
            >
              <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-surface2 px-2 py-0.5 text-[10px] font-medium text-muted" style={{ top: 2 }}>
                {lang === 'en' ? tr.label.en : tr.label.ko}
              </span>
            </div>
          ))}

          {/* Week gridlines */}
          {GRID_WEEKS.map((w) => (
            <div key={w} className="absolute inset-x-0 border-t border-dashed border-line" style={{ top: weekToY(w) }}>
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-surface px-1.5 text-[10px] font-semibold text-faint">
                {w}w
              </span>
            </div>
          ))}

          {/* Center axis */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />

          {/* You are here */}
          {nowY != null && (
            <div className="absolute inset-x-0 z-10" style={{ top: nowY }}>
              <div className="border-t-2 border-rose-accent" />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-rose-accent px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                {t('youAreHere')} · {ga!.weeks}w{ga!.days}d
              </span>
            </div>
          )}

          <Lane country="us" side="left" nowWeeks={ga?.weeks ?? null} />
          <Lane country="kr" side="right" nowWeeks={ga?.weeks ?? null} />
        </div>
      </div>
    </SectionCard>
  )
}

function Lane({
  country,
  side,
  nowWeeks,
}: {
  country: Country
  side: 'left' | 'right'
  nowWeeks: number | null
}) {
  const { tc, lang, mode } = useUi()
  const placed = layout(timelineFor(country))
  const color = country === 'us' ? 'var(--color-us)' : 'var(--color-kr)'

  return (
    <>
      {placed.map(({ ev, y, dotY }) => {
        const status = nowWeeks == null ? null : windowStatus(ev.window, nowWeeks)
        return (
          <div key={ev.id}>
            {/* connector + dot on the axis */}
            <div
              className="absolute h-px bg-line"
              style={{ top: dotY, width: 14, [side === 'left' ? 'right' : 'left']: '50%' }}
            />
            <div
              className="absolute z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-surface"
              style={{ top: dotY, left: '50%', backgroundColor: color }}
            />
            {/* card */}
            <div
              className={clsx(
                'absolute rounded-lg border px-2.5 py-1.5 shadow-sm',
                status === 'past' && 'border-line bg-surface2 opacity-70',
                status === 'due' && 'border-rose-accent/50 bg-rose-accent/5',
                (status === 'upcoming' || status == null) && 'border-line bg-surface',
              )}
              style={{
                top: y,
                minHeight: CARD_H,
                width: 'calc(50% - 26px)',
                [side]: 0,
                textAlign: side === 'left' ? 'right' : 'left',
              }}
              title={tc(ev.summary)}
            >
              <div
                className={clsx(
                  'flex items-center gap-1.5',
                  side === 'left' && 'flex-row-reverse',
                )}
              >
                <span style={{ color }}>{KIND_ICON[ev.kind]}</span>
                <span className="truncate text-[13px] font-semibold text-ink">{tc(ev.title)}</span>
                <span className="ml-auto shrink-0 rounded bg-surface2 px-1 text-[10px] font-medium text-muted">
                  {formatWindow(ev.window)}
                </span>
              </div>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-muted" dir="auto">
                {mode === 'clinician' && ev.clinicianDetail ? tc(ev.clinicianDetail) : tc(ev.summary)}
              </p>
              {!ev.routine && (
                <span className="text-[10px] italic text-faint">
                  {lang === 'en' ? 'if indicated' : '해당 시'}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}

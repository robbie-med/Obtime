import { clsx } from 'clsx'
import { CircleDot, FlaskConical, Scan, Syringe, Stethoscope, Flag } from 'lucide-react'
import type { ReactNode } from 'react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard } from './primitives'
import { timelineFor, cadenceFor, windowStatus } from '../lib/schedule'
import type { EventKind, TimelineEvent } from '../data/types'

// --- Proportional week axis -------------------------------------------------
const START_WEEK = 4
const END_WEEK = 41
const PX_PER_WEEK = 44 // tall enough that cards mostly sit at their true week
const PAD = 24
const CARD_H = 72 // fixed → cards can never overlap
const GAP = 8

function weekToY(w: number): number {
  const c = Math.min(Math.max(w, START_WEEK), END_WEEK)
  return (c - START_WEEK) * PX_PER_WEEK + PAD
}

const GRID_WEEKS = [8, 12, 16, 20, 24, 28, 32, 36, 40]
const TRIMESTERS = [
  { key: 't1', label: { en: '1st trimester', ko: '1삼분기' }, from: START_WEEK, to: 13 },
  { key: 't2', label: { en: '2nd trimester', ko: '2삼분기' }, from: 14, to: 27 },
  { key: 't3', label: { en: '3rd trimester', ko: '3삼분기' }, from: 28, to: END_WEEK },
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
  cardY: number // top of the card (collision-adjusted)
  anchorY: number // exact-week dot on the axis
}

/** Fixed-height cards, nudged down so they never overlap, never above their week. */
function layout(events: TimelineEvent[]): { placed: Placed[]; bottom: number } {
  let cursor = -Infinity
  const placed = events.map((ev) => {
    const anchorY = weekToY(ev.anchor)
    const cardY = Math.max(anchorY, cursor + GAP)
    cursor = cardY + CARD_H
    return { ev, cardY, anchorY }
  })
  return { placed, bottom: cursor }
}

export function Timeline() {
  const { t, tc, lang } = useUi()
  const { ga } = useProfile()
  const nowY = ga ? weekToY(ga.weeks) : null

  const us = layout(timelineFor('us'))
  const kr = layout(timelineFor('kr'))
  const height = Math.max(weekToY(END_WEEK) + PAD, us.bottom + PAD, kr.bottom + PAD)
  const cadence = cadenceFor('us') // identical schedule in both countries

  return (
    <SectionCard
      title={lang === 'en' ? 'Prenatal timeline' : '산전 관리 타임라인'}
      subtitle={
        lang === 'en'
          ? 'Every test and visit, placed at the week it usually happens. “~” means the timing is flexible.'
          : '모든 검사와 진료를 보통 시행하는 주수에 배치했습니다. “~”는 시기가 유동적이라는 뜻입니다.'
      }
    >
      {/* Visit rhythm — same schedule in both countries */}
      <div className="mb-4 rounded-xl bg-primarysoft p-3">
        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-accentink">
          {lang === 'en' ? 'Visit rhythm (US & Korea)' : '진료 간격 (미국·한국 동일)'}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {cadence.map((c) => (
            <span
              key={c.from}
              className="rounded-full border border-line bg-surface px-2.5 py-1 font-medium text-ink"
              title={tc(c.detail)}
            >
              {c.from}–{c.to === END_WEEK ? (lang === 'en' ? 'birth' : '출산') : c.to}w ·{' '}
              <span className="text-accentink">{tc(c.every)}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Lane headers */}
      <div className="mb-1 flex items-center justify-between px-1 text-sm font-bold">
        <span style={{ color: 'var(--color-us)' }}>{lang === 'en' ? 'United States' : '미국'}</span>
        <span style={{ color: 'var(--color-kr)' }}>{lang === 'en' ? 'Korea' : '한국'}</span>
      </div>

      <div className="overflow-x-auto">
        <div className="relative mx-auto" style={{ height, minWidth: 620 }}>
          {/* Trimester bands */}
          {TRIMESTERS.map((tr, i) => (
            <div
              key={tr.key}
              className={clsx('absolute inset-x-0', i % 2 === 1 && 'bg-surface2/40')}
              style={{ top: weekToY(tr.from) - PAD / 2, height: (tr.to - tr.from + 1) * PX_PER_WEEK }}
            >
              <span
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-surface2 px-2 py-0.5 text-[10px] font-medium text-muted"
                style={{ top: 4 }}
              >
                {lang === 'en' ? tr.label.en : tr.label.ko}
              </span>
            </div>
          ))}

          {/* Week gridlines */}
          {GRID_WEEKS.map((w) => (
            <div
              key={w}
              className="absolute inset-x-0 border-t border-dashed border-line"
              style={{ top: weekToY(w) }}
            >
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-surface px-1.5 text-[10px] font-semibold text-faint">
                {w}w
              </span>
            </div>
          ))}

          {/* Center axis */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />

          {/* You are here */}
          {nowY != null && (
            <div className="absolute inset-x-0 z-20" style={{ top: nowY }}>
              <div className="border-t-2 border-rose-accent" />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-rose-accent px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                {t('youAreHere')} · {ga!.weeks}w{ga!.days}d
              </span>
            </div>
          )}

          <Lane placed={us.placed} side="left" nowWeeks={ga?.weeks ?? null} />
          <Lane placed={kr.placed} side="right" nowWeeks={ga?.weeks ?? null} />
        </div>
      </div>
    </SectionCard>
  )
}

function Lane({
  placed,
  side,
  nowWeeks,
}: {
  placed: Placed[]
  side: 'left' | 'right'
  nowWeeks: number | null
}) {
  const { tc, lang, mode } = useUi()
  return (
    <>
      {placed.map(({ ev, cardY, anchorY }) => {
        const color = ev.country === 'us' ? 'var(--color-us)' : 'var(--color-kr)'
        const status = nowWeeks == null ? null : windowStatus(ev.window, nowWeeks)
        const innerSide = side === 'left' ? 'right' : 'left'
        const cardCenterY = cardY + CARD_H / 2
        return (
          <div key={ev.id}>
            {/* Leader line: axis dot (true week) → card, as a clean right angle. */}
            <div
              className="absolute w-px bg-line"
              style={{ left: '50%', top: Math.min(anchorY, cardCenterY), height: Math.abs(cardCenterY - anchorY) }}
            />
            <div
              className="absolute h-px bg-line"
              style={{ top: cardCenterY, width: 26, [innerSide]: '50%' }}
            />
            {/* exact-week dot on the axis */}
            <div
              className="absolute z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-surface"
              style={{ top: anchorY, left: '50%', backgroundColor: color }}
            />
            {/* card (fixed height → no overlap) */}
            <div
              className={clsx(
                'absolute overflow-hidden rounded-lg border px-2.5 py-1.5 shadow-sm',
                status === 'past' && 'border-line bg-surface2 opacity-70',
                status === 'due' && 'border-rose-accent/50 bg-rose-accent/5',
                (status === 'upcoming' || status == null) && 'border-line bg-surface',
              )}
              style={{
                top: cardY,
                height: CARD_H,
                width: 'calc(50% - 26px)',
                [side]: 0,
              }}
            >
              <div className={clsx('flex items-start gap-1.5', side === 'left' && 'flex-row-reverse text-right')}>
                <span className="mt-0.5 shrink-0" style={{ color }}>
                  {KIND_ICON[ev.kind]}
                </span>
                <span className="line-clamp-2 flex-1 text-[13px] font-semibold leading-tight text-ink">
                  {tc(ev.title)}
                </span>
                <span
                  className="shrink-0 rounded px-1 text-[10px] font-bold"
                  style={{ color }}
                  title={ev.approx ? (lang === 'en' ? 'approximate — timing is flexible' : '대략적 — 시기 유동적') : undefined}
                >
                  {ev.approx ? '~' : ''}
                  {ev.anchor}w
                </span>
              </div>
              <p className={clsx('mt-0.5 line-clamp-2 text-[11px] text-muted', side === 'left' && 'text-right')}>
                {mode === 'clinician' && ev.clinicianDetail ? tc(ev.clinicianDetail) : tc(ev.summary)}
              </p>
              {!ev.routine && (
                <span className={clsx('text-[10px] italic text-faint', side === 'left' && 'block text-right')}>
                  {lang === 'en' ? 'only if needed' : '필요 시에만'}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}

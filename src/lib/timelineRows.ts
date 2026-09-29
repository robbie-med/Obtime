// Lay the timeline out as week rows. Every item sits in the row of its week —
// the layout can never drift away from the true week. Stretches of weeks with
// nothing scheduled collapse into one "gap" row, but the current week and the
// move-to-Korea week always get their own row so they are never hidden.
import type { TimelineEvent, WeekMarker } from '../data/types'
import { FIRST_WEEK, LAST_WEEK, markersAt } from './schedule'

export interface WeekRow {
  type: 'week'
  week: number
  us: TimelineEvent[]
  kr: TimelineEvent[]
  visit: boolean
  markers: WeekMarker[]
  isNow: boolean
  isCross: boolean
}
export interface GapRow {
  type: 'gap'
  from: number
  to: number
}
export interface TrimesterRow {
  type: 'trimester'
  tri: 1 | 2 | 3
  from: number
  to: number
}
export type Row = WeekRow | GapRow | TrimesterRow

export const TRIMESTERS: { tri: 1 | 2 | 3; from: number; to: number }[] = [
  { tri: 1, from: 0, to: 13 },
  { tri: 2, from: 14, to: 27 },
  { tri: 3, from: 28, to: LAST_WEEK },
]

export function buildRows(opts: {
  events: TimelineEvent[] // already filtered to the view; `anytime` items are skipped
  visitWeeks: Set<number>
  nowWeek: number | null
  crossWeek: number | null
  fromWeek?: number
}): Row[] {
  const { events, visitWeeks, nowWeek, crossWeek } = opts
  const rows: Row[] = []
  let gapFrom: number | null = null

  const flushGap = (to: number) => {
    if (gapFrom != null) rows.push({ type: 'gap', from: gapFrom, to })
    gapFrom = null
  }

  const first = Math.max(FIRST_WEEK, opts.fromWeek ?? FIRST_WEEK)
  for (let w = first; w <= LAST_WEEK; w++) {
    const tri = TRIMESTERS.find((t) => t.from === w || (w === first && w >= t.from && w <= t.to))
    if (tri) {
      flushGap(w - 1)
      rows.push({ type: 'trimester', ...tri })
    }
    const at = events.filter((e) => !e.anytime && e.anchor === w)
    const row: WeekRow = {
      type: 'week',
      week: w,
      us: at.filter((e) => e.country === 'us'),
      kr: at.filter((e) => e.country === 'kr'),
      visit: visitWeeks.has(w),
      markers: markersAt(w),
      isNow: nowWeek === w,
      isCross: crossWeek === w,
    }
    const empty = at.length === 0 && !row.visit && row.markers.length === 0 && !row.isNow && !row.isCross
    if (empty) {
      if (gapFrom == null) gapFrom = w
      continue
    }
    flushGap(w - 1)
    rows.push(row)
  }
  flushGap(LAST_WEEK)
  return rows
}

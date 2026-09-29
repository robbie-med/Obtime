// Derive timeline/checklist structure and status from gestational age.
// Pure functions over the timeline data — used by Timeline, Checklist, This Week.
import type {
  Bilingual,
  Country,
  GaWindow,
  Lang,
  RoutineCheck,
  TimelineEvent,
  VisitCadence,
  VisitNote,
  WeekMarker,
} from '../data/types'
import { ROUTINE_CHECKS, VISIT_NOTES } from '../data/visits'
import { US_TIMELINE, US_CADENCE } from '../data/timeline.us'
import { KR_TIMELINE, KR_CADENCE } from '../data/timeline.kr'
import { WEEK_MARKERS, OPTION_GROUPS } from '../data/timeline.shared'
import type { DeliveryPlan, Profile } from './persistence'
import { gaOnDate, parseDate } from './dating'

export type EventStatus = 'past' | 'due' | 'upcoming'

/** First week shown on the timeline, and the last (post-term). */
export const FIRST_WEEK = 4
export const LAST_WEEK = 42

// --- Windows ------------------------------------------------------------------

/** First and last gestational day (inclusive) covered by a window. */
export function windowDays(w: GaWindow): { from: number; to: number } {
  const from = w.start * 7 + (w.startDay ?? 0)
  const to = w.end == null ? Infinity : w.end * 7 + (w.endDay ?? 6)
  return { from, to }
}

/** Where a window sits relative to the current gestational age (in total days). */
export function windowStatus(w: GaWindow, gaTotalDays: number): EventStatus {
  const { from, to } = windowDays(w)
  if (gaTotalDays > to) return 'past'
  if (gaTotalDays < from) return 'upcoming'
  return 'due'
}

/** Whole weeks until a window opens (0 if already open). */
export function weeksUntil(w: GaWindow, gaTotalDays: number): number {
  return Math.max(0, Math.ceil((windowDays(w).from - gaTotalDays) / 7))
}

const U = {
  en: { w: 'w', d: 'd', until: 'until birth', weeks: 'Weeks', week: 'Week' },
  ko: { w: '주', d: '일', until: '출산까지', weeks: '', week: '' },
}

/**
 * Format a window.
 *  - short:   "24–28w", "36w+", "11w"          (lists, checklist)
 *  - precise: "10w3d – 13w6d", "36w0d – 37w6d" (clinician view)
 */
export function formatWindow(w: GaWindow, lang: Lang = 'en', precise = false): string {
  const u = U[lang]
  if (precise) {
    const a = `${w.start}${u.w}${w.startDay ?? 0}${u.d}`
    if (w.end == null) return `${a} – ${u.until}`
    return `${a} – ${w.end}${u.w}${w.endDay ?? 6}${u.d}`
  }
  const startDay = w.startDay ? `${u.w}${w.startDay}${u.d}` : ''
  const endDay = w.endDay != null && w.endDay !== 6 ? `${u.w}${w.endDay}${u.d}` : ''
  if (w.end == null) return `${w.start}${startDay || u.w}+`
  if (w.end === w.start && !startDay && !endDay) return `${w.start}${u.w}`
  return `${w.start}${startDay}–${w.end}${endDay || u.w}`
}

/**
 * Plain-language window: "Week 28", "Weeks 24–28", "From week 32",
 * "From 33w5d" / "28주", "24–28주", "32주부터", "33주 5일부터".
 */
export function describeWindow(w: GaWindow, lang: Lang = 'en'): string {
  const ko = lang === 'ko'
  const start = w.startDay ? (ko ? `${w.start}주 ${w.startDay}일` : `${w.start}w${w.startDay}d`) : null
  if (w.end == null) {
    if (start) return ko ? `${start}부터` : `From ${start}`
    return ko ? `${w.start}주부터` : `From week ${w.start}`
  }
  const end = w.endDay != null && w.endDay !== 6 ? (ko ? `${w.end}주 ${w.endDay}일` : `${w.end}w${w.endDay}d`) : null
  if (start || end) {
    const a = start ?? (ko ? `${w.start}주` : `${w.start}w0d`)
    const b = end ?? (ko ? `${w.end}주 6일` : `${w.end}w6d`)
    return `${a} – ${b}`
  }
  if (w.end === w.start) return ko ? `${w.start}주` : `Week ${w.start}`
  return ko ? `${w.start}–${w.end}주` : `Weeks ${w.start}–${w.end}`
}

// --- Data access ----------------------------------------------------------------

export function timelineFor(country: Country): TimelineEvent[] {
  const src = country === 'us' ? US_TIMELINE : KR_TIMELINE
  return [...src].sort((a, b) => a.anchor - b.anchor || a.window.start - b.window.start)
}

export function cadenceFor(country: Country): VisitCadence[] {
  return country === 'us' ? US_CADENCE : KR_CADENCE
}

export function optionGroup(id: string): { title: Bilingual; note: Bilingual } | undefined {
  return OPTION_GROUPS[id]
}

/**
 * The weeks with a routine check-up, expanded from the cadence
 * (every 4w → every 2w → weekly). The first segment's opening week is the
 * first prenatal visit, which the timeline lists as its own item.
 */
export function visitWeeks(cadence: VisitCadence[]): number[] {
  const weeks = new Set<number>()
  for (const c of cadence) {
    for (let w = c.from; w < c.to; w += c.stepWeeks) weeks.add(w)
  }
  const sorted = [...weeks].sort((a, b) => a - b)
  return sorted.slice(1)
}

// --- Plans & views ----------------------------------------------------------------

/**
 * Which countries a delivery plan cares about.
 * crossover / undecided → both, so the mom sees the full picture.
 */
export function countriesForPlan(plan: DeliveryPlan): Country[] {
  if (plan === 'us') return ['us']
  if (plan === 'kr') return ['kr']
  return ['us', 'kr']
}

/** Timeline view: one country, both side by side, or the crossover path (US → Korea). */
export type TimelineView = 'us' | 'kr' | 'both' | 'path'

export function defaultView(plan: DeliveryPlan, crossWeek: number | null): TimelineView {
  if (plan === 'us') return 'us'
  if (plan === 'kr') return 'kr'
  if (plan === 'crossover' && crossWeek != null) return 'path'
  return 'both'
}

/**
 * The gestational week the mom moves from US to Korean care.
 * From the planned flight date when a due date is known, else the week she typed.
 */
export function crossoverGa(
  profile: Pick<Profile, 'flyDate' | 'flyGa'>,
  edd: Date | null,
): { weeks: number; days: number } | null {
  const fly = parseDate(profile.flyDate)
  if (fly && edd) {
    const g = gaOnDate(edd, fly)
    if (g.totalDays >= 0) return { weeks: g.weeks, days: g.days }
  }
  if (profile.flyGa != null && Number.isFinite(profile.flyGa)) {
    return { weeks: Math.floor(profile.flyGa), days: 0 }
  }
  return null
}

/**
 * Crossover path: US care before the move week, Korean care from it.
 * Korean paperwork/bookings (`admin`) can be done from abroad, so they stay
 * visible before the move too; "any week" items apply in both countries.
 */
export function onPath(ev: TimelineEvent, crossWeek: number): boolean {
  if (ev.anytime) return true
  if (ev.country === 'us') return ev.anchor < crossWeek
  return ev.anchor >= crossWeek || ev.kind === 'admin'
}

/**
 * True when a one-off item's window is still open on both sides of the move
 * week (ongoing, open-ended items simply continue in Korea).
 */
export function straddles(ev: TimelineEvent, crossWeek: number): boolean {
  if (ev.anytime || ev.window.end == null) return false
  const { from, to } = windowDays(ev.window)
  const cross = crossWeek * 7
  return from < cross && to >= cross
}

/** Events visible in a view (before kind/tier filters). */
export function eventsForView(view: TimelineView, crossWeek: number | null): TimelineEvent[] {
  const us = timelineFor('us')
  const kr = timelineFor('kr')
  if (view === 'us') return us
  if (view === 'kr') return kr
  if (view === 'path' && crossWeek != null) return [...us, ...kr].filter((e) => onPath(e, crossWeek))
  return [...us, ...kr]
}

// --- Checklist ------------------------------------------------------------------

/**
 * Everyone-gets-it or offered-to-all items make up the personal checklist.
 * Condition-only items, milestones and diagnostic tests (a decision, not a
 * to-do) stay on the timeline only.
 */
export function isChecklistItem(e: TimelineEvent): boolean {
  return e.tier !== 'indicated' && e.kind !== 'milestone' && e.kind !== 'diagnostic'
}

export function checklistFor(country: Country): TimelineEvent[] {
  return timelineFor(country).filter(isChecklistItem)
}

/**
 * A checklist line: either one event, or a "choose one" group of alternatives
 * (e.g. NIPT vs combined screen vs quad) that is done when any option is done.
 */
export interface ChecklistEntry {
  key: string
  events: TimelineEvent[]
  group?: string
  window: GaWindow
  country: Country
}

export function checklistEntries(events: TimelineEvent[]): ChecklistEntry[] {
  const out: ChecklistEntry[] = []
  const groups = new Map<string, ChecklistEntry>()
  for (const ev of events) {
    if (!isChecklistItem(ev)) continue
    if (ev.optionGroup) {
      const key = `${ev.country}:${ev.optionGroup}`
      const g = groups.get(key)
      if (g) {
        g.events.push(ev)
        g.window = spanOf(g.window, ev.window)
        continue
      }
      const entry: ChecklistEntry = {
        key,
        events: [ev],
        group: ev.optionGroup,
        window: { ...ev.window },
        country: ev.country,
      }
      groups.set(key, entry)
      out.push(entry)
      continue
    }
    out.push({ key: ev.id, events: [ev], window: ev.window, country: ev.country })
  }
  return out.sort((a, b) => windowDays(a.window).from - windowDays(b.window).from)
}

function spanOf(a: GaWindow, b: GaWindow): GaWindow {
  const da = windowDays(a)
  const db = windowDays(b)
  const from = Math.min(da.from, db.from)
  const to = Math.max(da.to, db.to)
  return {
    start: Math.floor(from / 7),
    startDay: from % 7,
    ...(Number.isFinite(to) ? { end: Math.floor(to / 7), endDay: to % 7 } : {}),
  }
}

/** Events the current plan cares about (crossover path when a move week is set). */
export function planEvents(plan: DeliveryPlan, crossWeek: number | null): TimelineEvent[] {
  if (plan === 'crossover' && crossWeek != null) return eventsForView('path', crossWeek)
  return countriesForPlan(plan).flatMap((c) => timelineFor(c))
}

export function isEntryDone(entry: ChecklistEntry, checklist: Record<string, boolean>): boolean {
  return entry.events.some((e) => checklist[e.id])
}

// --- Markers ------------------------------------------------------------------

export function markersAt(week: number): WeekMarker[] {
  return WEEK_MARKERS.filter((m) => m.week === week)
}

// --- Routine check-ups ----------------------------------------------------------

/** Which countries' care a given week shows in a view. */
export function countriesAtWeek(view: TimelineView, week: number, crossWeek: number | null): Country[] {
  if (view === 'us') return ['us']
  if (view === 'kr') return ['kr']
  if (view === 'path' && crossWeek != null) return [week < crossWeek ? 'us' : 'kr']
  return ['us', 'kr']
}

/** Routine checks done at a check-up in this week, for these countries. */
export function checksAt(week: number, countries: Country[]): RoutineCheck[] {
  return ROUTINE_CHECKS.filter(
    (c) =>
      week >= c.fromWeek &&
      (c.toWeek == null || week <= c.toWeek) &&
      (c.country === 'both' || countries.includes(c.country)),
  )
}

export function visitNote(week: number): VisitNote | undefined {
  return VISIT_NOTES.find((n) => n.week === week)
}

/** The cadence segment a visit week belongs to ("every 4 weeks" …). */
export function cadenceAt(week: number, cadence: VisitCadence[]): VisitCadence | undefined {
  return cadence.find((c) => week >= c.from && week < c.to)
}

/** Kinds of item that are actually done in the clinic during a visit. */
const AT_VISIT_KINDS = new Set(['lab', 'ultrasound', 'screening', 'diagnostic', 'vaccine'])

/**
 * One-off tests, scans and vaccines whose window is open at this visit but that
 * are listed under another week — "can be done at this visit too".
 */
export function openAtVisit(week: number, events: TimelineEvent[]): TimelineEvent[] {
  const day = week * 7
  return events.filter(
    (e) =>
      !e.anytime &&
      e.window.end != null &&
      e.anchor !== week &&
      e.tier !== 'indicated' &&
      AT_VISIT_KINDS.has(e.kind) &&
      windowStatus(e.window, day) === 'due',
  )
}

/** The next routine check-up on or after today (null past the last one). */
export function nextVisitWeek(gaTotalDays: number, cadence: VisitCadence[]): number | null {
  return visitWeeks(cadence).find((w) => w * 7 + 6 >= gaTotalDays) ?? null
}

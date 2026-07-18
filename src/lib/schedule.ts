// Derive timeline/checklist status from gestational age.
// Pure functions over the timeline data — used by Timeline, Checklist, This Week.
import type { Country, GaWindow, TimelineEvent } from '../data/types'
import { US_TIMELINE } from '../data/timeline.us'
import { KR_TIMELINE } from '../data/timeline.kr'
import type { DeliveryPlan } from './persistence'

export type EventStatus = 'past' | 'due' | 'upcoming'

/** Where a GA window sits relative to the current week count. */
export function windowStatus(w: GaWindow, weeks: number): EventStatus {
  const end = w.end ?? w.start
  if (weeks > end) return 'past'
  if (weeks < w.start) return 'upcoming'
  return 'due'
}

/** Sort key for placing an event on the timeline. */
export function windowStart(e: TimelineEvent): number {
  return e.window.start
}

export function timelineFor(country: Country): TimelineEvent[] {
  const src = country === 'us' ? US_TIMELINE : KR_TIMELINE
  return [...src].sort((a, b) => windowStart(a) - windowStart(b))
}

/**
 * Which countries a delivery plan cares about.
 * crossover / undecided → both, so the mom sees the full picture.
 */
export function countriesForPlan(plan: DeliveryPlan): Country[] {
  if (plan === 'us') return ['us']
  if (plan === 'kr') return ['kr']
  return ['us', 'kr']
}

/** Routine, everyone-gets-it events make up the personal checklist. */
export function checklistFor(country: Country): TimelineEvent[] {
  return timelineFor(country).filter((e) => e.routine && e.kind !== 'milestone')
}

/** Format a GA window like "24–28w" or "36w+" or "11w". */
export function formatWindow(w: GaWindow): string {
  if (w.end == null) {
    // open-ended near term implies "onward"
    return `${w.start}w+`
  }
  if (w.end === w.start) return `${w.start}w`
  return `${w.start}–${w.end}w`
}

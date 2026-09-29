import { describe, it, expect, afterAll } from 'vitest'
import { eddFromLmp, gaFromEdd, parseDate, toIso, dateAtGa, gaOnDate } from '../lib/dating'

// Dates are calendar days in the user's local zone. These run the same checks
// in several zones — including Korea (UTC+9), where a UTC-based toIso() used to
// save the due date one day early.
// Minimal typing for the Node global (the app itself has no Node types).
declare const process: { env: Record<string, string | undefined> }

const ZONES = ['UTC', 'Asia/Seoul', 'America/Los_Angeles', 'America/New_York']
const originalTz = process.env.TZ

afterAll(() => {
  process.env.TZ = originalTz
})

describe.each(ZONES)('calendar-day dating in %s', (tz) => {
  it('round-trips an ISO date without shifting a day', () => {
    process.env.TZ = tz
    expect(toIso(parseDate('2026-10-08')!)).toBe('2026-10-08')
    expect(toIso(parseDate('2026-03-08')!)).toBe('2026-03-08') // US DST start
  })

  it('EDD from LMP is exactly LMP + 280 calendar days', () => {
    process.env.TZ = tz
    expect(toIso(eddFromLmp(parseDate('2026-01-01')!))).toBe('2026-10-08')
    // Spans a DST change in US zones.
    expect(toIso(eddFromLmp(parseDate('2026-03-01')!))).toBe('2026-12-06')
  })

  it('GA does not roll over to the next day in the afternoon', () => {
    process.env.TZ = tz
    const edd = parseDate('2026-10-08')! // LMP 2026-01-01
    for (const hour of [0, 9, 12, 13, 18, 23]) {
      const ga = gaFromEdd(edd, new Date(2026, 3, 11, hour, 59))
      expect(`${ga.weeks}w${ga.days}d`, `at ${hour}:59`).toBe('14w2d')
    }
  })

  it('maps GA ↔ calendar date', () => {
    process.env.TZ = tz
    const edd = parseDate('2026-10-08')!
    expect(toIso(dateAtGa(edd, 0))).toBe('2026-01-01')
    expect(toIso(dateAtGa(edd, 36, 0))).toBe('2026-09-10')
    expect(toIso(dateAtGa(edd, 40))).toBe('2026-10-08')
    expect(gaOnDate(edd, parseDate('2026-09-16')!)).toMatchObject({ weeks: 36, days: 6 })
  })
})

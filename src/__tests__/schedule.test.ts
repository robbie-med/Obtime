import { describe, it, expect } from 'vitest'
import {
  checklistEntries,
  crossoverGa,
  defaultView,
  describeWindow,
  eventsForView,
  formatWindow,
  onPath,
  planEvents,
  straddles,
  timelineFor,
  visitWeeks,
  windowStatus,
  cadenceFor,
  checksAt,
  countriesAtWeek,
  nextVisitWeek,
  openAtVisit,
} from '../lib/schedule'
import { buildRows } from '../lib/timelineRows'
import { parseDate } from '../lib/dating'

const days = (w: number, d = 0) => w * 7 + d

describe('window status is day-precise', () => {
  const gbs = { start: 36, end: 37 } // 36w0d–37w6d
  it('opens on w0d and closes after the end week’s 6th day', () => {
    expect(windowStatus(gbs, days(35, 6))).toBe('upcoming')
    expect(windowStatus(gbs, days(36, 0))).toBe('due')
    expect(windowStatus(gbs, days(37, 6))).toBe('due')
    expect(windowStatus(gbs, days(38, 0))).toBe('past')
  })
  it('honours startDay / endDay', () => {
    const w = { start: 33, startDay: 5 }
    expect(windowStatus(w, days(33, 4))).toBe('upcoming')
    expect(windowStatus(w, days(33, 5))).toBe('due')
    expect(windowStatus(w, days(41, 0))).toBe('due') // open-ended
  })
  it('describes windows in plain language', () => {
    expect(describeWindow({ start: 28, end: 28 })).toBe('Week 28')
    expect(describeWindow({ start: 24, end: 28 })).toBe('Weeks 24–28')
    expect(describeWindow({ start: 32 })).toBe('From week 32')
    expect(describeWindow({ start: 33, startDay: 5 }, 'ko')).toBe('33주 5일부터')
    expect(describeWindow({ start: 24, end: 28 }, 'ko')).toBe('24–28주')
  })
  it('formats short and precise', () => {
    expect(formatWindow({ start: 24, end: 28 })).toBe('24–28w')
    expect(formatWindow({ start: 24, end: 28 }, 'en', true)).toBe('24w0d – 28w6d')
    expect(formatWindow({ start: 36 }, 'ko')).toBe('36주+')
    expect(formatWindow({ start: 33, startDay: 5 }, 'en', true)).toBe('33w5d – until birth')
  })
})

describe('visit schedule', () => {
  it('expands every 4w → every 2w → weekly, after the first visit', () => {
    expect(visitWeeks(cadenceFor('us'))).toEqual([12, 16, 20, 24, 28, 30, 32, 34, 36, 37, 38, 39, 40])
  })
})

describe('crossover path (US care → Korean care)', () => {
  const edd = parseDate('2027-01-15')! // LMP 2026-04-10

  it('derives the move week from the flight date', () => {
    // 2026-10-23 is 28w0d for this EDD
    expect(crossoverGa({ flyDate: '2026-10-23' }, edd)).toEqual({ weeks: 28, days: 0 })
    expect(crossoverGa({ flyDate: '2026-10-25' }, edd)).toEqual({ weeks: 28, days: 2 })
    expect(crossoverGa({ flyGa: 26 }, null)).toEqual({ weeks: 26, days: 0 })
    expect(crossoverGa({}, edd)).toBeNull()
  })

  it('shows US items before the move and Korean items from it (plus Korean paperwork anytime)', () => {
    const path = eventsForView('path', 28)
    for (const ev of path.filter((e) => !e.anytime)) {
      if (ev.country === 'us') expect(ev.anchor).toBeLessThan(28)
      else expect(ev.anchor >= 28 || ev.kind === 'admin').toBe(true)
    }
    expect(path.some((e) => e.id === 'kr-flu')).toBe(true) // any-week items apply in both
    expect(path.some((e) => e.id === 'us-anatomy')).toBe(true)
    expect(path.some((e) => e.id === 'us-gbs')).toBe(false)
    expect(path.some((e) => e.id === 'kr-gbs')).toBe(true)
    expect(path.some((e) => e.id === 'kr-quad')).toBe(false)
    expect(path.some((e) => e.id === 'kr-voucher')).toBe(true) // can be done from abroad
    expect(onPath(timelineFor('kr').find((e) => e.id === 'kr-nst')!, 28)).toBe(true)
  })

  it('flags items whose window spans the move', () => {
    const tdap = timelineFor('us').find((e) => e.id === 'us-tdap')! // 27–36
    expect(straddles(tdap, 30)).toBe(true)
    expect(straddles(tdap, 27)).toBe(false)
    expect(straddles(tdap, 37)).toBe(false)
    const ongoing = timelineFor('us').find((e) => e.id === 'us-movement')! // 28w+
    expect(straddles(ongoing, 30)).toBe(false)
  })

  it('defaults the view from the delivery plan', () => {
    expect(defaultView('us', null)).toBe('us')
    expect(defaultView('kr', null)).toBe('kr')
    expect(defaultView('crossover', 28)).toBe('path')
    expect(defaultView('crossover', null)).toBe('both')
    expect(defaultView('undecided', 28)).toBe('both')
  })
})

describe('checklist', () => {
  it('groups US chromosome screens into one "choose one" line', () => {
    const entries = checklistEntries(timelineFor('us'))
    const group = entries.filter((e) => e.group === 'us-aneuploidy')
    expect(group).toHaveLength(1)
    expect(group[0].events.map((e) => e.id).sort()).toEqual(['us-cfdna', 'us-nt', 'us-quad'])
    expect(group[0].window).toMatchObject({ start: 10, end: 22 })
  })
  it('leaves out condition-only items, milestones and diagnostic tests', () => {
    const ids = checklistEntries(planEvents('undecided', null)).flatMap((e) => e.events.map((x) => x.id))
    expect(ids).not.toContain('us-anti-d')
    expect(ids).not.toContain('us-cvs')
    expect(ids).not.toContain('us-induction-39')
    expect(ids).toContain('us-gbs')
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('follows the crossover path when a move week is set', () => {
    const ids = checklistEntries(planEvents('crossover', 28)).flatMap((e) => e.events.map((x) => x.id))
    expect(ids).toContain('us-ogtt')
    expect(ids).not.toContain('kr-gdm')
    expect(ids).toContain('kr-makdal')
    expect(ids).not.toContain('us-gbs')
  })
})

describe('week rows', () => {
  const events = eventsForView('both', null)
  const visits = new Set(visitWeeks(cadenceFor('us')))

  it('places every dated item exactly once, in the row of its anchor week', () => {
    const rows = buildRows({ events, visitWeeks: visits, nowWeek: null, crossWeek: null })
    const seen = new Map<string, number>()
    for (const r of rows) {
      if (r.type !== 'week') continue
      for (const e of [...r.us, ...r.kr]) {
        expect(e.anchor).toBe(r.week)
        seen.set(e.id, (seen.get(e.id) ?? 0) + 1)
      }
    }
    for (const e of events.filter((x) => !x.anytime)) expect(seen.get(e.id), e.id).toBe(1)
  })

  it('keeps weeks in order, collapses empty stretches, and always shows now / move weeks', () => {
    const rows = buildRows({ events, visitWeeks: visits, nowWeek: 25, crossWeek: 29 })
    const weeks = rows.filter((r) => r.type === 'week').map((r) => (r as { week: number }).week)
    expect([...weeks].sort((a, b) => a - b)).toEqual(weeks)
    expect(weeks).toContain(25)
    expect(weeks).toContain(29)
    expect(rows.some((r) => r.type === 'gap')).toBe(true)
    expect(rows.filter((r) => r.type === 'trimester')).toHaveLength(3)
  })

  it('can start from the current week', () => {
    const rows = buildRows({ events, visitWeeks: visits, nowWeek: 30, crossWeek: null, fromWeek: 30 })
    const weeks = rows.filter((r) => r.type === 'week').map((r) => (r as { week: number }).week)
    expect(Math.min(...weeks)).toBe(30)
    expect(rows[0]).toMatchObject({ type: 'trimester', tri: 3 })
  })
})

describe('routine check-up content', () => {
  const ids = (week: number, c: ('us' | 'kr')[]) => checksAt(week, c).map((x) => x.id)

  it('adds checks as pregnancy progresses, per country', () => {
    expect(ids(12, ['us'])).toEqual(expect.arrayContaining(['bp', 'weight', 'heartbeat', 'urine-us']))
    expect(ids(12, ['us'])).not.toContain('fundal')
    expect(ids(24, ['us'])).toContain('fundal')
    expect(ids(24, ['kr'])).not.toContain('fundal') // growth by ultrasound in Korea
    expect(ids(24, ['kr'])).toEqual(expect.arrayContaining(['urine-kr', 'ultrasound-kr']))
    expect(ids(30, ['kr'])).not.toContain('nst-kr')
    expect(ids(32, ['kr'])).toContain('nst-kr')
    expect(ids(36, ['us', 'kr'])).toEqual(expect.arrayContaining(['position', 'labor-plan', 'warning-signs']))
    expect(ids(37, ['us'])).not.toContain('warning-signs')
    expect(ids(37, ['us'])).toContain('cervix-us')
  })

  it('picks whose care a week shows', () => {
    expect(countriesAtWeek('both', 20, null)).toEqual(['us', 'kr'])
    expect(countriesAtWeek('path', 20, 28)).toEqual(['us'])
    expect(countriesAtWeek('path', 28, 28)).toEqual(['kr'])
    expect(countriesAtWeek('kr', 20, 28)).toEqual(['kr'])
  })

  it('finds the next check-up', () => {
    const cad = cadenceFor('us')
    expect(nextVisitWeek(days(24, 4), cad)).toBe(24) // still in week 24
    expect(nextVisitWeek(days(25, 0), cad)).toBe(28)
    expect(nextVisitWeek(days(40, 6), cad)).toBe(40)
    expect(nextVisitWeek(days(41, 0), cad)).toBeNull()
  })

  it('lists one-off items still open at a visit, not those listed that week', () => {
    const us = timelineFor('us')
    const at30 = openAtVisit(30, us).map((e) => e.id)
    expect(at30).toContain('us-tdap') // 27–36, listed under 28
    expect(at30).not.toContain('us-movement') // ongoing
    expect(at30).not.toContain('us-anti-d') // condition-only
    expect(openAtVisit(24, timelineFor('kr')).map((e) => e.id)).not.toContain('kr-iron') // not a clinic procedure
    expect(openAtVisit(28, us).map((e) => e.id)).not.toContain('us-tdap') // shown in its own row
  })
})

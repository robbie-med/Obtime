import { describe, it, expect } from 'vitest'
import { COMPARISON } from '../data/comparison'
import { US_TIMELINE, US_CADENCE } from '../data/timeline.us'
import { KR_TIMELINE, KR_CADENCE } from '../data/timeline.kr'
import { DEV_WEEKS } from '../data/development'
import { RED_FLAGS } from '../data/redflags'
import { GLOSSARY } from '../data/glossary'
import { PREP_QUESTIONS } from '../data/prepQuestions'
import { RESOURCES } from '../data/resources'
import { SOURCES, isKnownSource } from '../data/sources'
import { CROSSOVER_STEPS, TRAVEL_TIMING } from '../data/logistics'
import { WEEK_MARKERS, OPTION_GROUPS } from '../data/timeline.shared'
import { NUTRITION, NUTRITION_INTRO } from '../data/nutrition'
import { EXERCISE, EXERCISE_INTRO } from '../data/exercise'
import { INDEX } from '../data/indexTerms'
import {
  eddFromLmp,
  gaFromEdd,
  resolveEdd,
  parseDate,
} from '../lib/dating'

// One bag of every dataset, so the invariants below cover the whole content layer.
const ALL: unknown[] = [
  COMPARISON,
  US_TIMELINE,
  KR_TIMELINE,
  US_CADENCE,
  KR_CADENCE,
  DEV_WEEKS,
  RED_FLAGS,
  GLOSSARY,
  PREP_QUESTIONS,
  RESOURCES,
  SOURCES,
  CROSSOVER_STEPS,
  TRAVEL_TIMING,
  WEEK_MARKERS,
  OPTION_GROUPS,
  NUTRITION,
  NUTRITION_INTRO,
  EXERCISE,
  EXERCISE_INTRO,
  INDEX,
]

type Visitor = (node: Record<string, unknown>, path: string) => void

function walk(node: unknown, path: string, visit: Visitor): void {
  if (Array.isArray(node)) {
    node.forEach((n, i) => walk(n, `${path}[${i}]`, visit))
  } else if (node && typeof node === 'object') {
    visit(node as Record<string, unknown>, path)
    for (const key of Object.keys(node)) {
      walk((node as Record<string, unknown>)[key], `${path}.${key}`, visit)
    }
  }
}

describe('content is fully bilingual', () => {
  it('every {en, ko} node has non-empty English AND Korean', () => {
    const failures: string[] = []
    for (const dataset of ALL) {
      walk(dataset, 'root', (node, path) => {
        const hasEn = 'en' in node
        const hasKo = 'ko' in node
        if (!hasEn && !hasKo) return
        // A bilingual pair must have both, as non-empty strings.
        const en = node.en
        const ko = node.ko
        if (typeof en !== 'string' || en.trim() === '') failures.push(`${path}.en`)
        if (typeof ko !== 'string' || ko.trim() === '') failures.push(`${path}.ko`)
      })
    }
    expect(failures, `Missing/empty translations:\n${failures.join('\n')}`).toEqual([])
  })
})

describe('citations resolve', () => {
  it('every referenced sourceId exists in SOURCES', () => {
    const unknown: string[] = []
    for (const dataset of ALL) {
      walk(dataset, 'root', (node, path) => {
        const ids = node.sourceIds
        if (Array.isArray(ids)) {
          for (const id of ids) {
            if (typeof id !== 'string' || !isKnownSource(id)) {
              unknown.push(`${path}: ${String(id)}`)
            }
          }
        }
      })
    }
    expect(unknown, `Unknown source ids:\n${unknown.join('\n')}`).toEqual([])
  })

  it('has no duplicate source ids', () => {
    const ids = SOURCES.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('unique ids within each collection', () => {
  const collections: Record<string, { id: string }[]> = {
    US_TIMELINE,
    KR_TIMELINE,
    RED_FLAGS,
    GLOSSARY,
    PREP_QUESTIONS,
    RESOURCES,
    CROSSOVER_STEPS,
    WEEK_MARKERS,
    INDEX,
    NUTRITION,
    EXERCISE,
  }
  for (const [name, coll] of Object.entries(collections)) {
    it(`${name} has unique ids`, () => {
      const ids = coll.map((x) => x.id)
      expect(new Set(ids).size, `duplicate id in ${name}`).toBe(ids.length)
    })
  }
})

const EVENTS = [...US_TIMELINE, ...KR_TIMELINE]

describe('timeline windows are valid', () => {
  it('every event anchor sits within (or at) its window', () => {
    const bad: string[] = []
    for (const ev of EVENTS) {
      const end = ev.window.end ?? 45
      if (ev.anchor < ev.window.start || ev.anchor > end) {
        bad.push(`${ev.id}: anchor ${ev.anchor} outside ${ev.window.start}–${ev.window.end ?? '∞'}`)
      }
    }
    expect(bad, bad.join('\n')).toEqual([])
  })

  it('windows (and ideal sub-windows) run forwards, with days 0–6', () => {
    const bad: string[] = []
    for (const ev of EVENTS) {
      for (const w of [ev.window, ev.ideal].filter(Boolean) as (typeof ev.window)[]) {
        const from = w.start * 7 + (w.startDay ?? 0)
        const to = w.end == null ? Infinity : w.end * 7 + (w.endDay ?? 6)
        if (to < from) bad.push(`${ev.id}: window ends before it starts`)
        for (const d of [w.startDay, w.endDay]) if (d != null && (d < 0 || d > 6)) bad.push(`${ev.id}: day ${d}`)
        if (w.start < 0 || (w.end ?? 0) > 42) bad.push(`${ev.id}: week out of range`)
      }
      if (ev.ideal) {
        const inside =
          ev.ideal.start >= ev.window.start && (ev.window.end == null || (ev.ideal.end ?? 99) <= ev.window.end)
        if (!inside) bad.push(`${ev.id}: ideal window outside full window`)
      }
    }
    expect(bad, bad.join('\n')).toEqual([])
  })

  it('indicated items say who they are for; option groups exist', () => {
    const bad: string[] = []
    for (const ev of EVENTS) {
      if (ev.tier === 'indicated' && !ev.condition) bad.push(`${ev.id}: indicated without condition`)
      if (ev.optionGroup && !(ev.optionGroup in OPTION_GROUPS)) bad.push(`${ev.id}: unknown group ${ev.optionGroup}`)
    }
    expect(bad, bad.join('\n')).toEqual([])
  })

  it('every timeline item cites at least one source', () => {
    const bad = EVENTS.filter((ev) => !ev.sourceIds?.length).map((ev) => ev.id)
    expect(bad).toEqual([])
  })

  it('event ids are unique across both countries', () => {
    const ids = EVENTS.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('pins guideline-exact windows', () => {
    const w = (id: string) => EVENTS.find((e) => e.id === id)!.window
    expect(w('us-gbs')).toEqual({ start: 36, end: 37 }) // ACOG: 36w0d–37w6d
    expect(w('us-rsv')).toEqual({ start: 32, end: 36 }) // CDC: 32w0d–36w6d
    expect(w('us-tdap')).toEqual({ start: 27, end: 36 })
    expect(w('kr-maternity-leave')).toMatchObject({ start: 33, startDay: 5 }) // 280 − 44 days
  })
})

describe('index links resolve', () => {
  const ids = new Set(INDEX.map((e) => e.id))
  it('every indexIds / related reference points at a real entry', () => {
    const bad: string[] = []
    const check = (where: string, list?: string[]) =>
      list?.forEach((id) => !ids.has(id) && bad.push(`${where} → ${id}`))
    EVENTS.forEach((e) => check(e.id, e.indexIds))
    WEEK_MARKERS.forEach((m) => check(m.id, m.indexIds))
    NUTRITION.forEach((s) => check(s.id, s.indexIds))
    EXERCISE.forEach((s) => check(s.id, s.indexIds))
    INDEX.forEach((e) => check(e.id, e.related))
    expect(bad, bad.join('\n')).toEqual([])
  })
})

describe('dating math (Naegele + GA + discrepancy)', () => {
  it('EDD = LMP + 280 days', () => {
    const lmp = parseDate('2026-01-01')!
    const edd = eddFromLmp(lmp)
    const days = Math.round((edd.getTime() - lmp.getTime()) / 86_400_000)
    expect(days).toBe(280)
    expect(edd.toISOString().slice(0, 10)).toBe('2026-10-08')
  })

  it('GA is computed correctly from EDD', () => {
    const edd = parseDate('2026-10-08')! // implies LMP 2026-01-01
    const today = parseDate('2026-04-11')! // 100 days after LMP = 14w2d
    const ga = gaFromEdd(edd, today)
    expect(ga.weeks).toBe(14)
    expect(ga.days).toBe(2)
    expect(ga.trimester).toBe(2)
  })

  it('keeps LMP EDD when discrepancy is within threshold', () => {
    const lmpEdd = parseDate('2026-10-08')!
    const usEdd = parseDate('2026-10-11')! // 3 day diff at 8wk (threshold 5)
    const r = resolveEdd(lmpEdd, usEdd, 8)
    expect(r.usedUltrasound).toBe(false)
    expect(r.edd.toISOString().slice(0, 10)).toBe('2026-10-08')
  })

  it('uses ultrasound EDD when discrepancy exceeds threshold', () => {
    const lmpEdd = parseDate('2026-10-08')!
    const usEdd = parseDate('2026-10-20')! // 12 day diff at 8wk (threshold 5)
    const r = resolveEdd(lmpEdd, usEdd, 8)
    expect(r.usedUltrasound).toBe(true)
    expect(r.edd.toISOString().slice(0, 10)).toBe('2026-10-20')
  })
})

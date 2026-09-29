// --- Core content model -----------------------------------------------------
// Every human-readable string in the content layer is a bilingual pair.
export interface Bilingual {
  en: string
  ko: string
}

export type Country = 'us' | 'kr'
export type Audience = 'mom' | 'clinician' | 'both'
export type Lang = 'en' | 'ko'

// A gestational-age window in completed weeks (+ optional days).
// Semantics are inclusive and day-precise: { start: 36, end: 37 } means
// 36w0d through 37w6d. `startDay` / `endDay` narrow that when a guideline is
// day-specific (e.g. NT 10w3d–13w6d → { start: 10, startDay: 3, end: 13 }).
// `end` omitted means "from `start` until birth".
export interface GaWindow {
  start: number
  startDay?: number // default 0
  end?: number
  endDay?: number // default 6
}

// --- Timeline ---------------------------------------------------------------
export type EventKind =
  | 'visit'
  | 'lab'
  | 'ultrasound'
  | 'screening' // risk estimate (e.g. NIPT, quad)
  | 'diagnostic' // definitive test (CVS, amnio)
  | 'vaccine'
  | 'medication' // supplements & preventive medicines (folate, iron, aspirin)
  | 'monitoring' // ongoing checks (fundal height, kick counts, NST)
  | 'admin' // paperwork, benefits, bookings
  | 'milestone'

/**
 * Who an item is for.
 *  - routine: everyone gets it
 *  - offered: offered to everyone, but it is your choice
 *  - indicated: only if a condition applies (see `condition`)
 */
export type Tier = 'routine' | 'offered' | 'indicated'

export interface TimelineEvent {
  id: string
  country: Country
  kind: EventKind
  /** The week row the item is listed under — the usual / ideal week. */
  anchor: number
  /** The full recommended window. Drives the status (earlier / due now / coming up). */
  window: GaWindow
  /** The best part of the window, when narrower (e.g. Tdap: best 27–28w). */
  ideal?: GaWindow
  /** Not tied to a week (e.g. flu shot in season): shown in the "any time" strip. */
  anytime?: boolean
  /** Extra timing note shown next to the window (e.g. "Sep–Jan only"). */
  timing?: Bilingual
  tier: Tier
  /** For `indicated` (and some `offered`) items: who it is for. */
  condition?: Bilingual
  /** Alternatives sharing an id are "choose one" options (see OPTION_GROUPS). */
  optionGroup?: string
  title: Bilingual
  summary: Bilingual // mom-facing plain language: what to expect
  clinicianDetail?: Bilingual // thresholds, guideline specifics — clinician mode
  sourceIds?: string[]
  /** Index entries that explain the terms used here. */
  indexIds?: string[]
}

// Recurring visit cadence — a rhythm over a span of weeks, not a single event.
// Expanded into one "check-up" marker per visit week on the timeline.
export interface VisitCadence {
  country: Country
  from: number
  to: number
  stepWeeks: number
  every: Bilingual // e.g. "every 4 weeks"
  detail: Bilingual // what happens at each of these visits
  sourceIds?: string[]
}

// A definition marker on the week axis shared by both countries
// (e.g. "39w0d · Full term"), shown in the week's header.
export interface WeekMarker {
  id: string
  week: number
  label: Bilingual
  detail: Bilingual
  sourceIds?: string[]
  indexIds?: string[]
}

// --- Routine check-ups -------------------------------------------------------
// The in-between visits (every 4 → 2 → 1 weeks) have no headline test, but each
// one is doing real screening. These explain why the visit exists and what is
// done, so a "nothing happened" visit reads as the safety check it is.

/** One thing checked at routine visits, from `fromWeek` (to `toWeek`) on. */
export interface RoutineCheck {
  id: string
  /** 'both' = done in both countries; otherwise only in that country's care */
  country: Country | 'both'
  fromWeek: number
  toWeek?: number
  label: Bilingual
  /** why it is checked — one or two plain sentences */
  why: Bilingual
  sourceIds?: string[]
}

/** What is specific to the check-up in one week. */
export interface VisitNote {
  week: number
  /** short headline: what this visit is really about */
  focus: Bilingual
  /** why this visit exists at this point in pregnancy */
  why: Bilingual
  /** things to bring up / questions to ask (bilingual so they can be shown to a clinician) */
  ask?: Bilingual[]
  sourceIds?: string[]
}

// --- Side-by-side comparison ------------------------------------------------
export interface CompareRow {
  id: string
  topic: Bilingual
  us: Bilingual
  kr: Bilingual
  clinicianNote?: Bilingual
  sourceIds?: string[]
}

export interface CompareSection {
  id: string
  title: Bilingual
  rows: CompareRow[]
}

// --- Week-by-week development & discomforts ----------------------------------
export interface DevWeek {
  week: number // gestational week this entry begins to apply
  trimester: 1 | 2 | 3
  fetal: Bilingual
  maternal: Bilingual
  discomforts?: Bilingual[]
  sourceIds?: string[]
}

// --- Warning signs ("when to call") -----------------------------------------
export interface RedFlag {
  id: string
  sign: Bilingual
  action: Bilingual
  urgent: boolean
}

// --- Clinic glossary (point-to-translate) -----------------------------------
export interface GlossaryTerm {
  id: string
  en: string
  ko: string
  koRomanized?: string
  category: 'test' | 'visit' | 'anatomy' | 'admin' | 'symptom' | 'general'
  note?: Bilingual
}

// --- Appointment prep questions ---------------------------------------------
export interface PrepQuestion {
  id: string
  phase: 'first' | 'second' | 'third' | 'any'
  question: Bilingual
  audience: Audience
}

// --- External resources ------------------------------------------------------
export interface Resource {
  id: string
  name: Bilingual
  url: string
  country: Country
  audience: Audience
  lang: Lang[]
  description: Bilingual
}

// --- Index (A–Z definitions) ------------------------------------------------
export type IndexCategory =
  | 'test'
  | 'condition'
  | 'care'
  | 'medicine'
  | 'benefit'
  | 'nutrition'
  | 'exercise'
  | 'general'

export interface IndexEntry {
  id: string
  term: Bilingual
  /** Abbreviations and other names people search for (e.g. "NIPT", "니프티"). */
  aka?: string[]
  koRomanized?: string
  category: IndexCategory
  /** One-sentence definition. */
  definition: Bilingual
  /** Plain-language explanation: why it matters, what to expect. */
  explanation: Bilingual
  /** Clinician-level specifics (thresholds, guideline numbers). */
  clinician?: Bilingual
  sourceIds?: string[]
  /** Other index entries worth reading next. */
  related?: string[]
  /** An in-app section that covers this in depth. */
  section?: 'nutrition' | 'exercise' | 'crossover' | 'compare' | 'trackers'
}

// --- Long-form guides (Nutrition, Exercise) --------------------------------
export type GuideBlock = { sourceIds?: string[]; clinicianOnly?: boolean } & (
  | { type: 'text'; body: Bilingual }
  | { type: 'bullets'; title?: Bilingual; items: Bilingual[] }
  | { type: 'callout'; tone: 'tip' | 'warn' | 'info' | 'new'; title: Bilingual; body: Bilingual }
  | { type: 'table'; caption?: Bilingual; head: Bilingual[]; rows: Bilingual[][] }
  | { type: 'takeaway'; body: Bilingual }
)

export interface GuideSection {
  id: string
  title: Bilingual
  /** one-line summary shown in the contents list */
  lede: Bilingual
  blocks: GuideBlock[]
  indexIds?: string[]
}

// --- Citations ---------------------------------------------------------------
export interface Source {
  id: string
  label: Bilingual
  org: string
  url: string
  accessed: string // ISO date
}

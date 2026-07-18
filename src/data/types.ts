// --- Core content model -----------------------------------------------------
// Every human-readable string in the content layer is a bilingual pair.
export interface Bilingual {
  en: string
  ko: string
}

export type Country = 'us' | 'kr'
export type Audience = 'mom' | 'clinician' | 'both'
export type Lang = 'en' | 'ko'

// A gestational-age window, expressed in weeks (inclusive start, inclusive end).
// `end` omitted means "from `start` onward". Used to place events on the timeline
// and to compute whether a checklist item is due / upcoming / past.
export interface GaWindow {
  start: number
  end?: number
}

// --- Timeline ---------------------------------------------------------------
export type EventKind =
  | 'visit'
  | 'lab'
  | 'ultrasound'
  | 'screening'
  | 'vaccine'
  | 'milestone'

export interface TimelineEvent {
  id: string
  country: Country
  kind: EventKind
  window: GaWindow
  title: Bilingual
  summary: Bilingual // mom-facing plain language
  clinicianDetail?: Bilingual // thresholds, guideline specifics — clinician mode only
  routine: boolean // true = offered to everyone; false = indication-based
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

// --- Citations ---------------------------------------------------------------
export interface Source {
  id: string
  label: Bilingual
  org: string
  url: string
  accessed: string // ISO date
}

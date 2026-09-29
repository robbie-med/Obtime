// Versioned localStorage persistence with export/import. No network, no backend.
// Everything the user enters stays on-device unless they explicitly export a file.

export const STORAGE_KEY = 'machung.profile.v1'
export const SCHEMA_VERSION = 1

export type DatingMethod = 'lmp' | 'edd' | 'ultrasound'
export type DeliveryPlan = 'us' | 'kr' | 'crossover' | 'undecided'

export interface WeightEntry {
  ga: number // gestational weeks (decimal) at measurement
  kg: number
}

export interface KickSession {
  startedAt: string // ISO
  count: number
  durationMin?: number
}

export interface Note {
  id: string
  createdAt: string // ISO
  visitLabel?: string
  text: string
}

export interface Profile {
  version: number
  // Dating — store the raw input the user gave plus the derived EDD.
  lmp?: string // ISO date
  edd?: string // ISO date (derived or entered)
  datingMethod?: DatingMethod
  deliveryPlan: DeliveryPlan
  // Crossover planning: when the mom moves from US care to Korean care.
  flyDate?: string // ISO date of the planned flight (preferred when a due date is set)
  flyGa?: number // gestational week of the move (used when no due date is set)
  // Personalization inputs
  prePregnancyBmi?: number
  heightCm?: number
  prePregnancyWeightKg?: number
  // Trackers & state
  checklist: Record<string, boolean>
  weights: WeightEntry[]
  kickSessions: KickSession[]
  notes: Note[]
}

export function emptyProfile(): Profile {
  return {
    version: SCHEMA_VERSION,
    deliveryPlan: 'undecided',
    checklist: {},
    weights: [],
    kickSessions: [],
    notes: [],
  }
}

// Migration hook — bump SCHEMA_VERSION and branch here when the shape changes.
function migrate(raw: unknown): Profile {
  const base = emptyProfile()
  if (!raw || typeof raw !== 'object') return base
  const data = raw as Partial<Profile>
  return {
    ...base,
    ...data,
    version: SCHEMA_VERSION,
    checklist: data.checklist ?? {},
    weights: data.weights ?? [],
    kickSessions: data.kickSessions ?? [],
    notes: data.notes ?? [],
    deliveryPlan: data.deliveryPlan ?? 'undecided',
  }
}

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProfile()
    return migrate(JSON.parse(raw))
  } catch {
    return emptyProfile()
  }
}

export function saveProfile(profile: Profile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {
    // Storage may be unavailable (private mode / quota). Fail silently; the
    // in-memory state still works for the session.
  }
}

export function clearProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

// --- Export / import ---------------------------------------------------------
export function exportJson(profile: Profile): string {
  return JSON.stringify({ app: 'machung', exported: true, profile }, null, 2)
}

export interface ImportResult {
  ok: boolean
  profile?: Profile
  error?: string
}

export function importJson(text: string): ImportResult {
  try {
    const parsed = JSON.parse(text)
    const candidate = parsed?.profile ?? parsed
    if (!candidate || typeof candidate !== 'object') {
      return { ok: false, error: 'Not a valid Machung data file.' }
    }
    return { ok: true, profile: migrate(candidate) }
  } catch {
    return { ok: false, error: 'Could not read the file — is it valid JSON?' }
  }
}

// Pregnancy dating helpers.
// Naegele's rule and the US-vs-LMP discrepancy rules are taken directly from the
// clinical reference (Untitled document.txt → "Gestational age and estimated date
// of delivery"): EDD = LMP + 280 days; prefer ultrasound EDD if the discrepancy
// exceeds 5 days (<9 wk), 7 days (9–13 wk).

const MS_PER_DAY = 86_400_000
const GESTATION_DAYS = 280 // 40 weeks

export function parseDate(iso?: string): Date | null {
  if (!iso) return null
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00' : ''))
  return isNaN(d.getTime()) ? null : d
}

export function toIso(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * MS_PER_DAY)
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY)
}

/** EDD from LMP via Naegele's rule (LMP + 280 days). */
export function eddFromLmp(lmp: Date): Date {
  return addDays(lmp, GESTATION_DAYS)
}

/** LMP implied by an EDD (EDD - 280 days). */
export function lmpFromEdd(edd: Date): Date {
  return addDays(edd, -GESTATION_DAYS)
}

export interface GestationalAge {
  totalDays: number
  weeks: number
  days: number
  /** decimal weeks, e.g. 24.4 */
  decimalWeeks: number
  trimester: 1 | 2 | 3
  daysUntilDue: number
}

/** Current gestational age given an EDD and a reference "today". */
export function gaFromEdd(edd: Date, today = new Date()): GestationalAge {
  const conceptionRef = lmpFromEdd(edd)
  const totalDays = Math.max(0, daysBetween(conceptionRef, today))
  const weeks = Math.floor(totalDays / 7)
  const days = totalDays % 7
  const trimester: 1 | 2 | 3 = weeks < 14 ? 1 : weeks < 28 ? 2 : 3
  return {
    totalDays,
    weeks,
    days,
    decimalWeeks: Math.round((totalDays / 7) * 10) / 10,
    trimester,
    daysUntilDue: daysBetween(today, edd),
  }
}

export type DiscrepancyResolution = {
  edd: Date
  usedUltrasound: boolean
  discrepancyDays: number
  reason: string
}

/**
 * Reconcile an LMP-based EDD with an ultrasound-dated EDD using the doc's rule:
 *  - > 5 days discrepancy at < 9 weeks → use ultrasound
 *  - > 7 days discrepancy at 9–13(+6) weeks → use ultrasound
 *  - otherwise keep the LMP-based EDD
 * `usGaWeeksAtScan` is the gestational age (in weeks) the ultrasound was performed.
 */
export function resolveEdd(
  lmpEdd: Date,
  ultrasoundEdd: Date,
  usGaWeeksAtScan: number,
): DiscrepancyResolution {
  const discrepancyDays = Math.abs(daysBetween(lmpEdd, ultrasoundEdd))
  let threshold = Infinity
  if (usGaWeeksAtScan < 9) threshold = 5
  else if (usGaWeeksAtScan < 14) threshold = 7
  else threshold = 10 // 2nd trimester (14–16 wk) commonly cited; conservative default

  const usedUltrasound = discrepancyDays > threshold
  return {
    edd: usedUltrasound ? ultrasoundEdd : lmpEdd,
    usedUltrasound,
    discrepancyDays,
    reason: usedUltrasound
      ? `Discrepancy ${discrepancyDays}d exceeds ${threshold}d at ${usGaWeeksAtScan}wk → ultrasound EDD used`
      : `Discrepancy ${discrepancyDays}d within ${threshold}d → LMP EDD kept`,
  }
}

/** Resolve the effective EDD from a profile's raw inputs. */
export function effectiveEdd(profile: {
  lmp?: string
  edd?: string
}): Date | null {
  const edd = parseDate(profile.edd)
  if (edd) return edd
  const lmp = parseDate(profile.lmp)
  if (lmp) return eddFromLmp(lmp)
  return null
}

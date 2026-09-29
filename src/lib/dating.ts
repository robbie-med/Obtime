// Pregnancy dating helpers.
// Naegele's rule and the US-vs-LMP discrepancy rules are taken directly from the
// clinical reference (Untitled document.txt → "Gestational age and estimated date
// of delivery"): EDD = LMP + 280 days; prefer ultrasound EDD if the discrepancy
// exceeds 5 days (<9 wk), 7 days (9–13 wk).

const MS_PER_DAY = 86_400_000
const GESTATION_DAYS = 280 // 40 weeks

// All dates here are *calendar days* in the user's local time zone. A Date is
// always normalised to local midnight, and day differences are counted on the
// calendar (via UTC day numbers) so neither the time of day nor a DST shift nor
// the user's UTC offset (e.g. Korea, UTC+9) can move a result by a day.

export function parseDate(iso?: string): Date | null {
  if (!iso) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.slice(0, 10))
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return isNaN(d.getTime()) ? null : d
}

/** Local calendar date as YYYY-MM-DD (never shifted to UTC). */
export function toIso(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDays(d: Date, days: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days)
}

/** Whole calendar days from a to b (b − a), independent of time of day. */
export function daysBetween(a: Date, b: Date): number {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.round((ub - ua) / MS_PER_DAY)
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
  const lmp = lmpFromEdd(edd)
  const totalDays = Math.max(0, daysBetween(lmp, today))
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

/** Calendar date on which a given gestational age (weeks + days) falls. */
export function dateAtGa(edd: Date, weeks: number, days = 0): Date {
  return addDays(lmpFromEdd(edd), weeks * 7 + days)
}

/** Gestational age (weeks + days) on a given calendar date. */
export function gaOnDate(edd: Date, date: Date): { weeks: number; days: number; totalDays: number } {
  const totalDays = daysBetween(lmpFromEdd(edd), date)
  const weeks = Math.floor(totalDays / 7)
  return { weeks, days: totalDays - weeks * 7, totalDays }
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

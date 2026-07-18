// Recommended gestational weight gain, from the clinical reference
// (Untitled document.txt → "Recommended weight gain during pregnancy").
// Singleton pregnancies only; twin ranges noted in the doc but not modeled here.

export interface WeightTarget {
  category: 'underweight' | 'normal' | 'overweight' | 'obese'
  totalLbRange: [number, number]
  totalKgRange: [number, number]
  weeklyKg2nd3rd: number // recommended lb/week in 2nd–3rd tri, converted to kg
}

export function bmiCategory(bmi: number): WeightTarget['category'] {
  if (bmi < 18.5) return 'underweight'
  if (bmi < 25) return 'normal'
  if (bmi < 30) return 'overweight'
  return 'obese'
}

const TABLE: Record<WeightTarget['category'], WeightTarget> = {
  underweight: {
    category: 'underweight',
    totalLbRange: [28, 40],
    totalKgRange: [12.7, 18.1],
    weeklyKg2nd3rd: 0.45, // ~1 lb/wk (BMI < 25)
  },
  normal: {
    category: 'normal',
    totalLbRange: [25, 35],
    totalKgRange: [11.3, 15.9],
    weeklyKg2nd3rd: 0.45,
  },
  overweight: {
    category: 'overweight',
    totalLbRange: [15, 25],
    totalKgRange: [6.8, 11.3],
    weeklyKg2nd3rd: 0.27, // ~0.6 lb/wk
  },
  obese: {
    category: 'obese',
    totalLbRange: [11, 20],
    totalKgRange: [5, 9.1],
    weeklyKg2nd3rd: 0.23, // ~0.5 lb/wk
  },
}

export function computeBmi(heightCm: number, weightKg: number): number {
  const m = heightCm / 100
  return weightKg / (m * m)
}

export function weightTarget(bmi: number): WeightTarget {
  return TABLE[bmiCategory(bmi)]
}

/**
 * Expected weight (kg above pre-pregnancy) at a given GA for the mom's category.
 * First trimester gain is small (~0.5–2 kg); we model ~1 kg by 13 wk then the
 * category weekly rate thereafter. Returns a low/high band.
 */
export function expectedGainBand(
  bmi: number,
  gaWeeks: number,
): [number, number] {
  const t = weightTarget(bmi)
  const firstTriGain = t.category === 'underweight' ? 2 : t.category === 'obese' ? 0.5 : 1
  if (gaWeeks <= 13) {
    const frac = Math.max(0, gaWeeks) / 13
    return [firstTriGain * frac * 0.7, firstTriGain * frac * 1.1]
  }
  const weeksAfter = gaWeeks - 13
  const low = firstTriGain + weeksAfter * (t.weeklyKg2nd3rd * 0.8)
  const high = firstTriGain + weeksAfter * (t.weeklyKg2nd3rd * 1.2)
  return [Math.round(low * 10) / 10, Math.round(high * 10) / 10]
}

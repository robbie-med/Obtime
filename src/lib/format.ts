import type { Lang } from '../data/types'

// Locale-aware calendar formatting: "Mar 3" / "3월 3일", ranges collapse the
// shared month ("Mar 3–9" / "3월 3–9일").

const LOCALE: Record<Lang, string> = { en: 'en-US', ko: 'ko-KR' }

export function fmtDay(d: Date, lang: Lang, withYear = false): string {
  return d.toLocaleDateString(LOCALE[lang], {
    month: 'short',
    day: 'numeric',
    ...(withYear ? { year: 'numeric' } : {}),
  })
}

export function fmtRange(a: Date, b: Date, lang: Lang, withYear = false): string {
  const sameMonth = a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
  if (a.getTime() === b.getTime()) return fmtDay(a, lang, withYear)
  if (sameMonth && !withYear) {
    return lang === 'ko'
      ? `${a.getMonth() + 1}월 ${a.getDate()}–${b.getDate()}일`
      : `${fmtDay(a, lang)}–${b.getDate()}`
  }
  return `${fmtDay(a, lang, withYear)} – ${fmtDay(b, lang, withYear)}`
}

/** "24w5d" / "24주 5일" */
export function fmtGa(weeks: number, days: number, lang: Lang): string {
  return lang === 'ko' ? `${weeks}주 ${days}일` : `${weeks}w${days}d`
}

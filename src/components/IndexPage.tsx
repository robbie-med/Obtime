import { clsx } from 'clsx'
import { ArrowRight, CalendarRange, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Bilingual, IndexCategory, IndexEntry, Lang } from '../data/types'
import { INDEX, getIndexEntry } from '../data/indexTerms'
import { US_TIMELINE } from '../data/timeline.us'
import { KR_TIMELINE } from '../data/timeline.kr'
import { WEEK_MARKERS } from '../data/timeline.shared'
import { formatWindow } from '../lib/schedule'
import { useNav, type Section } from '../state/navState'
import { useUi } from '../state/uiState'
import { SectionCard, SourceBadges } from './primitives'

const CATEGORY: Record<IndexCategory, Bilingual> = {
  test: { en: 'Tests & scans', ko: '검사·초음파' },
  condition: { en: 'Conditions', ko: '질환·상태' },
  care: { en: 'Care & visits', ko: '진료·관리' },
  medicine: { en: 'Vaccines & medicines', ko: '예방접종·약' },
  benefit: { en: 'Benefits & paperwork', ko: '지원·서류' },
  nutrition: { en: 'Nutrition', ko: '영양' },
  exercise: { en: 'Exercise', ko: '운동' },
  general: { en: 'General', ko: '일반' },
}

const SECTION_NAME: Record<NonNullable<IndexEntry['section']>, Bilingual> = {
  nutrition: { en: 'Nutrition guide', ko: '영양 가이드' },
  exercise: { en: 'Exercise guide', ko: '운동 가이드' },
  crossover: { en: 'Crossover plan', ko: '교차 계획' },
  compare: { en: 'US ⇄ Korea comparison', ko: '미국 ⇄ 한국 비교' },
  trackers: { en: 'Trackers', ko: '기록' },
}

// Korean initial consonant (초성) of a syllable, for ㄱ/ㄴ/ㄷ… grouping.
const CHOSEONG = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
const FOLD: Record<string, string> = { ㄲ: 'ㄱ', ㄸ: 'ㄷ', ㅃ: 'ㅂ', ㅆ: 'ㅅ', ㅉ: 'ㅈ' }
function groupKey(term: string, lang: Lang): string {
  const ch = term.trim().charAt(0)
  const code = ch.charCodeAt(0)
  if (lang === 'ko' && code >= 0xac00 && code <= 0xd7a3) {
    const c = CHOSEONG[Math.floor((code - 0xac00) / 588)]
    return FOLD[c] ?? c
  }
  return /[a-z]/i.test(ch) ? ch.toUpperCase() : '#'
}

/** Timeline items (and week markers) that point at an index entry. */
function backLinks(id: string) {
  const events = [...US_TIMELINE, ...KR_TIMELINE].filter((e) => e.indexIds?.includes(id))
  const markers = WEEK_MARKERS.filter((m) => m.indexIds?.includes(id))
  return { events, markers }
}

export function IndexPage() {
  const { tc, lang, mode } = useUi()
  const { navigate } = useNav()
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<IndexCategory | 'all'>('all')

  const other: Lang = lang === 'en' ? 'ko' : 'en'
  const q = query.trim().toLowerCase()

  const entries = useMemo(() => {
    const collator = new Intl.Collator(lang === 'en' ? 'en' : 'ko')
    return INDEX.filter((e) => cat === 'all' || e.category === cat)
      .filter((e) => {
        if (!q) return true
        const hay = [e.term.en, e.term.ko, e.koRomanized ?? '', ...(e.aka ?? []), e.definition.en, e.definition.ko]
          .join(' ')
          .toLowerCase()
        return hay.includes(q)
      })
      .sort((a, b) => collator.compare(a.term[lang], b.term[lang]))
  }, [cat, q, lang])

  const groups = useMemo(() => {
    const m = new Map<string, IndexEntry[]>()
    for (const e of entries) {
      const k = groupKey(e.term[lang], lang)
      m.set(k, [...(m.get(k) ?? []), e])
    }
    return [...m.entries()]
  }, [entries, lang])

  return (
    <div className="space-y-4">
      <SectionCard
        title={lang === 'en' ? 'Index — terms explained' : '용어 사전'}
        subtitle={
          lang === 'en'
            ? 'Every test, benefit and term used in this guide: what it is, why it matters, where it sits on the timeline, and where to read more. Search in English or Korean.'
            : '이 가이드에 나오는 모든 검사·지원·용어를 정리했습니다: 무엇인지, 왜 중요한지, 타임라인 어디에 있는지, 더 읽을 곳까지. 한국어나 영어로 검색하세요.'
        }
      >
        <label className="relative block">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search: NIPT, 막달검사, vitamin D, GBS…' : '검색: 니프티, 막달검사, 비타민 D, GBS…'}
            className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink focus:border-primary focus:outline-none"
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(['all', ...Object.keys(CATEGORY)] as (IndexCategory | 'all')[]).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={clsx(
                'rounded-full px-2.5 py-1 text-xs font-medium ring-1',
                cat === c ? 'bg-primary text-white ring-primary' : 'bg-surface text-accentink ring-line hover:bg-primarysoft',
              )}
            >
              {c === 'all' ? (lang === 'en' ? 'All' : '전체') : tc(CATEGORY[c])}
            </button>
          ))}
        </div>
        {groups.length > 1 && (
          <nav className="mt-3 flex flex-wrap gap-1 text-sm" aria-label={lang === 'en' ? 'Jump to letter' : '초성으로 이동'}>
            {groups.map(([k]) => (
              <a
                key={k}
                href={`#index/letter-${k}`}
                onClick={(ev) => {
                  ev.preventDefault()
                  document.getElementById(`letter-${k}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="min-w-7 rounded-md px-1.5 py-0.5 text-center font-semibold text-accentink ring-1 ring-line hover:bg-primarysoft"
              >
                {k}
              </a>
            ))}
          </nav>
        )}
        <p className="mt-2 text-xs text-muted">
          {lang === 'en' ? `${entries.length} of ${INDEX.length} terms` : `${INDEX.length}개 중 ${entries.length}개`}
        </p>
      </SectionCard>

      {groups.map(([k, list]) => (
        <section key={k} id={`letter-${k}`} className="scroll-mt-40">
          <h2 className="mb-2 px-1 text-lg font-bold text-accentink">{k}</h2>
          <div className="space-y-3">
            {list.map((e) => (
              <EntryCard key={e.id} e={e} other={other} clinician={mode === 'clinician'} navigate={navigate} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function EntryCard({
  e,
  other,
  clinician,
  navigate,
}: {
  e: IndexEntry
  other: Lang
  clinician: boolean
  navigate: (s: Section, anchor?: string) => void
}) {
  const { tc, lang } = useUi()
  const { events, markers } = backLinks(e.id)
  return (
    <article id={`term-${e.id}`} className="scroll-mt-40 rounded-2xl border border-line bg-surface p-4 shadow-sm">
      <header className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3 className="text-lg font-semibold text-ink">{e.term[lang]}</h3>
        <span className="text-sm text-muted">
          {e.term[other]}
          {e.koRomanized && <span className="italic text-faint"> · {e.koRomanized}</span>}
        </span>
        <span className="ml-auto rounded-full bg-surface2 px-2 py-0.5 text-[11px] font-medium text-muted">
          {tc(CATEGORY[e.category])}
        </span>
      </header>
      {e.aka && e.aka.length > 0 && (
        <p className="mt-0.5 text-xs text-faint">
          {lang === 'en' ? 'Also called: ' : '다른 이름: '}
          {e.aka.join(', ')}
        </p>
      )}
      <p className="mt-2 text-[15px] font-medium leading-relaxed text-ink">{tc(e.definition)}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink">{tc(e.explanation)}</p>
      {clinician && e.clinician && (
        <p className="mt-2 rounded-lg bg-surface2/60 px-3 py-2 text-[13px] leading-relaxed text-ink">{tc(e.clinician)}</p>
      )}

      {(events.length > 0 || markers.length > 0 || e.section || (e.related && e.related.length > 0)) && (
        <div className="mt-3 space-y-1.5 border-t border-line pt-2.5 text-xs">
          {(events.length > 0 || markers.length > 0) && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-muted">
                <CalendarRange size={12} />
                {lang === 'en' ? 'On the timeline:' : '타임라인:'}
              </span>
              {events.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => navigate('timeline', ev.id)}
                  className="rounded-full px-2 py-0.5 text-ink ring-1 ring-line hover:bg-primarysoft"
                >
                  <span
                    className="mr-1 font-bold uppercase"
                    style={{ color: ev.country === 'us' ? 'var(--color-us)' : 'var(--color-kr)' }}
                  >
                    {ev.country}
                  </span>
                  {ev.anytime ? (lang === 'en' ? 'any week' : '어느 주든') : formatWindow(ev.window, lang)}
                </button>
              ))}
              {markers.map((m) => (
                <button
                  key={m.id}
                  onClick={() => navigate('timeline', `week-${m.week}`)}
                  className="rounded-full px-2 py-0.5 text-ink ring-1 ring-line hover:bg-primarysoft"
                >
                  {tc(m.label)}
                </button>
              ))}
            </div>
          )}
          {e.section && (
            <button
              onClick={() => navigate(e.section!)}
              className="inline-flex items-center gap-1 font-medium text-accentink hover:underline"
            >
              {lang === 'en' ? 'Read more in the ' : '더 보기: '}
              {tc(SECTION_NAME[e.section])}
              <ArrowRight size={12} />
            </button>
          )}
          {e.related && e.related.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-muted">{lang === 'en' ? 'See also:' : '함께 보기:'}</span>
              {e.related.map((id) => {
                const r = getIndexEntry(id)
                return r ? (
                  <a
                    key={id}
                    href={`#index/term-${id}`}
                    className="text-accentink underline decoration-dotted underline-offset-2 hover:decoration-solid"
                  >
                    {tc(r.term)}
                  </a>
                ) : null
              })}
            </div>
          )}
        </div>
      )}
      {e.sourceIds && e.sourceIds.length > 0 && (
        <div className="mt-2 text-right text-xs text-faint">
          {lang === 'en' ? 'Sources' : '출처'}
          <SourceBadges ids={e.sourceIds} />
        </div>
      )}
    </article>
  )
}

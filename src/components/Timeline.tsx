import { clsx } from 'clsx'
import { Crosshair, ListFilter, Plane, Stethoscope } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { EventKind, TimelineEvent } from '../data/types'
import { dateAtGa } from '../lib/dating'
import { fmtDay, fmtGa, fmtRange } from '../lib/format'
import {
  cadenceFor,
  crossoverGa,
  defaultView,
  eventsForView,
  straddles,
  windowStatus,
  visitWeeks,
  type TimelineView,
} from '../lib/schedule'
import { buildRows, type WeekRow } from '../lib/timelineRows'
import { useNav } from '../state/navState'
import { useProfile } from '../state/profileState'
import { useUi } from '../state/uiState'
import { SectionCard } from './primitives'
import { CrossoverPicker } from './timeline/CrossoverPicker'
import { EventCard } from './timeline/EventCard'
import { COUNTRY_COLOR, COUNTRY_NAME, KIND_META, KIND_ORDER, TIER_META } from './timeline/meta'

const VIEWS: { id: TimelineView; en: string; ko: string }[] = [
  { id: 'us', en: 'US', ko: '미국' },
  { id: 'kr', en: 'Korea', ko: '한국' },
  { id: 'both', en: 'Both', ko: '둘 다' },
  { id: 'path', en: 'US → Korea', ko: '미국 → 한국' },
]

const TRI_LABEL = {
  1: { en: '1st trimester', ko: '임신 초기 (1삼분기)' },
  2: { en: '2nd trimester', ko: '임신 중기 (2삼분기)' },
  3: { en: '3rd trimester', ko: '임신 말기 (3삼분기)' },
}

export function Timeline() {
  const { tc, lang, mode } = useUi()
  const { ga, edd, profile } = useProfile()
  const { anchor } = useNav()

  const cross = crossoverGa(profile, edd)
  const crossWeek = cross?.weeks ?? null
  const [viewChoice, setViewChoice] = useState<TimelineView | null>(null)
  const planView = defaultView(profile.deliveryPlan, crossWeek)
  // A deep link to an item the plan's view hides (e.g. from the index) opens "Both".
  const linkedHidden =
    !!anchor &&
    eventsForView('both', null).some((e) => e.id === anchor) &&
    !eventsForView(planView, crossWeek).some((e) => e.id === anchor)
  const view = viewChoice ?? (linkedHidden ? 'both' : planView)
  const pathActive = view === 'path' && crossWeek != null

  const [kinds, setKinds] = useState<Set<EventKind>>(() => new Set(KIND_ORDER))
  const [everyoneOnly, setEveryoneOnly] = useState(false)
  const [hideEarlier, setHideEarlier] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const cadence = cadenceFor('us') // identical rhythm in both countries
  const visits = useMemo(() => new Set(kinds.has('visit') ? visitWeeks(cadence) : []), [cadence, kinds])

  const events = useMemo(
    () =>
      eventsForView(view, crossWeek).filter(
        (e) => kinds.has(e.kind) && (!everyoneOnly || e.tier === 'routine'),
      ),
    [view, crossWeek, kinds, everyoneOnly],
  )
  const anytime = events.filter((e) => e.anytime)
  const rows = buildRows({
    events,
    visitWeeks: visits,
    nowWeek: ga?.weeks ?? null,
    crossWeek: pathActive ? crossWeek : null,
    fromWeek: hideEarlier && ga ? ga.weeks : undefined,
  })


  const twoCols = view === 'both'
  const crossLabel = cross
    ? fmtGa(cross.weeks, cross.days, lang) +
      (edd ? ` · ${fmtDay(dateAtGa(edd, cross.weeks, cross.days), lang)}` : '')
    : ''

  const toggleKind = (k: EventKind) =>
    setKinds((prev) => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })

  return (
    <SectionCard
      title={lang === 'en' ? 'Prenatal timeline' : '산전 관리 타임라인'}
      subtitle={
        lang === 'en'
          ? 'Every visit, test, vaccine and to-do, listed under the week it happens — with the full window it can be done in and, once your due date is set, the actual calendar dates.'
          : '모든 진료·검사·예방접종·할 일을 해당 주수 아래에 정리했습니다 — 시행 가능한 전체 기간과, 예정일을 입력하면 실제 날짜까지 표시합니다.'
      }
    >
      {/* ---- Controls ---- */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="radiogroup"
            aria-label={lang === 'en' ? 'Which country' : '국가 선택'}
            className="inline-flex overflow-hidden rounded-lg border border-line bg-surface text-sm"
          >
            {VIEWS.map((v) => (
              <button
                key={v.id}
                role="radio"
                aria-checked={view === v.id}
                onClick={() => setViewChoice(v.id)}
                className={clsx(
                  'px-3 py-1.5 font-medium',
                  view === v.id ? 'bg-primary text-white' : 'text-accentink hover:bg-surface2',
                )}
              >
                {lang === 'en' ? v.en : v.ko}
              </button>
            ))}
          </div>
          {ga && (
            <button
              onClick={() => document.getElementById('week-now')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-accent/40 bg-rose-accent/10 px-3 py-1.5 text-sm font-medium text-rose-accent hover:bg-rose-accent/15"
            >
              <Crosshair size={14} />
              {lang === 'en' ? `Jump to this week (${fmtGa(ga.weeks, ga.days, lang)})` : `이번 주로 이동 (${fmtGa(ga.weeks, ga.days, lang)})`}
            </button>
          )}
          <button
            onClick={() => setShowFilters((s) => !s)}
            aria-expanded={showFilters}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-accentink hover:bg-surface2"
          >
            <ListFilter size={14} />
            {lang === 'en' ? 'Filter & legend' : '필터 · 범례'}
            {(kinds.size < KIND_ORDER.length || everyoneOnly || hideEarlier) && (
              <span className="h-2 w-2 rounded-full bg-rose-accent" />
            )}
          </button>
        </div>

        {view === 'path' && (
          <div>
            <CrossoverPicker />
            {!pathActive && (
              <p className="mt-1.5 text-xs text-muted">
                {lang === 'en'
                  ? 'Pick when you move: the timeline then shows US care up to that week and Korean care from then until delivery. Until then, both countries are shown.'
                  : '이동 시점을 선택하면 그 주까지는 미국 진료, 그 이후 분만까지는 한국 진료를 보여줍니다. 선택 전에는 두 나라를 모두 표시합니다.'}
              </p>
            )}
          </div>
        )}

        {showFilters && (
          <div className="space-y-3 rounded-xl border border-line bg-surface p-3">
            <div>
              <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                {lang === 'en' ? 'Show' : '표시 항목'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {KIND_ORDER.map((k) => (
                  <button
                    key={k}
                    onClick={() => toggleKind(k)}
                    aria-pressed={kinds.has(k)}
                    className={clsx(
                      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 transition',
                      kinds.has(k) ? 'bg-primarysoft text-accentink ring-primary/40' : 'bg-surface text-faint ring-line line-through',
                    )}
                  >
                    {KIND_META[k].icon(13)}
                    {tc(KIND_META[k].label)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={everyoneOnly} onChange={(e) => setEveryoneOnly(e.target.checked)} />
                {lang === 'en' ? 'Only what everyone gets' : '모두가 받는 항목만'}
              </label>
              {ga && (
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={hideEarlier} onChange={(e) => setHideEarlier(e.target.checked)} />
                  {lang === 'en' ? 'Hide earlier weeks' : '지난 주수 숨기기'}
                </label>
              )}
            </div>
            <div className="grid gap-2 border-t border-line pt-3 text-xs text-muted sm:grid-cols-2">
              {(['routine', 'offered', 'indicated'] as const).map((t) => (
                <div key={t} className="flex items-start gap-2">
                  <span className={clsx('shrink-0 rounded-full px-2 py-0.5 font-medium ring-1', TIER_META[t].className)}>
                    {tc(TIER_META[t].label)}
                  </span>
                  {tc(TIER_META[t].explain)}
                </div>
              ))}
              <div className="flex items-start gap-2">
                <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 font-medium text-accentink ring-1 ring-primary/40">
                  {lang === 'en' ? 'Choose one' : '택1'}
                </span>
                {lang === 'en'
                  ? 'Alternatives for the same purpose — pick one approach, not all of them.'
                  : '같은 목적의 대안들 — 모두가 아니라 한 가지 방법을 고르세요.'}
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <span className="shrink-0 font-semibold text-ink">{lang === 'en' ? 'Weeks 24–28' : '24–28주'}</span>
                {lang === 'en'
                  ? 'means from 24 weeks 0 days up to and including 28 weeks 6 days. Clinician view shows the exact days.'
                  : '24주 0일부터 28주 6일까지를 뜻합니다. 의료진용 보기에서는 정확한 일수를 표시합니다.'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---- Visit rhythm ---- */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 font-semibold text-accentink">
          <Stethoscope size={13} />
          {lang === 'en' ? 'Check-ups (US & Korea):' : '정기 진료 (미국·한국 동일):'}
        </span>
        {cadence.map((c) => (
          <span
            key={c.from}
            className="rounded-full border border-line bg-surface px-2.5 py-1 font-medium tabular-nums text-ink"
            title={tc(c.detail)}
          >
            {c.from}–{c.to >= 40 ? (lang === 'en' ? 'birth' : '출산') : `${c.to}${lang === 'en' ? 'w' : '주'}`} ·{' '}
            <span className="text-accentink">{tc(c.every)}</span>
          </span>
        ))}
      </div>

      {/* ---- Any time / seasonal ---- */}
      {anytime.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            {lang === 'en' ? 'Any week of pregnancy' : '임신 중 어느 주든'}
          </h3>
          <div className={clsx('grid gap-2', twoCols ? 'md:grid-cols-2' : '')}>
            {anytime.map((ev) => (
              <EventCard key={ev.id} ev={ev} showCountry />
            ))}
          </div>
        </div>
      )}

      {/* ---- Column headings (two-column desktop view) ---- */}
      {twoCols && (
        <div className="mt-5 hidden grid-cols-[120px_1fr_1fr] gap-3 md:grid">
          <span />
          {(['us', 'kr'] as const).map((c) => (
            <span key={c} className="text-sm font-bold" style={{ color: COUNTRY_COLOR[c] }}>
              {tc(COUNTRY_NAME[c])}
            </span>
          ))}
        </div>
      )}

      {/* ---- Week rows ---- */}
      <ol className="mt-2 space-y-2" aria-label={lang === 'en' ? 'Weeks of pregnancy' : '임신 주수'}>
        {rows.map((row) => {
          if (row.type === 'trimester') {
            const range =
              edd &&
              fmtRange(dateAtGa(edd, row.from), dateAtGa(edd, row.to, 6), lang, true)
            return (
              <li key={`t${row.tri}`} className="pt-4">
                <div className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-primary/30 pb-1">
                  <h3 className="text-base font-bold text-ink">{tc(TRI_LABEL[row.tri])}</h3>
                  <span className="text-xs font-medium tabular-nums text-muted">
                    {mode === 'clinician'
                      ? row.tri === 3
                        ? `${fmtGa(row.from, 0, lang)} – ${lang === 'en' ? 'birth' : '출산'}`
                        : `${fmtGa(row.from, 0, lang)} – ${fmtGa(row.to, 6, lang)}`
                      : lang === 'en'
                        ? `Weeks ${row.from === 0 ? 1 : row.from}–${row.tri === 3 ? '40+' : row.to}`
                        : `${row.from === 0 ? 1 : row.from}–${row.tri === 3 ? '40+' : row.to}주`}
                    {range && ` · ${range}`}
                  </span>
                </div>
              </li>
            )
          }
          if (row.type === 'gap') {
            return (
              <li key={`g${row.from}`} className="flex items-center gap-3 py-0.5 text-xs text-faint">
                <span className="w-[120px] shrink-0 tabular-nums">
                  {row.from === row.to
                    ? lang === 'en' ? `Week ${row.from}` : `${row.from}주`
                    : lang === 'en' ? `Weeks ${row.from}–${row.to}` : `${row.from}–${row.to}주`}
                </span>
                <span className="flex-1 border-t border-dashed border-line" />
                <span>{lang === 'en' ? 'nothing scheduled' : '예정 항목 없음'}</span>
              </li>
            )
          }
          return (
            <WeekRowView
              key={row.week}
              row={row}
              view={view}
              pathActive={pathActive}
              crossWeek={crossWeek}
              crossLabel={crossLabel}
            />
          )
        })}
      </ol>
    </SectionCard>
  )
}

function WeekRowView({
  row,
  view,
  pathActive,
  crossWeek,
  crossLabel,
}: {
  row: WeekRow
  view: TimelineView
  pathActive: boolean
  crossWeek: number | null
  crossLabel: string
}) {
  const { tc, lang } = useUi()
  const { ga, edd } = useProfile()
  const twoCols = view === 'both'
  const dates = edd ? fmtRange(dateAtGa(edd, row.week), dateAtGa(edd, row.week, 6), lang) : null

  const card = (ev: TimelineEvent, showCountry: boolean) => (
    <EventCard
      key={ev.id}
      ev={ev}
      showCountry={showCountry}
      straddle={pathActive && crossWeek != null && straddles(ev, crossWeek)}
      crossLabel={crossLabel}
    />
  )
  const all = [...row.us, ...row.kr]

  return (
    <li
      id={`week-${row.week}`}
      className={clsx(
        'scroll-mt-40 rounded-xl',
        row.isNow && 'bg-rose-accent/5 p-2 ring-2 ring-rose-accent/60',
      )}
    >
      {row.isNow && <span id="week-now" className="block scroll-mt-40" aria-hidden />}
      {row.isCross && pathActive && (
        <div className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white" style={{ backgroundColor: COUNTRY_COLOR.kr }}>
          <Plane size={15} />
          {lang === 'en' ? `Move to Korean care · ${crossLabel}` : `한국 진료로 이동 · ${crossLabel}`}
        </div>
      )}
      <div className={clsx('grid gap-2 md:gap-3', twoCols ? 'md:grid-cols-[120px_1fr_1fr]' : 'md:grid-cols-[120px_1fr]')}>
        {/* Week gutter */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:block md:space-y-1 md:pt-1">
          <div className="text-sm font-bold tabular-nums text-ink">
            {lang === 'en' ? `Week ${row.week}` : `${row.week}주`}
          </div>
          {dates && <div className="text-xs tabular-nums text-muted">{dates}</div>}
          {row.isNow && ga && (
            <div className="inline-block whitespace-nowrap rounded-full bg-rose-accent px-2 py-0.5 text-[11px] font-semibold text-white">
              {lang === 'en' ? 'You are here' : '현재'} · {fmtGa(ga.weeks, ga.days, lang)}
            </div>
          )}
          {row.visit && (
            <div
              className="inline-flex items-center gap-1 rounded-full bg-primarysoft px-2 py-0.5 text-[11px] font-medium text-accentink"
              title={
                lang === 'en'
                  ? 'Routine check-up: weight, blood pressure, urine, baby’s heartbeat, and (from ~24w) fundal height. In Korea, usually an ultrasound too.'
                  : '정기 진료: 체중, 혈압, 소변, 태아 심박, (약 24주부터) 자궁저 높이. 한국은 보통 초음파도 함께.'
              }
            >
              <Stethoscope size={11} />
              {lang === 'en' ? 'Check-up' : '정기 진료'}
            </div>
          )}
        </div>

        {/* Items */}
        {row.isNow && all.length === 0 && (
          <NowSummary view={view} crossWeek={pathActive ? crossWeek : null} />
        )}
        {twoCols && all.length > 0 ? (
          <>
            {/* phones: one stacked column with country tags */}
            <div className="space-y-2 md:hidden">
              {all.map((ev) => card(ev, true))}
            </div>
            {(['us', 'kr'] as const).map((c) => (
              <div key={c} className="hidden space-y-2 md:block">
                {row[c].map((ev) => card(ev, false))}
              </div>
            ))}
          </>
        ) : all.length > 0 ? (
          <div className="space-y-2">{all.map((ev) => card(ev, view === 'path'))}</div>
        ) : null}

        {/* Week definitions (e.g. "39w0d · Full term") */}
        {row.markers.length > 0 && (
          <div className={clsx('space-y-2', twoCols ? 'md:col-span-2 md:col-start-2' : 'md:col-start-2')}>
            {row.markers.map((m) => (
              <div key={m.id} className="rounded-lg border border-dashed border-primary/40 px-3 py-2 text-sm">
                <span className="font-semibold text-accentink">{tc(m.label)}</span>
                <span className="text-muted"> — {tc(m.detail)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </li>
  )
}

/** In an otherwise empty current-week row: what is open right now (links jump to the item). */
function NowSummary({ view, crossWeek }: { view: TimelineView; crossWeek: number | null }) {
  const { tc, lang } = useUi()
  const { ga, profile } = useProfile()
  if (!ga) return null
  const open = eventsForView(view, crossWeek).filter(
    (e) => !e.anytime && e.tier !== 'indicated' && windowStatus(e.window, ga.totalDays) === 'due',
  )
  return (
    <div className={clsx('rounded-lg bg-surface px-3 py-2 text-sm ring-1 ring-line', view === 'both' && 'md:col-span-2')}>
      <span className="font-semibold text-ink">
        {open.length
          ? lang === 'en' ? 'Open this week: ' : '이번 주에 해당: '
          : lang === 'en' ? 'Nothing new this week — just your routine check-up.' : '이번 주에 새로 할 것은 없습니다 — 정기 진료만 있습니다.'}
      </span>
      {open.map((e, i) => (
        <span key={e.id}>
          {i > 0 && ' · '}
          <a href={`#timeline/${e.id}`} onClick={(ev) => { ev.preventDefault(); document.getElementById(e.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} className={clsx('underline decoration-dotted underline-offset-2', profile.checklist[e.id] ? 'text-faint line-through' : 'text-accentink')}>
            <span className="font-bold uppercase" style={{ color: COUNTRY_COLOR[e.country] }}>{e.country}</span> {tc(e.title)}
          </a>
        </span>
      ))}
    </div>
  )
}

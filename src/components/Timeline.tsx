import { clsx } from 'clsx'
import { CircleDot, FlaskConical, Scan, Syringe, Stethoscope, Flag } from 'lucide-react'
import type { ReactNode } from 'react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard, SourceBadges } from './primitives'
import { timelineFor, windowStatus, formatWindow } from '../lib/schedule'
import type { Country, EventKind, TimelineEvent } from '../data/types'

const KIND_ICON: Record<EventKind, ReactNode> = {
  visit: <Stethoscope size={14} />,
  lab: <FlaskConical size={14} />,
  ultrasound: <Scan size={14} />,
  screening: <CircleDot size={14} />,
  vaccine: <Syringe size={14} />,
  milestone: <Flag size={14} />,
}

export function Timeline() {
  const { lang } = useUi()
  const { ga } = useProfile()
  return (
    <SectionCard
      title={lang === 'en' ? 'Prenatal timeline' : '산전 관리 타임라인'}
      subtitle={
        lang === 'en'
          ? 'Weeks of pregnancy, side by side. Set your due date to see where you are.'
          : '임신 주수별 일정을 나란히 비교합니다. 예정일을 입력하면 현재 위치가 표시됩니다.'
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Lane country="us" nowWeeks={ga?.weeks ?? null} />
        <Lane country="kr" nowWeeks={ga?.weeks ?? null} />
      </div>
    </SectionCard>
  )
}

function Lane({ country, nowWeeks }: { country: Country; nowWeeks: number | null }) {
  const { tc, lang, mode } = useUi()
  const events = timelineFor(country)
  const color = country === 'us' ? 'var(--color-us)' : 'var(--color-kr)'

  // Find the index where the "you are here" line belongs.
  let hereIndex = -1
  if (nowWeeks != null) {
    hereIndex = events.findIndex((e) => e.window.start > nowWeeks)
    if (hereIndex === -1) hereIndex = events.length
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color }}>
          {country === 'us'
            ? lang === 'en'
              ? 'United States'
              : '미국'
            : lang === 'en'
              ? 'Korea'
              : '한국'}
        </h3>
      </div>
      <ol className="relative space-y-2 border-l-2 border-brand-100 pl-4">
        {events.map((ev, i) => (
          <li key={ev.id}>
            {i === hereIndex && <HereMarker />}
            <EventCard ev={ev} nowWeeks={nowWeeks} color={color} lang={lang} mode={mode} tc={tc} />
          </li>
        ))}
        {hereIndex === events.length && <HereMarker />}
      </ol>
    </div>
  )
}

function HereMarker() {
  const { t } = useUi()
  return (
    <div className="my-2 flex items-center gap-2">
      <span className="-ml-[22px] inline-block h-3 w-3 rounded-full bg-rose-accent ring-4 ring-rose-accent/20" />
      <span className="rounded-full bg-rose-accent px-2 py-0.5 text-[11px] font-semibold text-white">
        {t('youAreHere')}
      </span>
    </div>
  )
}

function EventCard({
  ev,
  nowWeeks,
  color,
  lang,
  mode,
  tc,
}: {
  ev: TimelineEvent
  nowWeeks: number | null
  color: string
  lang: 'en' | 'ko'
  mode: 'mom' | 'clinician'
  tc: (n: { en: string; ko: string }) => string
}) {
  const status = nowWeeks == null ? null : windowStatus(ev.window, nowWeeks)
  return (
    <div
      className={clsx(
        'rounded-xl border p-3 transition',
        status === 'past' && 'border-slate-200 bg-slate-50 opacity-70',
        status === 'due' && 'border-rose-accent/40 bg-rose-accent/5',
        (status === 'upcoming' || status == null) && 'border-brand-100 bg-white',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5" style={{ color }}>
          {KIND_ICON[ev.kind]}
          <span className="text-sm font-semibold text-slate-800">{tc(ev.title)}</span>
        </div>
        <span className="shrink-0 rounded bg-brand-50 px-1.5 py-0.5 text-[11px] font-medium text-brand-600">
          {formatWindow(ev.window)}
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-600">{tc(ev.summary)}</p>
      {mode === 'clinician' && ev.clinicianDetail && (
        <p className="mt-1.5 rounded bg-brand-50 px-2 py-1 text-xs text-brand-700">
          {tc(ev.clinicianDetail)}
        </p>
      )}
      {!ev.routine && (
        <span className="mt-1 inline-block text-[11px] italic text-slate-400">
          {lang === 'en' ? 'if indicated' : '해당 시 시행'}
        </span>
      )}
      <SourceBadges ids={ev.sourceIds} />
    </div>
  )
}

import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { getSource } from '../data/sources'
import { useUi } from '../state/uiState'
import type { EventStatus } from '../lib/schedule'

/** A titled content card. */
export function SectionCard({
  title,
  subtitle,
  right,
  children,
  className,
  id,
}: {
  title?: ReactNode
  subtitle?: ReactNode
  right?: ReactNode
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={clsx(
        'rounded-2xl border border-brand-100 bg-white/80 p-5 shadow-sm sm:p-6',
        className,
      )}
    >
      {(title || right) && (
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-brand-800">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
          {right && <div className="shrink-0">{right}</div>}
        </header>
      )}
      {children}
    </section>
  )
}

/** Inline citation chips → sources.ts. Renders nothing for unknown ids. */
export function SourceBadges({ ids }: { ids?: string[] }) {
  const { lang } = useUi()
  if (!ids || ids.length === 0) return null
  return (
    <span className="ml-1 inline-flex flex-wrap gap-1 align-baseline">
      {ids.map((id) => {
        const s = getSource(id)
        if (!s) return null
        return (
          <a
            key={id}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            title={`${s.org} — ${s.label[lang]}`}
            className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600 ring-1 ring-brand-100 hover:bg-brand-100"
          >
            {s.org}
          </a>
        )
      })}
    </span>
  )
}

const STATUS_STYLES: Record<EventStatus, string> = {
  due: 'bg-rose-accent/15 text-rose-accent ring-rose-accent/30',
  upcoming: 'bg-brand-50 text-brand-600 ring-brand-100',
  past: 'bg-slate-100 text-slate-400 ring-slate-200',
}

export function StatusPill({
  status,
  children,
}: {
  status: EventStatus
  children: ReactNode
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1',
        STATUS_STYLES[status],
      )}
    >
      {children}
    </span>
  )
}

/** Country tag (US blue / KR red). */
export function CountryTag({ country }: { country: 'us' | 'kr' }) {
  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
      style={{ backgroundColor: country === 'us' ? 'var(--color-us)' : 'var(--color-kr)' }}
    >
      {country}
    </span>
  )
}

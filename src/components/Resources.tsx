import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { clsx } from 'clsx'
import { useUi } from '../state/uiState'
import { SectionCard, CountryTag } from './primitives'
import { RESOURCES } from '../data/resources'
import type { Audience, Country } from '../data/types'

export function Resources() {
  const { t, tc, lang, mode } = useUi()
  const [country, setCountry] = useState<Country | 'all'>('all')
  const [audience, setAudience] = useState<Audience | 'all'>(mode)

  const filtered = RESOURCES.filter(
    (r) =>
      (country === 'all' || r.country === country) &&
      (audience === 'all' || r.audience === audience || r.audience === 'both'),
  )

  return (
    <SectionCard
      title={t('navResources')}
      subtitle={
        lang === 'en'
          ? 'Trusted free resources in both countries, for moms and clinicians.'
          : '양국의 신뢰할 수 있는 무료 자료 — 엄마와 의료진용.'
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <FilterGroup
          value={country}
          onChange={setCountry}
          options={[
            { v: 'all', label: lang === 'en' ? 'All' : '전체' },
            { v: 'us', label: lang === 'en' ? 'US' : '미국' },
            { v: 'kr', label: lang === 'en' ? 'Korea' : '한국' },
          ]}
        />
        <FilterGroup
          value={audience}
          onChange={setAudience}
          options={[
            { v: 'all', label: lang === 'en' ? 'Everyone' : '전체' },
            { v: 'mom', label: t('momMode') },
            { v: 'clinician', label: t('clinicianMode') },
          ]}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((r) => (
          <a
            key={r.id}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-brand-100 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-brand-800 group-hover:text-brand-600">
                {tc(r.name)}
              </span>
              <div className="flex items-center gap-1.5">
                <CountryTag country={r.country} />
                <ExternalLink size={14} className="text-slate-300 group-hover:text-brand-500" />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-600">{tc(r.description)}</p>
            <div className="mt-2 flex gap-1">
              {r.lang.map((l) => (
                <span key={l} className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium uppercase text-brand-600">
                  {l}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </SectionCard>
  )
}

function FilterGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (v: T) => void
  options: { v: T; label: string }[]
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-brand-200 text-sm">
      {options.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={clsx(
            'px-3 py-1.5 font-medium',
            value === o.v ? 'bg-brand-600 text-white' : 'bg-white text-brand-700 hover:bg-brand-50',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

import { clsx } from 'clsx'
import { CheckCircle2, Circle } from 'lucide-react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard, CountryTag, StatusPill } from './primitives'
import { Onboard } from './Onboard'
import {
  checklistFor,
  countriesForPlan,
  windowStatus,
  formatWindow,
  type EventStatus,
} from '../lib/schedule'
import type { TimelineEvent } from '../data/types'

const ORDER: EventStatus[] = ['due', 'upcoming', 'past']
const GROUP_LABEL: Record<EventStatus, 'dueNow' | 'upcoming' | 'past'> = {
  due: 'dueNow',
  upcoming: 'upcoming',
  past: 'past',
}

export function Checklist() {
  const { t, tc, lang } = useUi()
  const { ga, profile, toggleChecklist } = useProfile()

  if (!ga) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-500">
          {lang === 'en'
            ? 'Set your due date to build a personalized checklist of labs, scans, and vaccines.'
            : '예정일을 입력하면 검사·초음파·예방접종 맞춤 체크리스트가 만들어집니다.'}
        </p>
        <Onboard />
      </div>
    )
  }

  const countries = countriesForPlan(profile.deliveryPlan)
  const items = countries.flatMap((c) => checklistFor(c))

  const groups: Record<EventStatus, TimelineEvent[]> = { due: [], upcoming: [], past: [] }
  for (const ev of items) groups[windowStatus(ev.window, ga.weeks)].push(ev)

  return (
    <SectionCard
      title={t('navChecklist')}
      subtitle={
        lang === 'en'
          ? 'Tick items off as you complete them — saved on this device.'
          : '완료한 항목을 체크하세요 — 이 기기에 저장됩니다.'
      }
    >
      <div className="space-y-5">
        {ORDER.map((status) =>
          groups[status].length === 0 ? null : (
            <div key={status}>
              <div className="mb-2 flex items-center gap-2">
                <StatusPill status={status}>{t(GROUP_LABEL[status])}</StatusPill>
                <span className="text-xs text-slate-400">{groups[status].length}</span>
              </div>
              <ul className="space-y-1.5">
                {groups[status].map((ev) => {
                  const checked = !!profile.checklist[ev.id]
                  return (
                    <li key={ev.id}>
                      <button
                        onClick={() => toggleChecklist(ev.id)}
                        className={clsx(
                          'flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition',
                          checked
                            ? 'border-brand-200 bg-brand-50'
                            : 'border-brand-100 bg-white hover:bg-brand-50/50',
                        )}
                      >
                        {checked ? (
                          <CheckCircle2 size={18} className="shrink-0 text-brand-600" />
                        ) : (
                          <Circle size={18} className="shrink-0 text-slate-300" />
                        )}
                        <CountryTag country={ev.country} />
                        <span
                          className={clsx(
                            'flex-1 text-sm',
                            checked ? 'text-slate-400 line-through' : 'text-slate-700',
                          )}
                        >
                          {tc(ev.title)}
                        </span>
                        <span className="text-xs text-slate-400">{formatWindow(ev.window)}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ),
        )}
      </div>
    </SectionCard>
  )
}

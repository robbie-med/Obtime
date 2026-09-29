import { clsx } from 'clsx'
import { CheckCircle2, Circle } from 'lucide-react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { useNav } from '../state/navState'
import { SectionCard, CountryTag, StatusPill } from './primitives'
import { Onboard } from './Onboard'
import {
  checklistEntries,
  crossoverGa,
  formatWindow,
  isEntryDone,
  optionGroup,
  planEvents,
  windowStatus,
  type ChecklistEntry,
  type EventStatus,
} from '../lib/schedule'
import { dateAtGa } from '../lib/dating'
import { fmtRange } from '../lib/format'

const ORDER: EventStatus[] = ['due', 'upcoming', 'past']
const GROUP_LABEL: Record<EventStatus, 'dueNow' | 'upcoming' | 'past'> = {
  due: 'dueNow',
  upcoming: 'upcoming',
  past: 'past',
}

export function Checklist() {
  const { t, tc, lang } = useUi()
  const { ga, edd, profile, toggleChecklist } = useProfile()
  const { navigate } = useNav()

  if (!ga || !edd) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted">
          {lang === 'en'
            ? 'Set your due date to build a personalized checklist of labs, scans, and vaccines.'
            : '예정일을 입력하면 검사·초음파·예방접종 맞춤 체크리스트가 만들어집니다.'}
        </p>
        <Onboard />
      </div>
    )
  }

  const cross = crossoverGa(profile, edd)
  const entries = checklistEntries(planEvents(profile.deliveryPlan, cross?.weeks ?? null))

  const groups: Record<EventStatus, ChecklistEntry[]> = { due: [], upcoming: [], past: [] }
  for (const e of entries) groups[windowStatus(e.window, ga.totalDays)].push(e)

  return (
    <SectionCard
      title={t('navChecklist')}
      subtitle={
        lang === 'en'
          ? 'Everything recommended for everyone, plus the choices offered to you — tick items off as you go (saved on this device). Tap a name to see it on the timeline.'
          : '모두에게 권장되는 항목과 선택 항목입니다 — 완료하면 체크하세요(이 기기에 저장). 이름을 누르면 타임라인에서 볼 수 있어요.'
      }
    >
      {profile.deliveryPlan === 'crossover' && cross && (
        <p className="mb-4 rounded-lg bg-primarysoft px-3 py-2 text-sm text-accentink">
          {lang === 'en'
            ? `Following your plan: US care until week ${cross.weeks}, Korean care from then on.`
            : `계획에 따라 ${cross.weeks}주까지는 미국, 그 이후는 한국 진료 항목을 표시합니다.`}
        </p>
      )}
      <div className="space-y-5">
        {ORDER.map((status) =>
          groups[status].length === 0 ? null : (
            <div key={status}>
              <div className="mb-2 flex items-center gap-2">
                <StatusPill status={status}>{t(GROUP_LABEL[status])}</StatusPill>
                <span className="text-xs text-faint">{groups[status].length}</span>
              </div>
              <ul className="space-y-1.5">
                {groups[status].map((entry) => {
                  const done = isEntryDone(entry, profile.checklist)
                  const group = entry.group ? optionGroup(entry.group) : undefined
                  const single = entry.events.length === 1 ? entry.events[0] : null
                  return (
                    <li
                      key={entry.key}
                      className={clsx(
                        'flex items-start gap-3 rounded-lg border px-3 py-2',
                        done ? 'border-line bg-primarysoft' : 'border-line bg-surface',
                      )}
                    >
                      {single ? (
                        <button
                          onClick={() => toggleChecklist(single.id)}
                          aria-pressed={done}
                          aria-label={lang === 'en' ? 'Mark done' : '완료 표시'}
                          className="mt-0.5 shrink-0"
                        >
                          {done ? (
                            <CheckCircle2 size={18} className="text-accentink" />
                          ) : (
                            <Circle size={18} className="text-faint" />
                          )}
                        </button>
                      ) : done ? (
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accentink" />
                      ) : (
                        <Circle size={18} className="mt-0.5 shrink-0 text-faint" />
                      )}
                      <CountryTag country={entry.country} />
                      <div className="min-w-0 flex-1">
                        {single ? (
                          <button
                            onClick={() => navigate('timeline', single.id)}
                            className={clsx(
                              'text-left text-sm hover:underline',
                              done ? 'text-faint line-through' : 'text-ink',
                            )}
                          >
                            {tc(single.title)}
                          </button>
                        ) : (
                          <>
                            <div className={clsx('text-sm font-medium', done ? 'text-faint' : 'text-ink')}>
                              {lang === 'en' ? 'Choose one: ' : '택1: '}
                              {group && tc(group.title)}
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {entry.events.map((ev) => (
                                <button
                                  key={ev.id}
                                  onClick={() => toggleChecklist(ev.id)}
                                  aria-pressed={!!profile.checklist[ev.id]}
                                  className={clsx(
                                    'rounded-full px-2 py-0.5 text-xs ring-1',
                                    profile.checklist[ev.id]
                                      ? 'bg-primary text-onprimary ring-primary'
                                      : 'text-accentink ring-line hover:bg-primarysoft',
                                  )}
                                >
                                  {tc(ev.title)} · {formatWindow(ev.window, lang)}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <span className="shrink-0 text-right text-xs tabular-nums text-faint">
                        {formatWindow(entry.window, lang)}
                        <span className="block">
                          {fmtRange(
                            dateAtGa(edd, entry.window.start, entry.window.startDay ?? 0),
                            entry.window.end == null ? edd : dateAtGa(edd, entry.window.end, entry.window.endDay ?? 6),
                            lang,
                          )}
                        </span>
                      </span>
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

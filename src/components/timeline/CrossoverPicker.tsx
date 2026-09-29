import { Plane, X } from 'lucide-react'
import { useProfile } from '../../state/profileState'
import { useUi } from '../../state/uiState'
import { dateAtGa, toIso } from '../../lib/dating'
import { fmtGa } from '../../lib/format'
import { crossoverGa } from '../../lib/schedule'

/**
 * When does the mom move from US care to Korean care? With a due date we ask
 * for the flight date (and show the week it falls in); without one, the week.
 * Also flags the usual airline limits.
 */
export function CrossoverPicker({ compact = false }: { compact?: boolean }) {
  const { lang } = useUi()
  const { profile, update, edd, ga } = useProfile()
  const cross = crossoverGa(profile, edd)

  const input =
    'rounded-lg border border-line bg-surface px-2 py-1 text-sm text-ink focus:border-primary focus:outline-none'

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl bg-primarysoft p-3">
      <label className="inline-flex flex-wrap items-center gap-2 text-sm font-medium text-accentink">
        <Plane size={15} />
        {edd
          ? lang === 'en' ? 'I fly to Korea on' : '한국 출국일'
          : lang === 'en' ? 'I move to Korean care at week' : '한국 진료로 옮기는 주수'}
        {edd ? (
          <input
            type="date"
            value={profile.flyDate ?? (profile.flyGa != null ? toIso(dateAtGa(edd, profile.flyGa)) : '')}
            min={toIso(dateAtGa(edd, 4))}
            max={toIso(dateAtGa(edd, 41))}
            onChange={(e) => update({ flyDate: e.target.value || undefined, flyGa: undefined })}
            className={input}
          />
        ) : (
          <input
            type="number"
            min={4}
            max={41}
            value={profile.flyGa ?? ''}
            placeholder="—"
            onChange={(e) =>
              update({ flyGa: e.target.value ? Number(e.target.value) : undefined, flyDate: undefined })
            }
            className={`${input} w-20`}
          />
        )}
      </label>

      {cross && (
        <>
          <span className="text-sm text-ink">
            {lang === 'en' ? 'at ' : ''}
            <strong className="tabular-nums">{fmtGa(cross.weeks, cross.days, lang)}</strong>
            {ga && !compact && (
              <span className="text-muted">
                {' · '}
                {cross.weeks * 7 + cross.days > ga.totalDays
                  ? lang === 'en'
                    ? `${Math.ceil((cross.weeks * 7 + cross.days - ga.totalDays) / 7)} weeks from now`
                    : `지금부터 약 ${Math.ceil((cross.weeks * 7 + cross.days - ga.totalDays) / 7)}주 후`
                  : lang === 'en' ? 'already passed' : '이미 지났습니다'}
              </span>
            )}
          </span>
          <button
            onClick={() => update({ flyDate: undefined, flyGa: undefined })}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-muted ring-1 ring-line hover:bg-surface"
            aria-label={lang === 'en' ? 'Clear move date' : '이동 날짜 지우기'}
          >
            <X size={12} />
            {lang === 'en' ? 'Clear' : '지우기'}
          </button>
          {cross.weeks >= 28 && (
            <span className="rounded-full bg-rose-accent/15 px-2 py-0.5 text-xs font-medium text-rose-accent">
              {cross.weeks >= 36
                ? lang === 'en'
                  ? 'Past most airlines’ single-pregnancy limit (~36w) — check before booking'
                  : '대부분 항공사의 단태아 탑승 제한(약 36주) 이후 — 예약 전 확인'
                : lang === 'en'
                  ? 'Airlines usually want a doctor’s letter after 28w'
                  : '28주 이후에는 보통 의사 소견서가 필요합니다'}
            </span>
          )}
        </>
      )}
    </div>
  )
}

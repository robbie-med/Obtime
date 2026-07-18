import { Plane, PackageCheck, Luggage, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard, SourceBadges } from './primitives'
import {
  CROSSOVER_STEPS,
  TRAVEL_TIMING,
  type CrossoverPhase,
  type CrossoverStep,
} from '../data/logistics'

const PHASE_META: Record<
  CrossoverPhase,
  { icon: ReactNode; en: string; ko: string }
> = {
  before: { icon: <PackageCheck size={16} />, en: 'Before you fly', ko: '비행 전에' },
  carry: { icon: <Luggage size={16} />, en: 'Carry with you', ko: '지참할 것' },
  arrival: { icon: <MapPin size={16} />, en: 'After you arrive in Korea', ko: '한국 도착 후' },
}
const PHASE_ORDER: CrossoverPhase[] = ['before', 'carry', 'arrival']

export function Crossover() {
  const { tc, lang } = useUi()
  const { profile, update, ga } = useProfile()

  const byPhase = (p: CrossoverPhase): CrossoverStep[] =>
    CROSSOVER_STEPS.filter((s) => s.phase === p)

  return (
    <div className="space-y-6">
      <SectionCard
        title={
          <span className="inline-flex items-center gap-2">
            <Plane size={18} className="text-brand-600" />
            {lang === 'en' ? 'Flying to Korea to deliver' : '한국에서 분만하기 위해 출국하기'}
          </span>
        }
        subtitle={
          lang === 'en'
            ? 'A step-by-step plan for continuing your care across two countries.'
            : '두 나라에 걸쳐 진료를 이어가기 위한 단계별 계획입니다.'
        }
      >
        {/* Optional: when do you plan to fly? */}
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-brand-50 p-3">
          <label className="text-sm font-medium text-brand-700">
            {lang === 'en' ? 'I plan to fly at (weeks):' : '출국 예정 주수:'}
          </label>
          <input
            type="number"
            min={4}
            max={40}
            value={profile.flyGa ?? ''}
            onChange={(e) =>
              update({ flyGa: e.target.value ? Number(e.target.value) : undefined })
            }
            className="w-20 rounded-lg border border-brand-200 bg-white px-2 py-1 text-sm"
            placeholder="—"
          />
          {profile.flyGa != null && ga && (
            <span className="text-sm text-slate-600">
              {profile.flyGa > ga.weeks
                ? lang === 'en'
                  ? `about ${profile.flyGa - ga.weeks} weeks from now`
                  : `지금부터 약 ${profile.flyGa - ga.weeks}주 후`
                : lang === 'en'
                  ? 'that week has passed'
                  : '이미 지난 주수입니다'}
            </span>
          )}
          {profile.flyGa != null && (profile.flyGa >= 28 || (profile.flyGa >= 32)) && (
            <span className="rounded-full bg-rose-accent/15 px-2 py-0.5 text-xs font-medium text-rose-accent">
              {lang === 'en'
                ? profile.flyGa >= 36
                  ? 'Past many airlines’ single-pregnancy cutoff (~36w)'
                  : 'A doctor’s letter is usually required after 28w'
                : profile.flyGa >= 36
                  ? '다수 항공사의 단태아 탑승 제한(약 36주)을 초과'
                  : '28주 이후에는 보통 의사 소견서가 필요합니다'}
            </span>
          )}
        </div>

        {/* Travel timing guidance */}
        <div className="rounded-xl border border-brand-100 p-4">
          <h3 className="text-sm font-semibold text-brand-800">{tc(TRAVEL_TIMING.title)}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {TRAVEL_TIMING.points.map((p, i) => (
              <li key={i}>{tc(p)}</li>
            ))}
          </ul>
        </div>
      </SectionCard>

      {PHASE_ORDER.map((phase) => (
        <SectionCard
          key={phase}
          title={
            <span className="inline-flex items-center gap-2">
              {PHASE_META[phase].icon}
              {lang === 'en' ? PHASE_META[phase].en : PHASE_META[phase].ko}
            </span>
          }
        >
          <ol className="space-y-3">
            {byPhase(phase).map((step, i) => (
              <li key={step.id} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    {tc(step.title)}
                    {step.timing && (
                      <span className="ml-2 rounded bg-brand-50 px-1.5 py-0.5 text-[11px] font-medium text-brand-600">
                        {tc(step.timing)}
                      </span>
                    )}
                    <SourceBadges ids={step.sourceIds} />
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600">{tc(step.detail)}</p>
                </div>
              </li>
            ))}
          </ol>
        </SectionCard>
      ))}
    </div>
  )
}

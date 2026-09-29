import { Plane, PackageCheck, Luggage, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import { useUi } from '../state/uiState'
import { SectionCard, SourceBadges } from './primitives'
import { CrossoverPicker } from './timeline/CrossoverPicker'
import { useNav } from '../state/navState'
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
  const { navigate } = useNav()

  const byPhase = (p: CrossoverPhase): CrossoverStep[] =>
    CROSSOVER_STEPS.filter((s) => s.phase === p)

  return (
    <div className="space-y-6">
      <SectionCard
        title={
          <span className="inline-flex items-center gap-2">
            <Plane size={18} className="text-accentink" />
            {lang === 'en' ? 'Flying to Korea to deliver' : '한국에서 분만하기 위해 출국하기'}
          </span>
        }
        subtitle={
          lang === 'en'
            ? 'A step-by-step plan for continuing your care across two countries.'
            : '두 나라에 걸쳐 진료를 이어가기 위한 단계별 계획입니다.'
        }
      >
        {/* When do you move? Drives the US → Korea path on the timeline and checklist. */}
        <div className="mb-4 space-y-2">
          <CrossoverPicker />
          <p className="text-xs text-muted">
            {lang === 'en' ? (
              <>
                Your timeline and checklist follow this date: US care before it, Korean care after it.{' '}
                <button onClick={() => navigate('timeline')} className="font-medium text-accentink underline">
                  See your US → Korea timeline
                </button>
              </>
            ) : (
              <>
                타임라인과 체크리스트가 이 날짜를 기준으로 이전은 미국, 이후는 한국 진료를 보여줍니다.{' '}
                <button onClick={() => navigate('timeline')} className="font-medium text-accentink underline">
                  미국 → 한국 타임라인 보기
                </button>
              </>
            )}
          </p>
        </div>

        {/* Travel timing guidance */}
        <div className="rounded-xl border border-line p-4">
          <h3 className="text-sm font-semibold text-ink">{tc(TRAVEL_TIMING.title)}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
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
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">
                    {tc(step.title)}
                    {step.timing && (
                      <span className="ml-2 rounded bg-primarysoft px-1.5 py-0.5 text-[11px] font-medium text-accentink">
                        {tc(step.timing)}
                      </span>
                    )}
                    <SourceBadges ids={step.sourceIds} />
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{tc(step.detail)}</p>
                </div>
              </li>
            ))}
          </ol>
        </SectionCard>
      ))}
    </div>
  )
}

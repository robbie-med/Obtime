import {
  CalendarRange,
  Columns2,
  ListChecks,
  Plane,
  Languages,
  Activity,
  BookOpen,
  Salad,
  Dumbbell,
  BookA,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { Onboard } from './Onboard'
import { ThisWeek } from './ThisWeek'
import { RedFlags } from './RedFlags'
import type { UiKey } from '../i18n/ui'

const QUICK_LINKS: { id: string; label: UiKey; icon: ReactNode; blurbEn: string; blurbKo: string }[] = [
  { id: 'timeline', label: 'navTimeline', icon: <CalendarRange size={18} />, blurbEn: 'Every week, with dates — US, Korea, or your US → Korea path', blurbKo: '주수별·날짜별 — 미국, 한국, 또는 미국 → 한국 경로' },
  { id: 'compare', label: 'navCompare', icon: <Columns2 size={18} />, blurbEn: 'Bilingual comparison of both systems', blurbKo: '두 제도의 이중언어 비교' },
  { id: 'checklist', label: 'navChecklist', icon: <ListChecks size={18} />, blurbEn: 'What’s due now, personalized', blurbKo: '지금 할 것 — 맞춤형' },
  { id: 'crossover', label: 'navCrossover', icon: <Plane size={18} />, blurbEn: 'Plan a delivery back in Korea', blurbKo: '한국에서의 분만 계획' },
  { id: 'nutrition', label: 'navNutrition', icon: <Salad size={18} />, blurbEn: 'Fats & oils, vitamin D, magnesium, fish', blurbKo: '지방·기름, 비타민 D, 마그네슘, 생선' },
  { id: 'exercise', label: 'navExercise', icon: <Dumbbell size={18} />, blurbEn: 'Strength training, safely, week by week', blurbKo: '안전한 근력 운동과 활동 가이드' },
  { id: 'index', label: 'navIndex', icon: <BookA size={18} />, blurbEn: 'Every term explained, with links', blurbKo: '모든 용어 설명과 링크' },
  { id: 'cliniccard', label: 'navClinicCard', icon: <Languages size={18} />, blurbEn: 'Point-to-translate at the clinic', blurbKo: '진료실에서 가리켜 소통' },
  { id: 'trackers', label: 'navTrackers', icon: <Activity size={18} />, blurbEn: 'Weight, kicks, notes, countdown', blurbKo: '체중·태동·메모·카운트다운' },
]

export function Home({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { t, lang } = useUi()
  const { hasProfile } = useProfile()

  return (
    <div className="space-y-6">
      {hasProfile ? <ThisWeek /> : <Intro />}
      {!hasProfile && <Onboard />}

      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
          <BookOpen size={16} /> {lang === 'en' ? 'Explore' : '둘러보기'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map((q) => (
            <button
              key={q.id}
              onClick={() => onNavigate(q.id)}
              className="flex items-start gap-3 rounded-2xl border border-line bg-surface/80 p-4 text-left transition hover:border-primary hover:shadow-sm"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primarysoft text-accentink">
                {q.icon}
              </span>
              <span>
                <span className="block font-semibold text-ink">{t(q.label)}</span>
                <span className="block text-sm text-muted">
                  {lang === 'en' ? q.blurbEn : q.blurbKo}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <RedFlags />
    </div>
  )
}

function Intro() {
  const { lang } = useUi()
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary to-primaryhover p-6 text-white sm:p-8">
      <h1 className="text-2xl font-bold sm:text-3xl">
        {lang === 'en'
          ? 'Prenatal care across two countries, in two languages.'
          : '두 나라, 두 언어로 함께하는 산전 관리.'}
      </h1>
      <p className="mt-3 max-w-2xl text-onprimary">
        {lang === 'en'
          ? 'Machung helps Korean-American mothers understand and compare prenatal care in the US and Korea — whether you deliver here, fly back to Korea, or are still deciding. Enter your due date below to personalize everything.'
          : '마중은 재미 한인 엄마들이 미국과 한국의 산전 관리를 이해하고 비교하도록 돕습니다 — 미국에서 분만하든, 한국으로 돌아가든, 아직 고민 중이든. 아래에 예정일을 입력하면 모든 내용이 맞춤화됩니다.'}
      </p>
    </div>
  )
}

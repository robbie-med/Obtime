import { Printer, MessagesSquare, Languages } from 'lucide-react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard } from './primitives'
import { GLOSSARY } from '../data/glossary'
import { PREP_QUESTIONS } from '../data/prepQuestions'
import type { GlossaryTerm, PrepQuestion } from '../data/types'

const CATEGORY_LABEL: Record<GlossaryTerm['category'], { en: string; ko: string }> = {
  test: { en: 'Tests', ko: '검사' },
  visit: { en: 'Visits', ko: '진료' },
  anatomy: { en: 'Anatomy', ko: '해부' },
  admin: { en: 'Paperwork', ko: '행정' },
  symptom: { en: 'Symptoms', ko: '증상' },
  general: { en: 'General', ko: '일반' },
}

function currentPhase(weeks: number | null): PrepQuestion['phase'] {
  if (weeks == null) return 'any'
  if (weeks < 14) return 'first'
  if (weeks < 28) return 'second'
  return 'third'
}

export function ClinicCard() {
  const { t, lang, mode } = useUi()
  const { ga } = useProfile()

  const phase = currentPhase(ga?.weeks ?? null)
  const questions = PREP_QUESTIONS.filter(
    (q) =>
      (q.phase === phase || q.phase === 'any') &&
      (q.audience === 'both' || q.audience === mode),
  )

  const categories = Array.from(new Set(GLOSSARY.map((g) => g.category)))

  return (
    <div className="space-y-6">
      <SectionCard
        title={
          <span className="inline-flex items-center gap-2">
            <Languages size={18} className="text-accentink" />
            {lang === 'en' ? 'Clinic card' : '진료 카드'}
          </span>
        }
        subtitle={
          lang === 'en'
            ? 'Point to a term to bridge the language gap at your appointment. Print it to carry.'
            : '진료 중 언어 장벽을 넘도록 용어를 손가락으로 가리켜 보여주세요. 인쇄해서 가지고 다닐 수 있습니다.'
        }
        right={
          <button
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-accentink hover:bg-surface2"
          >
            <Printer size={15} />
            {t('printCard')}
          </button>
        }
      >
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat}>
              <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                {lang === 'en' ? CATEGORY_LABEL[cat].en : CATEGORY_LABEL[cat].ko}
              </div>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {GLOSSARY.filter((g) => g.category === cat).map((g) => (
                  <div
                    key={g.id}
                    className="flex items-baseline justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2"
                  >
                    <span className="text-sm font-medium text-ink">{g.en}</span>
                    <span className="text-right text-sm text-accentink">
                      {g.ko}
                      {g.koRomanized && (
                        <span className="ml-1 text-xs text-faint">{g.koRomanized}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title={
          <span className="inline-flex items-center gap-2">
            <MessagesSquare size={18} className="text-accentink" />
            {lang === 'en' ? 'Questions to ask at this visit' : '이번 진료에서 물어볼 질문'}
          </span>
        }
      >
        <ul className="space-y-2">
          {questions.map((q) => (
            <li
              key={q.id}
              className="rounded-lg border border-line bg-surface px-3 py-2"
            >
              <p className="text-sm font-medium text-ink">{q.question.en}</p>
              <p className="mt-0.5 text-sm text-accentink">{q.question.ko}</p>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}

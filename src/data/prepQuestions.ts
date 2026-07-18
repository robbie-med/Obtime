import type { PrepQuestion } from './types'

// "Questions to ask at this visit," bilingual. A mom can show the Korean to a
// Korean provider or the English to a US provider. Phase maps to trimester.
export const PREP_QUESTIONS: PrepQuestion[] = [
  {
    id: 'q-edd',
    phase: 'first',
    audience: 'mom',
    question: {
      en: 'What is my due date, and how was it determined?',
      ko: '제 출산 예정일은 언제이며 어떻게 정해졌나요?',
    },
  },
  {
    id: 'q-screening',
    phase: 'first',
    audience: 'mom',
    question: {
      en: 'Which genetic screening tests do you recommend, and what do they cost?',
      ko: '어떤 유전자 선별검사를 권장하시고, 비용은 얼마인가요?',
    },
  },
  {
    id: 'q-supplements',
    phase: 'first',
    audience: 'mom',
    question: {
      en: 'Which prenatal vitamins or supplements should I take?',
      ko: '어떤 산전 비타민이나 영양제를 먹어야 하나요?',
    },
  },
  {
    id: 'q-travel',
    phase: 'second',
    audience: 'mom',
    question: {
      en: 'I may travel internationally — until what week is it safe to fly?',
      ko: '해외 이동을 할 수도 있는데, 몇 주까지 비행이 안전한가요?',
    },
  },
  {
    id: 'q-anatomy',
    phase: 'second',
    audience: 'mom',
    question: {
      en: 'Did the anatomy scan look normal? Where is the placenta?',
      ko: '정밀 초음파는 정상이었나요? 태반 위치는 어디인가요?',
    },
  },
  {
    id: 'q-records',
    phase: 'second',
    audience: 'mom',
    question: {
      en: 'Can I get a copy of my records and results to carry with me?',
      ko: '제 진료 기록과 검사 결과 사본을 받을 수 있을까요?',
    },
  },
  {
    id: 'q-gbs',
    phase: 'third',
    audience: 'mom',
    question: {
      en: 'When will you do the Group B strep swab, and what if it’s positive?',
      ko: 'GBS 검사는 언제 하고, 양성이면 어떻게 되나요?',
    },
  },
  {
    id: 'q-birthplan',
    phase: 'third',
    audience: 'mom',
    question: {
      en: 'What are my options for pain relief and delivery?',
      ko: '통증 완화와 분만 방법에는 어떤 선택지가 있나요?',
    },
  },
  {
    id: 'q-call',
    phase: 'third',
    audience: 'mom',
    question: {
      en: 'When exactly should I come in or call once labor might be starting?',
      ko: '진통이 시작될 때 정확히 언제 병원에 오거나 연락해야 하나요?',
    },
  },
  {
    id: 'q-anyconcern',
    phase: 'any',
    audience: 'mom',
    question: {
      en: 'Is there anything about my results I should be watching?',
      ko: '제 검사 결과 중 주의해야 할 점이 있나요?',
    },
  },
]

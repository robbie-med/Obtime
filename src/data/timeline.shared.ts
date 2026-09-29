import type { Bilingual, WeekMarker } from './types'

// Definitions that apply in both countries, shown in the header of their week.
// Term definitions: ACOG Committee Opinion 579 ("Definition of Term Pregnancy").
export const WEEK_MARKERS: WeekMarker[] = [
  {
    id: 'm-quickening',
    week: 18,
    label: { en: 'First movements (quickening)', ko: '첫 태동' },
    detail: {
      en: 'Most first-time mothers first feel the baby move at 18–20 weeks; with a second baby, often 16–18 weeks. Early flutters feel like bubbles or light taps.',
      ko: '첫 임신은 보통 18–20주, 둘째부터는 16–18주에 처음 태동을 느낍니다. 처음에는 거품이나 가볍게 톡톡 치는 느낌입니다.',
    },
    sourceIds: ['pmc-fetal-movement'],
    indexIds: ['fetal-movement'],
  },
  {
    id: 'm-early-term',
    week: 37,
    label: { en: '37w0d · Early term', ko: '37주 0일 · 조기 만삭' },
    detail: {
      en: 'Babies born from 37w0d to 38w6d are “early term”. Unless there is a medical reason, delivery is not planned before 39 weeks.',
      ko: '37주 0일–38주 6일 출생을 “조기 만삭”이라 합니다. 의학적 이유가 없다면 39주 이전에 계획 분만을 하지 않습니다.',
    },
    sourceIds: ['acog-term'],
    indexIds: ['term-pregnancy'],
  },
  {
    id: 'm-full-term',
    week: 39,
    label: { en: '39w0d · Full term', ko: '39주 0일 · 만삭' },
    detail: {
      en: '39w0d to 40w6d is “full term” — the lowest-risk time for a baby to be born.',
      ko: '39주 0일–40주 6일이 “만삭”이며, 출생에 가장 위험이 낮은 시기입니다.',
    },
    sourceIds: ['acog-term'],
    indexIds: ['term-pregnancy'],
  },
  {
    id: 'm-due-date',
    week: 40,
    label: { en: '40w0d · Due date', ko: '40주 0일 · 출산 예정일' },
    detail: {
      en: 'Your estimated due date (LMP + 280 days). It is an estimate: most babies arrive in the weeks around it, not on the day.',
      ko: '예정일(마지막 생리 시작일 + 280일)입니다. 추정치이며, 대부분 이 날짜 전후 몇 주 사이에 태어납니다.',
    },
    indexIds: ['edd'],
  },
  {
    id: 'm-late-term',
    week: 41,
    label: { en: '41w0d · Late term', ko: '41주 0일 · 만기 임신' },
    detail: {
      en: '41w0d to 41w6d is “late term”. Expect extra monitoring of the baby and a discussion about inducing labor.',
      ko: '41주 0일–41주 6일은 “만기”입니다. 태아 감시 검사가 늘고 유도분만을 상의하게 됩니다.',
    },
    sourceIds: ['acog-term'],
    indexIds: ['term-pregnancy', 'induction'],
  },
  {
    id: 'm-post-term',
    week: 42,
    label: { en: '42w0d · Post-term', ko: '42주 0일 · 과숙 임신' },
    detail: {
      en: 'From 42w0d a pregnancy is “post-term”; risks for the baby rise, so induction is recommended by now.',
      ko: '42주 0일부터는 “과숙 임신”으로 태아 위험이 높아져, 이 시점까지는 유도분만이 권고됩니다.',
    },
    sourceIds: ['acog-term'],
    indexIds: ['term-pregnancy', 'induction'],
  },
]

// "Choose one" groups: alternatives that serve the same purpose.
export const OPTION_GROUPS: Record<string, { title: Bilingual; note: Bilingual }> = {
  'us-aneuploidy': {
    title: { en: 'chromosome screening', ko: '염색체 선별검사' },
    note: {
      en: 'NIPT, the first-trimester combined screen and the quad screen all estimate the chance of the same chromosome conditions. Pick one approach (or none) — doing several separate screens adds false alarms, not accuracy. (A planned “sequential” screen that joins the first- and second-trimester tests counts as one approach.)',
      ko: 'NIPT, 1삼분기 통합 선별, 쿼드 검사는 모두 같은 염색체 이상의 가능성을 추정합니다. 한 가지 방법을 고르세요(또는 받지 않음). 여러 선별검사를 따로 하면 정확도는 오르지 않고 위양성만 늘어납니다. (1·2삼분기 검사를 묶어 계획한 “순차적” 선별은 한 가지 방법으로 봅니다.)',
    },
  },
}

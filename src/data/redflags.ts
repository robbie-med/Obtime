import type { RedFlag } from './types'

// "When to call" warning signs, from the reference doc (bleeding, decreased fetal
// movement, preeclampsia symptoms, PROM, etc.). Bilingual by design — this is
// exactly the content a mother may need to show a provider in either country.
export const RED_FLAGS: RedFlag[] = [
  {
    id: 'bleeding',
    sign: { en: 'Vaginal bleeding', ko: '질 출혈' },
    action: { en: 'Call your provider right away.', ko: '즉시 병원에 연락하세요.' },
    urgent: true,
  },
  {
    id: 'fluid',
    sign: { en: 'A gush or leak of fluid', ko: '양수가 터지거나 새는 느낌' },
    action: { en: 'Call — this may be your water breaking.', ko: '연락하세요 — 양막 파열일 수 있습니다.' },
    urgent: true,
  },
  {
    id: 'movement',
    sign: { en: 'Noticeably less fetal movement', ko: '태동이 뚜렷하게 줄어듦' },
    action: {
      en: 'Rest on your side, focus, and count kicks; call if still reduced.',
      ko: '옆으로 누워 집중해 태동을 세고, 여전히 적으면 연락하세요.',
    },
    urgent: true,
  },
  {
    id: 'preeclampsia',
    sign: {
      en: 'Severe headache, vision changes, or sudden swelling of face/hands',
      ko: '심한 두통, 시야 변화, 얼굴·손의 갑작스러운 부종',
    },
    action: { en: 'Call urgently — possible preeclampsia.', ko: '긴급히 연락 — 자간전증 가능성.' },
    urgent: true,
  },
  {
    id: 'contractions',
    sign: {
      en: 'Regular painful contractions before 37 weeks',
      ko: '37주 이전의 규칙적이고 아픈 수축',
    },
    action: { en: 'Call — this may be preterm labor.', ko: '연락하세요 — 조기 진통일 수 있습니다.' },
    urgent: true,
  },
  {
    id: 'fever',
    sign: { en: 'Fever, or burning with urination', ko: '발열 또는 배뇨 시 통증' },
    action: { en: 'Contact your provider for evaluation.', ko: '진료를 위해 병원에 연락하세요.' },
    urgent: false,
  },
  {
    id: 'calf',
    sign: { en: 'Calf pain or swelling, chest pain, or trouble breathing', ko: '종아리 통증·부종, 흉통, 호흡 곤란' },
    action: { en: 'Seek care immediately.', ko: '즉시 진료를 받으세요.' },
    urgent: true,
  },
]

import type { CompareSection } from './types'

// Side-by-side US vs Korea comparison. Rendered ALWAYS bilingually (EN + KO cells)
// regardless of the language toggle. clinicianNote surfaces only in clinician mode.
export const COMPARISON: CompareSection[] = [
  {
    id: 'schedule',
    title: { en: 'Appointment schedule', ko: '진료 일정' },
    rows: [
      {
        id: 'cadence',
        topic: { en: 'Visit frequency', ko: '진료 간격' },
        us: {
          en: 'Every 4 weeks to 28 wk, every 2 weeks to 36 wk, then weekly.',
          ko: '28주까지 4주마다, 36주까지 2주마다, 이후 매주.',
        },
        kr: {
          en: 'Identical schedule — every 4 weeks to 28 wk, every 2 weeks to 36 wk, then weekly.',
          ko: '동일 — 28주까지 4주마다, 36주까지 2주마다, 이후 매주.',
        },
        clinicianNote: {
          en: 'Both systems follow the same routine cadence for uncomplicated pregnancies.',
          ko: '두 체계 모두 정상 임신에서 동일한 정기 간격을 따릅니다.',
        },
        sourceIds: ['seed-doc', 'kdca-health'],
      },
      {
        id: 'ultrasound-freq',
        topic: { en: 'How often ultrasound', ko: '초음파 빈도' },
        us: {
          en: 'Typically 1–2 routine scans (dating + anatomy). Extra scans only when indicated (ALARA).',
          ko: '보통 1–2회(주수 확인 + 정밀). 필요할 때만 추가(ALARA 원칙).',
        },
        kr: {
          en: 'Often an ultrasound at nearly every visit — many more scans than in the US.',
          ko: '거의 매 진료마다 초음파 — 미국보다 훨씬 자주.',
        },
        clinicianNote: {
          en: 'A common source of surprise for families moving between systems; neither is “wrong,” but expectations differ.',
          ko: '두 체계를 오가는 가족이 가장 놀라는 지점입니다. 어느 쪽도 틀린 것은 아니며 기대치가 다릅니다.',
        },
        sourceIds: ['seed-doc', 'kdca-health'],
      },
    ],
  },
  {
    id: 'labs',
    title: { en: 'Labs & screening', ko: '검사 및 선별' },
    rows: [
      {
        id: 'first-labs',
        topic: { en: 'First-trimester labs', ko: '초기 혈액 검사' },
        us: {
          en: 'CBC, blood type/Rh + antibody, urine, HIV, hepatitis B/C, syphilis, rubella, varicella.',
          ko: 'CBC, 혈액형/Rh + 항체, 소변, HIV, B·C형 간염, 매독, 풍진, 수두.',
        },
        kr: {
          en: 'Similar panel, plus routine toxoplasmosis screening and an early Pap smear.',
          ko: '유사하며, 톡소플라즈마 검사와 초기 자궁경부암 검사가 흔히 추가됩니다.',
        },
        clinicianNote: {
          en: 'Toxoplasma IgG/IgM is routine in Korea; the US screens only with risk factors.',
          ko: '톡소플라즈마 IgG/IgM는 한국에서 일상적; 미국은 위험인자가 있을 때만.',
        },
        sourceIds: ['seed-doc', 'kdca-health'],
      },
      {
        id: 'aneuploidy',
        topic: { en: 'Chromosome screening', ko: '염색체 선별' },
        us: {
          en: 'cfDNA/NIPT often first-line and frequently insurance-covered; NT and quad also available.',
          ko: 'cfDNA/NIPT가 흔히 1차이며 보험 적용되는 경우가 많음; NT·쿼드도 가능.',
        },
        kr: {
          en: 'NT + serum and quad are standard; NIPT is available but usually out-of-pocket (비급여).',
          ko: 'NT+혈청·쿼드가 표준; NIPT는 가능하나 보통 비급여.',
        },
        clinicianNote: {
          en: 'Cost structure differs sharply: NIPT may be routine/covered in the US but a paid add-on in Korea.',
          ko: '비용 구조가 크게 다름: 미국은 NIPT가 일상·보험, 한국은 자비 선택.',
        },
        sourceIds: ['seed-doc', 'nhis-nipt'],
      },
      {
        id: 'gdm',
        topic: { en: 'Gestational diabetes test', ko: '임신성 당뇨 검사' },
        us: {
          en: '24–28 wk. One-step 75 g OR two-step 50 g → 100 g.',
          ko: '24–28주. 1단계 75g 또는 2단계 50g → 100g.',
        },
        kr: {
          en: '24–28 wk. Two-step 50 g → 100 g is standard (75 g also accepted).',
          ko: '24–28주. 2단계 50g → 100g가 표준(75g도 인정).',
        },
        clinicianNote: {
          en: '100 g OGTT cutoffs (fasting/1/2/3 h): 105/190/165/145 mg/dL; ≥2 abnormal = GDM.',
          ko: '100g OGTT 기준(공복/1/2/3시간): 105/190/165/145 mg/dL; 2개 이상 이상 시 진단.',
        },
        sourceIds: ['seed-doc', 'amc-gdm'],
      },
      {
        id: 'gbs',
        topic: { en: 'Group B strep', ko: 'B군 연쇄구균(GBS)' },
        us: { en: 'Swab at 36+0–37+6 wk.', ko: '36+0–37+6주 면봉 검사.' },
        kr: { en: 'Swab in late third trimester (~35–37 wk).', ko: '임신 말기 면봉 검사(약 35–37주).' },
        sourceIds: ['seed-doc', 'ksog'],
      },
    ],
  },
  {
    id: 'vaccines',
    title: { en: 'Vaccines', ko: '예방접종' },
    rows: [
      {
        id: 'tdap',
        topic: { en: 'Tdap (whooping cough)', ko: 'Tdap (백일해)' },
        us: { en: 'Every pregnancy, 27–36 wk.', ko: '매 임신, 27–36주.' },
        kr: { en: 'Every pregnancy, 27–36 wk (same recommendation).', ko: '매 임신, 27–36주 (동일 권고).' },
        sourceIds: ['seed-doc', 'kdca-nip'],
      },
      {
        id: 'rsv',
        topic: { en: 'RSV', ko: 'RSV' },
        us: { en: 'Maternal RSV vaccine 32–36 wk (seasonal).', ko: '임신부 RSV 백신 32–36주(계절별).' },
        kr: {
          en: 'Availability/coverage evolving; confirm locally. Infant protection may use antibody (nirsevimab) instead.',
          ko: '도입·급여가 변화 중; 현지 확인 필요. 신생아 보호는 항체(니르세비맙)로 대체될 수 있음.',
        },
        sourceIds: ['cdc-vac', 'kdca-nip'],
      },
    ],
  },
  {
    id: 'cost',
    title: { en: 'Cost & benefits', ko: '비용 및 혜택' },
    rows: [
      {
        id: 'coverage',
        topic: { en: 'Who pays', ko: '비용 부담' },
        us: {
          en: 'Private insurance or Medicaid; out-of-pocket varies widely by plan.',
          ko: '민간 보험 또는 메디케이드; 본인부담은 플랜에 따라 큰 차이.',
        },
        kr: {
          en: 'National Health Insurance covers most care; a government voucher offsets pregnancy costs.',
          ko: '국민건강보험이 대부분을 보장; 정부 바우처가 임신 비용을 보전.',
        },
        sourceIds: ['nhis-voucher'],
      },
      {
        id: 'voucher',
        topic: { en: 'Pregnancy voucher', ko: '임신 바우처' },
        us: { en: 'No universal equivalent (WIC/Medicaid help by eligibility).', ko: '보편적 동등 제도 없음(자격에 따라 WIC/메디케이드).' },
        kr: {
          en: 'National Happiness Card: ₩1,000,000 single / ₩1,400,000 multiples; +₩200,000 delivery-scarce regions.',
          ko: '국민행복카드: 일태아 100만원 / 다태아 140만원; 분만취약지 +20만원.',
        },
        sourceIds: ['nhis-voucher'],
      },
      {
        id: 'supplements',
        topic: { en: 'Free supplements', ko: '무료 영양제' },
        us: { en: 'Not universal (WIC provides some by eligibility).', ko: '보편적이지 않음(WIC가 자격에 따라 일부 제공).' },
        kr: {
          en: 'Health centers give free folic acid (early) and iron (later).',
          ko: '보건소에서 엽산제(초기)·철분제(후기)를 무료 지원.',
        },
        sourceIds: ['childcare', 'mohw'],
      },
    ],
  },
  {
    id: 'records',
    title: { en: 'Records & apps', ko: '기록 및 앱' },
    rows: [
      {
        id: 'record',
        topic: { en: 'Pregnancy record', ko: '임신 기록' },
        us: {
          en: 'Held in the clinic/hospital EHR; request a copy or portal access to carry.',
          ko: '병·의원 전자의무기록에 보관; 사본이나 포털 접근을 요청해 지참.',
        },
        kr: {
          en: 'Maternal health handbook (산모수첩) plus the government 아이마중 / 아이사랑 apps.',
          ko: '산모수첩과 정부 아이마중 / 아이사랑 앱.',
        },
        sourceIds: ['childcare'],
      },
    ],
  },
]

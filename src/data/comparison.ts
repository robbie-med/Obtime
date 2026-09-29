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
          en: 'cfDNA/NIPT is now routinely offered to everyone (ACOG 2026) and often insured; the NT/first-trimester screen and quad are alternatives. Choose one approach.',
          ko: 'cfDNA/NIPT를 이제 모두에게 일상적으로 제공(ACOG 2026)하며 보험 적용이 흔함; 1삼분기 NT 선별과 쿼드는 대안. 한 가지 방법 선택.',
        },
        kr: {
          en: 'NT + serum and quad are standard; NIPT is available but usually out-of-pocket (비급여).',
          ko: 'NT+혈청·쿼드가 표준; NIPT는 가능하나 보통 비급여.',
        },
        clinicianNote: {
          en: 'Cost structure differs sharply: NIPT may be routine/covered in the US but a paid add-on in Korea.',
          ko: '비용 구조가 크게 다름: 미국은 NIPT가 일상·보험, 한국은 자비 선택.',
        },
        sourceIds: ['acog-aneuploidy-2026', 'acog-one-approach', 'nhis-nipt', 'news-nipt-price'],
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
          en: '100 g OGTT cutoffs (fasting/1/2/3 h): 105/190/165/145 mg/dL (NDDG) or 95/180/155/140 (Carpenter–Coustan), by lab; ≥2 abnormal = GDM. US: test earlier (first visit) at BMI ≥23 for Asian ancestry.',
          ko: '100g OGTT 기준(공복/1/2/3시간): 105/190/165/145 mg/dL(NDDG) 또는 95/180/155/140(Carpenter–Coustan), 검사실에 따라; 2개 이상 이상 시 진단. 미국: 아시아계 BMI ≥23이면 첫 방문 때 조기 검사.',
        },
        sourceIds: ['seed-doc', 'amc-gdm', 'ada-2026'],
      },
      {
        id: 'gbs',
        topic: { en: 'Group B strep', ko: 'B군 연쇄구균(GBS)' },
        us: { en: 'Everyone swabbed at 36w0d–37w6d.', ko: '모두 36주 0일–37주 6일 면봉 검사.' },
        kr: {
          en: 'No national rule: many hospitals swab everyone at 35–37 wk, others only with risk factors. Ask your hospital.',
          ko: '국가 지침 없음: 많은 병원이 35–37주 전원 검사, 일부는 위험 요인이 있을 때만. 병원에 확인.',
        },
        sourceIds: ['acog-gbs', 'jkms-gbs-2025'],
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
        kr: {
          en: 'Every pregnancy, 27–36 wk (same recommendation) — but self-pay unless your local government covers it.',
          ko: '매 임신, 27–36주 (동일 권고) — 단, 지자체 지원이 없으면 유료.',
        },
        sourceIds: ['cdc-tdap', 'korea-pertussis'],
      },
      {
        id: 'rsv',
        topic: { en: 'RSV', ko: 'RSV' },
        us: {
          en: 'Abrysvo at 32w0d–36w6d, September–January; or an antibody shot (nirsevimab) for the baby instead.',
          ko: '아브리스보 32주 0일–36주 6일, 9–1월; 또는 대신 아기에게 항체 주사(니르세비맙).',
        },
        kr: {
          en: 'Abrysvo approved Aug 2026 for 28–36 wk; not in the national program — self-pay once launched (expected late 2026).',
          ko: '아브리스보 2026년 8월 28–36주로 허가; 국가예방접종 아님 — 출시 후 비급여(2026년 내 예정).',
        },
        sourceIds: ['cdc-rsv', 'news-rsv-kr'],
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
          en: 'National Happiness Card: ₩1,000,000 for one baby; ₩1,000,000 per baby for multiples (twins ₩2,000,000, since 2024); +₩200,000 in delivery-scarce regions. Usable until 2 years after birth.',
          ko: '국민행복카드: 단태아 100만원, 다태아 태아당 100만원(쌍둥이 200만원, 2024년부터); 분만취약지 +20만원. 출산 후 2년까지 사용.',
        },
        sourceIds: ['mohw-voucher', 'mohw-multiples-2024'],
      },
      {
        id: 'supplements',
        topic: { en: 'Free supplements', ko: '무료 영양제' },
        us: { en: 'Not universal (WIC provides some by eligibility).', ko: '보편적이지 않음(WIC가 자격에 따라 일부 제공).' },
        kr: {
          en: 'Health centers give free folic acid (up to 3 months, around conception to ~12 weeks) and iron (5 months, from 16 weeks).',
          ko: '보건소에서 엽산제(임신 전후 최대 3개월분, 약 12주까지)와 철분제(16주부터 5개월분)를 무료 지원.',
        },
        sourceIds: ['gov24-supplements'],
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

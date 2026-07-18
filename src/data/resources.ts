import type { Resource } from './types'

// Curated external resources from the project's source document, tagged so the
// directory can filter by country, audience, and language.
export const RESOURCES: Resource[] = [
  // --- US · mothers ---
  {
    id: 'whattoexpect',
    name: { en: 'What to Expect', ko: 'What to Expect' },
    url: 'https://www.whattoexpect.com',
    country: 'us',
    audience: 'mom',
    lang: ['en'],
    description: {
      en: 'Week-by-week tracking, due-date tools, and a large community. Medically reviewed.',
      ko: '주차별 추적, 예정일 도구, 대규모 커뮤니티. 의학 검수됨.',
    },
  },
  {
    id: 'babycenter',
    name: { en: 'BabyCenter', ko: 'BabyCenter' },
    url: 'https://www.babycenter.com',
    country: 'us',
    audience: 'mom',
    lang: ['en'],
    description: {
      en: 'Large library of pregnancy articles reviewed by OB/GYNs and midwives.',
      ko: '산부인과 의사·조산사가 검수한 방대한 임신 정보.',
    },
  },
  {
    id: 'americanpregnancy',
    name: { en: 'American Pregnancy Association', ko: '미국임신협회' },
    url: 'https://americanpregnancy.org',
    country: 'us',
    audience: 'mom',
    lang: ['en'],
    description: {
      en: 'Non-profit with a free hotline and info on testing and financial assistance (WIC, Medicaid).',
      ko: '무료 상담 전화와 검사·재정 지원(WIC, 메디케이드) 정보를 제공하는 비영리 단체.',
    },
  },
  {
    id: 'ebbirth',
    name: { en: 'Evidence Based Birth', ko: 'Evidence Based Birth' },
    url: 'https://www.evidencebasedbirth.com',
    country: 'us',
    audience: 'both',
    lang: ['en'],
    description: {
      en: 'Deep dives into the evidence behind childbirth practices.',
      ko: '출산 관행의 근거를 깊이 있게 다룹니다.',
    },
  },
  // --- US · clinicians ---
  {
    id: 'perinatology',
    name: { en: 'Perinatology.com', ko: 'Perinatology.com' },
    url: 'https://www.perinatology.com',
    country: 'us',
    audience: 'clinician',
    lang: ['en'],
    description: {
      en: 'Free evidence-based OB/MFM calculators: biometry, dating, Doppler indices.',
      ko: '무료 근거 기반 산과/모체태아의학 계산기: 계측, 주수, 도플러 지표.',
    },
  },
  {
    id: 'who-ob',
    name: { en: 'WHO obstetric guidelines', ko: 'WHO 산과 지침' },
    url: 'https://www.who.int',
    country: 'us',
    audience: 'clinician',
    lang: ['en'],
    description: {
      en: 'Free full-text antenatal, labor, and postpartum guidance.',
      ko: '무료 전문 산전·분만·산후 지침.',
    },
  },
  // --- Korea · mothers ---
  {
    id: 'imatjung',
    name: { en: 'Imatjung (아이마중) government app', ko: '아이마중 (정부 원스톱 앱)' },
    url: 'https://www.ppfk.or.kr',
    country: 'kr',
    audience: 'mom',
    lang: ['ko'],
    description: {
      en: 'Official app for pregnancy registration, records, and applying for benefits.',
      ko: '임신 등록, 기록, 혜택 신청을 위한 공식 앱.',
    },
  },
  {
    id: 'childcare-portal',
    name: { en: 'Isarang pregnancy/childcare portal', ko: '아이사랑 임신육아종합포털' },
    url: 'https://www.childcare.go.kr',
    country: 'kr',
    audience: 'mom',
    lang: ['ko'],
    description: {
      en: 'Government portal: step-by-step pregnancy info and benefit applications.',
      ko: '정부 포털: 단계별 임신 정보와 혜택 신청.',
    },
  },
  {
    id: 'momsholic',
    name: { en: 'Momsholic Baby (Naver Cafe)', ko: '맘스홀릭 베이비 (네이버 카페)' },
    url: 'https://cafe.naver.com/imsanbu',
    country: 'kr',
    audience: 'mom',
    lang: ['ko'],
    description: {
      en: 'Korea’s largest pregnancy/parenting community (3.6M+ members): hospital reviews, stories.',
      ko: '한국 최대 임신·육아 커뮤니티(360만+): 병원 후기, 경험담.',
    },
  },
  {
    id: 'ehealth',
    name: { en: 'e-Health public health portal', ko: 'e보건소' },
    url: 'https://www.e-health.go.kr',
    country: 'kr',
    audience: 'both',
    lang: ['ko'],
    description: {
      en: 'Register a pregnancy, request free supplements, get the maternal handbook, view lab results.',
      ko: '임신 등록, 무료 영양제 신청, 모자보건수첩 발급, 검사 결과 조회.',
    },
  },
  {
    id: 'nip-helper',
    name: { en: 'Vaccination Helper', ko: '예방접종도우미' },
    url: 'https://nip.kdca.go.kr',
    country: 'kr',
    audience: 'both',
    lang: ['ko'],
    description: {
      en: 'Track Tdap/flu in pregnancy and manage the national immunization schedule.',
      ko: '임신 중 Tdap·독감 접종 추적과 국가 예방접종 일정 관리.',
    },
  },
  // --- Korea · clinicians ---
  {
    id: 'ksog-res',
    name: { en: 'Korean Society of OB/GYN (KSOG)', ko: '대한산부인과학회' },
    url: 'https://www.ksog.org',
    country: 'kr',
    audience: 'clinician',
    lang: ['ko', 'en'],
    description: {
      en: 'Academic society: journal, clinical guidelines, consensus statements.',
      ko: '학회: 학술지, 임상 지침, 합의문.',
    },
  },
  {
    id: 'nhis-res',
    name: { en: 'National Health Insurance Service', ko: '국민건강보험공단' },
    url: 'https://www.nhis.or.kr',
    country: 'kr',
    audience: 'clinician',
    lang: ['ko'],
    description: {
      en: 'Reimbursement policy, the Happiness Card voucher system, and billing Q&A.',
      ko: '급여 정책, 국민행복카드 바우처, 청구 Q&A.',
    },
  },
]

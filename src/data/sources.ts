import type { Source } from './types'

// Citation registry. Every researched Korea claim and every non-obvious US claim
// references one of these by id. Accessed dates reflect when the content was built.
export const SOURCES: Source[] = [
  // --- Seed clinical reference (US system) ---
  {
    id: 'seed-doc',
    label: {
      en: 'Prenatal care clinical reference (project source document)',
      ko: '산전 관리 임상 참고자료 (프로젝트 원본 문서)',
    },
    org: 'Project document',
    url: '',
    accessed: '2026-07-17',
  },
  // --- US authorities ---
  {
    id: 'acog',
    label: {
      en: 'ACOG — prenatal care & screening guidance',
      ko: '미국산부인과학회(ACOG) — 산전 관리 및 선별검사 지침',
    },
    org: 'American College of Obstetricians and Gynecologists',
    url: 'https://www.acog.org',
    accessed: '2026-07-17',
  },
  {
    id: 'uspstf',
    label: {
      en: 'USPSTF — preventive screening recommendations',
      ko: '미국예방서비스작업단(USPSTF) — 예방 선별검사 권고',
    },
    org: 'U.S. Preventive Services Task Force',
    url: 'https://www.uspreventiveservicestaskforce.org',
    accessed: '2026-07-17',
  },
  {
    id: 'cdc-vac',
    label: {
      en: 'CDC — vaccines during pregnancy',
      ko: '미국 질병통제예방센터(CDC) — 임신 중 예방접종',
    },
    org: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/vaccines/pregnancy/',
    accessed: '2026-07-17',
  },
  // --- Korea authorities ---
  {
    id: 'kdca-health',
    label: {
      en: 'National Health Information Portal — normal pregnancy management',
      ko: '국가건강정보포털 — 정상임신관리 (임신의 진단과 관리)',
    },
    org: '질병관리청 (KDCA)',
    url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6301',
    accessed: '2026-07-17',
  },
  {
    id: 'ksog',
    label: {
      en: 'Korean Society of Obstetrics and Gynecology',
      ko: '대한산부인과학회 (KSOG)',
    },
    org: '대한산부인과학회',
    url: 'https://www.ksog.org',
    accessed: '2026-07-17',
  },
  {
    id: 'nhis-voucher',
    label: {
      en: 'NHIS — pregnancy & childbirth medical expense support (National Happiness Card)',
      ko: '국민건강보험공단 — 임신·출산 진료비 지원 (국민행복카드)',
    },
    org: '국민건강보험공단 (NHIS)',
    url: 'https://www.nhis.or.kr/static/html/wbma/c/wbmac0212.html',
    accessed: '2026-07-17',
  },
  {
    id: 'childcare',
    label: {
      en: 'Isarang — national pregnancy & childcare portal',
      ko: '아이사랑 — 임신육아종합포털',
    },
    org: '보건복지부 / 한국사회보장정보원',
    url: 'https://www.childcare.go.kr',
    accessed: '2026-07-17',
  },
  {
    id: 'kdca-nip',
    label: {
      en: 'Vaccination Helper — national immunization info',
      ko: '예방접종도우미 — 예방접종 정보',
    },
    org: '질병관리청 (KDCA)',
    url: 'https://nip.kdca.go.kr',
    accessed: '2026-07-17',
  },
  {
    id: 'amc-gdm',
    label: {
      en: 'Asan Medical Center — gestational diabetes screening & diagnosis',
      ko: '서울아산병원 — 임신성 당뇨검사 (선별 및 확진)',
    },
    org: '서울아산병원',
    url: 'https://www.amc.seoul.kr/asan/healthinfo/management/managementDetail.do?managementId=61',
    accessed: '2026-07-17',
  },
  {
    id: 'nhis-nipt',
    label: {
      en: 'NHIS non-covered service portal — NIPT (non-invasive prenatal test)',
      ko: '국민건강보험공단 비급여 정보 포털 — 비침습적 산전검사(NIPT/니프티)',
    },
    org: '국민건강보험공단 (NHIS)',
    url: 'https://www.nhis.or.kr/nbinfo/wbhfaa06200m28.do',
    accessed: '2026-07-17',
  },
  {
    id: 'mohw',
    label: {
      en: 'Ministry of Health and Welfare — maternal & child health policy',
      ko: '보건복지부 — 모자보건 정책',
    },
    org: '보건복지부 (MOHW)',
    url: 'https://www.mohw.go.kr',
    accessed: '2026-07-17',
  },
]

const SOURCE_IDS = new Set(SOURCES.map((s) => s.id))

export function getSource(id: string): Source | undefined {
  return SOURCES.find((s) => s.id === id)
}

/** Used by the data-integrity test: are all referenced ids real? */
export function isKnownSource(id: string): boolean {
  return SOURCE_IDS.has(id)
}

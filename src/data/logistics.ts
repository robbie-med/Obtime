import type { Bilingual } from './types'

// Crossover logistics for a mother based in the US who plans to fly to Korea to
// deliver (the most common direction in the target audience). Travel-timing facts
// come from the seed clinical reference ("Travel during pregnancy"); Korean
// administrative steps from NHIS / MOHW / Isarang portals.

export type CrossoverPhase = 'before' | 'carry' | 'arrival'

export interface CrossoverStep {
  id: string
  phase: CrossoverPhase
  title: Bilingual
  detail: Bilingual
  timing?: Bilingual
  sourceIds?: string[]
}

export const TRAVEL_TIMING: { title: Bilingual; points: Bilingual[] } = {
  title: {
    en: 'When is it safest to fly?',
    ko: '언제 비행하는 것이 가장 안전할까요?',
  },
  points: [
    {
      en: 'The second trimester (about 14–27 weeks) is usually the most comfortable and lowest-risk time to travel — most obstetric emergencies happen in the first and third trimesters.',
      ko: '보통 임신 중기(약 14~27주)가 여행하기 가장 편하고 위험이 낮습니다 — 대부분의 산과 응급은 초기와 말기에 발생합니다.',
    },
    {
      en: 'Many airlines restrict flying after ~36 weeks (single) or ~32 weeks (twins), and often require a doctor’s letter after 28 weeks. Check your airline’s policy early.',
      ko: '많은 항공사가 단태아 약 36주, 쌍태아 약 32주 이후 탑승을 제한하며 28주 이후에는 의사 소견서를 요구하는 경우가 많습니다. 항공사 규정을 미리 확인하세요.',
    },
    {
      en: 'Long-haul flights raise the risk of blood clots (VTE). Move around, stay hydrated, and ask your provider about compression stockings.',
      ko: '장거리 비행은 혈전(정맥혈전색전증) 위험을 높입니다. 자주 움직이고 수분을 충분히 섭취하며 압박 스타킹에 대해 의료진과 상의하세요.',
    },
    {
      en: 'Carry a copy of your medical records and always wear your seatbelt (under the belly).',
      ko: '진료 기록 사본을 소지하고, 안전벨트는 항상 배 아래로 착용하세요.',
    },
  ],
}

export const CROSSOVER_STEPS: CrossoverStep[] = [
  // --- Before you fly (finish in the US) ---
  {
    id: 'x-records',
    phase: 'before',
    title: { en: 'Get copies of your prenatal records', ko: '산전 진료 기록 사본 받기' },
    detail: {
      en: 'Ask your US clinic for your blood type & Rh, antibody screen, infection serologies (HIV/HepB/HepC/syphilis/rubella/varicella), all ultrasound reports, and any genetic screening results — ideally in English with dates.',
      ko: '미국 병원에서 혈액형·Rh, 항체선별검사, 감염 혈청검사(HIV/B형·C형간염/매독/풍진/수두), 모든 초음파 판독지, 유전자 선별검사 결과를 날짜와 함께 (가능하면 영문으로) 받아두세요.',
    },
    sourceIds: ['seed-doc'],
  },
  {
    id: 'x-anatomy',
    phase: 'before',
    title: { en: 'Try to complete the anatomy scan first', ko: '정밀 초음파(정밀 계측)를 먼저 마치기' },
    detail: {
      en: 'If timing allows, complete the 18–22 week anatomy scan before traveling so any findings can be discussed before a long flight and a change of care team.',
      ko: '가능하면 18~22주 정밀 초음파를 여행 전에 마쳐, 이상 소견이 있으면 장거리 비행과 병원 변경 전에 상의할 수 있게 하세요.',
    },
    timing: { en: 'Best done by ~22 weeks', ko: '약 22주까지 권장' },
    sourceIds: ['seed-doc', 'acog'],
  },
  {
    id: 'x-fitletter',
    phase: 'before',
    title: { en: 'Ask for a “fit to fly” letter if past 28 weeks', ko: '28주 이후라면 비행 가능 소견서 요청' },
    detail: {
      en: 'After 28 weeks most airlines want a dated letter from your provider stating your due date and that you are cleared to fly. Request it close to your travel date.',
      ko: '28주 이후에는 대부분의 항공사가 예정일과 비행 가능 여부가 적힌 의사 소견서를 요구합니다. 출발일에 가깝게 발급받으세요.',
    },
  },
  {
    id: 'x-insurance',
    phase: 'before',
    title: { en: 'Check insurance & residency for Korean coverage', ko: '한국 건강보험 자격·보장 확인' },
    detail: {
      en: 'National Health Insurance (and the childbirth voucher) generally requires eligibility in Korea. Confirm your status, and consider travel insurance that covers pregnancy for the trip itself.',
      ko: '국민건강보험(및 임신·출산 바우처)은 보통 한국 내 자격이 필요합니다. 본인 자격을 확인하고, 여행 자체에 대해서는 임신을 보장하는 여행자 보험을 고려하세요.',
    },
    sourceIds: ['nhis-voucher'],
  },
  // --- Carry with you ---
  {
    id: 'x-carry-records',
    phase: 'carry',
    title: { en: 'Medical records & medication list', ko: '진료 기록과 복용약 목록' },
    detail: {
      en: 'Bring paper and digital copies of your records, a current medication and supplement list, your blood type, and any GBS result if already done.',
      ko: '진료 기록의 종이·디지털 사본, 현재 복용 중인 약과 영양제 목록, 혈액형, (이미 했다면) GBS 결과를 지참하세요.',
    },
  },
  {
    id: 'x-carry-docs',
    phase: 'carry',
    title: { en: 'Passport, ARC, and insurance cards', ko: '여권·외국인등록증·보험증' },
    detail: {
      en: 'You’ll need identification to register the pregnancy and apply for benefits in Korea. Keep your maternal handbook (산모수첩) with you if you already have one.',
      ko: '한국에서 임신 등록과 지원 신청에 신분증이 필요합니다. 이미 있다면 산모수첩을 함께 소지하세요.',
    },
  },
  // --- On arrival in Korea ---
  {
    id: 'x-register',
    phase: 'arrival',
    title: { en: 'Register the pregnancy at a public health center (보건소)', ko: '보건소에 임신 등록' },
    detail: {
      en: 'Register in person at your local 보건소 (or online via 정부24 / e-보건소). You’ll receive the standard maternal-child health handbook (표준모자보건수첩) and can request free folic acid and iron supplements.',
      ko: '가까운 보건소에서 (또는 정부24·e보건소 온라인으로) 임신을 등록하세요. 표준모자보건수첩을 받고 엽산제·철분제를 무료로 신청할 수 있습니다.',
    },
    sourceIds: ['childcare', 'mohw'],
  },
  {
    id: 'x-voucher',
    phase: 'arrival',
    title: { en: 'Apply for the National Happiness Card voucher (국민행복카드)', ko: '국민행복카드 바우처 신청' },
    detail: {
      en: 'With an OB’s confirmation of pregnancy, apply for the pregnancy & childbirth medical-expense voucher: about ₩1,000,000 for a single pregnancy and ₩1,400,000 for multiples (with an extra ₩200,000 in delivery-scarce regions). It offsets your out-of-pocket costs for prenatal care and delivery.',
      ko: '산부인과의 임신 확인을 받아 임신·출산 진료비 바우처를 신청하세요: 단태아 약 100만원, 다태아 약 140만원(분만취약지 거주 시 20만원 추가). 산전 진료와 분만 본인부담금에 사용할 수 있습니다.',
    },
    sourceIds: ['nhis-voucher'],
  },
  {
    id: 'x-choose-ob',
    phase: 'arrival',
    title: { en: 'Choose an OB clinic and transfer your care', ko: '산부인과 선택 및 진료 인계' },
    detail: {
      en: 'Pick a clinic or hospital (의원/병원/대학병원 depending on risk) and bring your records to establish care. Korea typically offers more frequent ultrasounds than the US — your new team will set your visit schedule.',
      ko: '위험도에 따라 의원·병원·대학병원을 선택하고 진료 기록을 가지고 가서 진료를 인계받으세요. 한국은 미국보다 초음파를 더 자주 시행하는 편이며, 새 의료진이 방문 일정을 정해줍니다.',
    },
    sourceIds: ['kdca-health', 'ksog'],
  },
  {
    id: 'x-vaccines',
    phase: 'arrival',
    title: { en: 'Sort out vaccines (Tdap, flu) via 예방접종도우미', ko: '예방접종(Tdap·독감) 확인 — 예방접종도우미' },
    detail: {
      en: 'Confirm which pregnancy vaccines you’ve had and what’s still due. You can track records through the national 예방접종도우미 portal.',
      ko: '임신 중 접종 이력과 남은 접종을 확인하세요. 예방접종도우미 포털에서 기록을 관리할 수 있습니다.',
    },
    sourceIds: ['kdca-nip'],
  },
  {
    id: 'x-postpartum',
    phase: 'arrival',
    title: { en: 'Look into 산후조리원 and postpartum support', ko: '산후조리원·산후 지원 알아보기' },
    detail: {
      en: 'Many families use a postpartum care center (산후조리원). Some cities offer vouchers or subsidized care — ask your 보건소 or city pregnancy portal about local programs.',
      ko: '많은 가정이 산후조리원을 이용합니다. 일부 지자체는 바우처나 지원을 제공하니 보건소나 시 임신·출산 포털에 지역 프로그램을 문의하세요.',
    },
    sourceIds: ['mohw'],
  },
]

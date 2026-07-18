import type { GlossaryTerm } from './types'

// Bilingual clinic glossary for the "point-to-translate" card. Designed to be
// shown on a phone (or printed) inside a clinic in either country. Romanization
// helps an English speaker say the Korean term aloud.
export const GLOSSARY: GlossaryTerm[] = [
  { id: 'due-date', en: 'Due date', ko: '출산 예정일', koRomanized: 'chulssan yejeong-il', category: 'general' },
  { id: 'weeks', en: 'Weeks pregnant (gestational age)', ko: '임신 주수', koRomanized: 'imsin jusu', category: 'general' },
  { id: 'ultrasound', en: 'Ultrasound', ko: '초음파', koRomanized: 'cho-eumpa', category: 'test' },
  { id: 'anatomy-scan', en: 'Anatomy scan (detailed ultrasound)', ko: '정밀 초음파', koRomanized: 'jeongmil cho-eumpa', category: 'test' },
  { id: 'blood-test', en: 'Blood test', ko: '혈액 검사', koRomanized: 'hyeoraek geomsa', category: 'test' },
  { id: 'blood-type', en: 'Blood type', ko: '혈액형', koRomanized: 'hyeoraekhyeong', category: 'test' },
  { id: 'anemia', en: 'Anemia', ko: '빈혈', koRomanized: 'binhyeol', category: 'test' },
  {
    id: 'gdm',
    en: 'Gestational diabetes test',
    ko: '임신성 당뇨 검사',
    koRomanized: 'imsinseong dangnyo geomsa',
    category: 'test',
    note: { en: 'The “glucose drink” test at 24–28 weeks.', ko: '24–28주의 “당물” 검사.' },
  },
  { id: 'nipt', en: 'NIPT (cell-free DNA screen)', ko: '니프티 / NIPT', koRomanized: 'nipeuti', category: 'test' },
  { id: 'quad', en: 'Quad screen', ko: '쿼드 검사', koRomanized: 'kwodeu geomsa', category: 'test' },
  { id: 'nt', en: 'Nuchal translucency', ko: '목덜미 투명대', koRomanized: 'mokdeolmi tumyeongdae', category: 'test' },
  { id: 'amnio', en: 'Amniocentesis', ko: '양수 검사', koRomanized: 'yangsu geomsa', category: 'test' },
  { id: 'gbs', en: 'Group B strep swab', ko: '질·직장 배양검사 (GBS)', koRomanized: 'jil-jikjang baeyang-geomsa', category: 'test' },
  { id: 'tdap', en: 'Tdap (whooping cough) vaccine', ko: '백일해 예방접종', koRomanized: 'baegilhae yebang-jeopjong', category: 'general' },
  { id: 'urine', en: 'Urine test', ko: '소변 검사', koRomanized: 'sobyeon geomsa', category: 'test' },
  { id: 'bp', en: 'Blood pressure', ko: '혈압', koRomanized: 'hyeorap', category: 'visit' },
  { id: 'weight', en: 'Weight', ko: '체중', koRomanized: 'chejung', category: 'visit' },
  { id: 'fetal-heartbeat', en: 'Baby’s heartbeat', ko: '태아 심박', koRomanized: 'tae-a simbak', category: 'visit' },
  { id: 'movement', en: 'Fetal movement (kicks)', ko: '태동', koRomanized: 'taedong', category: 'symptom' },
  { id: 'contractions', en: 'Contractions', ko: '진통 / 수축', koRomanized: 'jintong / suchuk', category: 'symptom' },
  { id: 'bleeding', en: 'Bleeding', ko: '출혈', koRomanized: 'chulhyeol', category: 'symptom' },
  { id: 'water-broke', en: 'My water broke', ko: '양수가 터졌어요', koRomanized: 'yangsu-ga teojyeosseoyo', category: 'symptom' },
  { id: 'pain', en: 'Pain', ko: '통증', koRomanized: 'tongjeung', category: 'symptom' },
  { id: 'nausea', en: 'Nausea / vomiting', ko: '메스꺼움 / 구토', koRomanized: 'meseukkeoum / guto', category: 'symptom' },
  { id: 'record', en: 'Maternal health record', ko: '산모수첩', koRomanized: 'sanmo sucheop', category: 'admin' },
  { id: 'voucher', en: 'Pregnancy voucher card', ko: '국민행복카드', koRomanized: 'gukmin haengbok kadeu', category: 'admin' },
  { id: 'health-center', en: 'Public health center', ko: '보건소', koRomanized: 'bogeonso', category: 'admin' },
  { id: 'insurance', en: 'Health insurance', ko: '건강보험', koRomanized: 'geongang boheom', category: 'admin' },
  { id: 'ob', en: 'OB/GYN department', ko: '산부인과', koRomanized: 'sanbuingwa', category: 'admin' },
  { id: 'referral', en: 'Referral', ko: '진료의뢰서', koRomanized: 'jinryo-uiroeseo', category: 'admin' },
]

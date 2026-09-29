import type { Bilingual, RoutineCheck, VisitNote } from './types'

// Routine check-ups — the "in-between" visits (every 4 → 2 → 1 weeks). Most of
// what happens is quiet screening: blood pressure for preeclampsia, the baby's
// heartbeat, growth and movement, and warning signs. Verified 2026-09 against
// USPSTF, ACOG (CC 8, CPG 4, CO 518, FAQs), AAFP, MedlinePlus, KDCA and SNUH.
// Honest framing: the traditional schedule adds visits late in pregnancy because
// problems can appear then; ACOG (2025) notes fewer, tailored visits are
// reasonable for low-risk pregnancies.

const t = (en: string, ko: string): Bilingual => ({ en, ko })

/** What is checked at routine visits, by week and country. */
export const ROUTINE_CHECKS: RoutineCheck[] = [
  {
    id: 'bp',
    country: 'both',
    fromWeek: 0,
    label: t('Blood pressure', '혈압'),
    why: t(
      'The main screen for preeclampsia, which usually develops after 20 weeks — often in the third trimester — and often without symptoms at first. Checking it at every visit is the recommended screen.',
      '전자간증을 찾는 핵심 검사입니다. 전자간증은 보통 20주 이후, 흔히 3삼분기에 생기며 처음에는 증상이 없는 경우가 많습니다. 매 진료 혈압 측정이 권장되는 선별 방법입니다.',
    ),
    sourceIds: ['uspstf-htn', 'acog-preeclampsia', 'kdca-health'],
  },
  {
    id: 'weight',
    country: 'both',
    fromWeek: 0,
    label: t('Weight', '체중'),
    why: t(
      'Tracks your gain against the range for your pre-pregnancy BMI (see Nutrition). Too much or too little gain changes the risks for you and the baby.',
      '임신 전 BMI에 맞는 권장 범위와 비교해 체중 증가를 확인합니다(영양 참고). 너무 많거나 적게 늘면 엄마와 아기의 위험이 달라집니다.',
    ),
    sourceIds: ['acog-weight', 'kdca-health'],
  },
  {
    id: 'heartbeat',
    country: 'both',
    fromWeek: 12,
    label: t('Baby’s heartbeat', '태아 심박'),
    why: t(
      'Heard with a handheld Doppler from about 10–12 weeks (in Korea usually seen on ultrasound). A normal rate is 110–160 beats a minute. It is a reassurance check of that moment.',
      '약 10–12주부터 휴대용 도플러로 들을 수 있습니다(한국은 보통 초음파로 확인). 정상은 분당 110–160회입니다. 그 순간의 안녕을 확인하는 검사입니다.',
    ),
    sourceIds: ['aafp-prenatal-2014', 'kdca-health'],
  },
  {
    id: 'symptoms',
    country: 'both',
    fromWeek: 0,
    label: t('How you feel', '증상 확인'),
    why: t(
      'You are asked about bleeding, cramping, headaches, vision changes, sudden swelling of the face or hands, contractions or leaking fluid — early signs of problems that a tape measure or blood test won’t show.',
      '출혈, 복통, 두통, 시야 변화, 얼굴·손의 갑작스러운 부종, 수축, 양수 누출 등을 묻습니다 — 줄자나 혈액검사로는 보이지 않는 문제의 초기 신호입니다.',
    ),
    sourceIds: ['acog-preeclampsia', 'snuh-preeclampsia', 'seed-doc'],
  },
  {
    id: 'urine-us',
    country: 'us',
    fromWeek: 0,
    label: t('Urine test only if needed', '필요할 때만 소변검사'),
    why: t(
      'Many people expect to “pee in a cup” every visit. ACOG (2025) no longer recommends a routine urine dipstick because it misses and over-calls problems; it is done if your blood pressure is up or you have symptoms.',
      '매번 소변검사를 한다고 생각하기 쉽지만, ACOG(2025)는 정확도가 낮아 일상적 소변 딥스틱을 더 이상 권하지 않습니다. 혈압이 오르거나 증상이 있을 때 합니다.',
    ),
    sourceIds: ['acog-cc8', 'uspstf-htn'],
  },
  {
    id: 'urine-kr',
    country: 'kr',
    fromWeek: 0,
    label: t('Urine test (protein, sugar)', '소변검사 (단백·당)'),
    why: t(
      'Korean clinics usually test urine at every visit, alongside blood pressure, to pick up preeclampsia early before symptoms appear.',
      '한국 병원은 보통 매 진료 혈압과 함께 소변검사를 해, 증상이 나타나기 전에 전자간증을 조기에 발견합니다.',
    ),
    sourceIds: ['snuh-preeclampsia'],
  },
  {
    id: 'ultrasound-kr',
    country: 'kr',
    fromWeek: 12,
    label: t('Quick ultrasound (most visits)', '초음파 (대부분의 진료)'),
    why: t(
      'Common Korean practice: the baby’s size, position, heartbeat, placenta and fluid are checked by ultrasound at most visits (KDCA describes an ultrasound every 4 weeks at 20–28 weeks). Insurance covers a set number of scans.',
      '한국에서 흔한 방식: 대부분의 진료에서 초음파로 태아 크기·자세·심박·태반·양수를 봅니다(질병관리청은 20–28주에 4주마다 초음파를 설명). 건강보험은 정해진 횟수를 보장합니다.',
    ),
    sourceIds: ['kdca-health', 'hira-ultrasound'],
  },
  {
    id: 'movement',
    country: 'both',
    fromWeek: 20,
    label: t('Baby’s movements', '태동'),
    why: t(
      'Once you can feel the baby, a change or slowdown in movement is one of the most important warning signs — say so at the visit, or call the same day if it happens in between.',
      '태동을 느끼기 시작하면, 태동의 변화나 감소는 가장 중요한 경고 신호 중 하나입니다 — 진료 때 말하고, 그 사이에 생기면 당일 연락하세요.',
    ),
    sourceIds: ['acog-fetal-tests', 'acog-cc8'],
  },
  {
    id: 'warning-signs',
    country: 'both',
    fromWeek: 20,
    toWeek: 36,
    label: t('Preterm-labor signs reviewed', '조기 진통 신호 확인'),
    why: t(
      'Labor before 37 weeks can start quietly: regular tightening (often painless), a low dull backache, pelvic pressure, cramps, a change or increase in discharge, or leaking fluid. If you notice any, call right away — don’t wait for the next visit.',
      '37주 전 진통은 조용히 시작될 수 있습니다: 규칙적인(흔히 통증 없는) 뭉침, 계속되는 둔한 허리 통증, 골반 압박감, 복통, 분비물의 변화나 증가, 양수 누출. 하나라도 있으면 다음 진료를 기다리지 말고 바로 연락하세요.',
    ),
    sourceIds: ['acog-preterm', 'seed-doc'],
  },
  {
    id: 'fundal',
    country: 'us',
    fromWeek: 24,
    label: t('Fundal height', '자궁저 높이'),
    why: t(
      'A tape measure from the pubic bone to the top of the uterus — in centimeters it roughly equals your weeks (±3). A bigger gap leads to a growth ultrasound. (In Korea, growth is usually checked by ultrasound instead.)',
      '치골에서 자궁 꼭대기까지 줄자로 잽니다 — cm 수치가 대략 주수(±3)와 같습니다. 차이가 크면 성장 초음파를 합니다. (한국은 보통 초음파로 성장을 확인합니다.)',
    ),
    sourceIds: ['aafp-fundal', 'acog-cc8', 'seed-doc'],
  },
  {
    id: 'safety-t2',
    country: 'us',
    fromWeek: 16,
    toWeek: 16,
    label: t('A private safety question', '안전에 관한 개별 질문'),
    why: t(
      'ACOG advises asking every pregnant patient privately about violence or control at home at least once each trimester. It is routine — asked of everyone — and help is available if it applies.',
      'ACOG는 모든 임신부에게 삼분기마다 최소 한 번 가정 내 폭력이나 통제에 대해 따로 묻도록 권합니다. 모두에게 묻는 일상 질문이며, 해당되면 도움을 받을 수 있습니다.',
    ),
    sourceIds: ['acog-ipv', 'seed-doc'],
  },
  {
    id: 'mood-us',
    country: 'us',
    fromWeek: 28,
    toWeek: 28,
    label: t('Mood questionnaire (depression & anxiety)', '기분 설문 (우울·불안)'),
    why: t(
      'ACOG recommends screening everyone for depression and anxiety with a short validated questionnaire (such as the EPDS or PHQ-9) at the first visit, again later in pregnancy, and after birth. It is common and treatable.',
      'ACOG는 첫 진료, 임신 후반, 출산 후에 짧은 검증된 설문(EPDS·PHQ-9 등)으로 모두의 우울·불안을 선별하도록 권합니다. 흔하고 치료할 수 있습니다.',
    ),
    sourceIds: ['acog-mental-health', 'aafp-prenatal-2023'],
  },
  {
    id: 'mood-kr',
    country: 'kr',
    fromWeek: 28,
    toWeek: 28,
    label: t('Mood — ask, it isn’t routine', '기분 — 먼저 요청하세요'),
    why: t(
      'Korean law funds depression screening and counseling for pregnant and new mothers through the 보건소 and regional counseling centers (Seoul’s center accepts pregnant women), but OB clinics do not routinely screen — so bring it up yourself if you feel low or anxious.',
      '모자보건법에 따라 보건소와 권역 상담센터가 임산부의 우울 선별·상담을 지원하지만(서울 센터는 임신부도 이용 가능) 산부인과에서 일상적으로 선별하지는 않습니다 — 기분이 가라앉거나 불안하면 먼저 말하세요.',
    ),
    sourceIds: ['easylaw-depression', 'seoul-counseling'],
  },
  {
    id: 'safety-t3',
    country: 'us',
    fromWeek: 30,
    toWeek: 30,
    label: t('A private safety question', '안전에 관한 개별 질문'),
    why: t(
      'The once-per-trimester safety question again, asked of everyone in private.',
      '삼분기마다 한 번 하는 안전 질문으로, 모두에게 따로 묻습니다.',
    ),
    sourceIds: ['acog-ipv'],
  },
  {
    id: 'nst-kr',
    country: 'kr',
    fromWeek: 32,
    label: t('Non-stress test (NST)', '비수축검사 (NST)'),
    why: t(
      'A 20–40 minute heart-rate tracing; Korean hospitals usually do it at visits from 32 weeks. (In the US it is used only when there is a specific reason.)',
      '20–40분간 태아 심박을 기록합니다. 한국 병원은 보통 32주부터 진료 때마다 합니다. (미국은 특정 이유가 있을 때만.)',
    ),
    sourceIds: ['amc-nst', 'acog-surveillance'],
  },
  {
    id: 'position',
    country: 'both',
    fromWeek: 36,
    label: t('Baby’s position', '태아 위치'),
    why: t(
      'Head-down or breech changes the birth plan. Checked by feeling your belly (Leopold maneuvers) from 36 weeks, with ultrasound if unsure.',
      '머리가 아래인지(두위) 둔위인지에 따라 분만 계획이 달라집니다. 36주부터 배를 만져(레오폴드 수기) 확인하고, 불확실하면 초음파로 봅니다.',
    ),
    sourceIds: ['seed-doc', 'medlineplus-3t', 'kdca-health'],
  },
  {
    id: 'labor-plan',
    country: 'both',
    fromWeek: 36,
    label: t('When to call, when to go in', '언제 연락하고 언제 병원에 갈지'),
    why: t(
      'If you think you are in labor (or aren’t sure), call. Go to the hospital if your water breaks without contractions, you bleed heavily, you have constant severe pain with no break, or the baby is moving less. True labor contractions come regularly and get closer together. (“5-1-1” is a common rule of thumb, not an ACOG rule — follow your own clinician’s instructions.)',
      '진통인 것 같거나 확실하지 않으면 연락하세요. 수축 없이 양수가 터졌을 때, 출혈이 많을 때, 쉬는 틈 없이 심한 통증이 계속될 때, 태동이 줄었을 때는 병원에 가세요. 진짜 진통은 규칙적으로 오고 간격이 점점 짧아집니다. (“5-1-1”은 흔한 경험칙일 뿐 ACOG 기준이 아니니 담당 의료진의 지시를 따르세요.)',
    ),
    sourceIds: ['acog-labor'],
  },
  {
    id: 'cervix-us',
    country: 'us',
    fromWeek: 37,
    label: t('Cervical check — optional', '내진 — 선택'),
    why: t(
      'Some US clinicians offer to check whether the cervix is opening. It does not predict when labor will start, and a trial of weekly checks from 37 weeks found no benefit — you can ask why it’s being done or decline.',
      '일부 미국 의료진은 자궁경부가 열렸는지 확인하자고 합니다. 진통 시작 시기를 예측하지 못하며, 37주부터 매주 내진한 시험에서 이점이 없었습니다 — 이유를 묻거나 거절할 수 있습니다.',
    ),
    sourceIds: ['medlineplus-3t', 'cervix-rct-1992', 'aafp-prenatal-2023'],
  },
  {
    id: 'cervix-kr',
    country: 'kr',
    fromWeek: 37,
    label: t('Internal exam (내진) — common', '내진 — 흔히 시행'),
    why: t(
      'From 37 weeks Korean clinics commonly check the cervix and how far the baby has descended by internal exam. It gives a snapshot, not a prediction of when labor will start; you can ask whether it’s needed.',
      '37주부터 한국 병원은 흔히 내진으로 자궁경부 개대와 태아 하강 정도를 확인합니다. 현재 상태를 볼 뿐 진통 시작을 예측하지는 못하며, 필요한지 물어볼 수 있습니다.',
    ),
    sourceIds: ['kdca-health', 'cervix-rct-1992'],
  },
]

/** The point of each routine check-up week. */
export const VISIT_NOTES: VisitNote[] = [
  {
    week: 12,
    focus: t('First-trimester results & hearing the heartbeat', '초기 검사 결과 & 심장 소리 듣기'),
    why: t(
      'Goes over your first blood tests and screening choices, and is often the first time you hear the heartbeat by Doppler. Also a check on nausea, weight and mood as the first trimester ends.',
      '첫 혈액검사 결과와 선별검사 선택을 확인하고, 도플러로 처음 심장 소리를 듣는 경우가 많습니다. 1삼분기가 끝나가며 입덧·체중·기분도 확인합니다.',
    ),
    ask: [
      t('Can we go over my first-trimester blood test results?', '임신 초기 혈액검사 결과를 같이 봐 주시겠어요?'),
      t('Which chromosome screening am I doing, and when are the results back?', '어떤 염색체 선별검사를 하고, 결과는 언제 나오나요?'),
      t('My nausea is bad — what is safe to take?', '입덧이 심한데, 어떤 약이 안전한가요?'),
    ],
    sourceIds: ['aafp-prenatal-2014', 'seed-doc'],
  },
  {
    week: 16,
    focus: t('Screening results & settling into the second trimester', '선별검사 결과 & 임신 중기 시작'),
    why: t(
      'A mostly quiet safety check (blood pressure, weight, heartbeat) plus any genetic screening results and booking the anatomy scan. Often the most comfortable stretch of pregnancy — and the best time to travel.',
      '혈압·체중·심박을 보는 비교적 조용한 확인 진료로, 유전 선별검사 결과를 듣고 정밀 초음파를 예약합니다. 임신 중 가장 편한 시기이자 여행하기 좋은 때입니다.',
    ),
    ask: [
      t('When is my anatomy scan scheduled?', '정밀 초음파는 언제로 잡혀 있나요?'),
      t('When should I start to feel the baby move?', '태동은 언제부터 느낄 수 있나요?'),
      t('I may fly internationally — is now a good time, and do I need a letter?', '해외로 비행할 수도 있는데, 지금이 괜찮은 시기인지, 소견서가 필요한지 궁금해요.'),
    ],
    sourceIds: ['seed-doc'],
  },
  {
    week: 20,
    focus: t('Anatomy results & the halfway point', '정밀 초음파 결과 & 임신 중간 지점'),
    why: t(
      'Usually timed to go over the anatomy scan. From here on, blood pressure matters more, because preeclampsia can appear after 20 weeks — and you start being asked about the baby’s movements.',
      '보통 정밀 초음파 결과를 확인하는 진료입니다. 20주 이후 전자간증이 생길 수 있어 지금부터 혈압이 더 중요해지고, 태동에 대해서도 묻기 시작합니다.',
    ),
    ask: [
      t('Was everything normal on the anatomy scan? Where is the placenta?', '정밀 초음파는 모두 정상이었나요? 태반 위치는 어디인가요?'),
      t('Which signs of preterm labor should I watch for?', '조기 진통은 어떤 신호를 주의해야 하나요?'),
    ],
    sourceIds: ['acog-preeclampsia', 'acog-ultrasound'],
  },
  {
    week: 24,
    focus: t('Growth tracking starts; diabetes test planned', '성장 측정 시작; 당뇨 검사 계획'),
    why: t(
      'Growth measurements usually start now, and the 24–28 week diabetes test and blood count get scheduled. Preeclampsia and growth problems become more likely from here, so blood pressure and growth are the focus.',
      '이제 보통 성장 측정을 시작하고, 24–28주 당뇨 검사와 혈구 검사를 잡습니다. 이때부터 전자간증과 성장 문제가 더 흔해져 혈압과 성장이 핵심입니다.',
    ),
    ask: [
      t('When is my glucose test, and do I need to fast?', '당 검사는 언제이고, 금식이 필요한가요?'),
      t('Can I get the Tdap vaccine at my next visit?', '다음 진료 때 Tdap 백신을 맞을 수 있나요?'),
    ],
    sourceIds: ['aafp-fundal', 'acog-preeclampsia', 'ada-2026'],
  },
  {
    week: 28,
    focus: t('Third trimester starts: labs, Tdap, Rh, mood check', '임신 말기 시작: 검사·Tdap·Rh·기분 확인'),
    why: t(
      'A busy visit: third-trimester labs, the Tdap window, anti-D if you are Rh-negative, and a mood check. From here the traditional schedule moves to every 2 weeks, because preeclampsia, growth problems and preterm labor are more likely in the third trimester and can appear between visits. (ACOG notes fewer, tailored visits are reasonable for low-risk pregnancies.)',
      '할 일이 많은 진료: 3삼분기 검사, Tdap 접종 시기, Rh 음성이면 항-D, 기분 확인. 이때부터 전통적 일정은 2주마다로 바뀌는데, 3삼분기에는 전자간증·성장 문제·조기 진통이 더 흔하고 진료 사이에 생길 수 있기 때문입니다. (ACOG는 저위험 임신에서 맞춤형으로 진료를 줄이는 것도 합리적이라고 봅니다.)',
    ),
    ask: [
      t('I have been feeling low or anxious — can I be screened or get support?', '요즘 기분이 가라앉거나 불안해요 — 선별검사나 상담을 받을 수 있을까요?'),
      t('What is my blood type — do I need the anti-D shot?', '제 혈액형은 무엇이고, 항-D 주사가 필요한가요?'),
      t('Until what week can I fly, and can you write a fit-to-fly letter?', '몇 주까지 비행할 수 있고, 비행 가능 소견서를 써 주실 수 있나요?'),
    ],
    sourceIds: ['anc-schedule-2013', 'acog-cc8', 'acog-mental-health'],
  },
  {
    week: 30,
    focus: t('Blood pressure, growth and movement', '혈압·성장·태동'),
    why: t(
      'A short check on the three things that can change quickly now: your blood pressure, the baby’s growth, and the baby’s movements.',
      '지금 빠르게 변할 수 있는 세 가지를 짧게 확인합니다: 혈압, 태아 성장, 태동.',
    ),
    ask: [
      t('How should I keep track of the baby’s movements, and when should I call?', '태동은 어떻게 살피고, 언제 연락해야 하나요?'),
      t('Which hospital will I deliver at, and should I pre-register?', '어느 병원에서 분만하고, 미리 등록해야 하나요?'),
    ],
    sourceIds: ['acog-fetal-tests', 'anc-schedule-2013'],
  },
  {
    week: 32,
    focus: t('RSV vaccine window; NST starts in Korea', 'RSV 백신 시기; 한국은 NST 시작'),
    why: t(
      'The same safety checks. In the US the RSV vaccine window opens (September–January); Korean hospitals usually start non-stress tests; and in Korea reduced work hours become available again.',
      '같은 안전 확인에 더해, 미국은 RSV 백신 접종 시기가 시작되고(9–1월), 한국 병원은 보통 비수축검사를 시작하며, 한국에서는 근로시간 단축을 다시 쓸 수 있습니다.',
    ),
    ask: [
      t('Should I get the RSV vaccine, or will the baby get the antibody shot?', 'RSV 백신을 맞아야 하나요, 아니면 아기가 항체 주사를 맞나요?'),
      t('Can you write a note so I can reduce my work hours?', '근로시간 단축을 위한 진단서를 써 주실 수 있나요?'),
    ],
    sourceIds: ['cdc-rsv', 'amc-nst', 'law-lsa74'],
  },
  {
    week: 34,
    focus: t('Birth planning', '분만 계획'),
    why: t(
      'Checks continue; a good visit to talk through birth preferences, pain relief and what to do when labor starts. In Korea the pre-delivery work-up (막달검사) is usually around now.',
      '확인은 계속되며, 분만 선호, 무통 등 통증 조절, 진통이 시작되면 할 일을 이야기하기 좋은 진료입니다. 한국은 보통 이즈음 막달검사를 합니다.',
    ),
    ask: [
      t('What are my pain-relief options at this hospital?', '이 병원의 통증 조절(무통) 선택지는 무엇인가요?'),
      t('Should I call first or go straight to the hospital when labor starts?', '진통이 오면 먼저 전화해야 하나요, 바로 병원에 가야 하나요?'),
    ],
    sourceIds: ['acog-labor', 'cha-antepartum'],
  },
  {
    week: 36,
    focus: t('GBS swab, baby’s position, labor plan', 'GBS 검사·태아 위치·진통 계획'),
    why: t(
      'Weekly visits begin. The Group B strep swab (all in the US; many Korean hospitals), a check that the baby is head-down, and a clear plan for when to call and when to go in.',
      '매주 진료가 시작됩니다. B군 연쇄상구균 검사(미국은 전원, 한국은 많은 병원), 아기가 머리를 아래로 두었는지 확인, 언제 연락하고 언제 병원에 갈지 분명히 정합니다.',
    ),
    ask: [
      t('Is the baby head-down?', '아기가 머리를 아래로 두고 있나요?'),
      t('When will my GBS result be back?', 'GBS 검사 결과는 언제 나오나요?'),
      t('I have a history of genital herpes — should I start suppression medicine?', '생식기 헤르페스 병력이 있는데, 억제 약을 시작해야 하나요?'),
    ],
    sourceIds: ['acog-gbs', 'medlineplus-3t', 'acog-labor'],
  },
  {
    week: 37,
    focus: t('Early term: telling real labor apart', '조기 만삭: 진짜 진통 구별하기'),
    why: t(
      'The baby is now early term. Weekly visits watch blood pressure, position and movement, and review how to tell real labor from practice contractions. A cervical check is common in Korea and optional in the US; it doesn’t predict when labor will start.',
      '이제 조기 만삭입니다. 매주 혈압·태아 위치·태동을 보고, 가진통과 진짜 진통을 구별하는 법을 확인합니다. 내진은 한국에서 흔하고 미국에서는 선택이며, 진통 시작을 예측하지는 못합니다.',
    ),
    ask: [
      t('Do I need a cervical check today, and what will it tell us?', '오늘 내진이 필요한가요? 무엇을 알 수 있나요?'),
      t('What should I do if my water breaks but I have no contractions?', '수축 없이 양수가 터지면 어떻게 해야 하나요?'),
    ],
    sourceIds: ['acog-term', 'acog-labor', 'cervix-rct-1992'],
  },
  {
    week: 38,
    focus: t('Waiting for labor, safely', '안전하게 진통 기다리기'),
    why: t(
      'The same weekly safety checks. A rise in blood pressure, less movement or leaking fluid changes the plan, so these visits catch problems while you wait.',
      '같은 매주 안전 확인입니다. 혈압 상승, 태동 감소, 양수 누출은 계획을 바꾸므로, 기다리는 동안 문제를 찾아내는 진료입니다.',
    ),
    ask: [
      t('Is my blood pressure still normal?', '혈압은 아직 정상인가요?'),
      t('What would make you recommend delivering sooner?', '어떤 경우에 더 일찍 분만을 권하시나요?'),
    ],
    sourceIds: ['acog-preeclampsia', 'medlineplus-3t'],
  },
  {
    week: 39,
    focus: t('Full term: wait or induce?', '만삭: 기다릴까, 유도할까?'),
    why: t(
      'You are full term. Besides the usual checks, this is when to discuss waiting for labor versus a planned induction (in the US an option from 39 weeks for a healthy first-time mother with one baby).',
      '만삭입니다. 평소 확인에 더해, 진통을 기다릴지 계획 유도분만을 할지 상의하는 시기입니다(미국에서는 건강한 초산부·단태아라면 39주부터 선택 가능).',
    ),
    ask: [t('What are the pros and cons of inducing at 39 weeks for me?', '저에게 39주 유도분만의 장단점은 무엇인가요?')],
    sourceIds: ['acog-induction-39', 'acog-term'],
  },
  {
    week: 40,
    focus: t('Due date: the plan if you go past it', '예정일: 넘길 경우의 계획'),
    why: t(
      'Most babies don’t arrive on the due date. This visit sets the plan if labor hasn’t started: extra monitoring from 41 weeks and induction by 41–42 weeks.',
      '대부분의 아기는 예정일에 태어나지 않습니다. 진통이 없을 때의 계획을 세우는 진료입니다: 41주부터 추가 감시, 41–42주에 유도분만.',
    ),
    ask: [
      t('If I go past my due date, when do we start monitoring and when would we induce?', '예정일이 지나면 언제부터 감시를 하고, 언제 유도분만을 하나요?'),
    ],
    sourceIds: ['acog-postdate', 'acog-surveillance'],
  },
]

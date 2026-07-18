import type { DevWeek } from './types'

// Week-by-week fetal development, maternal changes, and common discomforts.
// Discomfort content drawn from the reference doc's "Common discomforts" section.
// Entries mark the week at which they begin to apply; lookups use the latest
// entry at or before the current gestational week.
export const DEV_WEEKS: DevWeek[] = [
  {
    week: 5,
    trimester: 1,
    fetal: {
      en: 'The embryo is tiny; the heart is beginning to form and may soon flutter on ultrasound.',
      ko: '배아는 아주 작고, 심장이 형성되기 시작해 곧 초음파에서 박동이 보일 수 있습니다.',
    },
    maternal: {
      en: 'A missed period and a positive test. Early nausea and tender breasts are common.',
      ko: '생리가 없고 검사 양성. 초기 메스꺼움과 유방 압통이 흔합니다.',
    },
    discomforts: [
      { en: 'Nausea often begins around 4 weeks.', ko: '메스꺼움은 대개 4주경 시작됩니다.' },
      { en: 'Fatigue and frequent urination.', ko: '피로와 잦은 소변.' },
    ],
    sourceIds: ['seed-doc'],
  },
  {
    week: 8,
    trimester: 1,
    fetal: {
      en: 'Major organs are forming and a heartbeat is usually visible on ultrasound.',
      ko: '주요 장기가 형성되고 초음파에서 보통 심박이 보입니다.',
    },
    maternal: {
      en: 'Nausea may be building toward its peak. Rest and small frequent meals help.',
      ko: '메스꺼움이 최고조에 가까워질 수 있습니다. 휴식과 소량씩 자주 먹기가 도움이 됩니다.',
    },
    discomforts: [
      { en: 'Nausea/vomiting peaks around 9 weeks for most.', ko: '메스꺼움·구토는 대개 9주경 최고조.' },
      { en: 'Try ginger and vitamin B6 (pyridoxine) before medication.', ko: '약물 전 생강과 비타민 B6(피리독신)를 시도.' },
    ],
    sourceIds: ['seed-doc'],
  },
  {
    week: 12,
    trimester: 1,
    fetal: {
      en: 'The baby is fully formed in miniature and moving, though you can’t feel it yet.',
      ko: '아기는 축소된 형태로 완성되어 움직이지만 아직 느껴지지는 않습니다.',
    },
    maternal: {
      en: 'End of the first trimester — nausea often starts to ease over the next few weeks.',
      ko: '임신 초기의 끝 — 메스꺼움이 앞으로 몇 주에 걸쳐 완화되기 시작하는 경우가 많습니다.',
    },
    discomforts: [{ en: 'Nausea usually abates by 16–20 weeks.', ko: '메스꺼움은 보통 16–20주까지 가라앉습니다.' }],
    sourceIds: ['seed-doc'],
  },
  {
    week: 16,
    trimester: 2,
    fetal: {
      en: 'The baby is growing fast; from now the fundal height roughly tracks the week number.',
      ko: '아기가 빠르게 자랍니다; 이제부터 자궁저 높이가 대략 주수와 비슷해집니다.',
    },
    maternal: {
      en: 'Many feel more energetic. Some in a second pregnancy feel first movements now.',
      ko: '많은 분이 활력을 되찾습니다. 둘째 이상은 이때 첫 태동을 느끼기도 합니다.',
    },
    sourceIds: ['seed-doc'],
  },
  {
    week: 19,
    trimester: 2,
    fetal: {
      en: 'Around now the anatomy scan checks organs in detail — and often reveals the sex.',
      ko: '이 무렵 정밀 초음파로 장기를 자세히 확인하며, 성별도 보이는 경우가 많습니다.',
    },
    maternal: {
      en: 'First-time mothers often feel first movements (quickening) around 18–19 weeks.',
      ko: '첫 임신은 대개 18–19주경 첫 태동을 느낍니다.',
    },
    sourceIds: ['seed-doc'],
  },
  {
    week: 24,
    trimester: 2,
    fetal: {
      en: 'A milestone of viability. Growth is now monitored by fundal height at each visit.',
      ko: '생존 가능성의 이정표. 이제 매 진료마다 자궁저 높이로 성장을 확인합니다.',
    },
    maternal: {
      en: 'The glucose test is coming up (24–28 weeks). Back and pelvic aches are common.',
      ko: '곧 임신성 당뇨 검사(24–28주)가 있습니다. 허리·골반 통증이 흔합니다.',
    },
    discomforts: [
      { en: 'Pelvic girdle pain affects 15–25%; heat, support belts, and physio help.', ko: '골반 통증은 15–25%에서 발생; 온찜질·복대·물리치료가 도움.' },
    ],
    sourceIds: ['seed-doc'],
  },
  {
    week: 28,
    trimester: 3,
    fetal: {
      en: 'Third trimester begins. The baby gains weight quickly and settles into position.',
      ko: '임신 후기 시작. 아기가 빠르게 체중이 늘고 자세를 잡아갑니다.',
    },
    maternal: {
      en: 'Visits move to every 2 weeks. If Rh-negative, an anti-D injection is given now.',
      ko: '진료가 2주마다로 바뀝니다. Rh 음성이면 지금 항-D 주사를 맞습니다.',
    },
    discomforts: [
      { en: 'Swelling (edema) is common and usually benign — rule out preeclampsia/DVT.', ko: '부종은 흔하고 대개 양성 — 자간전증·심부정맥혈전은 배제.' },
    ],
    sourceIds: ['seed-doc'],
  },
  {
    week: 32,
    trimester: 3,
    fetal: {
      en: 'The baby practices breathing movements; most are head-down or turning that way.',
      ko: '아기가 호흡 연습 운동을 합니다; 대부분 머리가 아래로 향하거나 돌아갑니다.',
    },
    maternal: {
      en: 'Watch fetal movement patterns. Lying on your left side helps blood flow.',
      ko: '태동 양상을 살피세요. 왼쪽으로 누우면 혈류에 도움이 됩니다.',
    },
    discomforts: [
      { en: 'Lying flat can cause dizziness (supine hypotension) — lie on your side.', ko: '똑바로 누우면 어지러울 수 있음(앙와위 저혈압) — 옆으로 눕기.' },
    ],
    sourceIds: ['seed-doc'],
  },
  {
    week: 36,
    trimester: 3,
    fetal: {
      en: 'Nearly full term. The GBS swab is done around now and position is checked.',
      ko: '거의 만삭. 이 무렵 GBS 검사를 하고 태아 위치를 확인합니다.',
    },
    maternal: {
      en: 'Weekly visits begin. Learn the signs of labor and when to call.',
      ko: '매주 진료가 시작됩니다. 진통의 징후와 연락 시점을 익히세요.',
    },
    sourceIds: ['seed-doc'],
  },
  {
    week: 40,
    trimester: 3,
    fetal: {
      en: 'Due date. Babies commonly arrive a little before or after — that’s normal.',
      ko: '출산 예정일. 조금 전후로 태어나는 경우가 흔하며 정상입니다.',
    },
    maternal: {
      en: 'Your team monitors closely if you go past your due date.',
      ko: '예정일을 넘기면 의료진이 면밀히 관찰합니다.',
    },
    sourceIds: ['seed-doc'],
  },
]

export function devForWeek(week: number): DevWeek | undefined {
  let best: DevWeek | undefined
  for (const d of DEV_WEEKS) {
    if (d.week <= week && (!best || d.week > best.week)) best = d
  }
  return best ?? DEV_WEEKS[0]
}

import type { Bilingual, GuideSection } from './types'

// Exercise & strength-training guide — ACOG CO 804, the 2019 Canadian guideline
// (CSEP), KDCA and recent trials. Verified 2026-09. Example exercises are common,
// low-risk movements; they are examples, not a prescription.

const t = (en: string, ko: string): Bilingual => ({ en, ko })

export const EXERCISE_INTRO = t(
  'In a healthy pregnancy, exercise — including strength training — is safe and recommended. Here is how much, what kind, how to lift safely, and when to stop.',
  '건강한 임신이라면 근력 운동을 포함한 운동은 안전하며 권장됩니다. 얼마나, 어떤 운동을, 어떻게 안전하게 들고, 언제 멈춰야 하는지 정리했습니다.',
)

export const EXERCISE: GuideSection[] = [
  {
    id: 'x-how-much',
    title: t('How much: 150 minutes a week', '얼마나: 일주일에 150분'),
    lede: t('The same target in the US, Canada and Korea.', '미국, 캐나다, 한국 모두 같은 목표입니다.'),
    blocks: [
      {
        type: 'bullets',
        items: [
          t('At least 150 minutes of moderate activity a week, spread over at least 3 days — being active every day is even better.', '중강도 활동을 주 150분 이상, 최소 3일 이상에 나누어 — 매일 움직이면 더 좋습니다.'),
          t('Mix aerobic activity (brisk walking, swimming, stationary cycling) with strength training.', '유산소(빠르게 걷기, 수영, 실내 자전거)와 근력 운동을 섞으세요.'),
          t('“Moderate” = the talk test: you can talk but not sing. On a 6–20 effort scale that is about 12–14, “somewhat hard”.', '“중강도” = 대화 테스트: 말은 할 수 있지만 노래는 어려운 정도. 6–20 운동자각도로 약 12–14, “약간 힘들다”.'),
          t('Pelvic floor exercises (Kegels) daily — ideally learn the technique from a clinician or pelvic-floor physiotherapist.', '골반저근 운동(케겔)은 매일 — 가능하면 의료진이나 골반저 물리치료사에게 방법을 배우세요.'),
          t('Didn’t exercise before? Start with 10–15 minutes and build up.', '전에 운동을 안 했다면 10–15분부터 시작해 늘려가세요.'),
        ],
        sourceIds: ['acog-exercise', 'csep-2019', 'kdca-activity', 'snu-exercise'],
      },
      {
        type: 'callout',
        tone: 'tip',
        title: t('What it does for you', '운동의 효과'),
        body: t(
          'Regular activity in pregnancy is linked to less gestational diabetes, preeclampsia and high blood pressure, less excess weight gain, fewer C-sections and instrumental births, less urinary incontinence and less depression. It is not linked to miscarriage, stillbirth, preterm birth or low birth weight.',
          '임신 중 규칙적인 운동은 임신성 당뇨, 전자간증·고혈압, 과도한 체중 증가, 제왕절개·기구 분만, 요실금, 우울증 감소와 연관됩니다. 유산, 사산, 조산, 저체중아와는 연관되지 않습니다.',
        ),
        sourceIds: ['csep-2019', 'acog-exercise'],
      },
    ],
    indexIds: ['talk-test', 'pelvic-floor'],
  },
  {
    id: 'x-strength',
    title: t('Why strength training matters', '근력 운동이 중요한 이유'),
    lede: t('Stronger muscles handle blood sugar, back pain and the physical work of late pregnancy better.', '근육이 강하면 혈당, 허리 통증, 임신 말기의 신체 부담을 더 잘 견딥니다.'),
    blocks: [
      {
        type: 'text',
        body: t(
          'ACOG says women with uncomplicated pregnancies should be encouraged to do strength conditioning before, during and after pregnancy. A 2025 review of 50 studies (47,619 women) found resistance training — usually as part of a mixed program — was linked to about 38% lower odds of gestational diabetes, 58% lower odds of gestational hypertension and about half the odds of perinatal mood disorders.',
          'ACOG는 합병증 없는 임신부에게 임신 전·중·후 근력 운동을 권장해야 한다고 말합니다. 2025년 50개 연구(47,619명) 고찰에서 저항운동(대개 복합 프로그램의 일부)은 임신성 당뇨 위험 약 38% 감소, 임신성 고혈압 58% 감소, 주산기 기분장애 약 절반 감소와 연관되었습니다.',
        ),
        sourceIds: ['acog-exercise', 'bjsm-rt-2025'],
      },
      {
        type: 'bullets',
        items: [
          t('Blood sugar: muscle is where most glucose goes after a meal. In women who already have gestational diabetes, resistance exercise lowered blood sugar and the need for insulin in trials.', '혈당: 식후 포도당 대부분은 근육으로 갑니다. 이미 임신성 당뇨가 있는 여성에서도 저항운동이 혈당과 인슐린 필요를 낮췄습니다.'),
          t('Back pain: more than 60% of pregnant women get low back pain; strengthening the abdominal and back muscles can reduce it.', '허리 통증: 임신부의 60% 이상이 요통을 겪으며, 복부·등 근육 강화로 줄일 수 있습니다.'),
          t('Everyday strength: carrying, lifting and getting up and down — which only increases once the baby arrives.', '일상 근력: 들고, 옮기고, 앉았다 일어나기 — 아기가 태어나면 더 많아집니다.'),
        ],
        sourceIds: ['bjsm-rt-2025', 'acog-exercise'],
      },
      {
        type: 'bullets',
        clinicianOnly: true,
        title: t('Clinician numbers', '의료진용 수치'),
        items: [
          t('BJSM 2025 (50 studies, 45 RCTs, n=47,619): GDM OR 0.62 (0.48–0.79); gestational HTN OR 0.42 (0.27–0.66); perinatal mood OR 0.48; macrosomia OR 0.67. Dose reporting was poor.', 'BJSM 2025 (50개 연구, RCT 45개, n=47,619): GDM OR 0.62 (0.48–0.79); 임신성 고혈압 OR 0.42 (0.27–0.66); 주산기 기분장애 OR 0.48; 거대아 OR 0.67. 운동량 보고 미흡.'),
          t('ACOG CO 804: RPE 13–14; avoid prolonged supine after 20 wk (aortocaval compression); thermoneutral environment; >45 min sessions risk hypoglycemia.', 'ACOG CO 804: RPE 13–14; 20주 이후 장시간 앙와위 피하기(대동정맥 압박); 적정 온도 환경; 45분 초과 시 저혈당 위험.'),
          t('Occupational lifting >20 kg more than 10 times a day was associated with preterm birth (Danish cohort, >62,000 women).', '직업적으로 20kg 초과 물건을 하루 10회 넘게 드는 것은 조산과 연관(덴마크 코호트 62,000명 이상).'),
        ],
        sourceIds: ['bjsm-rt-2025', 'acog-exercise'],
      },
    ],
    indexIds: ['resistance-training', 'gdm'],
  },
  {
    id: 'x-how',
    title: t('How to strength-train safely', '안전하게 근력 운동하는 법'),
    lede: t('2–3 sessions a week, moderate weights, steady breathing.', '주 2–3회, 적당한 무게, 꾸준한 호흡.'),
    blocks: [
      {
        type: 'bullets',
        title: t('The rules', '원칙'),
        items: [
          t('2–3 sessions a week on non-consecutive days, 20–30 minutes, working the major muscle groups.', '주 2–3회, 연속되지 않은 날에 20–30분, 주요 근육군 위주로.'),
          t('Choose a weight you can lift 12–15 times with good form — you should finish feeling you could do a few more.', '좋은 자세로 12–15회 들 수 있는 무게 — 몇 회 더 할 수 있을 것 같을 때 멈추세요.'),
          t('Breathe out on the effort and don’t hold your breath (avoid straining/Valsalva).', '힘을 줄 때 숨을 내쉬고 숨을 참지 마세요(발살바·힘주기 피하기).'),
          t('After about 20 weeks, avoid lying flat on your back for long — use an incline bench or do the move seated, standing or side-lying. Korean guidance is more cautious (from about 14 weeks). If you feel dizzy or sick lying flat, change position right away.', '약 20주 이후에는 오래 반듯이 눕지 마세요 — 경사 벤치를 쓰거나 앉아서·서서·옆으로 누워서 하세요. 한국 지침은 더 보수적입니다(약 14주부터). 누웠을 때 어지럽거나 메스꺼우면 즉시 자세를 바꾸세요.'),
          t('As your belly grows, balance shifts: favor supported and machine exercises, and widen your stance.', '배가 커지면 균형이 달라집니다: 지지대가 있는 운동이나 머신을 쓰고, 발을 더 넓게 벌리세요.'),
          t('Exercise somewhere cool, drink water, and eat beforehand; sessions over 45 minutes can drop blood sugar.', '시원한 곳에서, 물을 마시며, 미리 먹고 하세요; 45분이 넘으면 혈당이 떨어질 수 있습니다.'),
        ],
        sourceIds: ['acog-exercise', 'csep-2019', 'snu-exercise'],
      },
      {
        type: 'table',
        caption: t('An example full-body session (check with your clinician first)', '전신 운동 예시 (먼저 의료진과 상의)'),
        head: [t('Movement', '동작'), t('How', '방법'), t('Later-pregnancy tweak', '임신 후기 변형')],
        rows: [
          [t('Squat to a chair', '의자 스쿼트'), t('2–3 × 12–15, bodyweight or holding a dumbbell at the chest', '2–3세트 × 12–15회, 맨몸 또는 가슴 앞 덤벨', ), t('Wider stance; sit to a higher box', '다리를 넓게; 더 높은 상자에 앉기')],
          [t('Band or dumbbell row', '밴드·덤벨 로우'), t('2–3 × 12–15, standing or seated', '2–3세트 × 12–15회, 서서 또는 앉아서'), t('Seated, chest supported', '앉아서, 가슴 지지')],
          [t('Incline push-up', '인클라인 푸시업'), t('2–3 × 10–12 against a wall, counter or bench', '벽·조리대·벤치에 대고 2–3세트 × 10–12회'), t('Use a higher surface', '더 높은 곳 사용')],
          [t('Step-up or split squat', '스텝업 또는 스플릿 스쿼트'), t('2 × 10 each leg, holding a rail if needed', '다리당 2세트 × 10회, 필요 시 난간 잡기'), t('Lower step; always hold support', '낮은 계단; 항상 지지대 잡기')],
          [t('Glute bridge / hip thrust', '글루트 브리지 / 힙 스러스트'), t('2–3 × 12–15', '2–3세트 × 12–15회'), t('Upper back on a bench, not flat on the floor', '바닥이 아닌 벤치에 등 상부 대기')],
          [t('Side-lying leg lift & bird-dog', '옆으로 누워 다리 들기 & 버드독'), t('2 × 10–12 each side', '양쪽 2세트 × 10–12회'), t('Keep — both avoid lying on your back', '유지 — 둘 다 반듯이 눕지 않는 동작')],
          [t('Farmer’s carry', '파머스 캐리'), t('2–3 × 20–30 m with light dumbbells', '가벼운 덤벨로 2–3세트 × 20–30m'), t('Lighter weight, shorter distance', '더 가볍게, 더 짧게')],
          [t('Pelvic floor (Kegel)', '골반저근 (케겔)'), t('Daily: squeeze and lift for a few seconds, fully relax, repeat ~10 times', '매일: 몇 초간 조이고 올린 뒤 완전히 이완, 약 10회 반복'), t('Keep going through pregnancy', '임신 기간 내내 계속')],
        ],
        sourceIds: ['acog-exercise', 'csep-2019', 'snu-exercise'],
      },
      {
        type: 'callout',
        tone: 'info',
        title: t('Already lift heavy?', '이미 고중량 운동을 한다면?'),
        body: t(
          'Early data are reassuring: in a small 2025 study, pregnant lifters doing squats, bench press and deadlifts at 70–90% effort (even with breath-holding) showed no drop in the baby’s heart rate, and most of 679 surveyed heavy lifters reported no complications. But the studies are small, so guidelines still say: get your clinician’s OK, reduce the load compared with before pregnancy, avoid long breath-holds and long periods flat on your back.',
          '초기 자료는 안심할 만합니다: 2025년 소규모 연구에서 스쿼트·벤치프레스·데드리프트를 70–90% 강도로(숨 참기 포함) 한 임신부에게서 태아 심박 저하가 없었고, 설문에 응한 고중량 운동 여성 679명 대부분이 합병증이 없었습니다. 하지만 연구 규모가 작아 지침은 여전히 의료진 승인, 임신 전보다 무게 줄이기, 오래 숨 참기와 오래 반듯이 눕기 피하기를 권합니다.',
        ),
        sourceIds: ['bjsm-heavy-2025', 'prevett-2022', 'acog-exercise'],
      },
    ],
    indexIds: ['valsalva', 'supine', 'pelvic-floor'],
  },
  {
    id: 'x-avoid',
    title: t('What to avoid, and when to stop', '피해야 할 운동과 멈춰야 할 때'),
    lede: t('A short list of activities to skip — and the warning signs that mean stop and call.', '피해야 할 운동과, 멈추고 연락해야 하는 경고 신호.'),
    blocks: [
      {
        type: 'bullets',
        title: t('Skip during pregnancy', '임신 중 피하기'),
        items: [
          t('Contact sports: soccer, basketball, boxing, ice hockey.', '접촉 스포츠: 축구, 농구, 권투, 아이스하키.'),
          t('Fall-risk activities: downhill skiing, water skiing, surfing, off-road cycling, gymnastics, horseback riding.', '낙상 위험 활동: 스키, 수상스키, 서핑, 산악자전거, 체조, 승마.'),
          t('Hot yoga or hot Pilates; exercising in heat and humidity.', '핫요가·핫필라테스; 덥고 습한 환경에서의 운동.'),
          t('Scuba diving and skydiving.', '스쿠버다이빙과 스카이다이빙.'),
          t('Exercise above about 6,000 ft (1,800 m) unless you live there.', '해발 약 1,800m 이상에서의 운동(거주자가 아니라면).'),
        ],
        sourceIds: ['acog-exercise-faq', 'acog-exercise'],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: t('Stop and call your clinician if you have', '다음이 있으면 멈추고 연락하세요'),
        body: t(
          'Vaginal bleeding · fluid leaking · regular painful contractions · belly pain · dizziness or feeling faint · headache · chest pain · shortness of breath before you start · calf pain or swelling · muscle weakness affecting balance.',
          '질 출혈 · 양수가 샘 · 규칙적이고 아픈 수축 · 복통 · 어지러움·실신할 것 같음 · 두통 · 흉통 · 운동 전부터 숨참 · 종아리 통증·부종 · 균형을 잃을 정도의 근력 저하.',
        ),
        sourceIds: ['acog-exercise'],
      },
      {
        type: 'bullets',
        title: t('Don’t exercise without your clinician’s OK if you have', '다음에 해당하면 의료진 허락 없이 운동하지 마세요'),
        items: [
          t('Ruptured membranes, preterm labor, or unexplained ongoing bleeding.', '양막 파열, 조기 진통, 원인 불명의 지속 출혈.'),
          t('Placenta previa after 28 weeks, preeclampsia, a weak (incompetent) cervix, or poor fetal growth.', '28주 이후 전치태반, 전자간증, 자궁경부무력증, 태아 성장 부진.'),
          t('Triplets or more; uncontrolled type 1 diabetes, blood pressure or thyroid disease; serious heart or lung disease.', '세쌍둥이 이상; 조절되지 않는 1형 당뇨·고혈압·갑상선 질환; 심각한 심장·폐 질환.'),
          t('Talk it through first (may still exercise with changes): twins after 28 weeks, gestational hypertension, previous preterm birth, recurrent miscarriage, symptomatic anemia, eating disorder.', '먼저 상의(조정 후 운동 가능): 28주 이후 쌍둥이, 임신성 고혈압, 조산 병력, 반복 유산, 증상 있는 빈혈, 섭식장애.'),
        ],
        sourceIds: ['csep-2019'],
      },
      {
        type: 'takeaway',
        body: t(
          'Healthy pregnancy? Aim for 150 minutes a week with 2–3 short strength sessions: moderate weights, 12–15 reps, breathe out as you lift, no long stretches flat on your back after ~20 weeks, and Kegels every day. Stop and call for any warning sign.',
          '건강한 임신이라면 주 150분, 그중 짧은 근력 운동 2–3회: 적당한 무게, 12–15회, 들 때 숨 내쉬기, 약 20주 이후 오래 반듯이 눕지 않기, 매일 케겔. 경고 신호가 있으면 멈추고 연락하세요.',
        ),
      },
    ],
    indexIds: ['preeclampsia'],
  },
]

import type { Bilingual, GuideSection } from './types'

// Nutrition guide — fats & oils (the baby is built from them), fish, vitamin D,
// magnesium, other key nutrients and food safety. US (ACOG/FDA/CDC) and Korean
// (2025 KDRI, MFDS, KDCA) numbers side by side. Verified 2026-09; every block
// cites its sources. Evidence strength is stated plainly where it is mixed.

const t = (en: string, ko: string): Bilingual => ({ en, ko })

export const NUTRITION_INTRO = t(
  'What to eat, how much, and why — with US and Korean recommendations side by side. Special focus on the fats your baby is built from, vitamin D (low in most young Korean women), and magnesium.',
  '무엇을, 얼마나, 왜 먹어야 하는지 — 미국과 한국 권고를 나란히 정리했습니다. 아기의 몸을 이루는 지방, (젊은 한국 여성 대부분이 부족한) 비타민 D, 마그네슘을 특히 자세히 다룹니다.',
)

export const NUTRITION: GuideSection[] = [
  {
    id: 'n-basics',
    title: t('The basics: what a pregnancy plate looks like', '기본: 임신 중 식단 구성'),
    lede: t(
      'No “eating for two” in early pregnancy — quality matters more than quantity.',
      '임신 초기에 “2인분”은 필요 없습니다 — 양보다 질이 중요합니다.',
    ),
    blocks: [
      {
        type: 'bullets',
        items: [
          t(
            'Half the plate vegetables and fruit; a quarter whole grains (brown rice, multigrain, oats); a quarter protein (fish, eggs, tofu, beans, lean meat); plus dairy or another calcium source.',
            '접시의 절반은 채소·과일, 1/4은 통곡물(현미·잡곡·귀리), 1/4은 단백질(생선·달걀·두부·콩·살코기), 그리고 우유나 다른 칼슘 식품.',
          ),
          t(
            'Extra energy: none in the first trimester, about 340 kcal/day in the second and about 450 kcal/day in the third — roughly one extra healthy snack or small meal.',
            '추가 열량: 1삼분기에는 필요 없고, 2삼분기 약 340kcal, 3삼분기 약 450kcal — 건강한 간식이나 작은 식사 한 번 정도입니다.',
          ),
          t(
            'Keep a prenatal vitamin going through the whole pregnancy (US practice); in Korea, take the free folic acid early and iron from 16 weeks.',
            '임신 기간 내내 산전 비타민을 복용하세요(미국 방식). 한국에서는 초기에 무료 엽산제, 16주부터 철분제를 복용합니다.',
          ),
        ],
        sourceIds: ['acog-nutrition', 'gov24-supplements'],
      },
      {
        type: 'table',
        caption: t('Recommended total weight gain (IOM, used by ACOG)', '권장 총 체중 증가 (IOM, ACOG 채택)'),
        head: [t('Pre-pregnancy BMI', '임신 전 BMI'), t('Total gain', '총 증가'), t('Per week (2nd–3rd trimester)', '주당 (2·3삼분기)')],
        rows: [
          [t('Under 18.5', '18.5 미만'), t('12.5–18 kg (28–40 lb)', '12.5–18kg'), t('≈0.5 kg', '약 0.5kg')],
          [t('18.5–24.9', '18.5–24.9'), t('11.5–16 kg (25–35 lb)', '11.5–16kg'), t('≈0.4 kg', '약 0.4kg')],
          [t('25–29.9', '25–29.9'), t('7–11.5 kg (15–25 lb)', '7–11.5kg'), t('≈0.3 kg', '약 0.3kg')],
          [t('30 or more', '30 이상'), t('5–9 kg (11–20 lb)', '5–9kg'), t('≈0.2 kg', '약 0.2kg')],
        ],
        sourceIds: ['acog-weight'],
      },
      {
        type: 'callout',
        tone: 'info',
        title: t('Note on BMI for Asian women', '아시아 여성의 BMI 참고'),
        body: t(
          'The weight-gain ranges above use standard BMI groups for everyone. But for diabetes risk, US guidelines use a lower cut-off for people of Asian ancestry (BMI 23, not 25) — see the early diabetes test on the timeline.',
          '위 체중 증가 범위는 모두에게 표준 BMI 구간을 적용합니다. 하지만 당뇨 위험은 미국 지침에서 아시아계에 더 낮은 기준(25가 아닌 23)을 씁니다 — 타임라인의 임신 초기 당뇨 검사를 참고하세요.',
        ),
        sourceIds: ['acog-weight', 'ada-2026'],
      },
    ],
    indexIds: ['bmi', 'weight-gain', 'prenatal-vitamin'],
  },
  {
    id: 'n-fats',
    title: t('Fats & oils: your baby is built from them', '지방과 기름: 아기의 몸을 짓는 재료'),
    lede: t(
      'Every cell membrane is made of fat, and the brain is about 60% fat. DHA is the one to get right.',
      '모든 세포막은 지방으로 되어 있고, 뇌는 약 60%가 지방입니다. 가장 챙겨야 할 것은 DHA입니다.',
    ),
    blocks: [
      {
        type: 'text',
        body: t(
          'Every one of your baby’s trillions of cells is wrapped in a membrane made of fats (lipids). The brain is the fattiest organ — about 60% of its dry weight is fat — and a special omega-3 fat called DHA is concentrated in the brain and the retina of the eye. The placenta actively pulls DHA from your blood to the baby, and most of it is laid down in the last trimester (about 42–75 mg a day in the final weeks). So the fats you eat literally become your baby’s brain and eyes.',
          '아기의 수조 개 세포 하나하나는 지방(지질)으로 된 막에 싸여 있습니다. 뇌는 가장 지방이 많은 기관으로 건조 중량의 약 60%가 지방이며, DHA라는 특별한 오메가-3 지방이 뇌와 눈의 망막에 집중되어 있습니다. 태반은 엄마 혈액에서 DHA를 적극적으로 끌어와 아기에게 보내고, 대부분은 임신 말기에 쌓입니다(마지막 몇 주 하루 약 42–75mg). 엄마가 먹는 지방이 말 그대로 아기의 뇌와 눈이 됩니다.',
        ),
        sourceIds: ['brain-fat-2019', 'dha-accretion-2015', 'kdri-2025'],
      },
      {
        type: 'table',
        caption: t('How much DHA?', 'DHA는 얼마나?'),
        head: [t('Source', '기준'), t('Recommendation', '권고')],
        rows: [
          [t('Expert consensus (international)', '국제 전문가 합의'), t('At least 200 mg DHA a day; Asian update: usually ≥300 mg total', 'DHA 하루 200mg 이상; 아시아 업데이트: 보통 총 300mg 이상')],
          [t('Korea — 2025 KDRI (pregnancy)', '한국 — 2025 영양소 섭취기준 (임신부)'), t('EPA+DHA 300 mg/day, including 200 mg DHA', 'EPA+DHA 하루 300mg (DHA 200mg 포함)')],
          [t('US — ACOG / FDA', '미국 — ACOG / FDA'), t('2–3 servings (8–12 oz / 225–340 g) of low-mercury fish a week', '저수은 생선 주 2–3회 (225–340g)')],
          [t('What Koreans actually eat', '한국인 실제 섭취량'), t('Median EPA+DHA only 118 mg/day — two-thirds fall short', 'EPA+DHA 중앙값 하루 118mg — 3분의 2가 부족')],
        ],
        sourceIds: ['koletzko-dha', 'kdri-2025', 'acog-nutrition', 'fda-fish'],
      },
      {
        type: 'callout',
        tone: 'tip',
        title: t('Omega-3 and preterm birth', '오메가-3와 조산'),
        body: t(
          'In a Cochrane review of 70 trials, omega-3 in pregnancy lowered birth before 37 weeks by about 11% and before 34 weeks by about 42%. Later trials show the benefit is concentrated in women whose DHA is low to begin with — which describes many people who rarely eat fish. If you eat little fish, ask about a DHA supplement.',
          '70개 임상시험 코크란 고찰에서 임신 중 오메가-3는 37주 전 출산을 약 11%, 34주 전 출산을 약 42% 줄였습니다. 이후 시험에서 효과는 원래 DHA가 낮은 여성에게 집중되었는데, 생선을 잘 먹지 않는 사람이 여기에 해당합니다. 생선을 적게 먹는다면 DHA 보충제를 상의하세요.',
        ),
        sourceIds: ['cochrane-omega3', 'adore-2021', 'orip-2019'],
      },
      {
        type: 'table',
        caption: t('Cooking oils compared', '식용유 비교'),
        head: [t('Oil', '기름'), t('Main fats', '주요 지방'), t('How to use it', '사용법')],
        rows: [
          [
            t('Perilla oil (들기름)', '들기름'),
            t('59–71% ALA — the richest common plant omega-3', 'ALA 59–71% — 흔한 식물성 기름 중 오메가-3가 가장 많음'),
            t('Great for 나물 and finishing; low or no heat. Oxidizes fast: refrigerate, cap tightly, use within weeks.', '나물·마무리용으로 좋음; 약불 또는 가열하지 않기. 산화가 빨라 냉장 보관, 뚜껑을 꼭 닫고 몇 주 안에 사용.'),
          ],
          [
            t('Sesame oil (참기름)', '참기름'),
            t('Mostly omega-6 + monounsaturated; under ~1% omega-3', '대부분 오메가-6 + 단일불포화; 오메가-3는 약 1% 미만'),
            t('Very stable and flavorful — use for taste, not as an omega-3 source.', '매우 안정적이고 향이 좋음 — 맛을 위해 쓰고 오메가-3 공급원으로 기대하지 말 것.'),
          ],
          [
            t('Olive oil / other plant oils', '올리브유 / 기타 식물성 기름'),
            t('Mainly monounsaturated', '주로 단일불포화'),
            t('Good everyday cooking oil. ACOG: most fats should come from plant oils.', '일상 조리용으로 좋음. ACOG: 지방은 대부분 식물성 기름에서.'),
          ],
          [
            t('Trans fat (partially hydrogenated oil)', '트랜스지방 (부분경화유)'),
            t('No benefit; raises LDL cholesterol', '이점 없음; LDL 콜레스테롤 상승'),
            t('Avoid. Korea: under 1% of energy. Banned as an additive in US foods.', '피하기. 한국 기준 에너지의 1% 미만. 미국은 식품 첨가 금지.'),
          ],
        ],
        sourceIds: ['perilla-2024', 'sesame-2023', 'acog-nutrition', 'fda-transfat', 'kdri-2025'],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: t('Plant omega-3 is not DHA', '식물성 오메가-3는 DHA가 아닙니다'),
        body: t(
          'Perilla oil, flax and walnuts give ALA. Your body turns very little ALA into DHA, so they do not replace fish or a DHA supplement.',
          '들기름·아마씨·호두는 ALA를 줍니다. 몸은 ALA를 DHA로 거의 바꾸지 못하므로 생선이나 DHA 보충제를 대신할 수 없습니다.',
        ),
        sourceIds: ['brenna-2009'],
      },
      {
        type: 'takeaway',
        body: t(
          'Eat low-mercury fish 2–3 times a week (고등어, 연어, 멸치, 꽁치). If you don’t, ask about ≥200 mg DHA a day. Cook with olive oil, finish with 들기름, flavor with 참기름, and skip trans fats.',
          '저수은 생선을 주 2–3회 드세요(고등어·연어·멸치·꽁치). 그렇지 못하면 DHA 하루 200mg 이상 보충을 상의하세요. 조리는 올리브유, 마무리는 들기름, 향은 참기름, 트랜스지방은 피하세요.',
        ),
      },
    ],
    indexIds: ['dha', 'perilla-oil'],
  },
  {
    id: 'n-fish',
    title: t('Fish without the mercury', '수은 걱정 없이 생선 먹기'),
    lede: t('Small fish often, big predators rarely, raw fish never.', '작은 생선은 자주, 큰 포식성 생선은 드물게, 날생선은 피하기.'),
    blocks: [
      {
        type: 'table',
        head: [t('Guidance', '권고'), t('US (FDA/EPA, ACOG)', '미국 (FDA/EPA, ACOG)'), t('Korea (MFDS)', '한국 (식약처)')],
        rows: [
          [
            t('Eat regularly', '자주 먹기'),
            t('8–12 oz (225–340 g)/week of “best choices”: salmon, sardine, anchovy, Atlantic mackerel, pollock, cod, shrimp, squid, canned light tuna…', '“최선의 선택” 주 225–340g: 연어, 정어리, 멸치, 대서양 고등어, 명태, 대구, 새우, 오징어, 라이트 참치캔 등'),
            t('Ordinary fish (고등어, 명태, 꽁치, 조기, 가자미) and canned tuna: up to about 400 g/week', '일반 어류(고등어·명태·꽁치·조기·가자미)와 참치 통조림: 주 약 400g 이하'),
          ],
          [
            t('Limit', '제한'),
            t('Albacore (white) tuna: 6 oz (170 g)/week', '날개다랑어(화이트 참치): 주 170g'),
            t('Shark, swordfish, large tuna and other big predatory fish: ≤100 g/week', '상어·황새치·대형 참치 등 대형 포식성 어류: 주 100g 이하'),
          ],
          [
            t('Avoid', '피하기'),
            t('Shark, swordfish, king mackerel, marlin, orange roughy, bigeye tuna, Gulf tilefish', '상어, 황새치, 킹고등어, 청새치, 오렌지러피, 눈다랑어, 멕시코만 옥돔'),
            t('—', '—'),
          ],
        ],
        sourceIds: ['fda-fish', 'acog-nutrition', 'mfds-fish', 'snu-fish'],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: t('참치회 (tuna sashimi) is a double no', '참치회는 두 가지 이유로 피하기'),
        body: t(
          'It is usually bigeye or bluefin tuna (high mercury — FDA “avoid”, MFDS “≤100 g/week”) and it is raw (Listeria and parasite risk).',
          '보통 눈다랑어나 참다랑어(고수은 — FDA “피하기”, 식약처 “주 100g 이하”)이며, 날것(리스테리아·기생충 위험)입니다.',
        ),
        sourceIds: ['fda-fish', 'mfds-fish', 'cdc-food-safety'],
      },
    ],
    indexIds: ['mercury', 'dha'],
  },
  {
    id: 'n-vitamin-d',
    title: t('Vitamin D: the deficiency most Korean women have', '비타민 D: 한국 여성 대부분이 부족한 영양소'),
    lede: t(
      '6–8 in 10 young Korean women are low. New research ties low levels in early pregnancy to preterm birth.',
      '젊은 한국 여성 10명 중 6–8명이 부족합니다. 새 연구는 임신 초기 낮은 수치를 조산과 연결합니다.',
    ),
    blocks: [
      {
        type: 'callout',
        tone: 'new',
        title: t('New research (2025)', '새 연구 (2025)'),
        body: t(
          'A US NIH-funded study (Am J Clin Nutr, 2025) found that women with low vitamin D in the first trimester (below 40 nmol/L ≈ 16 ng/mL) had about 4 times the risk of preterm birth compared with those at 80 nmol/L (32 ng/mL) or higher; levels later in pregnancy mattered less. A Korean study of 5,169 pregnancies (CHA Bundang, PLoS One 2025) found about 63% were below 20 ng/mL in the first trimester, and deficiency that persisted was linked to 2.4 times the odds of birth before 34 weeks — correcting it later in pregnancy did not erase the risk. The message: fix vitamin D early, ideally before pregnancy.',
          '미국 NIH 지원 연구(Am J Clin Nutr, 2025)에서 임신 1삼분기 비타민 D가 낮은 여성(40nmol/L ≈ 16ng/mL 미만)은 80nmol/L(32ng/mL) 이상인 여성보다 조산 위험이 약 4배였고, 임신 후반 수치는 덜 중요했습니다. 한국 임신부 5,169명 연구(분당차병원, PLoS One 2025)에서는 1삼분기 약 63%가 20ng/mL 미만이었고, 결핍이 지속되면 34주 전 출산 위험이 2.4배였으며 임신 후반에 교정해도 위험이 사라지지 않았습니다. 핵심: 비타민 D는 일찍, 가능하면 임신 전에 채우세요.',
        ),
        sourceIds: ['nichd-vitd', 'ajcn-vitd-2025', 'cha-vitd-2025'],
      },
      {
        type: 'table',
        caption: t('How common is deficiency? (below 20 ng/mL)', '결핍은 얼마나 흔한가? (20ng/mL 미만)'),
        head: [t('Group', '대상'), t('Deficient', '결핍 비율')],
        rows: [
          [t('Korean women 19–39 (national survey, KNHANES 2022)', '한국 19–39세 여성 (국민건강영양조사 2022)'), t('60.7%', '60.7%')],
          [t('Korean women 20–29 (119,335 health check-ups, 2017–22)', '한국 20–29세 여성 (건강검진 119,335명, 2017–22)'), t('76.8% (23% below 10 ng/mL)', '76.8% (23%는 10ng/mL 미만)')],
          [t('Pregnant Korean women (Samsung Medical Center)', '한국 임신부 (삼성서울병원)'), t('77.3% — and 100% in winter', '77.3% — 겨울에는 100%')],
          [t('Pregnant Korean women, 1st trimester (CHA Bundang 2016–22)', '한국 임신부 1삼분기 (분당차병원 2016–22)'), t('≈63%', '약 63%')],
          [t('Korean-American women (older adults, Kaiser N. California)', '재미 한인 여성 (고령, 카이저 북캘리포니아)'), t('1.85× the rate of White women', '백인 여성의 1.85배')],
        ],
        sourceIds: ['knhanes-vitd', 'checkup-vitd', 'smc-vitd-2015', 'cha-vitd-2025', 'kaiser-vitd-2024'],
      },
      {
        type: 'text',
        body: t(
          'Why so common? Few Korean foods are rich in vitamin D, very few adults take a supplement (about 4% in Korea), and sun-protective habits plus indoor life limit skin production — deficiency stays high even in summer. Don’t count on sunshine to fix it.',
          '왜 이렇게 흔할까요? 비타민 D가 풍부한 한국 음식이 적고, 보충제를 먹는 성인이 매우 적으며(한국 약 4%), 자외선 차단 습관과 실내 생활로 피부 합성이 적기 때문입니다 — 여름에도 결핍이 많습니다. 햇빛만으로 해결하려 하지 마세요.',
        ),
        sourceIds: ['kdri-2025', 'knhanes-vitd', 'smc-vitd-2015'],
      },
      {
        type: 'table',
        caption: t('What the guidelines say', '지침 비교'),
        head: [t('Source', '기준'), t('Advice', '권고')],
        rows: [
          [t('US intake (DRI) / ACOG', '미국 섭취기준 / ACOG'), t('600 IU (15 µg) a day. Routine testing not recommended; if deficient, 1,000–2,000 IU/day is safe; up to 4,000 IU/day considered safe.', '하루 600IU(15µg). 일상 검사는 비권장; 결핍 시 하루 1,000–2,000IU 안전; 4,000IU까지 안전한 것으로 봄.')],
          [t('Korea — 2025 KDRI', '한국 — 2025 섭취기준'), t('400 IU (10 µg) a day, no extra for pregnancy; upper limit 4,000 IU', '하루 400IU(10µg), 임신 추가량 없음; 상한 4,000IU')],
          [t('Endocrine Society (2024)', '미국 내분비학회 (2024)'), t('Suggests taking more than the standard intake during pregnancy, without testing (trial doses averaged about 2,500 IU/day).', '검사 없이 임신 중 표준 섭취량보다 많이 복용하도록 제안 (임상시험 평균 약 2,500IU/일).')],
        ],
        sourceIds: ['acog-vitd', 'kdri-2025', 'endo-vitd'],
      },
      {
        type: 'callout',
        tone: 'info',
        title: t('How strong is the evidence?', '근거는 얼마나 강한가?'),
        body: t(
          'Low vitamin D early in pregnancy is consistently linked with preterm birth. Whether supplements prevent it is less certain: the strictest reviews (Cochrane 2024; a 66-trial review in 2025) did not find a clear drop in preterm birth, while broader analyses found about 23–30% fewer. Supplementing a deficiency is low-risk, which is why the Endocrine Society suggests it.',
          '임신 초기 낮은 비타민 D는 일관되게 조산과 연관됩니다. 보충제가 조산을 예방하는지는 덜 확실합니다: 가장 엄격한 고찰(코크란 2024; 2025년 66개 시험 고찰)에서는 뚜렷한 감소가 없었고, 더 넓은 분석에서는 약 23–30% 감소를 보였습니다. 결핍 보충은 위험이 낮아 내분비학회가 권하는 이유입니다.',
        ),
        sourceIds: ['cochrane-vitd', 'nutrrev-vitd', 'umbrella-vitd-2026', 'endo-vitd'],
      },
      {
        type: 'bullets',
        clinicianOnly: true,
        title: t('Clinician numbers', '의료진용 수치'),
        items: [
          t('Beck/Gernand (nuMoM2b, n=351): 1st-trimester 25(OH)D <40 vs ≥80 nmol/L → PTB RR 4.35 (95% CI 1.14–16.55); no difference at the 50 nmol/L cut-off; 2nd-trimester levels not associated.', 'Beck/Gernand (nuMoM2b, n=351): 1삼분기 25(OH)D <40 vs ≥80 nmol/L → 조산 RR 4.35 (95% CI 1.14–16.55); 50nmol/L 기준에서는 차이 없음; 2삼분기 수치는 무관.'),
          t('CHA Bundang (n=5,169): 1st trimester 21.7% <10 ng/mL, 41.1% 10–20; persistent deficiency → PTB <34 wk aOR 2.42 (1.24–4.71).', '분당차 (n=5,169): 1삼분기 21.7% <10ng/mL, 41.1% 10–20; 지속 결핍 → 34주 전 조산 aOR 2.42 (1.24–4.71).'),
          t('Cochrane 2024 (after trustworthiness screening): PTB RR 0.76 (0.25–2.33), very uncertain. Yang 2025 (66 RCTs): no effect on PTB; GDM RR 0.65.', '코크란 2024 (신뢰성 선별 후): 조산 RR 0.76 (0.25–2.33), 매우 불확실. Yang 2025 (66개 RCT): 조산 효과 없음; GDM RR 0.65.'),
          t('Most prenatal vitamins contain 400 IU. ACOG CO 495 (reaffirmed): consider testing at increased risk; ≥20 ng/mL needed for bone health.', '대부분 산전 비타민에는 400IU. ACOG CO 495(재확인): 위험군은 검사 고려; 뼈 건강에 ≥20ng/mL 필요.'),
        ],
        sourceIds: ['ajcn-vitd-2025', 'cha-vitd-2025', 'cochrane-vitd', 'nutrrev-vitd', 'acog-vitd'],
      },
      {
        type: 'takeaway',
        body: t(
          'Check how much vitamin D is in your prenatal vitamin (often only 400 IU). Ask your clinician about a blood test or adding 1,000–2,000 IU a day, and don’t exceed 4,000 IU a day unless prescribed. Planning a pregnancy? Start now. Food helps a little: salmon, mackerel, egg yolks, fortified milk.',
          '산전 비타민의 비타민 D 함량을 확인하세요(보통 400IU뿐). 혈액검사나 하루 1,000–2,000IU 추가를 의료진과 상의하고, 처방 없이 하루 4,000IU를 넘기지 마세요. 임신 계획 중이라면 지금 시작하세요. 음식도 조금 도움이 됩니다: 연어, 고등어, 달걀노른자, 강화우유.',
        ),
      },
    ],
    indexIds: ['vitamin-d', 'preterm-birth'],
  },
  {
    id: 'n-magnesium',
    title: t('Magnesium', '마그네슘'),
    lede: t(
      'Most young Korean women eat too little. Food first — and the hospital “mag drip” is something else entirely.',
      '젊은 한국 여성 대부분이 부족하게 섭취합니다. 음식이 먼저 — 병원의 “마그네슘 주사”는 전혀 다른 것입니다.',
    ),
    blocks: [
      {
        type: 'table',
        caption: t('How much a day in pregnancy', '임신 중 하루 권장량'),
        head: [t('Amount', '기준'), t('US', '미국'), t('Korea (2025 KDRI)', '한국 (2025 섭취기준)')],
        rows: [
          [t('Recommended', '권장'), t('350 mg (age 19–30), 360 mg (31–50)', '350mg (19–30세), 360mg (31–50세)'), t('320 mg', '320mg')],
          [t('Upper limit — supplements only', '상한 — 보충제만'), t('350 mg (food doesn’t count)', '350mg (음식은 제외)'), t('350 mg (food doesn’t count)', '350mg (음식은 제외)')],
        ],
        sourceIds: ['health-canada-dri', 'kdri-2025'],
      },
      {
        type: 'text',
        body: t(
          '61.7% of Korean women aged 19–29 eat less than they need. Good sources per serving: perilla leaves (들깻잎) 106 mg, dried seaweed (미역) 90 mg, brown rice (현미) 90 mg, buckwheat noodles (메밀국수) 75 mg, tofu (두부) 64 mg — plus almonds, sesame, dried anchovies and soybeans.',
          '19–29세 한국 여성의 61.7%가 필요량보다 적게 먹습니다. 1회 분량 기준 좋은 공급원: 들깻잎 106mg, 미역(건) 90mg, 현미 90mg, 메밀국수 75mg, 두부 64mg — 그리고 아몬드, 참깨, 멸치, 대두.',
        ),
        sourceIds: ['kdri-2025'],
      },
      {
        type: 'callout',
        tone: 'info',
        title: t('Do magnesium pills help?', '마그네슘 보충제는 도움이 될까?'),
        body: t(
          'Not proven. A Cochrane review found no clear benefit of magnesium supplements for pregnancy outcomes, and evidence for leg cramps is mixed and low-certainty. Within the 350 mg supplement limit it is low-risk (the main side effect is diarrhea), but food is the better route.',
          '입증되지 않았습니다. 코크란 고찰에서 마그네슘 보충제는 임신 결과에 뚜렷한 이점이 없었고, 다리 경련에 대한 근거도 엇갈리고 확실성이 낮습니다. 보충제 350mg 이내에서는 위험이 낮지만(주 부작용은 설사) 음식이 더 좋은 방법입니다.',
        ),
        sourceIds: ['cochrane-mg', 'cochrane-cramps'],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: t('IV magnesium sulfate is a different thing', '정맥 황산마그네슘은 전혀 다른 것'),
        body: t(
          'In hospital, high-dose IV magnesium sulfate is a proven emergency medicine: it prevents seizures in preeclampsia (58% fewer in the Magpie trial) and, given before a very early birth (under 32 weeks), protects the baby’s brain (fewer cases of cerebral palsy). It tells us nothing about magnesium pills in a healthy pregnancy.',
          '병원에서 쓰는 고용량 정맥 황산마그네슘은 입증된 응급 약물입니다: 전자간증의 경련을 예방하고(Magpie 시험에서 58% 감소), 매우 이른 출산(32주 미만) 전에 투여하면 아기의 뇌를 보호합니다(뇌성마비 감소). 건강한 임신에서 마그네슘 알약의 효과와는 무관합니다.',
        ),
        sourceIds: ['acog-mgso4', 'magpie-2002', 'cochrane-mgso4'],
      },
      {
        type: 'takeaway',
        body: t(
          'Aim for magnesium from food: 들깻잎, 미역, 현미, 두부, nuts and seeds. A prenatal vitamin is fine; don’t go over 350 mg a day from supplements unless your doctor prescribes it.',
          '마그네슘은 음식으로: 들깻잎, 미역, 현미, 두부, 견과류와 씨앗. 산전 비타민은 괜찮지만, 처방 없이 보충제로 하루 350mg을 넘기지 마세요.',
        ),
      },
    ],
    indexIds: ['magnesium', 'magnesium-sulfate', 'preeclampsia'],
  },
  {
    id: 'n-nutrients',
    title: t('Other key nutrients: US vs Korea', '기타 핵심 영양소: 미국 vs 한국'),
    lede: t('Folate, iron, iodine, choline, calcium and caffeine — with the numbers from both countries.', '엽산, 철분, 요오드, 콜린, 칼슘, 카페인 — 두 나라의 수치.'),
    blocks: [
      {
        type: 'table',
        head: [t('Nutrient', '영양소'), t('US (pregnancy)', '미국 (임신부)'), t('Korea (2025 KDRI)', '한국 (2025 섭취기준)'), t('Notes', '참고')],
        rows: [
          [t('Folate', '엽산'), t('600 µg DFE + a 400 µg folic acid supplement', '600µg DFE + 엽산 보충제 400µg'), t('620 µg DFE', '620µg DFE'), t('Start before conception; synthetic folic acid upper limit 1,000 µg', '임신 전부터; 합성 엽산 상한 1,000µg')],
          [t('Iron', '철분'), t('27 mg', '27mg'), t('Higher than non-pregnant; free iron from 16 weeks', '비임신 시보다 높음; 16주부터 무료 철분제'), t('75% of Korean women 19–29 eat too little iron', '19–29세 한국 여성의 75%가 철분 부족')],
          [t('Iodine', '요오드'), t('220 µg (upper limit 1,100)', '220µg (상한 1,100)'), t('240 µg (no upper limit set for pregnancy)', '240µg (임신부 상한 미설정)'), t('One serving of dried 미역 ≈ 1,445 µg', '마른 미역 1회분 ≈ 1,445µg')],
          [t('Choline', '콜린'), t('450 mg', '450mg'), t('470 mg (new in 2025)', '470mg (2025년 신설)'), t('Not in most prenatal vitamins — eggs are the easy source', '대부분 산전 비타민에 없음 — 달걀이 쉬운 공급원')],
          [t('Calcium', '칼슘'), t('1,000 mg', '1,000mg'), t('650 mg', '650mg'), t('Dairy, tofu made with calcium, small fish with bones (멸치)', '유제품, 칼슘 응고 두부, 뼈째 먹는 생선(멸치)')],
          [t('Caffeine', '카페인'), t('Under 200 mg/day (ACOG)', '하루 200mg 미만 (ACOG)'), t('300 mg/day or less (MFDS)', '하루 300mg 이하 (식약처)'), t('Aim for the stricter 200 mg ≈ one 12-oz brewed coffee', '더 엄격한 200mg ≈ 드립커피 약 350ml 1잔')],
        ],
        sourceIds: ['acog-nutrition', 'health-canada-dri', 'kdri-2025', 'acog-caffeine', 'mfds-caffeine'],
      },
      {
        type: 'callout',
        tone: 'info',
        title: t('Seaweed soup (미역국) and iodine', '미역국과 요오드'),
        body: t(
          'During pregnancy, typical Korean iodine intake (median ~459 µg/day) was not linked to thyroid or birth problems. The big jump comes after birth, when 미역국 at every meal pushes intake to 1,759–3,063 µg/day. MFDS advises no more than 2 bowls a day and suggests a non-kelp broth with added protein.',
          '임신 중 일반적인 한국인 요오드 섭취(중앙값 약 459µg/일)는 갑상선·출산 문제와 연관되지 않았습니다. 큰 증가는 출산 후 매 끼 미역국을 먹을 때 생기며 하루 1,759–3,063µg에 이릅니다. 식약처는 하루 2그릇 이하와 다시마를 뺀 육수, 단백질 추가를 권합니다.',
        ),
        sourceIds: ['seaweed-2022', 'mfds-seaweed', 'kdri-2025'],
      },
    ],
    indexIds: ['iodine', 'choline', 'caffeine', 'folic-acid', 'iron'],
  },
  {
    id: 'n-safety',
    title: t('Food safety: what to skip', '식품 안전: 피해야 할 음식'),
    lede: t('Pregnancy makes Listeria about 10× more likely. A few Korean favorites need care.', '임신 중에는 리스테리아 감염 위험이 약 10배입니다. 좋아하는 한국 음식 몇 가지는 주의가 필요합니다.'),
    blocks: [
      {
        type: 'bullets',
        items: [
          t('Raw or undercooked fish and shellfish — sashimi (회), sushi, raw oysters (생굴), ceviche. Cook fish to 63°C (145°F).', '날것이나 덜 익힌 생선·조개류 — 회, 초밥, 생굴, 세비체. 생선은 63°C까지 익히기.'),
          t('Raw marinated crab (간장게장, 양념게장): it is raw shellfish. Freshwater-crab 게장 can also carry lung fluke (KDCA). Best skipped until after birth.', '간장게장·양념게장: 날 갑각류입니다. 민물 게로 담근 게장은 폐흡충 위험도 있습니다(질병관리청). 출산 후로 미루세요.'),
          t('Deli meats, hot dogs and cold smoked fish (lox) — only if heated until steaming (74°C/165°F).', '햄·소시지·훈제연어 — 김이 날 때까지(74°C) 데운 경우에만.'),
          t('Unpasteurized milk and soft raw-milk cheeses (brie, camembert, blue, queso fresco).', '비살균 우유와 비살균 연성 치즈(브리, 카망베르, 블루, 케소 프레스코).'),
          t('Raw sprouts, runny eggs (날달걀, 반숙), and cut melon left out more than 2 hours.', '생 새싹채소, 날달걀·반숙, 2시간 넘게 상온에 둔 자른 멜론.'),
          t('Alcohol: no safe amount in pregnancy.', '술: 임신 중 안전한 양은 없습니다.'),
        ],
        sourceIds: ['cdc-food-safety', 'kdca-lungfluke', 'acog-nutrition'],
      },
    ],
    indexIds: ['listeria'],
  },
]

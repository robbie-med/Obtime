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
  // --- Korea: verified 2026-09 ---
  {
    id: 'mohw-voucher',
    label: {
      en: 'MOHW — pregnancy & childbirth medical expense support (National Happiness Card)',
      ko: '보건복지부 — 임신·출산 진료비 지원사업 (국민행복카드)',
    },
    org: '보건복지부 (MOHW)',
    url: 'https://www.mohw.go.kr/menu.es?mid=a10705020100',
    accessed: '2026-09-29',
  },
  {
    id: 'mohw-multiples-2024',
    label: {
      en: 'MOHW press release — voucher raised to ₩1M per fetus for multiples (2024)',
      ko: '보건복지부 보도자료 — 다태아 태아당 100만원 지원 (2024)',
    },
    org: '보건복지부 (MOHW)',
    url: 'https://www.mohw.go.kr/board.es?mid=a10503010200&bid=0027&act=view&list_no=1479667',
    accessed: '2026-09-29',
  },
  {
    id: 'law-lsa74',
    label: {
      en: 'Labor Standards Act Art. 74 — maternity leave & reduced hours in pregnancy',
      ko: '근로기준법 제74조 — 출산전후휴가 및 임신기 근로시간 단축',
    },
    org: '국가법령정보센터 (law.go.kr)',
    url: 'https://www.law.go.kr/LSW//lsLawLinkInfo.do?lsJoLnkSeq=1000446201&lsId=001872&chrClsCd=010202&print=print',
    accessed: '2026-09-29',
  },
  {
    id: 'korea-worktime-2025',
    label: {
      en: 'Policy briefing — reduced hours now from 32 weeks (effective 2025-02-23)',
      ko: '정책브리핑 — 임신기 근로시간 단축 32주 이후로 확대 (2025.2.23 시행)',
    },
    org: '대한민국 정책브리핑 (korea.kr)',
    url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148940076',
    accessed: '2026-09-29',
  },
  {
    id: 'easylaw-leave',
    label: {
      en: 'Easy-to-find Law — using maternity leave (출산전후휴가)',
      ko: '찾기쉬운 생활법령정보 — 출산전후휴가의 사용',
    },
    org: '법제처 (easylaw.go.kr)',
    url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1379&ccfNo=3&cciNo=1&cnpClsNo=1',
    accessed: '2026-09-29',
  },
  {
    id: 'gov24-supplements',
    label: {
      en: 'Gov24 — folic acid & iron for registered pregnant women',
      ko: '정부24 — 임산부 엽산제·철분제 지원',
    },
    org: '정부24 / 보건복지부',
    url: 'https://www.gov.kr/portal/rcvfvrSvc/dtlEx/SD0000016094',
    accessed: '2026-09-29',
  },
  {
    id: 'mohw-postpartum-2024',
    label: {
      en: 'MOHW — 2024 postpartum care survey (산후조리 실태조사)',
      ko: '보건복지부 — 2024년 산후조리 실태조사',
    },
    org: '보건복지부 (MOHW)',
    url: 'https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1484525&act=view',
    accessed: '2026-09-29',
  },
  {
    id: 'news-postpartum-cost',
    label: {
      en: 'Newsis (Mar 2026) — MOHW data on postpartum center prices, H2 2025',
      ko: '뉴시스 (2026.3) — 2025년 하반기 산후조리원 비용 (복지부 자료)',
    },
    org: '뉴시스 (Newsis)',
    url: 'https://www.newsis.com/view/NISX20260312_0003546373',
    accessed: '2026-09-29',
  },
  {
    id: 'jkms-gbs-2025',
    label: {
      en: 'Shin et al., J Korean Med Sci 2025 — GBS colonization & universal screening at a Korean center',
      ko: 'Shin 외, J Korean Med Sci 2025 — 국내 기관의 GBS 보균율과 전수 선별검사',
    },
    org: 'J Korean Med Sci',
    url: 'https://doi.org/10.3346/jkms.2025.40.e29',
    accessed: '2026-09-29',
  },
  {
    id: 'amc-nst',
    label: { en: 'Asan Medical Center — non-stress test', ko: '서울아산병원 — 비수축검사' },
    org: '서울아산병원',
    url: 'https://www.amc.seoul.kr/asan/healthinfo/management/managementDetail.do?managementId=222',
    accessed: '2026-09-29',
  },
  {
    id: 'amc-cvs',
    label: { en: 'Asan Medical Center — chorionic villus sampling', ko: '서울아산병원 — 융모막융모생검' },
    org: '서울아산병원',
    url: 'https://www.amc.seoul.kr/asan/healthinfo/management/managementDetail.do?managementId=280',
    accessed: '2026-09-29',
  },
  {
    id: 'amc-prenatal',
    label: { en: 'Asan Medical Center — prenatal tests', ko: '서울아산병원 — 산전 검사' },
    org: '서울아산병원',
    url: 'https://www.amc.seoul.kr/asan/healthinfo/management/managementDetail.do?managementId=58',
    accessed: '2026-09-29',
  },
  {
    id: 'cha-antepartum',
    label: {
      en: 'CHA Gangnam Medical Center — tests by month of pregnancy',
      ko: '강남차병원 — 임신 개월별 검사',
    },
    org: '강남차병원',
    url: 'https://gangnam.chamc.co.kr/health/culturecenter/antepartum.cha',
    accessed: '2026-09-29',
  },
  {
    id: 'hira-ultrasound',
    label: {
      en: 'HIRA — number of covered prenatal ultrasounds by week',
      ko: '건강보험심사평가원 — 임산부 초음파 주수별 급여 인정 횟수',
    },
    org: '건강보험심사평가원 (HIRA)',
    url: 'https://www.hira.or.kr/bbsDummy.do?pgmid=HIRAA010006011000&brdScnBltNo=4&brdBltNo=47499&pageIndex=1&pageIndex2=1',
    accessed: '2026-09-29',
  },
  {
    id: 'kdca-flu',
    label: {
      en: 'KDCA Vaccination Helper — free influenza vaccination (incl. pregnant women)',
      ko: '예방접종도우미 — 인플루엔자 국가예방접종 (임신부 포함)',
    },
    org: '질병관리청 (KDCA)',
    url: 'https://nip.kdca.go.kr/irhp/mngm/goVcntMngm.do?menuLv=3&menuCd=333',
    accessed: '2026-09-29',
  },
  {
    id: 'korea-pertussis',
    label: {
      en: 'Policy briefing — whooping cough Q&A (Tdap at 27–36 weeks)',
      ko: '정책브리핑 — 백일해 Q&A (임신 27~36주 Tdap)',
    },
    org: '대한민국 정책브리핑 (korea.kr)',
    url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148923417',
    accessed: '2026-09-29',
  },
  {
    id: 'news-rsv-kr',
    label: {
      en: 'News report (Aug 2026) — maternal RSV vaccine (Abrysvo) approved in Korea for 28–36 weeks',
      ko: '청년의사 (2026.8) — 임신부 RSV 백신(아브리스보) 국내 허가, 28~36주',
    },
    org: '청년의사 (news)',
    url: 'http://www.docdocdoc.co.kr/news/articleView.html?idxno=3041812',
    accessed: '2026-09-29',
  },
  {
    id: 'news-nipt-price',
    label: {
      en: 'News report (Oct 2025) — NIPT prices by region from government price disclosure',
      ko: '뉴스 (2025.10) — 비급여 공개자료 기준 지역별 NIPT 가격',
    },
    org: 'Daum News',
    url: 'https://v.daum.net/v/20251006132700650',
    accessed: '2026-09-29',
  },
  {
    id: 'seoul-transport',
    label: {
      en: 'Seoul — transport support for pregnant women',
      ko: '서울시 임신·출산 정보센터 — 임산부 교통비 지원',
    },
    org: '서울특별시',
    url: 'https://seoul-agi.seoul.go.kr/pregnant-transportation-support',
    accessed: '2026-09-29',
  },
  {
    id: 'ksog-tests',
    label: { en: 'KSOG — tests during pregnancy (patient page)', ko: '대한산부인과학회 — 임신 중 검사' },
    org: '대한산부인과학회 (KSOG)',
    url: 'https://www.ksog.org/public/index.php?sub=1&third=2',
    accessed: '2026-09-29',
  },

  // --- US: verified 2026-09 ---
  {
    id: 'ada-2026',
    label: {
      en: 'ADA Standards of Care 2026, §2 — early diabetes testing in pregnancy (BMI ≥23 for Asian ancestry)',
      ko: '미국당뇨병학회(ADA) 2026 진료지침 §2 — 임신 초기 당뇨 검사 (아시아계 BMI ≥23)',
    },
    org: 'American Diabetes Association',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12690183/',
    accessed: '2026-09-29',
  },
  {
    id: 'uspstf-aspirin',
    label: {
      en: 'USPSTF — low-dose aspirin to prevent preeclampsia (2021)',
      ko: 'USPSTF — 전자간증 예방 저용량 아스피린 (2021)',
    },
    org: 'U.S. Preventive Services Task Force',
    url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/low-dose-aspirin-use-for-the-prevention-of-morbidity-and-mortality-from-preeclampsia-preventive-medication',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-aspirin',
    label: {
      en: 'ACOG Practice Advisory — low-dose aspirin for preeclampsia prevention',
      ko: 'ACOG 진료 권고 — 전자간증 예방 저용량 아스피린',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical/clinical-guidance/practice-advisory/articles/2021/12/low-dose-aspirin-use-for-the-prevention-of-preeclampsia-and-related-morbidity-and-mortality',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-syphilis',
    label: {
      en: 'ACOG Practice Advisory — universal syphilis screening in pregnancy (2024)',
      ko: 'ACOG 진료 권고 — 임신 중 매독 전수 선별 (2024)',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical/clinical-guidance/practice-advisory/articles/2024/04/screening-for-syphilis-in-pregnancy',
    accessed: '2026-09-29',
  },
  {
    id: 'cdc-std-pregnant',
    label: {
      en: 'CDC STI Treatment Guidelines — screening in pregnancy (HBsAg, HIV, HCV, syphilis, chlamydia, gonorrhea)',
      ko: 'CDC 성매개감염 지침 — 임신 중 선별 (B형간염·HIV·C형간염·매독·클라미디아·임질)',
    },
    org: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/std/treatment-guidelines/pregnant.htm',
    accessed: '2026-09-29',
  },
  {
    id: 'uspstf-ctng',
    label: {
      en: 'USPSTF — chlamydia & gonorrhea screening',
      ko: 'USPSTF — 클라미디아·임질 선별',
    },
    org: 'U.S. Preventive Services Task Force',
    url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/chlamydia-and-gonorrhea-screening',
    accessed: '2026-09-29',
  },
  {
    id: 'uspstf-folic',
    label: {
      en: 'USPSTF — folic acid to prevent neural tube defects',
      ko: 'USPSTF — 신경관 결손 예방 엽산',
    },
    org: 'U.S. Preventive Services Task Force',
    url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/folic-acid-for-the-prevention-of-neural-tube-defects-preventive-medication',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-gbs',
    label: {
      en: 'ACOG Committee Opinion 797 — GBS screening at 36w0d–37w6d',
      ko: 'ACOG 위원회 의견 797 — 36주 0일–37주 6일 GBS 선별',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2020/02/prevention-of-group-b-streptococcal-early-onset-disease-in-newborns',
    accessed: '2026-09-29',
  },
  {
    id: 'cdc-tdap',
    label: {
      en: 'CDC — Tdap during each pregnancy (27–36 weeks)',
      ko: 'CDC — 매 임신 Tdap (27–36주)',
    },
    org: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/pertussis/vaccines/tdap-vaccination-during-pregnancy.html',
    accessed: '2026-09-29',
  },
  {
    id: 'cdc-rsv',
    label: {
      en: 'CDC — maternal RSV vaccine (32w0d–36w6d, Sep–Jan)',
      ko: 'CDC — 임신부 RSV 백신 (32주 0일–36주 6일, 9–1월)',
    },
    org: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/rsv/hcp/vaccine-clinical-guidance/pregnant-people.html',
    accessed: '2026-09-29',
  },
  {
    id: 'cdc-flu',
    label: {
      en: 'CDC — flu vaccine safety in pregnancy',
      ko: 'CDC — 임신 중 독감 백신 안전성',
    },
    org: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/flu/hcp/vax-summary/vaccine-safety-pregnant.html',
    accessed: '2026-09-29',
  },
  {
    id: 'cdc-covid',
    label: {
      en: 'CDC — COVID-19 vaccines while pregnant (updated Feb 2026)',
      ko: 'CDC — 임신 중 코로나19 백신 (2026년 2월 갱신)',
    },
    org: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/covid/vaccines/pregnant-or-breastfeeding.html',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-covid',
    label: {
      en: 'ACOG (Mar 2026) — reaffirms COVID-19 vaccination in pregnancy',
      ko: 'ACOG (2026년 3월) — 임신 중 코로나19 백신 권고 재확인',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/news/news-releases/2026/03/acog-reaffirms-strong-recommendation-covid-19-vaccination-pregnancy',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-term',
    label: {
      en: 'ACOG Committee Opinion 579 — definition of term pregnancy',
      ko: 'ACOG 위원회 의견 579 — 만삭의 정의',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2013/11/definition-of-term-pregnancy',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-surveillance',
    label: {
      en: 'ACOG Committee Opinion 828 — indications for antenatal fetal surveillance',
      ko: 'ACOG 위원회 의견 828 — 산전 태아 감시 적응증',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2021/06/indications-for-outpatient-antenatal-fetal-surveillance',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-induction-39',
    label: {
      en: 'ACOG FAQ — induction of labor at 39 weeks',
      ko: 'ACOG 환자 안내 — 39주 유도분만',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/womens-health/faqs/induction-of-labor-at-39-weeks',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-postdate',
    label: {
      en: 'ACOG FAQ — when pregnancy goes past your due date',
      ko: 'ACOG 환자 안내 — 예정일이 지났을 때',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/womens-health/faqs/when-pregnancy-goes-past-your-due-date',
    accessed: '2026-09-29',
  },
  {
    id: 'cdc-hsv',
    label: {
      en: 'CDC — genital herpes in pregnancy (suppression from 36 weeks)',
      ko: 'CDC — 임신 중 생식기 헤르페스 (36주부터 억제요법)',
    },
    org: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/std/treatment-guidelines/herpes.htm',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-rh',
    label: {
      en: 'ACOG FAQ — the Rh factor in pregnancy',
      ko: 'ACOG 환자 안내 — 임신과 Rh 인자',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/womens-health/faqs/the-rh-factor-how-it-can-affect-your-pregnancy',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-aneuploidy-2026',
    label: {
      en: 'ACOG Practice Advisory (Jan 2026) — screening for fetal chromosomal abnormalities',
      ko: 'ACOG 진료 권고 (2026년 1월) — 태아 염색체 이상 선별',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical/clinical-guidance/practice-advisory/articles/2026/01/screening-for-fetal-chromosomal-abnormalities',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-one-approach',
    label: {
      en: 'ACOG — current guidance on prenatal screening (one screening approach)',
      ko: 'ACOG — 산전 선별검사 현행 지침 (한 가지 선별 방법)',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/advocacy/policy-priorities/non-invasive-prenatal-testing/current-acog-guidance',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-diagnostic',
    label: {
      en: 'ACOG FAQ — prenatal genetic diagnostic tests (CVS, amniocentesis)',
      ko: 'ACOG 환자 안내 — 산전 유전 확진검사 (융모막검사·양수검사)',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/womens-health/faqs/prenatal-genetic-diagnostic-tests',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-tailored',
    label: {
      en: 'ACOG Clinical Consensus No. 8 (2025) — tailored prenatal care',
      ko: 'ACOG 임상 합의 8호 (2025) — 맞춤형 산전 관리',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical-information/physician-faqs/tailored-prenatal-care',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-fetal-tests',
    label: {
      en: 'ACOG FAQ — special tests for monitoring fetal well-being (incl. kick counts)',
      ko: 'ACOG 환자 안내 — 태아 안녕 평가 검사 (태동 세기 포함)',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/womens-health/faqs/special-tests-for-monitoring-fetal-well-being',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-ultrasound',
    label: {
      en: 'ACOG FAQ — ultrasound exams (anatomy scan at 18–22 weeks)',
      ko: 'ACOG 환자 안내 — 초음파 검사 (18–22주 정밀 초음파)',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/womens-health/faqs/ultrasound-exams',
    accessed: '2026-09-29',
  },
  {
    id: 'pmc-fetal-movement',
    label: {
      en: 'Review (Nurs Womens Health) — fetal movement: quickening timing & monitoring evidence',
      ko: '문헌고찰 (Nurs Womens Health) — 태동 시작 시기와 모니터링 근거',
    },
    org: 'NIH PMC',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11472900/',
    accessed: '2026-09-29',
  },
  {
    id: 'aafp-fundal',
    label: {
      en: 'AAFP review — fetal growth restriction (fundal height after 24 weeks)',
      ko: 'AAFP 문헌고찰 — 태아 성장 제한 (24주 이후 자궁저 높이)',
    },
    org: 'American Academy of Family Physicians',
    url: 'https://www.aafp.org/pubs/afp/issues/2021/1100/p486.html',
    accessed: '2026-09-29',
  },
  // --- Nutrition & exercise: verified 2026-09 ---
  {
    id: 'kdri-2025',
    label: {
      en: 'Dietary Reference Intakes for Koreans 2025 (KDRI)',
      ko: '2025 한국인 영양소 섭취기준',
    },
    org: '보건복지부 / 한국영양학회',
    url: 'https://www.mohw.go.kr/board.es?mid=a10411010200&bid=0019&tag=&act=view&list_no=1488446',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-nutrition',
    label: {
      en: 'ACOG FAQ — healthy eating during pregnancy (2026)',
      ko: 'ACOG 환자 안내 — 임신 중 건강한 식사 (2026)',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/womens-health/faqs/healthy-eating-during-pregnancy',
    accessed: '2026-09-29',
  },
  {
    id: 'health-canada-dri',
    label: {
      en: 'Health Canada — US/Canada Dietary Reference Intakes (elements)',
      ko: '캐나다 보건부 — 미국·캐나다 영양섭취기준 (무기질)',
    },
    org: 'Health Canada',
    url: 'https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/dietary-reference-intakes/tables/reference-values-elements.html',
    accessed: '2026-09-29',
  },
  {
    id: 'brain-fat-2019',
    label: {
      en: 'Devarshi et al., Nutrients 2019 — DHA & the brain (~60% of brain dry weight is fat)',
      ko: 'Devarshi 외, Nutrients 2019 — DHA와 뇌 (뇌 건조중량의 약 60%가 지방)',
    },
    org: 'Nutrients (NIH PMC)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6567027/',
    accessed: '2026-09-29',
  },
  {
    id: 'dha-accretion-2015',
    label: {
      en: 'Harris & Baack, J Perinatol 2015 — fetal DHA accretion in late pregnancy',
      ko: 'Harris & Baack, J Perinatol 2015 — 임신 말기 태아 DHA 축적',
    },
    org: 'J Perinatol (NIH PMC)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4281288/',
    accessed: '2026-09-29',
  },
  {
    id: 'koletzko-dha',
    label: {
      en: 'Koletzko et al. — consensus: ≥200 mg DHA/day in pregnancy (2008; Asia update 2014)',
      ko: 'Koletzko 외 — 합의: 임신 중 DHA 하루 200mg 이상 (2008; 아시아 2014)',
    },
    org: 'J Perinat Med / Ann Nutr Metab',
    url: 'https://doi.org/10.1159/000365767',
    accessed: '2026-09-29',
  },
  {
    id: 'cochrane-omega3',
    label: {
      en: 'Cochrane 2018 — omega-3 in pregnancy (preterm birth)',
      ko: '코크란 2018 — 임신 중 오메가-3 (조산)',
    },
    org: 'Cochrane',
    url: 'https://doi.org/10.1002/14651858.CD003402.pub3',
    accessed: '2026-09-29',
  },
  {
    id: 'adore-2021',
    label: {
      en: 'ADORE trial 2021 — high-dose DHA helps most with low DHA status',
      ko: 'ADORE 임상시험 2021 — DHA 수치가 낮을 때 고용량 DHA 효과',
    },
    org: 'EClinicalMedicine',
    url: 'https://doi.org/10.1016/j.eclinm.2021.100905',
    accessed: '2026-09-29',
  },
  {
    id: 'orip-2019',
    label: {
      en: 'ORIP trial, NEJM 2019 — omega-3 in well-nourished women (no effect)',
      ko: 'ORIP 임상시험, NEJM 2019 — 영양 상태 양호 여성의 오메가-3 (효과 없음)',
    },
    org: 'New England Journal of Medicine',
    url: 'https://doi.org/10.1056/NEJMoa1816832',
    accessed: '2026-09-29',
  },
  {
    id: 'fda-fish',
    label: {
      en: 'FDA/EPA — advice about eating fish',
      ko: 'FDA/EPA — 생선 섭취 권고',
    },
    org: 'U.S. Food and Drug Administration',
    url: 'https://www.fda.gov/food/consumers/advice-about-eating-fish',
    accessed: '2026-09-29',
  },
  {
    id: 'mfds-fish',
    label: {
      en: 'MFDS — limit shark, swordfish, tuna to ≤100 g/week in pregnancy',
      ko: '식약처 — 임신부 상어·황새치·참치 주 100g 이하',
    },
    org: '식품의약품안전처 (MFDS)',
    url: 'https://www.mfds.go.kr/brd/m_100/view.do?seq=24909&srchFr=&srchTo=&srchWord=&srchTp=&itm_seq_1=0&itm_seq_2=0&multi_itm_seq=0&company_cd=&company_nm=&page=67',
    accessed: '2026-09-29',
  },
  {
    id: 'snu-fish',
    label: {
      en: 'SNU Public Health Knowledge Center — MFDS fish guide for pregnant women',
      ko: '서울대 국민건강지식센터 — 식약처 임신부 생선 섭취 가이드',
    },
    org: '서울대학교 국민건강지식센터',
    url: 'https://hqcenter.snu.ac.kr/archives/3066',
    accessed: '2026-09-29',
  },
  {
    id: 'perilla-2024',
    label: {
      en: 'Li et al., Foods 2024 — perilla oil: 59–71% ALA, oxidizes easily',
      ko: 'Li 외, Foods 2024 — 들기름: ALA 59–71%, 산화 쉬움',
    },
    org: 'Foods (NIH PMC)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11593517/',
    accessed: '2026-09-29',
  },
  {
    id: 'sesame-2023',
    label: {
      en: 'Oboulbiga et al., Front Nutr 2023 — sesame oil fatty acids',
      ko: 'Oboulbiga 외, Front Nutr 2023 — 참기름 지방산 조성',
    },
    org: 'Front Nutr (NIH PMC)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10292629/',
    accessed: '2026-09-29',
  },
  {
    id: 'brenna-2009',
    label: {
      en: 'Brenna et al., PLEFA 2009 — plant ALA barely raises DHA',
      ko: 'Brenna 외, PLEFA 2009 — 식물성 ALA는 DHA를 거의 높이지 못함',
    },
    org: 'Prostaglandins Leukot Essent Fatty Acids',
    url: 'https://doi.org/10.1016/j.plefa.2009.01.004',
    accessed: '2026-09-29',
  },
  {
    id: 'fda-transfat',
    label: {
      en: 'FDA — trans fat',
      ko: 'FDA — 트랜스지방',
    },
    org: 'U.S. Food and Drug Administration',
    url: 'https://www.fda.gov/food/food-additives-petitions/trans-fat',
    accessed: '2026-09-29',
  },
  {
    id: 'seaweed-2022',
    label: {
      en: 'Ju et al., Eur J Nutr 2022 — iodine from seaweed soup in Korean mothers',
      ko: 'Ju 외, Eur J Nutr 2022 — 한국 산모의 미역국 요오드 섭취',
    },
    org: 'Eur J Nutr',
    url: 'https://doi.org/10.1007/s00394-022-02960-6',
    accessed: '2026-09-29',
  },
  {
    id: 'mfds-seaweed',
    label: {
      en: 'MFDS (via Bokjiro) — postpartum seaweed soup: 2 bowls a day or less',
      ko: '식약처 (복지로) — 산후 미역국 하루 2그릇 이하',
    },
    org: '식품의약품안전처 (MFDS)',
    url: 'https://www.bokjiro.go.kr/ssis-tbu/cms/pc/news/news/6682839.html',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-caffeine',
    label: {
      en: 'ACOG Committee Opinion 462 — caffeine under 200 mg/day',
      ko: 'ACOG 위원회 의견 462 — 카페인 하루 200mg 미만',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2010/08/moderate-caffeine-consumption-during-pregnancy',
    accessed: '2026-09-29',
  },
  {
    id: 'mfds-caffeine',
    label: {
      en: 'MFDS (via Bokjiro) — caffeine ≤300 mg/day for pregnant women',
      ko: '식약처 (복지로) — 임신부 카페인 하루 300mg 이하',
    },
    org: '식품의약품안전처 (MFDS)',
    url: 'https://www.bokjiro.go.kr/ssis-tbu/cms/pc/news/news/6684120.html',
    accessed: '2026-09-29',
  },
  {
    id: 'cdc-food-safety',
    label: {
      en: 'CDC — food safety for pregnant women (Listeria)',
      ko: 'CDC — 임신부 식품 안전 (리스테리아)',
    },
    org: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/food-safety/foods/pregnant-women.html',
    accessed: '2026-09-29',
  },
  {
    id: 'kdca-lungfluke',
    label: {
      en: 'KDCA — lung fluke from raw freshwater crab (게장)',
      ko: '국가건강정보포털 — 폐흡충증 (민물 게장)',
    },
    org: '질병관리청 (KDCA)',
    url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5339',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-weight',
    label: {
      en: 'ACOG Committee Opinion 548 — weight gain in pregnancy (IOM ranges)',
      ko: 'ACOG 위원회 의견 548 — 임신 중 체중 증가 (IOM 범위)',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2013/01/weight-gain-during-pregnancy',
    accessed: '2026-09-29',
  },
  {
    id: 'cochrane-mg',
    label: {
      en: 'Cochrane 2014 — magnesium supplements in pregnancy',
      ko: '코크란 2014 — 임신 중 마그네슘 보충',
    },
    org: 'Cochrane',
    url: 'https://doi.org/10.1002/14651858.CD000937.pub2',
    accessed: '2026-09-29',
  },
  {
    id: 'cochrane-cramps',
    label: {
      en: 'Cochrane 2020 — treatments for leg cramps in pregnancy',
      ko: '코크란 2020 — 임신 중 다리 경련 치료',
    },
    org: 'Cochrane',
    url: 'https://doi.org/10.1002/14651858.CD010655.pub3',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-mgso4',
    label: {
      en: 'ACOG/SMFM Committee Opinion 573 — magnesium sulfate use in obstetrics',
      ko: 'ACOG/SMFM 위원회 의견 573 — 산과에서의 황산마그네슘',
    },
    org: 'ACOG',
    url: 'https://doi.org/10.1097/01.AOG.0000433994.46087.85',
    accessed: '2026-09-29',
  },
  {
    id: 'magpie-2002',
    label: {
      en: 'Magpie trial, Lancet 2002 — magnesium sulfate prevents eclampsia',
      ko: 'Magpie 임상시험, Lancet 2002 — 황산마그네슘의 자간증 예방',
    },
    org: 'The Lancet',
    url: 'https://doi.org/10.1016/s0140-6736(02)08778-0',
    accessed: '2026-09-29',
  },
  {
    id: 'cochrane-mgso4',
    label: {
      en: 'Cochrane 2026 — magnesium sulfate for fetal neuroprotection',
      ko: '코크란 2026 — 태아 신경 보호를 위한 황산마그네슘',
    },
    org: 'Cochrane',
    url: 'https://doi.org/10.1002/14651858.CD004661.pub5',
    accessed: '2026-09-29',
  },
  {
    id: 'endo-vitd',
    label: {
      en: 'Endocrine Society 2024 guideline — vitamin D (empiric supplementation in pregnancy)',
      ko: '내분비학회 2024 지침 — 비타민 D (임신 중 경험적 보충)',
    },
    org: 'Endocrine Society',
    url: 'https://www.endocrine.org/clinical-practice-guidelines/vitamin-d-for-prevention-of-disease',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-vitd',
    label: {
      en: 'ACOG Committee Opinion 495 — vitamin D screening & supplementation in pregnancy',
      ko: 'ACOG 위원회 의견 495 — 임신 중 비타민 D 검사와 보충',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2011/07/vitamin-d-screening-and-supplementation-during-pregnancy',
    accessed: '2026-09-29',
  },
  {
    id: 'cochrane-vitd',
    label: {
      en: 'Cochrane 2024 — vitamin D supplementation in pregnancy',
      ko: '코크란 2024 — 임신 중 비타민 D 보충',
    },
    org: 'Cochrane',
    url: 'https://doi.org/10.1002/14651858.CD008873.pub5',
    accessed: '2026-09-29',
  },
  {
    id: 'nutrrev-vitd',
    label: {
      en: 'Yang et al., Nutr Rev 2025 — 66 trials of vitamin D in pregnancy',
      ko: 'Yang 외, Nutr Rev 2025 — 임신 중 비타민 D 임상시험 66건',
    },
    org: 'Nutrition Reviews',
    url: 'https://doi.org/10.1093/nutrit/nuae065',
    accessed: '2026-09-29',
  },
  {
    id: 'umbrella-vitd-2026',
    label: {
      en: 'Lin et al., BMC Pregnancy Childbirth 2026 — umbrella review of vitamin D in pregnancy',
      ko: 'Lin 외, BMC Pregnancy Childbirth 2026 — 임신 중 비타민 D 우산 고찰',
    },
    org: 'BMC Pregnancy Childbirth',
    url: 'https://doi.org/10.1186/s12884-026-08994-6',
    accessed: '2026-09-29',
  },
  {
    id: 'nichd-vitd',
    label: {
      en: 'NIH/NICHD (Mar 2025) — low vitamin D in early pregnancy linked to preterm birth',
      ko: 'NIH/NICHD (2025년 3월) — 임신 초기 비타민 D 부족과 조산의 연관',
    },
    org: 'National Institutes of Health (NICHD)',
    url: 'https://www.nichd.nih.gov/newsroom/news/030425-preterm-birth-vitamin-D',
    accessed: '2026-09-29',
  },
  {
    id: 'ajcn-vitd-2025',
    label: {
      en: 'Beck, Gernand et al., Am J Clin Nutr 2025 — first-trimester vitamin D and preterm birth',
      ko: 'Beck, Gernand 외, AJCN 2025 — 임신 1삼분기 비타민 D와 조산',
    },
    org: 'Am J Clin Nutr',
    url: 'https://doi.org/10.1016/j.ajcnut.2024.11.018',
    accessed: '2026-09-29',
  },
  {
    id: 'cha-vitd-2025',
    label: {
      en: 'Lee et al., PLoS One 2025 — vitamin D deficiency & preterm birth in 5,169 Korean pregnancies',
      ko: 'Lee 외, PLoS One 2025 — 한국 임신부 5,169명의 비타민 D 결핍과 조산',
    },
    org: 'PLoS One (CHA Bundang)',
    url: 'https://doi.org/10.1371/journal.pone.0323146',
    accessed: '2026-09-29',
  },
  {
    id: 'knhanes-vitd',
    label: {
      en: 'Shin & Kim, Nutrients 2025 — vitamin D deficiency in KNHANES 2022',
      ko: 'Shin & Kim, Nutrients 2025 — 국민건강영양조사 2022 비타민 D 결핍',
    },
    org: 'Nutrients (NIH PMC)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12567185/',
    accessed: '2026-09-29',
  },
  {
    id: 'checkup-vitd',
    label: {
      en: 'Nutrients 2024 — vitamin D in 119,335 Korean health check-ups (2017–2022)',
      ko: 'Nutrients 2024 — 한국인 건강검진 119,335명 비타민 D (2017–2022)',
    },
    org: 'Nutrients (NIH PMC)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10934696/',
    accessed: '2026-09-29',
  },
  {
    id: 'smc-vitd-2015',
    label: {
      en: 'Choi et al., Nutrients 2015 — vitamin D deficiency in pregnant Korean women',
      ko: 'Choi 외, Nutrients 2015 — 한국 임신부의 비타민 D 결핍',
    },
    org: 'Nutrients',
    url: 'https://doi.org/10.3390/nu7053427',
    accessed: '2026-09-29',
  },
  {
    id: 'kaiser-vitd-2024',
    label: {
      en: 'Yang et al., Osteoporos Int 2024 — vitamin D by Asian subgroup (Kaiser N. California)',
      ko: 'Yang 외, Osteoporos Int 2024 — 아시아계 하위집단별 비타민 D (카이저)',
    },
    org: 'Osteoporos Int (NIH PMC)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11870850/',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-exercise',
    label: {
      en: 'ACOG Committee Opinion 804 — physical activity & exercise in pregnancy',
      ko: 'ACOG 위원회 의견 804 — 임신 중 신체활동과 운동',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2020/04/physical-activity-and-exercise-during-pregnancy-and-the-postpartum-period',
    accessed: '2026-09-29',
  },
  {
    id: 'acog-exercise-faq',
    label: {
      en: 'ACOG FAQ — exercise during pregnancy',
      ko: 'ACOG 환자 안내 — 임신 중 운동',
    },
    org: 'ACOG',
    url: 'https://www.acog.org/womens-health/faqs/exercise-during-pregnancy',
    accessed: '2026-09-29',
  },
  {
    id: 'csep-2019',
    label: {
      en: '2019 Canadian guideline for physical activity throughout pregnancy',
      ko: '2019 캐나다 임신 중 신체활동 지침',
    },
    org: 'Canadian Society for Exercise Physiology',
    url: 'https://csepguidelines.ca/wp-content/uploads/2020/11/4208_CSEP_Pregnancy_Guidelines_En_HR.pdf',
    accessed: '2026-09-29',
  },
  {
    id: 'bjsm-rt-2025',
    label: {
      en: 'BJSM 2025 meta-analysis — resistance training in pregnancy (GDM, hypertension)',
      ko: 'BJSM 2025 메타분석 — 임신 중 저항운동 (임신성 당뇨·고혈압)',
    },
    org: 'Br J Sports Med',
    url: 'https://doi.org/10.1136/bjsports-2024-109123',
    accessed: '2026-09-29',
  },
  {
    id: 'bjsm-heavy-2025',
    label: {
      en: 'BJSM 2025 — heavy resistance exercise at ~26 weeks: fetal response',
      ko: 'BJSM 2025 — 약 26주 고강도 저항운동의 태아 반응',
    },
    org: 'Br J Sports Med',
    url: 'https://doi.org/10.1136/bjsports-2024-108804',
    accessed: '2026-09-29',
  },
  {
    id: 'prevett-2022',
    label: {
      en: 'Prevett et al., Int Urogynecol J 2022 — survey of 679 pregnant heavy lifters',
      ko: 'Prevett 외, Int Urogynecol J 2022 — 임신 중 고중량 운동 여성 679명 설문',
    },
    org: 'Int Urogynecol J',
    url: 'https://doi.org/10.1007/s00192-022-05393-1',
    accessed: '2026-09-29',
  },
  {
    id: 'kdca-activity',
    label: {
      en: 'KDCA National Health Portal — physical activity (incl. pregnancy)',
      ko: '국가건강정보포털 — 신체활동 (임신부 포함)',
    },
    org: '질병관리청 (KDCA)',
    url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6251',
    accessed: '2026-09-29',
  },
  {
    id: 'snu-exercise',
    label: {
      en: 'SNU Public Health Knowledge Center — exercise guideline for pregnant women',
      ko: '서울대 국민건강지식센터 — 임산부를 위한 운동 가이드라인',
    },
    org: '서울대학교 국민건강지식센터',
    url: 'https://hqcenter.snu.ac.kr/archives/jiphyunjeon/%EC%9E%84%EC%82%B0%EB%B6%80%EB%A5%BC-%EC%9C%84%ED%95%9C-%EC%9A%B4%EB%8F%99-%EA%B0%80%EC%9D%B4%EB%93%9C%EB%9D%BC%EC%9D%B8-2',
    accessed: '2026-09-29',
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

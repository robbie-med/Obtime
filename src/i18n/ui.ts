import type { Bilingual, Lang } from '../data/types'

// UI chrome strings (buttons, labels, headings). Content lives in src/data/*.
// Pattern mirrors diet_logger's DICT approach: a flat map of bilingual pairs.
export const UI = {
  appName: { en: 'Machung', ko: '마중' },
  tagline: {
    en: 'A bilingual guide to prenatal care in the US and Korea',
    ko: '미국과 한국의 산전 관리 이중언어 가이드',
  },

  // Header controls
  language: { en: 'Language', ko: '언어' },
  mode: { en: 'View', ko: '보기' },
  momMode: { en: 'For Moms', ko: '엄마용' },
  clinicianMode: { en: 'For Clinicians', ko: '의료진용' },
  deliveryPlan: { en: 'Delivery plan', ko: '분만 계획' },
  planUS: { en: 'Deliver in US', ko: '미국에서 분만' },
  planKR: { en: 'Deliver in Korea', ko: '한국에서 분만' },
  planCrossover: { en: 'Crossover', ko: '교차' },
  planUndecided: { en: 'Undecided', ko: '미정' },

  // Nav sections
  navHome: { en: 'Overview', ko: '개요' },
  navTimeline: { en: 'Timeline', ko: '타임라인' },
  navCompare: { en: 'Compare', ko: '비교' },
  navChecklist: { en: 'My Checklist', ko: '체크리스트' },
  navCrossover: { en: 'Crossover Plan', ko: '교차 계획' },
  navNutrition: { en: 'Nutrition', ko: '영양' },
  navExercise: { en: 'Exercise', ko: '운동' },
  navIndex: { en: 'Index', ko: '용어 사전' },
  navClinicCard: { en: 'Clinic Card', ko: '진료 카드' },
  navTrackers: { en: 'Trackers', ko: '기록' },
  navResources: { en: 'Resources', ko: '자료' },
  navData: { en: 'My Data', ko: '내 데이터' },

  // Onboarding
  onboardTitle: { en: 'When is your baby due?', ko: '출산 예정일이 언제인가요?' },
  onboardSub: {
    en: 'Enter one date and we will personalize the whole guide to where you are now.',
    ko: '한 가지 날짜만 입력하면 현재 시점에 맞춰 가이드를 개인화해 드려요.',
  },
  lmpLabel: { en: 'First day of last period (LMP)', ko: '마지막 생리 시작일 (LMP)' },
  eddLabel: { en: 'Due date (EDD)', ko: '출산 예정일 (EDD)' },
  usEddLabel: { en: 'Ultrasound-dated due date', ko: '초음파 기준 예정일' },
  save: { en: 'Save', ko: '저장' },
  edit: { en: 'Edit', ko: '수정' },
  clear: { en: 'Clear', ko: '지우기' },

  youAreHere: { en: 'You are here', ko: '현재 위치' },
  weeksDays: { en: 'weeks', ko: '주' },
  dueIn: { en: 'due in', ko: '남은 기간' },
  days: { en: 'days', ko: '일' },
  trimester: { en: 'trimester', ko: '삼분기' },

  // Checklist statuses
  dueNow: { en: 'Due now', ko: '지금 할 것' },
  upcoming: { en: 'Upcoming', ko: '예정' },
  past: { en: 'Earlier', ko: '지난 항목' },
  done: { en: 'Done', ko: '완료' },

  // Comparison
  topicCol: { en: 'Topic', ko: '항목' },
  usCol: { en: 'United States', ko: '미국' },
  krCol: { en: 'Korea', ko: '한국' },
  clinicianDetail: { en: 'Clinical detail', ko: '임상 세부' },

  // Data manager
  exportData: { en: 'Download my data', ko: '내 데이터 내보내기' },
  importData: { en: 'Restore from file', ko: '파일에서 복원' },
  privacyNote: {
    en: 'Everything you enter stays in this browser on this device. Nothing is uploaded. Use “Download my data” to back up or move to another device.',
    ko: '입력하신 모든 정보는 이 기기의 브라우저에만 저장되며 어디에도 업로드되지 않습니다. 백업하거나 다른 기기로 옮기려면 “내 데이터 내보내기”를 사용하세요.',
  },

  disclaimer: {
    en: 'This guide is for education only and is not medical advice. Guidelines change and practices vary by clinic. Always confirm with your own care team.',
    ko: '이 가이드는 교육용이며 의학적 조언이 아닙니다. 지침은 바뀔 수 있고 병원마다 다를 수 있습니다. 반드시 담당 의료진과 확인하세요.',
  },

  whenToCall: { en: 'When to call your provider', ko: '언제 병원에 연락할까' },
  printCard: { en: 'Print', ko: '인쇄' },
} satisfies Record<string, Bilingual>

export type UiKey = keyof typeof UI

export function pick(node: Bilingual, lang: Lang): string {
  return node[lang]
}

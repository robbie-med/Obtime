import {
  Activity,
  CircleDot,
  FileText,
  FlaskConical,
  Flag,
  Microscope,
  Pill,
  Scan,
  Stethoscope,
  Syringe,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { Bilingual, EventKind, Tier } from '../../data/types'

// Shared visual vocabulary for timeline items (icon + label per kind, tier
// badges). Used by the timeline, its legend, the checklist and the index.

export const KIND_META: Record<EventKind, { icon: (size?: number) => ReactNode; label: Bilingual }> = {
  visit: { icon: (s = 14) => <Stethoscope size={s} />, label: { en: 'Visit', ko: '진료' } },
  lab: { icon: (s = 14) => <FlaskConical size={s} />, label: { en: 'Lab test', ko: '검사' } },
  ultrasound: { icon: (s = 14) => <Scan size={s} />, label: { en: 'Ultrasound', ko: '초음파' } },
  screening: { icon: (s = 14) => <CircleDot size={s} />, label: { en: 'Screening', ko: '선별검사' } },
  diagnostic: { icon: (s = 14) => <Microscope size={s} />, label: { en: 'Diagnostic test', ko: '확진검사' } },
  vaccine: { icon: (s = 14) => <Syringe size={s} />, label: { en: 'Vaccine', ko: '예방접종' } },
  medication: { icon: (s = 14) => <Pill size={s} />, label: { en: 'Medicine & supplements', ko: '약·영양제' } },
  monitoring: { icon: (s = 14) => <Activity size={s} />, label: { en: 'Monitoring', ko: '모니터링' } },
  admin: { icon: (s = 14) => <FileText size={s} />, label: { en: 'Paperwork & benefits', ko: '서류·지원' } },
  milestone: { icon: (s = 14) => <Flag size={s} />, label: { en: 'Milestone', ko: '이정표' } },
}

export const KIND_ORDER: EventKind[] = [
  'visit',
  'lab',
  'ultrasound',
  'screening',
  'diagnostic',
  'vaccine',
  'medication',
  'monitoring',
  'admin',
  'milestone',
]

export const TIER_META: Record<Tier, { label: Bilingual; explain: Bilingual; className: string }> = {
  routine: {
    label: { en: 'Everyone', ko: '모두' },
    explain: { en: 'Recommended for every pregnancy.', ko: '모든 임신에 권장됩니다.' },
    className: 'bg-primarysoft text-accentink ring-line',
  },
  offered: {
    label: { en: 'Your choice', ko: '선택' },
    explain: {
      en: 'Offered to everyone — you decide whether to have it.',
      ko: '모두에게 제안되며, 받을지는 본인이 결정합니다.',
    },
    className: 'bg-surface text-ink ring-line',
  },
  indicated: {
    label: { en: 'Only if', ko: '해당 시' },
    explain: {
      en: 'Only when a specific condition applies (shown on the card).',
      ko: '특정 조건에 해당할 때만 (카드에 표시).',
    },
    className: 'bg-surface2 text-muted ring-line',
  },
}

export const COUNTRY_COLOR = { us: 'var(--color-us)', kr: 'var(--color-kr)' } as const
export const COUNTRY_NAME: Record<'us' | 'kr', Bilingual> = {
  us: { en: 'United States', ko: '미국' },
  kr: { en: 'Korea', ko: '한국' },
}

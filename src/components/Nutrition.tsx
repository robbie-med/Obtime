import { Salad } from 'lucide-react'
import { NUTRITION, NUTRITION_INTRO } from '../data/nutrition'
import { useUi } from '../state/uiState'
import { GuidePage } from './GuidePage'

export function Nutrition() {
  const { lang } = useUi()
  return (
    <GuidePage
      pageId="nutrition"
      intro={NUTRITION_INTRO}
      sections={NUTRITION}
      title={
        <span className="inline-flex items-center gap-2">
          <Salad size={18} className="text-accentink" />
          {lang === 'en' ? 'Eating well in pregnancy' : '임신 중 영양'}
        </span>
      }
    />
  )
}

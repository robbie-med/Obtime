import { Dumbbell } from 'lucide-react'
import { EXERCISE, EXERCISE_INTRO } from '../data/exercise'
import { useUi } from '../state/uiState'
import { GuidePage } from './GuidePage'

export function Exercise() {
  const { lang } = useUi()
  return (
    <GuidePage
      pageId="exercise"
      intro={EXERCISE_INTRO}
      sections={EXERCISE}
      title={
        <span className="inline-flex items-center gap-2">
          <Dumbbell size={18} className="text-accentink" />
          {lang === 'en' ? 'Exercise & strength training' : '운동과 근력 운동'}
        </span>
      }
    />
  )
}

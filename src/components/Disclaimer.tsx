import { Info } from 'lucide-react'
import { useUi } from '../state/uiState'

export function Disclaimer() {
  const { t } = useUi()
  return (
    <p className="mx-auto flex max-w-3xl items-start gap-2 rounded-xl bg-brand-100/60 px-4 py-3 text-xs text-brand-800">
      <Info size={14} className="mt-0.5 shrink-0" />
      <span>{t('disclaimer')}</span>
    </p>
  )
}

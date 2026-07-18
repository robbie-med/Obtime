import { Info } from 'lucide-react'
import { useUi } from '../state/uiState'

export function Disclaimer() {
  const { t } = useUi()
  return (
    <p className="mx-auto flex max-w-3xl items-start gap-2 rounded-xl bg-primarysoft px-4 py-3 text-xs text-ink">
      <Info size={14} className="mt-0.5 shrink-0" />
      <span>{t('disclaimer')}</span>
    </p>
  )
}

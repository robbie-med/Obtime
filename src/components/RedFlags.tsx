import { PhoneCall, AlertTriangle } from 'lucide-react'
import { clsx } from 'clsx'
import { useUi } from '../state/uiState'
import { SectionCard } from './primitives'
import { RED_FLAGS } from '../data/redflags'

export function RedFlags() {
  const { t, tc } = useUi()
  return (
    <SectionCard
      title={
        <span className="inline-flex items-center gap-2 text-rose-accent">
          <PhoneCall size={18} />
          {t('whenToCall')}
        </span>
      }
    >
      <ul className="grid gap-2 sm:grid-cols-2">
        {RED_FLAGS.map((f) => (
          <li
            key={f.id}
            className={clsx(
              'rounded-lg border p-3',
              f.urgent
                ? 'border-rose-accent/40 bg-rose-accent/5'
                : 'border-brand-100 bg-white',
            )}
          >
            <div className="flex items-start gap-2">
              {f.urgent && (
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-rose-accent" />
              )}
              <div>
                <p className="text-sm font-medium text-slate-800">{tc(f.sign)}</p>
                <p className="mt-0.5 text-sm text-slate-500">{tc(f.action)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}

import { useUi } from '../state/uiState'
import { SectionCard, SourceBadges } from './primitives'
import { COMPARISON } from '../data/comparison'
import type { Bilingual } from '../data/types'

/**
 * Side-by-side US vs Korea comparison. Per the product spec these tables are
 * ALWAYS bilingual — both English and Korean render regardless of the language
 * toggle. The toggle only controls which language leads (larger / on top).
 */
export function Compare() {
  const { t, lang, mode } = useUi()
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        {lang === 'en'
          ? 'These tables show both English and Korean side by side, so you can share them with a provider in either country.'
          : '이 표는 영어와 한국어를 나란히 보여주므로 양국 어느 병원에서든 함께 볼 수 있습니다.'}
      </p>
      {COMPARISON.map((section) => (
        <SectionCard key={section.id} title={<BilingualLead node={section.title} lead={lang} />}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-brand-100 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="w-1/4 py-2 pr-3 font-semibold">{t('topicCol')}</th>
                  <th className="py-2 pr-3 font-semibold" style={{ color: 'var(--color-us)' }}>
                    {t('usCol')}
                  </th>
                  <th className="py-2 font-semibold" style={{ color: 'var(--color-kr)' }}>
                    {t('krCol')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.id} className="border-b border-brand-50 align-top">
                    <td className="py-3 pr-3 font-medium text-brand-800">
                      <BilingualLead node={row.topic} lead={lang} />
                      <SourceBadges ids={row.sourceIds} />
                    </td>
                    <td className="py-3 pr-3 text-slate-700">
                      <BilingualCell node={row.us} lead={lang} />
                    </td>
                    <td className="py-3 text-slate-700">
                      <BilingualCell node={row.kr} lead={lang} />
                      {mode === 'clinician' && row.clinicianNote && (
                        <p className="mt-2 rounded bg-brand-50 px-2 py-1 text-xs text-brand-700">
                          <span className="font-semibold">{t('clinicianDetail')}: </span>
                          {row.clinicianNote[lang]}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      ))}
    </div>
  )
}

function BilingualLead({ node, lead }: { node: Bilingual; lead: 'en' | 'ko' }) {
  const sub = lead === 'en' ? 'ko' : 'en'
  return (
    <span>
      <span>{node[lead]}</span>{' '}
      <span className="text-xs font-normal text-slate-400">{node[sub]}</span>
    </span>
  )
}

function BilingualCell({ node, lead }: { node: Bilingual; lead: 'en' | 'ko' }) {
  const sub = lead === 'en' ? 'ko' : 'en'
  return (
    <div>
      <div>{node[lead]}</div>
      <div className="mt-0.5 text-xs text-slate-400">{node[sub]}</div>
    </div>
  )
}

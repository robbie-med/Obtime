import { clsx } from 'clsx'
import { AlertTriangle, BookOpen, Info, Lightbulb, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Bilingual, GuideBlock, GuideSection } from '../data/types'
import { getIndexEntry } from '../data/indexTerms'
import { useNav } from '../state/navState'
import { useUi } from '../state/uiState'
import { SectionCard, SourceBadges } from './primitives'

// Renders a long-form, sectioned, cited guide (Nutrition, Exercise) with a
// contents list. Clinician-only blocks appear in clinician mode.

const CALLOUT: Record<'tip' | 'warn' | 'info' | 'new', { icon: ReactNode; className: string }> = {
  tip: { icon: <Lightbulb size={16} />, className: 'border-primary/30 bg-primarysoft' },
  info: { icon: <Info size={16} />, className: 'border-line bg-surface2/50' },
  warn: { icon: <AlertTriangle size={16} />, className: 'border-rose-accent/40 bg-rose-accent/10' },
  new: { icon: <Sparkles size={16} />, className: 'border-us/40 bg-us/10' },
}

export function GuidePage({
  title,
  intro,
  sections,
  pageId,
}: {
  title: ReactNode
  intro: Bilingual
  sections: GuideSection[]
  pageId: 'nutrition' | 'exercise'
}) {
  const { tc, lang } = useUi()
  const { navigate } = useNav()
  return (
    <div className="space-y-6">
      <SectionCard title={title} subtitle={tc(intro)}>
        <nav aria-label={lang === 'en' ? 'Contents' : '목차'}>
          <ol className="grid gap-2 sm:grid-cols-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => navigate(pageId, s.id)}
                  className="flex w-full items-start gap-3 rounded-xl border border-line bg-surface p-3 text-left hover:border-primary"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primarysoft text-xs font-bold text-accentink">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{tc(s.title)}</span>
                    <span className="block text-xs text-muted">{tc(s.lede)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </SectionCard>

      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-40">
          <SectionCard title={tc(s.title)} subtitle={tc(s.lede)}>
            <div className="space-y-4">
              {s.blocks.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </div>
            {s.indexIds && s.indexIds.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3 text-xs">
                <span className="text-muted">{lang === 'en' ? 'In the index:' : '용어 사전:'}</span>
                {s.indexIds.map((id) => {
                  const e = getIndexEntry(id)
                  return e ? (
                    <button
                      key={id}
                      onClick={() => navigate('index', `term-${id}`)}
                      className="inline-flex items-center gap-1 text-accentink underline decoration-dotted underline-offset-2"
                    >
                      <BookOpen size={12} />
                      {tc(e.term)}
                    </button>
                  ) : null
                })}
              </div>
            )}
          </SectionCard>
        </section>
      ))}
    </div>
  )
}

function Block({ block }: { block: GuideBlock }) {
  const { tc, lang, mode } = useUi()
  if (block.clinicianOnly && mode !== 'clinician') return null
  const src = <SourceBadges ids={block.sourceIds} />
  const clinTag = block.clinicianOnly && (
    <span className="mr-1.5 rounded bg-surface2 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
      {lang === 'en' ? 'Clinician' : '의료진'}
    </span>
  )

  switch (block.type) {
    case 'text':
      return (
        <p className="text-[15px] leading-relaxed text-ink">
          {clinTag}
          {tc(block.body)}
          {src}
        </p>
      )
    case 'bullets':
      return (
        <div>
          {block.title && (
            <h4 className="mb-1.5 text-sm font-semibold text-ink">
              {clinTag}
              {tc(block.title)}
            </h4>
          )}
          <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink marker:text-accentink">
            {block.items.map((it, i) => (
              <li key={i}>{tc(it)}</li>
            ))}
          </ul>
          {block.sourceIds && <div className="mt-1 text-right">{src}</div>}
        </div>
      )
    case 'callout':
      return (
        <div className={clsx('rounded-xl border p-3', CALLOUT[block.tone].className)}>
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="text-accentink">{CALLOUT[block.tone].icon}</span>
            {clinTag}
            {tc(block.title)}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-ink">
            {tc(block.body)}
            {src}
          </p>
        </div>
      )
    case 'table':
      return (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            {block.caption && (
              <caption className="mb-1.5 text-left text-sm font-semibold text-ink">
                {clinTag}
                {tc(block.caption)}
              </caption>
            )}
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="border-b-2 border-line px-2 py-1.5 text-left font-semibold text-muted">
                    {tc(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i} className="align-top">
                  {r.map((c, j) => (
                    <td key={j} className={clsx('border-b border-line px-2 py-1.5 text-ink', j === 0 && 'font-medium')}>
                      {tc(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.sourceIds && <div className="mt-1 text-right">{src}</div>}
        </div>
      )
    case 'takeaway':
      return (
        <p className="rounded-xl bg-primary px-4 py-3 text-[15px] font-medium leading-relaxed text-onprimary">
          {tc(block.body)}
          {src}
        </p>
      )
  }
}

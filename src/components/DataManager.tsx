import { useRef, useState } from 'react'
import { Download, Upload, Trash2, ShieldCheck } from 'lucide-react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard } from './primitives'
import { exportJson, importJson } from '../lib/persistence'

export function DataManager() {
  const { t, lang } = useUi()
  const { profile, replace, clear } = useProfile()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<string | null>(null)

  function doExport() {
    const blob = new Blob([exportJson(profile)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `machung-data-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = importJson(String(reader.result))
      if (result.ok && result.profile) {
        replace(result.profile)
        setMsg(lang === 'en' ? 'Data restored.' : '데이터를 복원했습니다.')
      } else {
        setMsg(result.error ?? (lang === 'en' ? 'Import failed.' : '가져오기 실패.'))
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <SectionCard
      title={t('navData')}
      subtitle={
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-brand-500" />
          {t('privacyNote')}
        </span>
      }
    >
      <div className="flex flex-wrap gap-2">
        <button onClick={doExport} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          <Download size={15} />
          {t('exportData')}
        </button>
        <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50">
          <Upload size={15} />
          {t('importData')}
        </button>
        <input ref={fileRef} type="file" accept="application/json,.json" onChange={onFile} className="hidden" />
        <button
          onClick={() => {
            if (confirm(lang === 'en' ? 'Erase all saved data on this device?' : '이 기기의 모든 저장 데이터를 지울까요?')) {
              clear()
              setMsg(lang === 'en' ? 'All data cleared.' : '모든 데이터를 지웠습니다.')
            }
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-accent/40 bg-white px-4 py-2 text-sm font-medium text-rose-accent hover:bg-rose-accent/5"
        >
          <Trash2 size={15} />
          {t('clear')}
        </button>
      </div>
      {msg && <p className="mt-3 text-sm text-brand-700">{msg}</p>}
    </SectionCard>
  )
}

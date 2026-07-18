import { useState } from 'react'
import { Timer, Scale, Footprints, NotebookPen, Trash2, Plus } from 'lucide-react'
import { useUi } from '../state/uiState'
import { useProfile } from '../state/profileState'
import { SectionCard } from './primitives'
import {
  computeBmi,
  weightTarget,
  expectedGainBand,
  bmiCategory,
} from '../lib/weightTarget'
import type { KickSession, Note, WeightEntry } from '../lib/persistence'

export function Trackers() {
  const { lang } = useUi()
  const { ga } = useProfile()
  return (
    <div className="space-y-6">
      {ga && (
        <SectionCard title={
          <span className="inline-flex items-center gap-2"><Timer size={18} className="text-brand-600" />{lang === 'en' ? 'Countdown' : '카운트다운'}</span>
        }>
          <p className="text-3xl font-bold text-brand-700">
            {Math.max(0, ga.daysUntilDue)}
            <span className="ml-2 text-base font-medium text-slate-500">
              {lang === 'en' ? 'days to your due date' : '일 남음 (예정일까지)'}
            </span>
          </p>
        </SectionCard>
      )}
      <WeightTracker />
      <KickCounter />
      <Notes />
    </div>
  )
}

function WeightTracker() {
  const { lang } = useUi()
  const { profile, update, ga } = useProfile()
  const [kg, setKg] = useState('')

  const height = profile.heightCm
  const prePreg = profile.prePregnancyWeightKg
  const bmi = height && prePreg ? computeBmi(height, prePreg) : profile.prePregnancyBmi

  function addWeight() {
    if (!kg) return
    const entry: WeightEntry = { ga: ga?.decimalWeeks ?? 0, kg: Number(kg) }
    update({ weights: [...profile.weights, entry] })
    setKg('')
  }

  return (
    <SectionCard title={
      <span className="inline-flex items-center gap-2"><Scale size={18} className="text-brand-600" />{lang === 'en' ? 'Weight vs. target' : '체중 대비 목표'}</span>
    }>
      {!bmi ? (
        <SetupBmi />
      ) : (
        <>
          <TargetSummary bmi={bmi} gaWeeks={ga?.weeks ?? 0} />
          <div className="mt-3 flex items-end gap-2">
            <label className="text-sm">
              <span className="mb-1 block text-slate-600">
                {lang === 'en' ? 'Log weight (kg)' : '체중 입력 (kg)'}
                {ga && <span className="text-slate-400"> · {ga.weeks}w</span>}
              </span>
              <input
                type="number"
                step="0.1"
                value={kg}
                onChange={(e) => setKg(e.target.value)}
                className="w-32 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm"
              />
            </label>
            <button
              onClick={addWeight}
              className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              <Plus size={15} />
              {lang === 'en' ? 'Add' : '추가'}
            </button>
          </div>
          {profile.weights.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm">
              {profile.weights.map((w, i) => {
                const gain = prePreg ? Math.round((w.kg - prePreg) * 10) / 10 : null
                const band = bmi ? expectedGainBand(bmi, w.ga) : null
                const within = gain != null && band ? gain >= band[0] - 1 && gain <= band[1] + 1 : true
                return (
                  <li key={i} className="flex items-center justify-between rounded border border-brand-50 px-2 py-1">
                    <span className="text-slate-500">{Math.round(w.ga)}w</span>
                    <span className="font-medium text-slate-700">{w.kg} kg</span>
                    {gain != null && (
                      <span className={within ? 'text-brand-600' : 'text-rose-accent'}>
                        {gain >= 0 ? '+' : ''}{gain} kg
                        {band && (
                          <span className="ml-1 text-xs text-slate-400">
                            ({lang === 'en' ? 'target' : '목표'} +{band[0]}–{band[1]})
                          </span>
                        )}
                      </span>
                    )}
                    <button
                      onClick={() => update({ weights: profile.weights.filter((_, j) => j !== i) })}
                      className="text-slate-300 hover:text-rose-accent"
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </>
      )}
    </SectionCard>
  )
}

function SetupBmi() {
  const { lang } = useUi()
  const { profile, update } = useProfile()
  const [h, setH] = useState(profile.heightCm?.toString() ?? '')
  const [w, setW] = useState(profile.prePregnancyWeightKg?.toString() ?? '')
  return (
    <div className="rounded-lg bg-brand-50 p-3">
      <p className="mb-2 text-sm text-slate-600">
        {lang === 'en'
          ? 'Enter your height and pre-pregnancy weight to see your recommended weight-gain range.'
          : '키와 임신 전 체중을 입력하면 권장 체중 증가 범위를 확인할 수 있습니다.'}
      </p>
      <div className="flex flex-wrap items-end gap-2">
        <label className="text-sm">
          <span className="mb-1 block text-slate-600">{lang === 'en' ? 'Height (cm)' : '키 (cm)'}</span>
          <input type="number" value={h} onChange={(e) => setH(e.target.value)} className="w-28 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-slate-600">{lang === 'en' ? 'Pre-pregnancy weight (kg)' : '임신 전 체중 (kg)'}</span>
          <input type="number" step="0.1" value={w} onChange={(e) => setW(e.target.value)} className="w-36 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm" />
        </label>
        <button
          onClick={() => h && w && update({ heightCm: Number(h), prePregnancyWeightKg: Number(w), prePregnancyBmi: computeBmi(Number(h), Number(w)) })}
          className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {lang === 'en' ? 'Save' : '저장'}
        </button>
      </div>
    </div>
  )
}

function TargetSummary({ bmi, gaWeeks }: { bmi: number; gaWeeks: number }) {
  const { lang } = useUi()
  const t = weightTarget(bmi)
  const cat = bmiCategory(bmi)
  const band = expectedGainBand(bmi, gaWeeks)
  const catLabel: Record<string, { en: string; ko: string }> = {
    underweight: { en: 'underweight', ko: '저체중' },
    normal: { en: 'normal weight', ko: '정상체중' },
    overweight: { en: 'overweight', ko: '과체중' },
    obese: { en: 'obese', ko: '비만' },
  }
  return (
    <div className="rounded-lg bg-brand-50 p-3 text-sm text-slate-700">
      <p>
        {lang === 'en' ? 'Pre-pregnancy BMI ' : '임신 전 BMI '}
        <span className="font-semibold">{bmi.toFixed(1)}</span> ({lang === 'en' ? catLabel[cat].en : catLabel[cat].ko}) ·{' '}
        {lang === 'en' ? 'total recommended gain ' : '총 권장 증가 '}
        <span className="font-semibold">{t.totalKgRange[0]}–{t.totalKgRange[1]} kg</span>
      </p>
      <p className="mt-1 text-brand-700">
        {lang === 'en'
          ? `By ${gaWeeks}w, expect about +${band[0]}–${band[1]} kg.`
          : `${gaWeeks}주에는 약 +${band[0]}~${band[1]} kg 예상.`}
      </p>
    </div>
  )
}

function KickCounter() {
  const { lang } = useUi()
  const { profile, update } = useProfile()
  const [count, setCount] = useState(0)
  const [startedAt, setStartedAt] = useState<string | null>(null)

  function start() {
    setStartedAt(new Date().toISOString())
    setCount(0)
  }
  function save() {
    if (!startedAt) return
    const durationMin = Math.round((Date.now() - new Date(startedAt).getTime()) / 60000)
    const session: KickSession = { startedAt, count, durationMin }
    update({ kickSessions: [session, ...profile.kickSessions].slice(0, 20) })
    setStartedAt(null)
    setCount(0)
  }

  return (
    <SectionCard title={
      <span className="inline-flex items-center gap-2"><Footprints size={18} className="text-brand-600" />{lang === 'en' ? 'Kick counter' : '태동 카운터'}</span>
    }>
      {startedAt ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-600 text-3xl font-bold text-white hover:bg-brand-700"
          >
            {count}
          </button>
          <div className="text-sm text-slate-500">
            {lang === 'en' ? 'Tap for each movement you feel.' : '움직임을 느낄 때마다 누르세요.'}
          </div>
          <button onClick={save} className="rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50">
            {lang === 'en' ? 'Save session' : '기록 저장'}
          </button>
        </div>
      ) : (
        <button onClick={start} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          {lang === 'en' ? 'Start counting' : '카운트 시작'}
        </button>
      )}
      {profile.kickSessions.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-slate-600">
          {profile.kickSessions.slice(0, 5).map((s, i) => (
            <li key={i} className="flex justify-between rounded border border-brand-50 px-2 py-1">
              <span>{new Date(s.startedAt).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US')}</span>
              <span className="font-medium">{s.count} {lang === 'en' ? 'kicks' : '회'}</span>
              {s.durationMin != null && <span className="text-slate-400">{s.durationMin} min</span>}
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}

function Notes() {
  const { lang } = useUi()
  const { profile, update } = useProfile()
  const [text, setText] = useState('')
  const [label, setLabel] = useState('')

  function add() {
    if (!text.trim()) return
    const note: Note = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      visitLabel: label.trim() || undefined,
      text: text.trim(),
    }
    update({ notes: [note, ...profile.notes] })
    setText('')
    setLabel('')
  }

  return (
    <SectionCard title={
      <span className="inline-flex items-center gap-2"><NotebookPen size={18} className="text-brand-600" />{lang === 'en' ? 'Appointment notes' : '진료 메모'}</span>
    }>
      <div className="space-y-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder={lang === 'en' ? 'Visit label (optional)' : '진료 제목 (선택)'}
          className="w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={lang === 'en' ? 'Questions, results, reminders…' : '질문, 결과, 메모…'}
          rows={2}
          className="w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm"
        />
        <button onClick={add} className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          {lang === 'en' ? 'Add note' : '메모 추가'}
        </button>
      </div>
      <ul className="mt-3 space-y-2">
        {profile.notes.map((n) => (
          <li key={n.id} className="rounded-lg border border-brand-100 bg-white px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-brand-600">
                {n.visitLabel || new Date(n.createdAt).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US')}
              </span>
              <button onClick={() => update({ notes: profile.notes.filter((x) => x.id !== n.id) })} className="text-slate-300 hover:text-rose-accent">
                <Trash2 size={14} />
              </button>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{n.text}</p>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}

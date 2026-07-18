import { useState } from 'react'
import { AppHeader, type NavItem } from './components/AppHeader'
import { Home } from './components/Home'
import { Timeline } from './components/Timeline'
import { Compare } from './components/Compare'
import { Checklist } from './components/Checklist'
import { Crossover } from './components/Crossover'
import { ClinicCard } from './components/ClinicCard'
import { Trackers } from './components/Trackers'
import { Resources } from './components/Resources'
import { DataManager } from './components/DataManager'
import { Disclaimer } from './components/Disclaimer'

const NAV: NavItem[] = [
  { id: 'home', label: 'navHome' },
  { id: 'timeline', label: 'navTimeline' },
  { id: 'compare', label: 'navCompare' },
  { id: 'checklist', label: 'navChecklist' },
  { id: 'crossover', label: 'navCrossover' },
  { id: 'cliniccard', label: 'navClinicCard' },
  { id: 'trackers', label: 'navTrackers' },
  { id: 'resources', label: 'navResources' },
  { id: 'data', label: 'navData' },
]

export default function App() {
  const [section, setSection] = useState('home')

  function navigate(id: string) {
    setSection(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <AppHeader nav={NAV} active={section} onNavigate={navigate} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        {section === 'home' && <Home onNavigate={navigate} />}
        {section === 'timeline' && <Timeline />}
        {section === 'compare' && <Compare />}
        {section === 'checklist' && <Checklist />}
        {section === 'crossover' && <Crossover />}
        {section === 'cliniccard' && <ClinicCard />}
        {section === 'trackers' && <Trackers />}
        {section === 'resources' && <Resources />}
        {section === 'data' && <DataManager />}
        <footer className="mt-8">
          <Disclaimer />
        </footer>
      </main>
    </div>
  )
}

import { AppHeader, type NavItem } from './components/AppHeader'
import { Home } from './components/Home'
import { Timeline } from './components/Timeline'
import { Compare } from './components/Compare'
import { Checklist } from './components/Checklist'
import { Crossover } from './components/Crossover'
import { Nutrition } from './components/Nutrition'
import { Exercise } from './components/Exercise'
import { IndexPage } from './components/IndexPage'
import { ClinicCard } from './components/ClinicCard'
import { Trackers } from './components/Trackers'
import { Resources } from './components/Resources'
import { DataManager } from './components/DataManager'
import { Disclaimer } from './components/Disclaimer'
import { useNav, type Section } from './state/navState'

const NAV: NavItem[] = [
  { id: 'home', label: 'navHome' },
  { id: 'timeline', label: 'navTimeline' },
  { id: 'compare', label: 'navCompare' },
  { id: 'checklist', label: 'navChecklist' },
  { id: 'crossover', label: 'navCrossover' },
  { id: 'nutrition', label: 'navNutrition' },
  { id: 'exercise', label: 'navExercise' },
  { id: 'index', label: 'navIndex' },
  { id: 'cliniccard', label: 'navClinicCard' },
  { id: 'trackers', label: 'navTrackers' },
  { id: 'resources', label: 'navResources' },
  { id: 'data', label: 'navData' },
]

export default function App() {
  const { section, navigate } = useNav()
  const go = (id: string) => navigate(id as Section)

  return (
    <div className="min-h-screen">
      <AppHeader nav={NAV} active={section} onNavigate={go} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        {section === 'home' && <Home onNavigate={go} />}
        {section === 'timeline' && <Timeline />}
        {section === 'compare' && <Compare />}
        {section === 'checklist' && <Checklist />}
        {section === 'crossover' && <Crossover />}
        {section === 'nutrition' && <Nutrition />}
        {section === 'exercise' && <Exercise />}
        {section === 'index' && <IndexPage />}
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

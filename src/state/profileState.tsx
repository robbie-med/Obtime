import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  emptyProfile,
  loadProfile,
  saveProfile,
  clearProfile as clearStored,
  type Profile,
} from '../lib/persistence'
import { effectiveEdd, gaFromEdd, type GestationalAge } from '../lib/dating'

interface ProfileState {
  profile: Profile
  /** merge a partial update and persist */
  update: (patch: Partial<Profile>) => void
  /** toggle a checklist item */
  toggleChecklist: (id: string) => void
  clear: () => void
  replace: (p: Profile) => void
  /** derived: effective EDD (Date) or null if not set */
  edd: Date | null
  /** derived: current gestational age, or null */
  ga: GestationalAge | null
  hasProfile: boolean
}

const ProfileContext = createContext<ProfileState | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(() => loadProfile())

  const persist = useCallback((next: Profile) => {
    setProfile(next)
    saveProfile(next)
  }, [])

  const update = useCallback(
    (patch: Partial<Profile>) => persist({ ...profile, ...patch }),
    [profile, persist],
  )

  const toggleChecklist = useCallback(
    (id: string) =>
      persist({
        ...profile,
        checklist: { ...profile.checklist, [id]: !profile.checklist[id] },
      }),
    [profile, persist],
  )

  const clear = useCallback(() => {
    clearStored()
    setProfile(emptyProfile())
  }, [])

  const replace = useCallback((p: Profile) => persist(p), [persist])

  const edd = useMemo(() => effectiveEdd(profile), [profile])
  const ga = useMemo(() => (edd ? gaFromEdd(edd) : null), [edd])

  const value: ProfileState = {
    profile,
    update,
    toggleChecklist,
    clear,
    replace,
    edd,
    ga,
    hasProfile: !!edd,
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile(): ProfileState {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}

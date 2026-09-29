import type { ReactNode } from 'react'
import { UiProvider } from './uiState'
import { ProfileProvider } from './profileState'
import { NavProvider } from './navState'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UiProvider>
      <ProfileProvider>
        <NavProvider>{children}</NavProvider>
      </ProfileProvider>
    </UiProvider>
  )
}

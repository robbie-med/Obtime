import type { ReactNode } from 'react'
import { UiProvider } from './uiState'
import { ProfileProvider } from './profileState'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UiProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </UiProvider>
  )
}

import React from 'react'
import Apollo from '@services/apollo/Apollo'
import { getRequestStorage } from '@services/apollo/localStorage'
import { ThemeService } from '@services/theme'
import '@shared/styles/base.scss'

export default async function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="ru">
      <head />
      <body>
        <Apollo apolloState={JSON.stringify(getRequestStorage().apolloState ?? '{}')}>
          <ThemeService>
            {children}
          </ThemeService>
        </Apollo>
      </body>
    </html>
  )
}

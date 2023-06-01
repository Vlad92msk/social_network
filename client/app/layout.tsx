import { App } from '@modules'
import { getRequestStorage } from '@services/apollo/apolloUtils'
import { ThemeService } from '@services/theme'
import React from 'react'
import Apollo from './_services/apollo/Apollo'
import './_styles/base.scss'

export default async function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="ru">
      <head />
      <body>
        <Apollo apolloState={getRequestStorage().apolloState}>
          <ThemeService>
            <App>
              {children}
            </App>
          </ThemeService>
        </Apollo>
      </body>
    </html>
  )
}

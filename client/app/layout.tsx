import React from 'react'
import { App } from './(modules)'
import Apollo from './(services)/apollo/Apollo'
import { getRequestStorage } from './(services)/apollo/apolloUtils'
import { ThemeService } from './(services)/theme'
import './(styles)/base.scss'

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

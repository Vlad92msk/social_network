import React from 'react'
import { App } from '@modules'
import { getRequestStorage } from '@services/apollo/apolloUtils'
import { ThemeService } from '@services/theme'
import Apollo from './_services/apollo/Apollo'
import './_styles/base.scss'
// eslint-disable-next-line import/order
import { DefaultObject } from '@public/types/defaultObject.model'

interface RootLayoutProps {
    children: React.ReactNode
    params: DefaultObject
}

export default async function RootLayout({ children }: RootLayoutProps) {
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

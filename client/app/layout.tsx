import React from 'react'
import { App } from '@modules'
import { getRequestStorage } from '@services/apollo/apolloUtils'
import { ThemeService } from '@services/theme'
import Apollo from './_services/apollo/Apollo'
import './_styles/base.scss'
// eslint-disable-next-line import/order
import { DefaultObject } from '@public/types/defaultObject.model'
// eslint-disable-next-line import/order
import { getLocale } from './_utils/getLocale'
import { getTranslate } from './_utils/getTranslate'
import { Translation } from '@services/translation'

interface RootLayoutProps {
    children: React.ReactNode
    params: DefaultObject
}


export async function generateMetadata() {
  const t = await getTranslate()
  return {
    title: t('Metadata.title'),
  }
}


export default async function RootLayout({ children, params }: RootLayoutProps) {
  const locale = getLocale()

  return (
    <html lang={locale}>
      <head />
      <body>
        <App>
          <Apollo apolloState={getRequestStorage().apolloState}>
            <ThemeService>
              <Translation>
                {children}
              </Translation>
            </ThemeService>
          </Apollo>
        </App>
      </body>
    </html>
  )
}

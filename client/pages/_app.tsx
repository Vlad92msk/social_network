import { Loader } from '@shared/components/Loader'
import { NextPage } from 'next'
import React, { Suspense } from 'react'
import '@public/styles/base.scss'
import { ServiceLanguage } from 'src/services/language'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/scrollbar/scrollbar.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/effect-cube/effect-cube.min.css'
import { ServiceTheme } from '@services/theme'
/**
 * Предотвращает ошибку
 * Expected server HTML to contain a matching <div> in <div>.
 */
// function SafeHydrate({ children }) {
//   return (
//     <div suppressHydrationWarning>
//       {typeof window === 'undefined' ? null : children}
//     </div>
//   )
// }


interface App {
  Component: NextPage
  pageProps: Record<string, any>
}

const MyApp = (props: App) => {
  const { Component, pageProps } = props

  return (
    <Suspense fallback={<Loader />}>
      <ServiceTheme>
        <ServiceLanguage pageProps={pageProps}>
          <Component {...pageProps} />
        </ServiceLanguage>
      </ServiceTheme>
    </Suspense>
  )
}

export default MyApp

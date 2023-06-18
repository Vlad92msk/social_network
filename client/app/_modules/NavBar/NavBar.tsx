import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { makeCn } from '@public/utils'
import { ButtonsList, Footer, Header } from './components'
import styles from './NavBar.module.scss'

const cn = makeCn('NavBar', styles)


export const NavBar = () => (
  <div className={cn()}>
    <SessionProvider>
      <Header />
      <ButtonsList />
      <Footer />
    </SessionProvider>
  </div>
)


import { makeCn, classNames } from '@public/utils'
import { ButtonsList, Footer, Header } from './components'
import styles from './NavBar.module.scss'
import React from "react";

const cn = makeCn('NavBar', styles)


export const NavBar: React.FC = () => (
  <div className={cn()}>
    <Header />
    <ButtonsList />
    <Footer />
  </div>
)

import { DrawerBar } from '@modules/DrawerBar'
import { Main } from '@modules/Main'
import { NavBar } from '@modules/NavBar'
import { makeCn } from '@public/utils'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)

export const App = () => (
  <main className={cn()}>
    <NavBar />
    <Main />
    <DrawerBar />
  </main>
)

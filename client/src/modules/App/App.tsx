import { DrawerBar } from '@modules/DrawerBar'
import { Main } from '@modules/Main'
import { NavBar } from '@modules/NavBar'
import { Section } from 'src/components/Section'
import { makeCn } from 'public/utils'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)

export const App = () => (
  <Section className={cn()} noPaddingRight>
    <NavBar />
    <Main />
    <DrawerBar />
  </Section>
)

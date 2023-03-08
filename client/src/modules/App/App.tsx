import { Section } from '@shared/components/Section'
import { makeCn } from '@shared/utils'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)

export const App = () => (
  <Section
    className={cn()}
    noPaddingRight
    bcgImg={{
      path: {
        moduleName: 'app',
        folder: 'bcg',
        img: 'bcg1',
      },
    }}
  >
    app
    {/* <NavBar/> */}
    {/* <Main/> */}
    {/* <DrawerBar/> */}
  </Section>
)

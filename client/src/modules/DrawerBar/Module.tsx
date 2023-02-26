import { Section } from '@shared/components/Section'
import { makeCn } from '@shared/utils'
import { Footer, FriendsList, Header, Search } from './components'
import styles from './Module.module.scss'

const cn = makeCn('DrawerBar', styles)

const Module = () => (
  <Section
    className={cn()}
    imgClassName={cn('Img')}
    bcgImg={{
      path: {
        moduleName: 'app',
        folder: 'bcg',
        img: 'drawBar1',
      },
    }}
  >
    <Header />
    <Search />
    <FriendsList />
    <Footer />
  </Section>
)

export default Module

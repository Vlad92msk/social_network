import { Section } from '@shared/components/Section'
import { createStoreContext, makeCn } from '@shared/utils'
import { Footer, FriendsList, Header, Search } from './components'
import { initialState } from './context/initialState'
import styles from './Module.module.scss'

const cn = makeCn('DrawerBar', styles)

export const {
  contextWrapper,
  useContextSelector: useDrawerBarSelect,
  useContextDispatch: useDrawerBarUpdate,
} = createStoreContext({
  name: 'DrawerBar',
  initialState,
})

export const DrawerBar = contextWrapper(() => (
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
))

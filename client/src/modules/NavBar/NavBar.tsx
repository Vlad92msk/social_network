import { createStoreContext, makeCn } from 'public/utils'
import { ButtonsList, Footer, Header } from './components'
import { initialState } from './context/initialState'
import styles from './NavBar.module.scss'

const cn = makeCn('NavBar', styles)


export const {
  contextWrapper,
  useContextSelector: useNavBarSelect,
  useContextDispatch: useNavBarUpdate,
} = createStoreContext({
  name: 'NawBar',
  initialState,
})


export const NavBar = contextWrapper(() => (
  <div className={cn()}>
    <Header />
    <ButtonsList />
    <Footer />
  </div>
))

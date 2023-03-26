
import { createStoreContext, makeCn } from '@shared/utils'
import { ButtonsList, Footer, Header } from './components'
import { initialState } from './context/initialState'
import styles from './Module.module.scss'

const cn = makeCn('NavBar', styles)


export const {
  contextWrapper,
  useContextSelector: useNavBarSelect,
  useContextDispatch: useNavBarUpdate,
} = createStoreContext({
  name: 'NawBar',
  initialState,
})


export const NavBar = contextWrapper(() => {

  return (
    <div className={cn()}>
      <Header />
      <ButtonsList />
      <Footer />
    </div>
  )
})

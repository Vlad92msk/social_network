import { useCallback } from 'react'
import { ButtonBox } from '@shared/components/ButtonBox'
import { Icon } from '@shared/components/Icon'
import { createStoreContext, makeCn } from '@shared/utils'
import { Footer, FriendsList, Header, Search } from './components'
import { initialState } from './context/initialState'
import styles from './DrawerBar.module.scss'

const cn = makeCn('DrawerBar', styles)

export const {
  contextWrapper,
  useContextSelector: useDrawerBarSelect,
  useContextDispatch: useDrawerBarUpdate,
} = createStoreContext({
  name: 'DrawerBar',
  initialState,
})

export const DrawerBar = contextWrapper(() => {
  const active = useDrawerBarSelect((ctx) => ctx.isOpen)
  const updateCtx = useDrawerBarUpdate()

  const changeToggle = useCallback(() => {
    updateCtx((ctx) => ({ isOpen: !ctx.isOpen }))
  }, [updateCtx])

  return (
    <div className={cn({ active })}>
      <ButtonBox className={cn('Change')} onClick={changeToggle}>
        <Icon icon="arrow-left-sharp" />
      </ButtonBox>
      <Header />
      <Search />
      <FriendsList />
      <Footer />
    </div>
  )
})
'use client'

import React, { useCallback } from 'react'
import { ButtonBox } from '@public/components/ButtonBox'
import { Icon } from '@public/components/Icon'
import { createStoreContext, makeCn } from '@public/utils'
import { Footer, FriendsList, Search } from './components'
import { initialState } from './context/initialState'
import styles from './DrawerBar.module.scss'

export const cn = makeCn('DrawerBar', styles)

export const {
  contextWrapper,
  useContextSelector: useDrawerBarSelect,
  useContextDispatch: useDrawerBarUpdate,
} = createStoreContext({
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
      <Search />
      <FriendsList />
      <Footer />
    </div>
  )
})

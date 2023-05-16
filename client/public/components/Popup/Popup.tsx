import React, { useCallback } from 'react'
import { useClickOutside } from '@public/hooks'
import { createStoreContext, makeCn } from '@public/utils'

import { initialState } from './context/initialState'
import styles from './Popup.module.scss'
import { resetValue } from './PopupButton'

export const cn = makeCn('Popup', styles)

export const {
  contextWrapper,
  useContextSelector: usePopupSelect,
  useContextDispatch: usePopupUpdate,
} = createStoreContext({
  name: 'Popup',
  initialState,
})


export const PopupWrapper = React.memo(contextWrapper(({ children }) => {
  const update = usePopupUpdate()

  const open = usePopupSelect((store) => store.open)
  const isClickOutside = usePopupSelect((store) => store.isClickOutside)
  const targetEl = usePopupSelect((store) => store.target)
  const onClose = usePopupSelect((store) => store.onClose)

  const handleReset = useCallback(() => {
    update(() => resetValue)
    onClose?.()
  }, [onClose, update])

  useClickOutside(targetEl, handleReset, [open, isClickOutside])

  return <>{children}</>
}))

import React from 'react'
import { createStoreContext, makeCn } from '@shared/utils'

import { initialState } from './context/initialState'
import styles from './Popup.module.scss'

export const cn = makeCn('Popup', styles)

export const {
  contextWrapper,
  useContextSelector: usePopupSelect,
  useContextDispatch: usePopupUpdate,
} = createStoreContext({
  name: 'Popup',
  initialState,
})


export const PopupWrapper = React.memo(contextWrapper(({ children }) => (
  <>
    {children}
  </>
)))

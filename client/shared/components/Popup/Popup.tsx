import React, { useEffect } from 'react'
import { resetValue } from '@shared/components/Popup/PopupButton'
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
  initialState: { ...initialState },
})


export const PopupWrapper = React.memo(contextWrapper(({ children }) => {
  const update = usePopupUpdate()

  const open = usePopupSelect((store) => store.open)
  const isClickOutside = usePopupSelect((store) => store.isClickOutside)
  const targetEl = usePopupSelect((store) => store.target)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (open && isClickOutside) {
      const listener = (event) => {
        if (!targetEl?.current || targetEl.current.contains(event.target)) {
          return
        }
        update((context) => ({ ...context, ...resetValue }))
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
      document.addEventListener('click', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
        document.removeEventListener('click', listener)
      }
    }
  }, [isClickOutside, open, targetEl, update])

  return <>{children}</>
}))

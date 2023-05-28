import { classnames } from '@bem-react/classnames'
import React from 'react'
import { makeCn, classNames } from '@public/utils'
import { usePopupSelect } from './Popup'
import styles from './Popup.module.scss'
import { Portal, PortalProps } from '../Portal'


export const cn = makeCn('Popup', styles)

export type PopupComponentProps = Omit<PortalProps, 'open' | 'targetEl'>

export const PopupComponent = (props: PopupComponentProps) => {
  const { className, children, ...rest } = props

  const open = usePopupSelect((store) => store.open)
  const targetEl = usePopupSelect((store) => store.target)
  const style = usePopupSelect((store) => store.popupStyle)

  return (
    <Portal
      open={Boolean(open)}
      className={classNames(cn(), className)}
      targetEl={targetEl}
      style={style}
      onClick={(e) => e.stopPropagation()}
      {...rest}
    >
      {children}
    </Portal>
  )
}

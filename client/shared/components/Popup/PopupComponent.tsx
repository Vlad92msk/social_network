import { classnames } from '@bem-react/classnames'
import React from 'react'
import { usePopupSelect } from '@shared/components/Popup/Popup'
import { makeCn } from '@shared/utils'
import { Portal, PortalProps } from 'shared/components/Portal'

import styles from './Popup.module.scss'

export const cn = makeCn('Popup', styles)

export type PopupComponentProps = Omit<PortalProps, 'open' | 'targetEl'>


export const PopupComponent: React.FC<PopupComponentProps> = (props) => {
  const {
    className, children, ...rest
  } = props
  const open = usePopupSelect((store) => store.open)
  const targetEl = usePopupSelect((store) => store.target)
  const style = usePopupSelect((store) => store.popupStyle)


  return (
    <Portal
      open={Boolean(open)}
      className={classnames(cn(), className)}
      targetEl={targetEl}
      style={style}
      {...rest}
    >
      {children}
    </Portal>
  )
}

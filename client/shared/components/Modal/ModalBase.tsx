import { classnames } from '@bem-react/classnames'
import React, { useCallback, useEffect } from 'react'
import { Button } from '@shared/components/Button'
import { Icon } from '@shared/components/Icon'
import { Image } from '@shared/components/Image'
import { Portal } from 'shared/components/Portal'
import { cn } from './cn'

export interface ModalProps {
    children: React.ReactNode | React.ReactNode[]
    className?: string
    open: boolean
    autoHeight?: boolean

    onClose?: () => void
    isBckOnClose?: boolean
    isOnCloseIcon?: boolean
    backgroundImg?: string
}


export const Modal = (props: ModalProps) => {
  const {
    children,
    className,
    open,
    autoHeight,

    onClose,
    isBckOnClose,
    isOnCloseIcon,
    backgroundImg,
  } = props

  return (
    <Portal open={open}>
      {children}
    </Portal>
  )
}

Modal.defaultProps = {
  isBckOnClose: true,
}

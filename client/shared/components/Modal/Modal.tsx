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


  const handleBckClose = useCallback(() => {
    if (isBckOnClose && onClose) {
      onClose()
    }
  }, [isBckOnClose, onClose])

  return (
    <Portal open={open} className={cn()} >
      <span className={cn('Bck')} onClick={handleBckClose} />
      <section className={classnames(cn('Inner', { autoHeight }), className)}>
        {backgroundImg && (
          <Image
            path={{ moduleName: 'social', img: backgroundImg }}
          />
        )}
        {(onClose && isOnCloseIcon) && (
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className={cn('BlockIconClose')}
          >
            <Icon icon="close" className={cn('IconClose')} />
          </Button>
        )}
        {children}
      </section>
    </Portal>
  )
}

Modal.defaultProps = {
  className: null,
  isBckOnClose: true,
}

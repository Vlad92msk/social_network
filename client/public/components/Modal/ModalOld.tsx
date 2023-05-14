import { classnames } from '@bem-react/classnames'
import React, { useCallback } from 'react'
import { ButtonBox } from '@public/components/ButtonBox'
import { Portal } from '@public/components/Portal'
import { Icon } from 'public/components/Icon'
import { Image } from '@shared/components/Image'
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


export const ModalOld = (props: ModalProps) => {
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
    <Portal open={open} className={cn()}>
      <span className={cn('Bck')} onClick={handleBckClose} />
      <section className={classnames(cn('Inner', { autoHeight }), className)}>
        {backgroundImg && (
          <Image
            path={{ moduleName: 'social', img: backgroundImg }}
          />
        )}
        {(onClose && isOnCloseIcon) && (
          <ButtonBox
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className={cn('BlockIconClose')}
          >
            <Icon icon="close" className={cn('IconClose')} />
          </ButtonBox>
        )}
        {children}
      </section>
    </Portal>
  )
}

ModalOld.defaultProps = {
  className: null,
  isBckOnClose: true,
}

import { classnames } from '@bem-react/classnames'
import React, { PropsWithChildren } from 'react'
import { IconButton } from '@public/components/IconButton'
import { Portal } from '@public/components/Portal'
import { IconName } from '@public/types/icon.model'
import { cn } from './cn'

interface ModalProps extends PropsWithChildren {
    className?: string
    open: boolean | undefined
    closeIcon?: {
        icon?: IconName
        onClose?: () => void
        className?: string
    }
}


export const Modal = (props: ModalProps) => {
  const { children, className, open, closeIcon } = props

  return (
    <Portal className={classnames(cn(), className)} open={Boolean(open)}>
      {closeIcon && (
        <IconButton
          className={cn(classnames(cn(), closeIcon.className))}
          icon={closeIcon.icon || 'close'}
          onClick={closeIcon.onClose}
        />
      )}
      {children}
    </Portal>
  )
}

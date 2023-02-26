import { classnames } from '@bem-react/classnames'
import React, { PropsWithChildren } from 'react'
import { IconButton } from '@shared/components/IconButton'
import { makeCn } from '@shared/utils'

import styles from './NavigationDrawer.module.scss'

const cn = makeCn('NavigationDrawer', styles)

interface NavigationDrawerProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  className?: string
}
export const NavigationDrawer: React.FC<NavigationDrawerProps> = (props) => {
  const { isOpen, onClose, className, children } = props
  return (
    <div
      className={classnames(cn({ status: isOpen ? 'open' : 'close' }), className)}
    >
      <IconButton
        className={cn('Close')}
        icon="close"
        onClick={onClose}
      />
      <div className={cn('Content')}>
        {children}
      </div>
    </div>
  )
}
